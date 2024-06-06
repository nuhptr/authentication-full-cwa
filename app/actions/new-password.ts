"use server"

import * as z from "zod"
import bcryptjs from "bcryptjs"

import { prismaDB } from "@/lib/database"

import { NewPasswordModel } from "../model/auth-model"
import { getPasswordResetTokenByToken } from "../data/password-reset-token"
import { getUserByEmail } from "../data/user"

export const newPassword = async (
   values: z.infer<typeof NewPasswordModel>,
   token?: string | null
) => {
   if (!token) return { error: "Missing token." }

   const validateFields = NewPasswordModel.safeParse(values)
   if (!validateFields.success) return { error: "Error in password input, Check it later." }

   const { password } = validateFields.data

   // Check if token exists
   const checkToken = await getPasswordResetTokenByToken(token)
   if (!checkToken) return { error: "Invalid token." }

   // Check if token has expired
   const hasExpires = new Date(checkToken.expires) < new Date()
   if (hasExpires) return { error: "Token has expired." }

   // Check if user exists
   const checkUser = await getUserByEmail(checkToken.email)
   if (!checkUser) return { error: "User not found." }

   const hashedPassword = await bcryptjs.hash(password, 10)

   // Update user password
   await prismaDB.user.update({ where: { id: checkToken.id }, data: { password: hashedPassword } })

   // Delete token
   await prismaDB.passwordResetToken.delete({ where: { id: checkToken.id } })

   return { success: "Password updated." }
}
