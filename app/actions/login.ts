"use server"

import * as z from "zod"
import { AuthError } from "next-auth"

import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { LoginModel } from "@/app/model/auth-model"

import { prismaDB } from "@/lib/database"
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail"
import { generateVerificationToken, generateTwoFactorToken } from "@/lib/tokens"

import { getUserByEmail } from "@/app/data/user"
import { getTwoFactorTokenByEmail } from "@/app/data/two-factor-token"
import { getTwoFactorConfirmationByUserId } from "@/app/data/two-factor-confirmation"

export const login = async (values: z.infer<typeof LoginModel>, callbackUrl?: string | null) => {
   const validateFields = LoginModel.safeParse(values)
   if (!validateFields.success) {
      return { error: "Email or password is incorrect." }
   }

   const { email, password, code } = validateFields.data

   const checkUser = await getUserByEmail(email)
   if (!checkUser || !checkUser.email || !checkUser.password) {
      return { error: "Email doesn't exist." }
   }

   if (!checkUser.emailVerified) {
      const verificationToken = await generateVerificationToken(checkUser.email)
      await sendVerificationEmail(verificationToken.email, verificationToken.token)

      return { success: "Please verify your email address." }
   }

   if (checkUser.isTwoFactorEnabled && checkUser.email) {
      if (code) {
         // Verify 2FA if code provided
         const twoFactorToken = await getTwoFactorTokenByEmail(checkUser.email)

         if (!twoFactorToken) return { error: "Two-factor token not found." }

         if (twoFactorToken.token !== code) return { error: "Two-factor code is incorrect." }

         const hasExpired = new Date(twoFactorToken.expires) < new Date()
         if (hasExpired) return { error: "Two-factor code has expired." }

         //  Delete 2FA token after successful login
         await prismaDB.twoFactorToken.delete({ where: { id: twoFactorToken.id } })

         //  Check if user has existing 2FA confirmation
         const existingConfirmation = await getTwoFactorConfirmationByUserId(checkUser.id)
         if (existingConfirmation) {
            await prismaDB.twoFactorConfirmation.delete({ where: { id: existingConfirmation.id } })
         }

         //  Create new 2FA confirmation
         await prismaDB.twoFactorConfirmation.create({
            data: { userId: checkUser.id },
         })
      } else {
         // Send 2FA token if code not provided
         const twoFactorToken = await generateTwoFactorToken(checkUser.email)
         await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token)

         // twoFactor available as boolean variable
         return { twoFactor: true }
      }
   }

   try {
      // Sign in user
      await signIn("credentials", {
         email,
         password,
         redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
      })
   } catch (error) {
      // Handle authentication errors
      console.error("Login actions error:", error)

      if (error instanceof AuthError) {
         if (error.type === "CredentialsSignin") return { error: "Invalid credentials." }
         else return { error: "An error occurred. Please try again later." }
      }

      throw error
   }
}
