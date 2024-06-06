import crypto from "crypto"
import { v4 as uuidv4 } from "uuid"

import { prismaDB } from "@/lib/database"

import { getTwoFactorTokenByEmail } from "@/app/data/two-factor-token"
import { getPasswordResetTokenByEmail } from "@/app/data/password-reset-token"
import { getVerificationTokenByEmail } from "@/app/data/verification-token"

// Generate 2FA token
export const generateTwoFactorToken = async (email: string) => {
   const token = crypto.randomInt(100_000, 1_000_000).toString() // random 6-digit number
   const expires = new Date(new Date().getTime() + 300 * 1000) // 5 minutes (300 seconds * 1000 ms)
   // const expires = new Date(new Date().getTime() + 3600 * 1000) // 1 hour (3600 seconds * 1000 ms)

   const existingToken = await getTwoFactorTokenByEmail(email)
   if (existingToken) await prismaDB.twoFactorToken.delete({ where: { id: existingToken.id } })

   const createTwoFactorToken = await prismaDB.twoFactorToken.create({
      data: { email, token, expires },
   })

   return createTwoFactorToken
}

// Generate password reset token
export const generatePasswordResetToken = async (email: string) => {
   const token = uuidv4()
   const expires = new Date(new Date().getTime() + 3600 * 1000) // upcoming 1 Hours

   const existingToken = await getPasswordResetTokenByEmail(email)
   if (existingToken) await prismaDB.passwordResetToken.delete({ where: { id: existingToken.id } })

   const createPasswordResetToken = await prismaDB.passwordResetToken.create({
      data: { email, token, expires },
   })

   return createPasswordResetToken
}

// Generate verification token
export const generateVerificationToken = async (email: string) => {
   const token = uuidv4()
   const expires = new Date(new Date().getTime() + 3600 * 1000) // upcoming 1 Hours

   const existingToken = await getVerificationTokenByEmail(email)
   if (existingToken) await prismaDB.verificationToken.delete({ where: { id: existingToken.id } })

   const createVerificationToken = await prismaDB.verificationToken.create({
      data: { email, token, expires },
   })

   return createVerificationToken
}
