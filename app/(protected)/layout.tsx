import { Navbar } from "@/app/(protected)/_components/navbar"

type Props = {
   children: React.ReactNode
}

export default function ProtectedLayout({ children }: Props) {
   return (
      <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-400 to-green-800">
         <Navbar />
         {children}
      </div>
   )
}
