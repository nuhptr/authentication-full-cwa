import React from "react"
import { CheckCircledIcon } from "@radix-ui/react-icons"

interface FormErrorProps {
   message?: string
}

export function FormSuccess({ message }: FormErrorProps) {
   if (!message) return null

   return (
      <div className="flex items-center p-3 text-sm bg-emerald-500/15 rounded-md gap-x-2 text-emerald-500">
         <CheckCircledIcon className="w-4 h-4" />
         <p className="">{message}</p>
      </div>
   )
}
