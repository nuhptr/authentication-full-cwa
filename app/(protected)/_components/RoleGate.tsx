"use client"

import { UserRole } from "@prisma/client"

import { useCurrentRole } from "@/app/hooks/use-current-role"

import { FormError } from "@/components/FormError"
import { FC } from "react"

type RoleGateType = {
   children: React.ReactNode
   allowedRole: UserRole
}

export const RoleGate: FC<RoleGateType> = ({ children, allowedRole }) => {
   const role = useCurrentRole()

   if (role !== allowedRole) return <FormError message="You don't have permission to view!" />

   return <>{children}</>
}
