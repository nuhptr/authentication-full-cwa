import { db } from "@/lib/database"
import { logger } from "@/lib/logging"

//? This function is used to get a user by their email
export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({ where: { email } })

        return user
    } catch (error) {
        return logger.error(error)
    }
}

//? This function is used to get a user by their id
export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({ where: { id } })

        return user
    } catch (error) {
        logger.error(error)
    }
}
