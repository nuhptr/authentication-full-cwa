"use client"

import { logout } from "@/actions/logout"

type LogoutButtonProps = {
    children?: React.ReactNode
}

export function LogoutButton({ children }: LogoutButtonProps) {
    function onClick() {
        logout()
    }

    return (
        <span className="cursor-pointer" onClick={onClick}>
            {children}
        </span>
    )
}
