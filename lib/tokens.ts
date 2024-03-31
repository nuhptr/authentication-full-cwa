import crypto from "crypto" // Node.js built-in module
import { v4 as uuidv4 } from "uuid"

import { db } from "@/lib/database"
import { getVerificationTokenByEmail } from "@/data/verification-token"
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token"
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token"

/**
 * Generate two factor token by using email given
 * @param email string
 * @returns twoFactorToken {email, token, expires}
 */
export async function generateTwoFactorToken(email: string) {
    const token = crypto.randomInt(100_000, 1_000_000).toString() //? random 6 digit number
    const expires = new Date(new Date().getTime() + 300 * 1000) //? 5 minutes (300 seconds * 1000 milliseconds = 5 minutes)
    // const expires = new Date(new Date().getTime() + 3600 * 1000) //? 1 hour (3600 seconds * 1000 milliseconds = 1 hour)

    const existingToken = await getTwoFactorTokenByEmail(email)

    if (existingToken) {
        await db.twoFactorToken.delete({
            where: { id: existingToken.id },
        })
    }

    const twoFactorToken = await db.twoFactorToken.create({
        data: { email, token, expires },
    })

    return twoFactorToken
}

/**
 *
 * @param email string
 * @returns passwordResetToken {email, token, expires}
 */
export async function generatePasswordResetToken(email: string) {
    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await getPasswordResetTokenByEmail(email)

    if (existingToken) {
        await db.passwordResetToken.delete({
            where: { id: existingToken.id },
        })
    }

    const passwordResetToken = await db.passwordResetToken.create({
        data: { email, token, expires },
    })

    return passwordResetToken
}

/**
 *
 * @param email string
 * @returns verificationTokens {id, email, token, expires}
 */
export async function generateVerificationToken(email: string) {
    const token = uuidv4()
    // new Date(new Date().getTime() + 3600 * 1000) will take the current time, convert it to milliseconds (menit -> milisecond), add 3600 seconds (1 hour), and then convert it back to a Date object.
    const expires = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await getVerificationTokenByEmail(email)

    if (existingToken) {
        await db.verificationToken.delete({
            where: { id: existingToken.id },
        })
    }

    const verificationToken = await db.verificationToken.create({
        data: { email, token, expires },
    })

    return verificationToken // { id: 1, email: '...', token: '...', expires: '...' }
}
