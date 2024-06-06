"use server"

import * as z from "zod"
import bcryptjs from "bcryptjs"

import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"
import { prismaDB } from "@/lib/database"

import { RegisterModel } from "@/app/model/auth-model"
import { getUserByEmail } from "@/app/data/user"

export const register = async (values: z.infer<typeof RegisterModel>) => {
   const validateFields = RegisterModel.safeParse(values)
   if (!validateFields.success) return { error: "Please input correct data." }

   const { email, password, name } = validateFields.data

   const hashedPassword = await bcryptjs.hash(password, 10)

   const checkUser = await getUserByEmail(email)
   if (checkUser && checkUser.email) return { error: "User with the email already exists." }

   const response = await prismaDB.user.create({
      data: { email, name, password: hashedPassword },
   })

   console.info("User created: ", response)

   // After user is created, generate verification token and send email
   const verificationToken = await generateVerificationToken(email)
   await sendVerificationEmail(verificationToken.email, verificationToken.token)

   return { success: "User created successfully. Please verify your email." }
}
