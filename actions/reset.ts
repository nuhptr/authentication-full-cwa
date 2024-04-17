"use server"

import * as z from "zod"

import { ResetModel } from "@/model/auth-model"
import { getUserByEmail } from "@/data/user"

import { sendPasswordResetEmail } from "@/lib/mail"
import { generatePasswordResetToken } from "@/lib/tokens"

export async function reset(values: z.infer<typeof ResetModel>) {
   const validateFields = ResetModel.safeParse(values)
   if (!validateFields.success) {
      return { error: "Invalid email!" }
   }

   const { email } = validateFields.data

   const existingUser = await getUserByEmail(email)
   if (!existingUser) {
      return { error: "Email not found!" }
   }

   // TODO: generate token & send email
   const passwordResetToken = await generatePasswordResetToken(email)
   // console.log(passwordResetToken)
   await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token)

   return { success: "Reset email sent!" }
}
