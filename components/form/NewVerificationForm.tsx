"use client"

import { useCallback, useEffect, useState } from "react"
import { BeatLoader } from "react-spinners"
import { useSearchParams } from "next/navigation"

import { newVerification } from "@/app/actions/new-verification"
import { CardWrapper } from "@/components/auth/CardWrapper"
import { FormError } from "@/components/FormError"
import { FormSuccess } from "@/components/FormSuccess"

export const NewVerificationForm = () => {
   const [error, setError] = useState<string | undefined>()
   const [success, setSuccess] = useState<string | undefined>()

   const searchParams = useSearchParams()
   const token = searchParams.get("token")

   const handleOnSubmit = useCallback(() => {
      if (success || error) return

      if (!token) {
         setError("Missing token")
         return
      }

      newVerification(token)
         .then((data) => {
            setSuccess(data.success)
            setError(data.error)
         })
         .catch(() => {
            setError("Error while sending new verification email")
         })
   }, [error, success, token])

   useEffect(() => {
      handleOnSubmit()
   }, [handleOnSubmit])

   return (
      <CardWrapper
         headerLabel="Confirming your verification"
         backButtonLabel="Back to login"
         backButtonHref="/auth/login"
      >
         <div className="flex items-center justify-center w-full">
            {!success && !error && <BeatLoader />}
            {!success && <FormError message={error} />}
            <FormSuccess message={success} />
         </div>
      </CardWrapper>
   )
}
