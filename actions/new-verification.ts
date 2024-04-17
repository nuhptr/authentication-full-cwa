"use server"

import { db } from "@/lib/database"
import { getUserByEmail } from "@/data/user"
import { getVerificationTokenByToken } from "@/data/verification-token"

export async function newVerification(token: string) {
   const existingToken = await getVerificationTokenByToken(token)
   if (!existingToken) {
      return { error: "Token does not exist!" }
   }

   const hasExpired = new Date(existingToken.expires) < new Date()
   if (hasExpired) {
      return { error: "Token has expired!" }
   }

   const existingUser = await getUserByEmail(existingToken.email)
   if (!existingUser) {
      return { error: "User does not exist!" }
   }

   // Update the user's email and emailVerified fields
   await db.user.update({
      where: { id: existingUser.id },
      data: { emailVerified: new Date(), email: existingToken.email },
   })

   // Delete the token after it has been used
   await db.verificationToken.delete({
      where: { id: existingToken.id },
   })

   return { success: "Email verified!" }
}
