// components/admin/AdminLayoutClient.tsx
"use client"

import { usePathname } from "next/navigation"
import AdminSidebar from "./AdminSidebar"

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/admin/login"

  if (isLoginPage) {
    return (
      <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #fff 0%, #fdf0ef 100%)" }}>
        {children}
      </div>
    )
  }

  return (
    <div className="min-h-screen flex" style={{ background: "linear-gradient(180deg, #fff 0%, #fdf0ef 100%)" }}>
      <AdminSidebar />
      <div className="flex-1 ml-64 min-h-screen">
        {children}
      </div>
    </div>
  )
}
