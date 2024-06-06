import { UserInfo } from "@/components/UserInfo"

import { currentUser } from "@/lib/auth"

export default async function ClientPage() {
   const user = await currentUser()

   return (
      <div>
         <UserInfo label="* Server Component" user={user} />
      </div>
   )
}
