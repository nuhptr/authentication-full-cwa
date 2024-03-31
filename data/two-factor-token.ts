import { db } from "@/lib/database"

/**
 * Get two factor token by using token
 * @param token string
 * @returns twoFactorToken { id:, email, token, expires }
 */
export async function getTwoFactorTokenByToken(token: string) {
    try {
        const twoFactorToken = await db.twoFactorToken.findUnique({
            where: { token: token },
        })

        return twoFactorToken
    } catch (error) {
        return null
    }
}

/**
 * Get two factor token by using email
 * @param email string
 * @returns twoFactorToken { id:, email, token, expires }
 */
export async function getTwoFactorTokenByEmail(email: string) {
    try {
        const twoFactorToken = await db.twoFactorToken.findFirst({
            where: { email: email },
        })

        return twoFactorToken
    } catch (error) {
        return null
    }
}
