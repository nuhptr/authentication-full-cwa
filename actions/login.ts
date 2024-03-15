"use server"

import * as z from "zod"

import { LoginModel } from "@/model"

export const login = async (values: z.infer<typeof LoginModel>) => {
    const validateFields = LoginModel.safeParse(values)

    if (!validateFields.success) return { errors: "Invalid fields!" }

    return { success: "Email sent!" }
}
