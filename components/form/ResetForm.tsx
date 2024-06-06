"use client"

import * as z from "zod"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { ResetModel } from "@/app/model/auth-model"
import { reset } from "@/app/actions/reset"

import { Form } from "../ui/form"
import { Button } from "../ui/button"
import { CardWrapper } from "../auth/CardWrapper"
import { FormError } from "../FormError"
import { FormSuccess } from "../FormSuccess"
import { FormFields } from "./Form"

export const ResetForm = () => {
   const [error, setError] = useState<string | undefined>("")
   const [success, setSuccess] = useState<string | undefined>("")
   const [isPending, startTransition] = useTransition()

   const form = useForm<z.infer<typeof ResetModel>>({
      resolver: zodResolver(ResetModel),
      defaultValues: { email: "" },
   })

   async function handleOnSubmit(values: z.infer<typeof ResetModel>) {
      setError("")
      setSuccess("")

      startTransition(() => {
         reset(values).then((data) => {
            setError(data?.error)
            setSuccess(data?.success)
         })
      })

      form.reset()
   }

   return (
      <CardWrapper
         headerLabel="Forgot your password?"
         backButtonLabel="Back to login"
         backButtonHref="/auth/login"
      >
         <Form {...form}>
            <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-6">
               <div className="space-y-4">
                  <FormFields
                     control={form.control}
                     name="email"
                     disabled={isPending}
                     title="Email"
                     placeholder="jhondoe@example.com"
                     type="email"
                  />
               </div>

               <FormError message={error} />
               <FormSuccess message={success} />
               <Button type="submit" className="w-full" disabled={isPending}>
                  Send reset email
               </Button>
            </form>
         </Form>
      </CardWrapper>
   )
}
