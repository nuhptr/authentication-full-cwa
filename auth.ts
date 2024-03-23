import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { UserRole } from "@prisma/client"

import { db } from "@/lib/database"
import authConfig from "@/auth.config"
import { getUserById } from "@/data/user"

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    // pages are used to override the default pages
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    // events are used to run code on specific events as example linkAccount
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            })
        },
    },
    //* callbacks are used to modify the session and jwt tokens
    callbacks: {
        async signIn({ user, account }) {
            console.log({ user, account })
            // allow OAuth without email verification
            if (account?.provider !== "credentials") return true

            const existingUser = await getUserById(user.id!)

            // prevent sign in without email verification
            if (!existingUser?.emailVerified) return false

            return true
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub // token.sub is the user id
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole
            }

            return session
        },
        async jwt({ token }) {
            if (!token.sub) return token

            const existingUser = await getUserById(token.sub) // token.sub is the user id

            if (!existingUser) {
                return token
            }

            token.role = existingUser.role

            return token
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
})
