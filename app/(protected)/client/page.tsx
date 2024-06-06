import { UserInfo } from "@/components/UserInfo"

import { useCurrentUser } from "@/app/hooks/use-current-user"

export default async function ClientPage() {
   const user = useCurrentUser()

   return (
      <div>
         <UserInfo label="* Client Component" user={user} />
      </div>
   )
}
