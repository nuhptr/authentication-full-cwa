export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center justify-center h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-400 to-green-800">
            {children}
        </div>
    )
}
