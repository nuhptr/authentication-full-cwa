import { prismaDB } from "@/lib/database"

export const getUserByEmail = async (email: string) => {
   try {
      const user = await prismaDB.user.findUnique({ where: { email } })
      return user
   } catch (error) {
      console.error("Error in getUserByEmail: ", error)
      return null
   }
}

export const getUserById = async (id: string) => {
   try {
      const user = await prismaDB.user.findUnique({ where: { id } })
      return user
   } catch (error) {
      console.error("Error in getUserById: ", error)
      return null
   }
}
