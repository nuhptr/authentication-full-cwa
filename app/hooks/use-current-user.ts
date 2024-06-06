import { useSession } from "next-auth/react"

// For client side rendering
export const useCurrentUser = () => {
   const session = useSession()

   return session.data?.user
}
