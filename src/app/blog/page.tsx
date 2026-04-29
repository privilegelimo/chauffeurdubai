// app/blog/page.tsx
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Calendar, Clock } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | Luxury Travel Guides & Chauffeur Tips — Chauffeur Dubai",
  description:
    "Expert guides on luxury chauffeur services, airport transfers, corporate travel, and premium car hire across Dubai, Abu Dhabi, and the UAE.",
  alternates: { canonical: "https://www.chauffeurdubai.ae/blog" },
}

export const dynamic = "force-dynamic"
export const revalidate = 0

const roseGold = "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)"

const categoryColors: Record<string, string> = {
  "Travel Tips":       "bg-rose-50   text-rose-700   border-rose-100",
  "Dubai Guide":       "bg-amber-50  text-amber-700  border-amber-100",
  "Airport Transfers": "bg-blue-50   text-blue-700   border-blue-100",
  "Corporate Travel":  "bg-purple-50 text-purple-700 border-purple-100",
  "Luxury Vehicles":   "bg-zinc-50   text-zinc-700   border-zinc-200",
  "Events":            "bg-green-50  text-green-700  border-green-100",
  "News":              "bg-orange-50 text-orange-700 border-orange-100",
  "General":           "bg-zinc-50   text-zinc-500   border-zinc-200",
}

// ── Type ────────────────────────────────────────────────────────────────────
type Post = {
  id: string
  slug: string
  title: string
  meta_desc: string
  excerpt: string
  cover_image: string
  cover_alt: string
  category: string
  tags: string[]
  published_at: string
  reading_time: string
}

// ── Reading time helper (calculates from content if not stored) ──────────────
function calcReadingTime(content: string): string {
  const words = content?.trim().split(/\s+/).length ?? 0
  const mins  = Math.max(1, Math.round(words / 200))
  return `${mins} min read`
}

export default async function BlogPage() {
  const supabase = await createClient()

  const { data } = await supabase
    .from("blogs")
    .select("id, slug, title, meta_desc, excerpt, cover_image, cover_alt, category, tags, published_at, content")
    .eq("published", true)
    .order("published_at", { ascending: false })

  const posts: Post[] = (data ?? []).map((p) => ({
    ...p,
    reading_time: calcReadingTime(p.content ?? ""),
  }))

  const featured = posts[0]
  const rest     = posts.slice(1)

  return (
    <div className="w-full bg-white overflow-x-hidden">

      {/* HERO */}
      <section className="pt-28 pb-16 px-5 md:px-12 lg:px-20 border-b border-rose-100">
        <div className="max-w-6xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.3em] font-semibold mb-4" style={{ color: "#b76e79" }}>
            Our Blog
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight max-w-xl leading-tight">
              Luxury Travel Guides & Tips
            </h1>
            <p className="text-zinc-500 text-sm font-light max-w-sm leading-relaxed">
              Expert insights on chauffeur services, travel guides, and premium
              experiences across Dubai, Abu Dhabi, and the UAE.
            </p>
          </div>
        </div>
      </section>

      {posts.length === 0 ? (
        <section className="py-32 text-center px-5">
          <p className="text-zinc-400 text-sm">No posts published yet.</p>
          <p className="text-zinc-300 text-xs mt-2">Check back soon.</p>
        </section>
      ) : (
        <>
          {/* FEATURED POST */}
          {featured && (
            <section className="px-5 md:px-12 lg:px-20 py-14">
              <div className="max-w-6xl mx-auto">
                <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 mb-6">Featured Article</p>
                <Link href={`/blog/${featured.slug}`} className="group block">
                  <div className="grid md:grid-cols-2 gap-8 rounded-3xl border border-rose-100 bg-white shadow-sm hover:shadow-xl hover:border-rose-300 transition-all duration-300 overflow-hidden">
                    <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden bg-zinc-100">
                      {featured.cover_image ? (
                        <Image
                          src={featured.cover_image}
                          alt={featured.cover_alt ?? featured.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          priority
                        />
                      ) : (
                        <div className="w-full h-full min-h-64" style={{ background: roseGold }} />
                      )}
                    </div>
                    <div className="flex flex-col justify-center p-8 md:p-10">
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full border ${categoryColors[featured.category] ?? categoryColors["General"]}`}>
                          {featured.category}
                        </span>
                        {featured.tags?.slice(0, 2).map((t, i) => (
                          <span key={i} className="text-[10px] px-2.5 py-1 rounded-full bg-zinc-50 border border-zinc-100 text-zinc-400">
                            {t}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 leading-tight tracking-tight mb-3 group-hover:text-rose-500 transition-colors">
                        {featured.title}
                      </h2>
                      <p className="text-zinc-500 text-sm font-light leading-relaxed mb-6 line-clamp-3">
                        {featured.excerpt ?? featured.meta_desc}
                      </p>
                      <div className="flex items-center justify-between pt-5 border-t border-rose-100">
                        <div className="flex items-center gap-4 text-[11px] text-zinc-400">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3" />
                            {new Date(featured.published_at).toLocaleDateString("en-AE", { day: "numeric", month: "long", year: "numeric" })}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />
                            {featured.reading_time}
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: "#b76e79" }}>
                          Read article <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </section>
          )}

          {/* ALL POSTS GRID */}
          {rest.length > 0 && (
            <section className="px-5 md:px-12 lg:px-20 py-14 border-t border-rose-100" style={{ background: "linear-gradient(180deg, #fff 0%, #fdf0ef 100%)" }}>
              <div className="max-w-6xl mx-auto">
                <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 mb-8">All Articles</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {rest.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group flex flex-col rounded-2xl bg-white border border-rose-100 shadow-sm hover:shadow-lg hover:border-rose-300 transition-all duration-300 overflow-hidden"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden bg-zinc-100">
                        {post.cover_image ? (
                          <Image
                            src={post.cover_image}
                            alt={post.cover_alt ?? post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full" style={{ background: roseGold }} />
                        )}
                      </div>
                      <div className="flex flex-col flex-1 p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full border ${categoryColors[post.category] ?? categoryColors["General"]}`}>
                            {post.category}
                          </span>
                          <ArrowUpRight className="w-4 h-4 text-zinc-200 group-hover:text-rose-400 transition-colors" />
                        </div>
                        <h2 className="text-sm font-bold text-zinc-900 leading-snug mb-2 line-clamp-2 group-hover:text-rose-500 transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-xs text-zinc-500 font-light line-clamp-2 flex-1">
                          {post.excerpt ?? post.meta_desc}
                        </p>
                        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-rose-50 text-[11px] text-zinc-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.published_at).toLocaleDateString("en-AE", { day: "numeric", month: "short", year: "numeric" })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.reading_time}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* BOTTOM CTA */}
      <section className="py-16 px-5 text-center border-t border-rose-100" style={{ background: roseGold }}>
        <p className="text-white/80 text-sm mb-2">
          Ready to book a <strong className="text-white">luxury chauffeur in Dubai</strong>?
        </p>
        <p className="text-white/60 text-xs mb-6">Available 24/7 across Dubai, Abu Dhabi, and Sharjah</p>
        <a
          href="https://wa.me/971509852818"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all text-sm"
          style={{ color: "#b76e79" }}
        >
          WhatsApp Us Now <ArrowUpRight className="w-4 h-4" />
        </a>
      </section>

    </div>
  )
}