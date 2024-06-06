import { auth } from "@/auth"

// For server side rendering
export const currentUser = async () => {
   const session = await auth()
   return session?.user
}

// For server side rendering
export const currentRole = async () => {
   const session = await auth()
   return session?.user?.role
}
