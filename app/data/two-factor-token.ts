import { prismaDB } from "@/lib/database"

export const getTwoFactorTokenByToken = async (token: string) => {
   try {
      const twoFactorToken = await prismaDB.twoFactorToken.findUnique({ where: { token: token } })
      return twoFactorToken
   } catch (error) {
      console.error("Error in getTwoFactorTokenByToken: ", error)
      return null
   }
}

export const getTwoFactorTokenByEmail = async (email: string) => {
   try {
      const twoFactorToken = await prismaDB.twoFactorToken.findFirst({ where: { email: email } })
      return twoFactorToken
   } catch (error) {
      console.error("Error in getTwoFactorTokenByEmail: ", error)
      return null
   }
}
