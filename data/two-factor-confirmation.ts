import { db } from "@/lib/database"

/**
 * Get two factor confirmation by userId
 * @param userId string
 * @returns twoFactorConfirmation {id, expires, userId}
 */
export async function getTwoFactorConfirmationByUserId(userId: string) {
    try {
        const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
            where: { userId },
        })

        return twoFactorConfirmation
    } catch (error) {
        return null
    }
}
