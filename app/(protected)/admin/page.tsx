// server page by default

import { UserRole } from "@prisma/client"
import { toast } from "sonner"

import { admin } from "@/app/actions/admin"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { FormSuccess } from "@/components/FormSuccess"
import { RoleGate } from "../_components/RoleGate"

export default function AdminPage() {
   const onServerActionClick = () => {
      admin().then((response) => {
         if (response.error) toast.error(response.error)
         if (response.success) toast.success("Admin action successful!")
      })
   }

   const onApiRouteClick = () => {
      fetch("/api/admin").then((response) => {
         if (response.ok) return toast.success("Allowed API route.")
         return toast.error("Not allowed to access API route.")
      })
   }

   return (
      <Card className="w-[600px]">
         <CardHeader>
            <p className="text-2xl font-semibold">** Admin</p>
         </CardHeader>
         <CardContent className="space-y-4">
            <RoleGate allowedRole={UserRole.ADMIN}>
               <FormSuccess message="You have admin access!" />
            </RoleGate>

            <div className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-md">
               <p className="text-sm font-medium">Admin Only API Route</p>
               <Button onClick={onApiRouteClick}>Click to test</Button>
            </div>

            <div className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-md">
               <p className="text-sm font-medium">Admin-only api action</p>
               <Button onClick={onServerActionClick}>Click to test</Button>
            </div>
         </CardContent>
      </Card>
   )
}
