"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, FileText, FilePlus, ExternalLink, LogOut, Car, Tag, } from "lucide-react"

const roseGoldGradient = "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)"

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "All Posts", href: "/admin/posts", icon: FileText },
  { label: "New Post", href: "/admin/new", icon: FilePlus },
  { label: "Blog Manager", href: "/admin/blogs", icon: FilePlus },
  { label: "Fleet",      href: "/admin/fleet",      icon: Car  },
{ label: "Categories", href: "/admin/categories",  icon: Tag  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
  }

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-white border-r border-rose-100 flex flex-col z-40 shadow-sm">

      {/* Logo */}
      <div className="px-6 py-5 border-b border-rose-100">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md"
            style={{ background: roseGoldGradient }}
          >
            <span className="text-white font-bold text-sm">CD</span>
          </div>
          <div>
            <p className="text-zinc-900 font-bold text-sm leading-none">Chauffeur Dubai</p>
            <p className="text-xs mt-0.5 font-medium" style={{ color: "#b76e79" }}>
              Admin Panel
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        <p className="text-[10px] uppercase tracking-widest text-zinc-400 px-3 mb-3 font-semibold">
          Content
        </p>

        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive =
            href === "/admin" ? pathname === "/admin" : pathname.startsWith(href)

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium group ${
                isActive
                  ? "text-white shadow-md"
                  : "text-zinc-500 hover:text-zinc-900 hover:bg-rose-50"
              }`}
              style={isActive ? { background: roseGoldGradient } : {}}
            >
              <Icon
                size={17}
                className={isActive ? "text-white" : "text-zinc-400 group-hover:text-rose-400 transition-colors"}
              />
              {label}
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />
              )}
            </Link>
          )
        })}

        <div className="pt-4">
          <p className="text-[10px] uppercase tracking-widest text-zinc-400 px-3 mb-3 font-semibold">
            Site
          </p>
          <a
            href="/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-500 hover:text-zinc-900 hover:bg-rose-50 transition-all text-sm font-medium group"
          >
            <ExternalLink size={17} className="text-zinc-400 group-hover:text-rose-400 transition-colors" />
            View Blog
            <ExternalLink size={11} className="ml-auto opacity-30" />
          </a>
        </div>
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-rose-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-500 hover:text-red-500 hover:bg-red-50 transition-all w-full text-sm font-medium group"
        >
          <LogOut size={17} className="text-zinc-400 group-hover:text-red-400 transition-colors" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
