import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { SessionProvider } from "next-auth/react"

import { auth } from "@/auth"
import { Toaster } from "@/components/ui/sonner"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
   title: "Next Auth v5 | Completed Auth Next.js",
   description: "Learn how to add authentication to your Next.js app with Auth.js v5 beta",
   authors: { name: "Adi Nugraha Putra", url: "https://kaizen-official-website.vercel.app/" },
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
   const session = await auth()

   return (
      <SessionProvider session={session}>
         <html lang="en">
            <body className={inter.className}>
               {/* To enable toast in app */}
               <Toaster />
               {children}
            </body>
         </html>
      </SessionProvider>
   )
}
