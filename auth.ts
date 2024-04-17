import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { UserRole } from "@prisma/client"

import { db } from "@/lib/database"
import authConfig from "@/auth.config"
import { getUserById } from "@/data/user"
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation"
import { getAccountByUserId } from "@/data/account"

export const {
   handlers: { GET, POST },
   auth,
   signIn,
   signOut,
   unstable_update,
} = NextAuth({
   pages: {
      //* pages are used to override the default pages
      signIn: "/auth/login",
      error: "/auth/error",
   },
   events: {
      //* events triggered when user login using google or github
      //* update user email verified status
      async linkAccount({ user }) {
         await db.user.update({
            where: { id: user.id },
            data: { emailVerified: new Date() },
         })
      },
   },
   callbacks: {
      //* callbacks are used to modify the session and jwt tokens
      //* signIn using for email verification and two factor authentication
      async signIn({ user, account }) {
         console.log({ user, account })
         //? allow OAuth without email verification
         if (account?.provider !== "credentials") return true

         const existingUser = await getUserById(user.id!)
         //? prevent sign in without email verification
         if (!existingUser?.emailVerified) return false

         //? isTwoFactorEnabled is a boolean field in the user table
         if (existingUser.isTwoFactorEnabled) {
            const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

            if (!twoFactorConfirmation) return false

            //? Delete the two factor confirmation for next sign in
            await db.twoFactorConfirmation.delete({
               where: { id: twoFactorConfirmation.id },
            })
         }

         return true
      },
      async session({ token, session }) {
         if (token.sub && session.user) {
            session.user.id = token.sub //? token.sub is the user id
         }

         if (token.role && session.user) {
            session.user.role = token.role as UserRole
         }

         if (session.user) {
            session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
         }

         if (session.user) {
            session.user.name = token.name as string
            session.user.email = token.email as string
            session.user.isOAuth = token.isOauth as boolean
         }

         return session
      },
      async jwt({ token }) {
         // console.info("IAM CALLED AGAIN")
         if (!token.sub) return token

         //? token.sub is the user id
         const existingUser = await getUserById(token.sub)
         if (!existingUser) return token

         const existingAccount = await getAccountByUserId(existingUser.id)

         token.isOauth = !!existingAccount //? if user using gmail / github is true
         token.name = existingUser.name
         token.email = existingUser.email
         token.role = existingUser.role
         token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

         return token
      },
   },
   adapter: PrismaAdapter(db),
   session: { strategy: "jwt" },
   ...authConfig,
})
