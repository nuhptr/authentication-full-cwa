import crypto from "crypto"
import { v4 as uuidv4 } from "uuid"

import { db } from "@/lib/db"
import { getVerificationTokenByEmail } from "@/app/data/verification-token"
import { getPasswordResetokenByEmail } from "@/app/data/password-reset-token"
import { getTwoFactorTokenByEmail } from "@/app/data/two-factor-token"

// Generate a random 6-digit number for two-factor authentication
export const generateTwoFactorToken = async (email: string) => {
   const token = crypto.randomInt(100_000, 1000_000).toString()
   const expires = new Date(new Date().getTime() + 3600 * 1000)

   const existingToken = await getTwoFactorTokenByEmail(email)

   if (existingToken) {
      await db.twoFactorToken.delete({ where: { id: existingToken.id } })
   }

   const twoFactorToken = await db.twoFactorToken.create({
      data: { email, token, expires },
   })

   return twoFactorToken
}

// Generate a random token for password reset
export const generatePasswordResetToken = async (email: string) => {
   const token = uuidv4()
   const expires = new Date(new Date().getTime() + 5 * 60 * 1000)

   const existingToken = await getPasswordResetokenByEmail(email)

   if (existingToken) {
      await db.passwordResetToken.delete({ where: { id: existingToken.id } })
   }

   const passwordResetToken = await db.passwordResetToken.create({
      data: { email, token, expires },
   })

   return passwordResetToken
}

// Generate a random token for email verification
export const generateVerificationToken = async (email: string) => {
   const token = uuidv4()
   const expires = new Date(new Date().getTime() + 3600 * 1000)

   const existingToken = await getVerificationTokenByEmail(email)

   if (existingToken) {
      await db.verificationToken.delete({ where: { id: existingToken.id } })
   }

   const verificationToken = await db.verificationToken.create({
      data: { email, token, expires },
   })

   return verificationToken
}
