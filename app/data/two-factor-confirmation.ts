import { prismaDB } from "@/lib/database"

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
   try {
      const twoFactorConfirmation = await prismaDB.twoFactorConfirmation.findUnique({
         where: { userId },
      })
      return twoFactorConfirmation
   } catch (error) {
      console.error("Error in getTwoFactorConfirmationByUserId: ", error)
      return null
   }
}
