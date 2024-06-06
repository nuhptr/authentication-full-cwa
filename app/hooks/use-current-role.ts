import { useSession } from "next-auth/react" // manual import

// For client side rendering
export const useCurrentRole = () => {
   const session = useSession()

   return session.data?.user?.role
}
