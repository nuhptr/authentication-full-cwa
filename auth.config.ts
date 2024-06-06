import bcryptjs from "bcryptjs"

import type { NextAuthConfig } from "next-auth"
import credentials from "next-auth/providers/credentials"
import google from "next-auth/providers/google"
import github from "next-auth/providers/github"

import { LoginModel } from "@/app/model/auth-model"
import { getUserByEmail } from "@/app/data/user"

export default {
   providers: [
      google,
      github,
      credentials({
         async authorize(credentials) {
            const validateFields = LoginModel.safeParse(credentials)

            if (validateFields.success) {
               const { email, password } = validateFields.data

               const user = await getUserByEmail(email)
               if (!user || !user.password) return null

               const checkPassword = await bcryptjs.compare(password, user.password)
               if (checkPassword) return user
            }

            return null
         },
      }),
   ],
} satisfies NextAuthConfig
