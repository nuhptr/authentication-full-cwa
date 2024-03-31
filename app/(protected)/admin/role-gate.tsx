"use client"

import { UserRole } from "@prisma/client"

import { FormError } from "@/components/form-error"

import { useCurrentRole } from "@/hooks/use-current-role"

type RoleGateProps = {
    children: React.ReactNode
    allowedRoles: UserRole
}

export function RoleGate({ children, allowedRoles }: RoleGateProps) {
    const role = useCurrentRole()

    if (role !== allowedRoles) {
        return <FormError message="You do not have permission to view this content!" />
    }

    return <>{children}</>
}
