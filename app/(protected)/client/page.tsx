import { UserInfo } from "@/components/user-info"

import { useCurrentUser } from "@/hooks/use-current-user"

export default async function ClientPage() {
   const user = useCurrentUser()

   return (
      <div>
         <UserInfo label="✨ Client Component" user={user} />
      </div>
   )
}
