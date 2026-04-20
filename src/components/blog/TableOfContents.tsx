"use client"

import { useEffect, useState } from "react"
import { List } from "lucide-react"

type Heading = {
  id: string
  text: string
  level: number
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const article = document.getElementById("blog-article")
    if (!article) return

    const els = Array.from(article.querySelectorAll("h2, h3"))
    const items: Heading[] = els.map((el) => {
      // Auto-generate id if missing
      if (!el.id) {
        el.id = el.textContent
          ?.toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .trim() ?? Math.random().toString(36).slice(2)
      }
      return {
        id:    el.id,
        text:  el.textContent || "",
        level: parseInt(el.tagName[1]),
      }
    })
    setHeadings(items)
  }, [])

  // Highlight active heading on scroll
  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 0 }
    )

    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length < 2) return null

  return (
    <div className="rounded-2xl border border-rose-100 bg-white shadow-sm overflow-hidden">
      <div
        className="px-5 py-4 flex items-center gap-2 border-b border-rose-100"
        style={{ background: "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)" }}
      >
        <List className="w-3.5 h-3.5 text-white/80" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
          Table of Contents
        </span>
      </div>

      <nav className="px-5 py-4">
        <ol className="space-y-1">
          {headings.map((h) => (
            <li
              key={h.id}
              style={{ paddingLeft: h.level === 3 ? "1rem" : "0" }}
            >
              <a
                href={`#${h.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" })
                  setActiveId(h.id)
                }}
                className={`flex items-start gap-2 text-xs leading-snug py-1 transition-all group ${
                  activeId === h.id
                    ? "font-semibold"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
                style={activeId === h.id ? { color: "#b76e79" } : {}}
              >
                <span
                  className={`mt-1.5 shrink-0 rounded-full transition-all ${
                    h.level === 2 ? "w-1.5 h-1.5" : "w-1 h-1"
                  } ${
                    activeId === h.id ? "bg-rose-400" : "bg-zinc-300 group-hover:bg-zinc-400"
                  }`}
                />
                {h.text}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}
