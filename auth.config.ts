import bcrypt from "bcryptjs"
import type { NextAuthConfig } from "next-auth"
import credentials from "next-auth/providers/credentials"
import github from "next-auth/providers/github"
import google from "next-auth/providers/google"

import { LoginSchema } from "@/app/model"
import { getUserByEmail } from "@/app/data/user"

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
            const validatedFields = LoginSchema.safeParse(credentials)

            if (validatedFields.success) {
               const { email, password } = validatedFields.data

               const user = await getUserByEmail(email)
               if (!user || !user.password) return null

               const passwordsMatch = await bcrypt.compare(password, user.password)

               if (passwordsMatch) return user
            }

            return null
         },
      }),
   ],
} satisfies NextAuthConfig
