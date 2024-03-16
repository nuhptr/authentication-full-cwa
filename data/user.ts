import { db } from "@/lib/database"

//? This function is used to get a user by their email
export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({ where: { email } })

        return user
    } catch (error) {
        return null
    }
}

//? This function is used to get a user by their id
export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({ where: { id } })

        return user
    } catch (error) {
        return null
    }
}
