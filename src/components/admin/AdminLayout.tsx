import AdminSidebar from "./AdminSidebar"

export default function AdminLayout({ children, title, subtitle }: {
  children: React.ReactNode
  title?: string
  subtitle?: string
}) {
  return (
    <div className="min-h-screen flex" style={{ background: "linear-gradient(180deg, #fff 0%, #fdf0ef 100%)" }}>
      <AdminSidebar />
      <main className="flex-1 ml-64 min-h-screen">
        {(title || subtitle) && (
          <div className="px-8 pt-10 pb-6 border-b border-rose-100 bg-white/60">
            {title && <h1 className="text-2xl font-bold text-zinc-900">{title}</h1>}
            {subtitle && <p className="text-zinc-500 text-sm mt-1">{subtitle}</p>}
          </div>
        )}
        <div className="px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
