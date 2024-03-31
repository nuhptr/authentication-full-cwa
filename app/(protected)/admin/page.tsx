// "use client"
// make it server component
import { UserRole } from "@prisma/client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { FormSuccess } from "@/components/form-success"
import { RoleGate } from "@/app/(protected)/admin/role-gate"
import { toast } from "sonner"
import { admin } from "@/actions/admin"

export default function AdminPage() {
    function onServerActionClick() {
        admin().then((response) => {
            if (response.error) toast.error(response.error)
            if (response.success) toast.success(response.success)
        })
    }

    function onApiRouteClick() {
        fetch("/api/admin").then((response) => {
            if (response.ok) {
                toast.success("Allowed API Route!")
            } else {
                toast.error("Not allowed to access API Route!")
            }
        })
    }

    return (
        <Card className="w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold">● Admin</p>
            </CardHeader>
            <CardContent className="space-y-4">
                <RoleGate allowedRoles={UserRole.ADMIN}>
                    <FormSuccess message="You are allowed to see this content" />
                </RoleGate>

                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">Admin-Only API Route</p>
                    <Button onClick={onApiRouteClick}>Click to test</Button>
                </div>

                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">Admin-Only Server Action</p>
                    <Button onClick={onServerActionClick}>Click to test</Button>
                </div>
            </CardContent>
        </Card>
    )
}
