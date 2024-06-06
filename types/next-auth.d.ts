import { UserRole } from "@prisma/client"
import { type DefaultSession } from "next-auth"

declare module "next-auth" {
   interface Session {
      user: ExtendedUser
   }
}

/**
 * Extending the default session to include the user role
 */
export type ExtendedUser = DefaultSession["user"] & {
   role: UserRole
   isTwoFactorEnabled: boolean
   isOAuth: boolean
}
