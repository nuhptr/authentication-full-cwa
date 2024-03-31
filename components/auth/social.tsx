"use client"

import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

export function Social() {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl")

    function onClick(provider: "google" | "github") {
        signIn(provider, {
            callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
        })
    }

    return (
        <div className="flex items-center w-full gap-x-2">
            {/* Google button */}
            <Button
                size={"lg"}
                className="w-full"
                variant={"outline"}
                onClick={() => onClick("google")}>
                <FcGoogle className="w-5 h-5" />
            </Button>
            {/* Github Button */}
            <Button
                size={"lg"}
                className="w-full"
                variant={"outline"}
                onClick={() => onClick("github")}>
                <FaGithub className="w-5 h-5" />
            </Button>
        </div>
    )
}
