import { Navbar } from "./_components/navbar"

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
   return (
      <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500 to-blue-500">
         <Navbar />
         {children}
      </div>
   )
}
