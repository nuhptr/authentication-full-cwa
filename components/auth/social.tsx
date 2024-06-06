"use client"

import { useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"

import { Button } from "@/components/ui/button"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

export const Social = () => {
   const searchParams = useSearchParams()
   const callbackUrl = searchParams.get("callbackUrl")

   function handleOnClick(provider: "google" | "github") {
      signIn(provider, { callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT })
   }

   return (
      <div className="flex items-center w-full gap-x-2">
         {/* Google */}
         <Button
            size="lg"
            className="w-full"
            variant="outline"
            onClick={() => handleOnClick("google")}
         >
            <FcGoogle className="w-5 h-5" />
         </Button>
         {/* Github */}
         <Button
            size="lg"
            className="w-full"
            variant="outline"
            onClick={() => handleOnClick("github")}
         >
            <FaGithub className="w-5 h-5" />
         </Button>
      </div>
   )
}
