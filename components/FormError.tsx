import { FC } from "react"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

type FormErrorType = {
   message?: string
}

export const FormError: FC<FormErrorType> = ({ message }) => {
   if (!message) return null

   return (
      <div className="flex items-center p-3 text-sm bg-destructive/15 rounded-md gap-x-2 text-destructive">
         <ExclamationTriangleIcon className="w-4 h-4" />
         <p>{message}</p>
      </div>
   )
}
