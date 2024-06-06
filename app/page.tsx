import { Poppins } from "next/font/google"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { LoginButton } from "@/components/auth/LoginButton"

const font = Poppins({ subsets: ["latin"], weight: ["600"] })
const headerClass = "text-6xl font-semibold text-white drop-shadow-md"

export default function HomePage() {
   return (
      <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-400 to-green-800">
         <div className="text-center space-y-6">
            <h1 className={cn(headerClass, font.className)}>Next Auth V5 Completed</h1>
            <p className="text-white">A completed authentication using auth.js v5</p>

            <div className="">
               <LoginButton asChild>
                  <Button variant={"secondary"} size={"lg"}>
                     Sign in
                  </Button>
               </LoginButton>
            </div>
         </div>
      </main>
   )
}
