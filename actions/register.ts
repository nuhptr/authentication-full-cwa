"use server"

import * as z from "zod"
import bcrypt from "bcryptjs"

import { RegisterModel } from "@/model"
import { getUserByEmail } from "@/data/user"

import { db } from "@/lib/database"
import { logger } from "@/lib/logging"

export const register = async (values: z.infer<typeof RegisterModel>) => {
    const validateFields = RegisterModel.safeParse(values)
    if (!validateFields.success) {
        return { errors: "Invalid fields!" }
    }

    const { email, password, name } = validateFields.data
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await getUserByEmail(email)
    if (existingUser) {
        return { errors: "User already exists!" }
    }

    const response = await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    })

    logger.info(`data: ${JSON.stringify(response)}`)

    // TODO: Send verification email

    return { success: "Email sent!" }
}
