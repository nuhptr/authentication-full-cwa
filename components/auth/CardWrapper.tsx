"use client"

import { FC } from "react"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Header } from "@/components/auth/Header"
import { Social } from "@/components/auth/Social"
import { BackButton } from "@/components/auth/BackButton"

type CardWrapperType = {
   children: React.ReactNode
   headerLabel: string
   backButtonLabel: string
   backButtonHref: string
   showSocial?: boolean
}

export const CardWrapper: FC<CardWrapperType> = ({
   children,
   headerLabel,
   backButtonLabel,
   backButtonHref,
   showSocial,
}) => {
   return (
      <Card className="w-[400px] shadow-md">
         <CardHeader>
            <Header label={headerLabel} />
         </CardHeader>
         <CardContent>{children}</CardContent>
         {/* Show social card if exist */}
         {showSocial && (
            <CardFooter>
               <Social />
            </CardFooter>
         )}
         <CardFooter>
            <BackButton href={backButtonHref} label={backButtonLabel} />
         </CardFooter>
      </Card>
   )
}
