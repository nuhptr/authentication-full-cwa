import { prismaDB } from "@/lib/database"

export const getAccountByUserId = async (userId: string) => {
   try {
      const account = await prismaDB.account.findFirst({ where: { userId } })
      return account
   } catch (error) {
      console.error("Error in getAccountByUserId: ", error)
      return null
   }
}
