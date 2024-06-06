import React from "react"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

import { CardWrapper } from "@/components/auth/CardWrapper"

export const ErrorCard = () => {
   return (
      <CardWrapper
         headerLabel="Oops! Something went wrong"
         backButtonHref="/auth/login"
         backButtonLabel="Back to login"
      >
         <div className="flex items-center justify-center w-full">
            <ExclamationTriangleIcon className="text-destructive" />
         </div>
      </CardWrapper>
   )
}
