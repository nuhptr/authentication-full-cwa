import { db } from "@/lib/database"

/**
 * Action to get user data using email registered
 * @param email string
 * @returns user
 */
export async function getUserByEmail(email: string) {
    try {
        const user = await db.user.findUnique({ where: { email } })

        return user
    } catch (error) {
        return null
    }
}

/**
 * Action to get user data by using id
 * @param id string
 * @returns user
 */
export async function getUserById(id: string) {
    try {
        const user = await db.user.findUnique({ where: { id } })

        return user
    } catch (error) {
        return null
    }
}
