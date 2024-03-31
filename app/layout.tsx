import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { SessionProvider } from "next-auth/react"

import { auth } from "@/auth"
import { Toaster } from "@/components/ui/sonner"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Complete Auth | Code With Antonio",
    description: "Learn how to add authentication to your Next.js app with this complete guide.",
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const session = await auth()

    return (
        //? The `SessionProvider` is a wrapper that provides a session to all components in tree
        <SessionProvider session={session}>
            <html lang="en">
                <body className={inter.className}>
                    {/* to enable toast in app */}
                    <Toaster />
                    {children}
                </body>
            </html>
        </SessionProvider>
    )
}
