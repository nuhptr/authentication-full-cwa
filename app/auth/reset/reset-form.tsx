"use client"

import React, { useState, useTransition } from "react"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

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

import { ResetModel } from "@/model/auth-model"
import { reset } from "@/actions/reset"

export function ResetForm() {
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof ResetModel>>({
        resolver: zodResolver(ResetModel),
        defaultValues: {
            email: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof ResetModel>) => {
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
            backButtonHref="/auth/login">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            disabled={isPending}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="john.doe@example.com"
                                            type="email"
                                        />
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
