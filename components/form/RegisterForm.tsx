"use client"

import * as z from "zod"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { RegisterModel } from "@/app/model/auth-model"
import { register } from "@/app/actions/register"

import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { CardWrapper } from "@/components/auth/CardWrapper"
import { FormSuccess } from "@/components/FormSuccess"
import { FormError } from "@/components/FormError"
import { FormFields } from "@/components/form/Form"

export const RegisterForm = () => {
   const [error, setError] = useState<string | undefined>("")
   const [success, setSuccess] = useState<string | undefined>("")
   const [isPending, startTransition] = useTransition()

   const form = useForm<z.infer<typeof RegisterModel>>({
      resolver: zodResolver(RegisterModel),
      defaultValues: { name: "", email: "", password: "" },
   })

   function handleOnSubmit(values: z.infer<typeof RegisterModel>) {
      setError("")
      setSuccess("")

      startTransition(() => {
         register(values).then((data) => {
            if (data?.error) {
               form.reset()
               setError(data.error)
            }

            if (data?.success) {
               form.reset()
               setSuccess(data.success)
            }
         })
      })
   }

   return (
      <CardWrapper
         headerLabel="Create an account"
         backButtonLabel="Already have an account?"
         backButtonHref="/auth/login"
         showSocial
      >
         <Form {...form}>
            <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-6">
               <div className="space-y-4">
                  <FormFields
                     control={form.control}
                     name="name"
                     disabled={isPending}
                     title="Name"
                     placeholder="Jhon Doe"
                  />
                  <FormFields
                     control={form.control}
                     name="email"
                     disabled={isPending}
                     title="Email"
                     placeholder="jhondoe@example.com"
                     type="email"
                  />
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
               <Button type="submit" className="w-full" disabled={isPending}>
                  Create an account
               </Button>
            </form>
         </Form>
      </CardWrapper>
   )
}
