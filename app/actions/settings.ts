"use server"

import * as z from "zod"
import bcryptjs from "bcryptjs"

import { prismaDB } from "@/lib/database"
import { currentUser } from "@/lib/auth"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"

import { unstable_update } from "@/auth"
import { SettingsModel } from "@/app/model/auth-model"
import { getUserByEmail, getUserById } from "@/app/data/user"

export const settings = async (values: z.infer<typeof SettingsModel>) => {
   const user = await currentUser()
   if (!user) return { error: "Unauthorized." }

   const checkUser = await getUserById(user.id!)
   if (!checkUser) return { error: "User not found." }

   // If user is using OAuth, we can't update password
   if (user.isOAuth) {
      values.email = undefined
      values.password = undefined
      values.newPassword = undefined
      values.isTwoFactorEnabled = undefined
   }

   if (values.email && values.email !== user.email) {
      // Check if email is already in use
      const checkUser = await getUserByEmail(values.email)
      if (checkUser && checkUser.id !== user.id) return { error: "Email already in use." }

      // Generate verification token and send email
      const verificationToken = await generateVerificationToken(values.email)
      await sendVerificationEmail(verificationToken.email, verificationToken.token)

      return { success: "Verification email sent." }
   }

   if (values.password && values.newPassword && checkUser.password) {
      const matchPassword = await bcryptjs.compare(values.password, checkUser.password)
      if (matchPassword) return { error: "Current password is incorrect." }

      const hashedPassword = await bcryptjs.hash(values.newPassword, 10)
      values.password = hashedPassword
      values.newPassword = undefined // Remove new password from values
   }

   const updatedUser = await prismaDB.user.update({
      where: { id: checkUser.id },
      data: { ...values },
   })

   unstable_update({
      user: {
         name: updatedUser.name,
         email: updatedUser.email,
         isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
         role: updatedUser.role,
      },
   })

   return { success: "Settings updated." }
}
