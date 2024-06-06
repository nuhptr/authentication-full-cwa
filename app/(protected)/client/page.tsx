"use client"

import { useCurrentUser } from "@/app/hooks/use-current-user"
import { UserInfo } from "@/components/user-info"

export default function ClientPage() {
   const user = useCurrentUser()

   return <UserInfo label="💻 Client component" user={user} />
}
