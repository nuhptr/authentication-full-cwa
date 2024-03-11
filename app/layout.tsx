import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
   title: "Complete Auth | Code With Antonio",
   description: "Learn how to add authentication to your Next.js app with this complete guide.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
   return (
      <html lang="en">
         <body className={inter.className} suppressHydrationWarning={true}>
            {children}
         </body>
      </html>
   )
}
