import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { UserRole } from "@prisma/client"

import authConfig from "@/auth.config"
import { prismaDB } from "@/lib/database"

import { getUserById } from "@/app/data/user"
import { getTwoFactorConfirmationByUserId } from "@/app/data/two-factor-confirmation"
import { getAccountByUserId } from "@/app/data/account"

export const {
   auth,
   handlers: { GET, POST },
   signIn,
   signOut,
   unstable_update,
} = NextAuth({
   ...authConfig,
   adapter: PrismaAdapter(prismaDB),
   session: { strategy: "jwt" },
   pages: {
      // Override default pages
      signIn: "/auth/login",
      error: "/auth/error",
   },
   events: {
      // Triggered event when a user signs in using a provider
      async linkAccount({ user }) {
         await prismaDB.user.update({
            where: { id: user.id },
            data: { emailVerified: new Date() }, // Set emailVerified to the current date
         })
      },
   },
   callbacks: {
      // Condition callback when signing in
      async signIn({ user, account }) {
         console.log("signIn", user, account)

         // Allow OAuth providers to sign in without email verification
         if (account?.provider !== "credentials") return true

         // Check if user already verified their email
         const checkUser = await getUserById(user.id!)
         if (checkUser?.emailVerified) return false // prevent

         // Check if user has a two-factor confirmation
         if (checkUser?.isTwoFactorEnabled) {
            const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(checkUser.id)
            if (!twoFactorConfirmation) return false // prevent

            // Then delete if user has a two-factor confirmation
            await prismaDB.twoFactorConfirmation.delete({ where: { id: twoFactorConfirmation.id } })
         }

         return true
      },
      // Condition to check session of user
      async session({ token, session }) {
         if (token.sub && session.user) session.user.id = token.sub // token.sub is the user id

         if (token.role && session.user) session.user.role = token.role as UserRole

         if (session.user) session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean

         if (session.user) {
            session.user.name = token.name as string
            session.user.email = token.email as string
            session.user.isOAuth = token.isOauth as boolean
         }

         return session
      },
      // Tokenize user data when signing in
      async jwt({ token }) {
         if (!token.sub) return token

         // Get user by id of token.sub
         const userLoggedIn = await getUserById(token.sub) // token.sub is the user id
         if (!userLoggedIn) return token

         const checkAccount = await getAccountByUserId(userLoggedIn.id)

         token.isOauth = !!checkAccount // Check if user is OAuth (gmail / github)
         token.name = userLoggedIn.name
         token.email = userLoggedIn.email
         token.role = userLoggedIn.role
         token.isTwoFactorEnabled = userLoggedIn.isTwoFactorEnabled

         return token
      },
   },
})
