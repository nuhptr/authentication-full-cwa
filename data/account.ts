import { db } from "@/lib/database"

/**
 * get account data by giving userId
 * @param userId string
 * @returns accounts data { id, type, refresh_token, access_token, expires_at, token_type,
 * scope, id_token, session_state, provider, providerAccountId, userId }
 */
export async function getAccountByUserId(userId: string) {
   try {
      const account = await db.account.findFirst({ where: { userId } })

      return account
   } catch (error) {
      return null
   }
}
