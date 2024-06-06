"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useState, useTransition } from "react"
import { useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"

import { LoginModel } from "@/app/model/auth-model"
import { login } from "@/app/actions/login"

import { Button } from "@/components/ui/button"
import { CardWrapper } from "@/components/auth/CardWrapper"
import { FormError } from "@/components/FormError"
import { FormSuccess } from "@/components/FormSuccess"
import { Form } from "@/components/ui/form"
import { FormFields } from "@/components/form/Form"

export const LoginForm = () => {
   const searchParams = useSearchParams()
   const callbackUrl = searchParams.get("callbackUrl")

   const urlError =
      searchParams.get("error") === "OAuthAccountNotLinked"
         ? "Email already in use with different provider"
         : ""

   const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false)
   const [error, setError] = useState<string | undefined>("")
   const [success, setSuccess] = useState<string | undefined>("")

   const [isPending, startTransition] = useTransition()

   const form = useForm<z.infer<typeof LoginModel>>({
      resolver: zodResolver(LoginModel),
      defaultValues: { email: "", password: "" },
   })

   async function handleOnSubmit(values: z.infer<typeof LoginModel>) {
      setError("")
      setSuccess("")

      startTransition(() => {
         login(values, callbackUrl)
            .then((data) => {
               if (data?.error) {
                  form.reset()
                  setError(data?.error)
               }

               if (data?.success) {
                  form.reset()
                  setSuccess(data?.success)
               }

               if (data?.twoFactor) {
                  setShowTwoFactor(true)
               }
            })
            .catch((error) => {
               setError(`Login failed. Please try again: ${error}`)
            })
      })
   }

   return (
      <CardWrapper
         headerLabel="Welcome back"
         backButtonLabel="Don't have an account?"
         backButtonHref="/auth/register"
         showSocial
      >
         <Form {...form}>
            <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-6">
               <div className="space-y-4">
                  {/* If showTwoFactor true then show input code field */}
                  {showTwoFactor && (
                     <FormFields
                        control={form.control}
                        name="code"
                        disabled={isPending}
                        title="Two Factor Code"
                        placeholder="123456"
                     />
                  )}

                  {/* Not have TwoFactor */}
                  {!showTwoFactor && (
                     <>
                        <FormFields
                           control={form.control}
                           name="email"
                           disabled={isPending}
                           title="Email"
                           placeholder="jhon.doe@example.com"
                           type="email"
                        />
                        <FormFields
                           control={form.control}
                           name="password"
                           disabled={isPending}
                           title="Password"
                           placeholder="********"
                           type="password"
                           button
                        />
                     </>
                  )}
               </div>
            </form>
         </Form>

         <FormError message={error || urlError} />
         <FormSuccess message={success} />
         <Button type="submit" className="w-full" disabled={isPending}>
            {showTwoFactor ? "Verify Code" : "Login"}
         </Button>
      </CardWrapper>
   )
}
