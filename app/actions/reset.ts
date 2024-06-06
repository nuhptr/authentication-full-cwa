"use server"

import * as z from "zod"

import { sendPasswordResetEmail } from "@/lib/mail"
import { generatePasswordResetToken } from "@/lib/tokens"

import { ResetModel } from "../model/auth-model"
import { getUserByEmail } from "../data/user"

export const reset = async (values: z.infer<typeof ResetModel>) => {
   // Validate value fields
   const validateFields = ResetModel.safeParse(values)
   if (!validateFields.success) return { error: "Invalid email address." }

   const { email } = validateFields.data

   // Check if user exists
   const checkUser = await getUserByEmail(email)
   if (!checkUser || !checkUser.email) return { error: "User not found." }

   // Generate & send password reset token
   const passwordResetToken = await generatePasswordResetToken(email)
   await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token)

   return { success: "Password reset email sent." }
}
