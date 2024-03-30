import type { NextAuthConfig } from "next-auth"
import credentials from "next-auth/providers/credentials"
import bcryptjs from "bcryptjs"

import github from "next-auth/providers/github"
import google from "next-auth/providers/google"

import { LoginModel } from "@/model/auth-model"
import { getUserByEmail } from "@/data/user"

export default {
    providers: [
        google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        credentials({
            async authorize(credentials) {
                const validateFields = LoginModel.safeParse(credentials)

                if (validateFields.success) {
                    const { email, password } = validateFields.data

                    const user = await getUserByEmail(email)

                    if (!user || !user.password) return null

                    const passwordMatch = await bcryptjs.compare(password, user.password)

                    if (passwordMatch) return user
                }

                return null
            },
        }),
    ],
} satisfies NextAuthConfig
