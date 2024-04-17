"use server"

import * as z from "zod"
import { AuthError } from "next-auth"

import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { LoginModel } from "@/model/auth-model"

import { db } from "@/lib/database"
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail"
import { generateVerificationToken, generateTwoFactorToken } from "@/lib/tokens"

import { getUserByEmail } from "@/data/user"
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token"
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation"

/**
 * Function to process login and send verification email to user
 * @param values typeof LoginModel
 * @returns redirectTo DEFAULT_LOGIN_REDIRECT((protected)/settings)
 */
export async function login(values: z.infer<typeof LoginModel>, callbackUrl?: string | null) {
   const validateFields = LoginModel.safeParse(values)

   if (!validateFields.success) {
      return { error: "Invalid fields!" }
   }

   const { email, password, code } = validateFields.data

   const existingUser = await getUserByEmail(email)

   if (!existingUser || !existingUser.email || !existingUser.password) {
      return { error: "Email doesn't exist!" }
   }
   if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(existingUser.email)
      await sendVerificationEmail(verificationToken.email, verificationToken.token)

      return { success: "Confirmation email sent!" }
   }
   if (existingUser.isTwoFactorEnabled && existingUser.email) {
      if (code) {
         //? verify two factor code if code is provided
         const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)

         if (!twoFactorToken) return { error: "Invalid two factor code!" }

         if (twoFactorToken.token !== code) return { error: "Invalid two factor code!" }

         const hasExpired = new Date(twoFactorToken.expires) < new Date() //? if expires less than current date then expired
         if (hasExpired) return { error: "Two factor code has expired!" }

         await db.twoFactorToken.delete({ where: { id: twoFactorToken.id } })

         const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

         if (existingConfirmation) {
            await db.twoFactorConfirmation.delete({ where: { id: existingConfirmation.id } })
         }

         await db.twoFactorConfirmation.create({
            data: { userId: existingUser.id },
         })
      } else {
         //? generate two factor token and send email if code is not provided
         const twoFactorToken = await generateTwoFactorToken(existingUser.email)
         await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token)

         return { twoFactor: true }
      }
   }

   try {
      await signIn("credentials", {
         email,
         password,
         redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
      })
   } catch (error) {
      if (error instanceof AuthError) {
         if (error.type === "CredentialsSignin") return { error: "Invalid credentials!" }
         else return { error: "Something went wrong!" }
      }

      throw error
   }
}
