"use server"

import { prismaDB } from "@/lib/database"
import { getUserByEmail } from "@/app/data/user"
import { getVerificationTokenByToken } from "@/app/data/verification-token"

export const newVerification = async (token: string) => {
   const checkToken = await getVerificationTokenByToken(token)
   if (!checkToken) return { error: "Token doesn't exist" }

   // Check if token has expired
   const hasExpired = new Date(checkToken.expires) < new Date()
   if (hasExpired) return { error: "Token has expired" }

   // Check if user exists
   const checkUser = await getUserByEmail(checkToken.email)
   if (!checkUser) return { error: "User not found." }

   // Update user email verification status
   await prismaDB.user.update({
      where: { id: checkUser.id },
      data: { emailVerified: new Date(), email: checkToken.email },
   })

   // Delete token
   await prismaDB.verificationToken.delete({ where: { id: checkToken.id } })

   return { success: "Email verified" }
}
