import { FC } from "react"

import { ExtendedUser } from "@/types/next-auth"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type UserInfoType = {
   user?: ExtendedUser
   label: string
}

export const UserInfo: FC<UserInfoType> = ({ user, label }) => {
   return (
      <Card className="w-[600px] shadow-md">
         <CardHeader>
            <p className="text-2xl font-semibold text-center">{label}</p>
         </CardHeader>
         <CardContent>
            <div className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm">
               <p className="text-sm font-medium">ID</p>
               <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                  {user?.id}
               </p>
            </div>
            <div className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm">
               <p className="text-sm font-medium">Name</p>
               <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                  {user?.name}
               </p>
            </div>
            <div className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm">
               <p className="text-sm font-medium">Email</p>
               <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                  {user?.email}
               </p>
            </div>
            <div className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm">
               <p className="text-sm font-medium">Role</p>
               <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                  {user?.role}
               </p>
            </div>
            <div className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm">
               <p className="text-sm font-medium">Two Factor Authentication</p>
               <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
                  {user?.isTwoFactorEnabled ? "Enabled" : "Disabled"}
               </Badge>
            </div>
         </CardContent>
      </Card>
   )
}
