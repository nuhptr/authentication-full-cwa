"use server"

import * as z from "zod"
import bcrypt from "bcryptjs"

import { RegisterModel } from "@/model"
import { getUserByEmail } from "@/data/user"
import { sendVerificationEmail } from "@/lib/mail"
import { generateVerificationToken } from "@/data/tokens"

import { db } from "@/lib/database"
import { logger } from "@/lib/logging"

export const register = async (values: z.infer<typeof RegisterModel>) => {
    const validateFields = RegisterModel.safeParse(values)
    if (!validateFields.success) {
        return { error: "Invalid fields!" }
    }

    const { email, password, name } = validateFields.data
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await getUserByEmail(email)
    if (existingUser) {
        return { error: "User already exists!" }
    }

    const response = await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    })

    logger.info(`data: ${JSON.stringify(response)}`)

    const verificationToken = await generateVerificationToken(email)
    await sendVerificationEmail(verificationToken.email, verificationToken.token)

    return { success: "Confirmation email sent!" }
}
