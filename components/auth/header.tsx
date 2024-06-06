import React, { FC } from "react"
import { Poppins } from "next/font/google"

import { cn } from "@/lib/utils"

const font = Poppins({ subsets: ["latin"], weight: ["600"] })

type HeaderType = {
   label: string
}

export const Header: FC<HeaderType> = ({ label }) => {
   return (
      <div className="flex flex-col items-center justify-center w-full gap-y-4">
         <h1 className={cn("text-3xl font-semibold", font.className)}>Auth v5 Completed</h1>
         <p className="text-sm text-muted-foreground">{label}</p>
      </div>
   )
}
