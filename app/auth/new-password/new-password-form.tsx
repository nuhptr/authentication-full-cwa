"use client"

import React, { useState, useTransition } from "react"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { CardWrapper } from "@/components/auth"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"

import { NewPasswordModel } from "@/model/auth-model"
import { newPassword } from "@/actions/new-password"

export function NewPasswordForm() {
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof NewPasswordModel>>({
        resolver: zodResolver(NewPasswordModel),
        defaultValues: { password: "" },
    })

    const onSubmit = async (values: z.infer<typeof NewPasswordModel>) => {
        setError("")
        setSuccess("")

        startTransition(() => {
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
            headerLabel="Enter a new password"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            disabled={isPending}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="password">Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="*******" type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
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
