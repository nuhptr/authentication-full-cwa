"use client"

import { FC } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

type BackButtonTypes = {
   href: string
   label: string
}

export const BackButton: FC<BackButtonTypes> = ({ href, label }) => {
   return (
      <Button variant="link" className="w-full font-normal" size="sm" asChild>
         <Link href={href}>{label}</Link>
      </Button>
   )
}
