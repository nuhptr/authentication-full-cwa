"use client"

import { useRouter } from "next/navigation"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

import { LoginForm } from "@/app/auth/login/login-form"

interface LoginButtonProps {
   children: React.ReactNode
   mode?: "modal" | "redirect"
   asChild?: boolean
}

export function LoginButton({ children, asChild, mode = "redirect" }: LoginButtonProps) {
   const router = useRouter()

   const onClick = () => {
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
      <span className="cursor-pointer" onClick={onClick}>
         {children}
      </span>
   )
}
