"use client"

import { useCallback, useEffect, useState } from "react"
import { BeatLoader } from "react-spinners"
import { useSearchParams } from "next/navigation"

import { newVerification } from "@/actions/new-verification"
import { CardWrapper } from "@/components/auth"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"

export function NewVerificationForm() {
   const [error, setError] = useState<string | undefined>()
   const [success, setSuccess] = useState<string | undefined>()

   const searchParams = useSearchParams()

   const token = searchParams.get("token")

   const onSubmit = useCallback(() => {
      // If success or error, don't do anything
      if (success || error) return

      if (!token) {
         setError("Missing token!")
         return
      }

      // console.log(token)
      newVerification(token)
         .then((data) => {
            setSuccess(data.success)
            setError(data.error)
         })
         .catch(() => {
            setError("Something went wrong!")
         })
   }, [error, success, token])

   useEffect(() => {
      onSubmit()
   }, [onSubmit])

   return (
      <CardWrapper
         headerLabel="Confirming your verification"
         backButtonLabel="Back to login"
         backButtonHref="/auth/login">
         <div className="flex items-center justify-center w-full">
            {!success && !error && <BeatLoader />}
            <FormSuccess message={success} />
            {!success && <FormError message={error} />}
         </div>
      </CardWrapper>
   )
}
