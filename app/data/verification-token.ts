import { prismaDB } from "@/lib/database"

export const getVerificationTokenByToken = async (token: string) => {
   try {
      const verificationToken = await prismaDB.verificationToken.findUnique({ where: { token } })
      return verificationToken
   } catch (error) {
      console.error("Error in getVerificationTokenByToken: ", error)
      return null
   }
}

export const getVerificationTokenByEmail = async (email: string) => {
   try {
      const verificationToken = await prismaDB.verificationToken.findFirst({ where: { email } })
      return verificationToken
   } catch (error) {
      console.error("Error in getVerificationTokenByEmail: ", error)
      return null
   }
}
