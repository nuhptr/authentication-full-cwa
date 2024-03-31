import React from "react"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

type FormErrorProps = {
    message?: string
}

export function FormError({ message }: FormErrorProps) {
    if (!message) return null

    return (
        <div className="flex items-center p-3 text-sm bg-destructive/15 rounded-md gap-x-2 text-destructive">
            <ExclamationTriangleIcon className="w-4 h-4" />
            <p className="">{message}</p>
        </div>
    )
}
