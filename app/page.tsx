import { Poppins } from "next/font/google"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { LoginButton } from "@/components/auth"

const font = Poppins({ subsets: ["latin"], weight: ["600"] })
const headerClass = "text-6xl font-semibold text-white drop-shadow-md"

const mainClass =
    "flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-400 to-green-800"

export default function Home() {
    return (
        <main className={mainClass}>
            <div className="text-center space-y-6">
                <h1 className={cn(headerClass, font.className)}>🔐 Auth</h1>
                <p className="text-white">A simple authentication</p>

                <div>
                    <LoginButton asChild>
                        <Button variant="secondary" size="lg">
                            Sign in
                        </Button>
                    </LoginButton>
                </div>
            </div>
        </main>
    )
}
