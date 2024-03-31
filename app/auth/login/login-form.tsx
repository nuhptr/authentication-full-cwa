"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { useSearchParams } from "next/navigation"
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

import { LoginModel } from "@/model/auth-model"
import { login } from "@/actions/login"

export function LoginForm() {
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

    const onSubmit = async (values: z.infer<typeof LoginModel>) => {
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
                        setSuccess(data?.success) // NOTE: add when we add 2FA
                    }

                    if (data?.twoFactor) {
                        setShowTwoFactor(true)
                    }
                })
                .catch(() => {
                    setError("Something went wrong!")
                })
        })
    }

    return (
        <CardWrapper
            headerLabel="Welcome back"
            backButtonLabel="Don't have an account?"
            backButtonHref="/auth/register"
            showSocial>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        {showTwoFactor && (
                            <FormField
                                control={form.control}
                                name="code"
                                disabled={isPending}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="code">Two Factor Code</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="123456" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                        {!showTwoFactor && (
                            <>
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
                                <FormField
                                    control={form.control}
                                    name="password"
                                    disabled={isPending}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="password">Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="*******"
                                                    type="password"
                                                />
                                            </FormControl>
                                            {/* Forgot password button */}
                                            <Button
                                                size={"sm"}
                                                variant={"link"}
                                                asChild
                                                className="px-0 font-normal text-destructive">
                                                <Link href={"/auth/reset"}>Forgot password?</Link>
                                            </Button>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                    </div>
                    <FormError message={error || urlError} />
                    <FormSuccess message={success} />
                    <Button type="submit" className="w-full" disabled={isPending}>
                        {showTwoFactor ? "Confirm" : "Login"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
