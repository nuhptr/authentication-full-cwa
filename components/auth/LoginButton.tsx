"use client"

import React, { FC } from "react"
import { useRouter } from "next/navigation"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { LoginForm } from "@/components/form/LoginForm"

type LoginButtonType = {
   children: React.ReactNode
   mode?: "modal" | "redirect"
   asChild?: boolean
}

export const LoginButton: FC<LoginButtonType> = ({ children, mode = "redirect", asChild }) => {
   const router = useRouter()

   function handleOnClick() {
      router.push("/auth/login")
   }

   if (mode === "modal") {
      return (
         <Dialog>
            <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
            <DialogContent className="p-0 w-auto bg-transparent border-none">
               <LoginForm />
            </DialogContent>
         </Dialog>
      )
   }

   return (
      <span className="cursor-pointer" onClick={handleOnClick}>
         {children}
      </span>
   )
}
