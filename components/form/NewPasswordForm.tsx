"use client"

import React, { useState, useTransition } from "react"
import { useSearchParams } from "next/navigation"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { newPassword } from "@/app/actions/new-password"
import { NewPasswordModel } from "@/app/model/auth-model"

import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { FormFields } from "@/components/form/Form"
import { CardWrapper } from "@/components/auth/CardWrapper"
import { FormError } from "@/components/FormError"
import { FormSuccess } from "@/components/FormSuccess"

export const NewPasswordForm = () => {
   const searchParams = useSearchParams()
   const token = searchParams.get("token")

   const [error, setError] = useState("")
   const [success, setSuccess] = useState("")
   const [isPending, startTransation] = useTransition()

   const form = useForm<z.infer<typeof NewPasswordModel>>({
      resolver: zodResolver(NewPasswordModel),
      defaultValues: { password: "" },
   })

   async function handleOnSubmit(values: z.infer<typeof NewPasswordModel>) {
      setError("")
      setSuccess("")

      startTransation(() => {
         newPassword(values, token).then((data) => {
            if (data?.error) {
               form.reset()
               setError(data?.error)
            }

            if (data?.success) {
               form.reset()
               setSuccess(data?.success)
            }
         })
      })
   }

   return (
      <CardWrapper
         headerLabel="Enter a new password."
         backButtonLabel="Back to login"
         backButtonHref="/auth/login"
      >
         <Form {...form}>
            <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-6">
               <div className="space-y-4">
                  <FormFields
                     control={form.control}
                     name="password"
                     disabled={isPending}
                     title="Password"
                     placeholder="*******"
                     type="password"
                  />
               </div>

               <FormError message={error} />
               <FormSuccess message={success} />
               <Button type="submit" disabled={isPending} className="w-full">
                  Send reset email
               </Button>
            </form>
         </Form>
      </CardWrapper>
   )
}
