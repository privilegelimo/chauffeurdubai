// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag, ArrowUpRight } from "lucide-react"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getAllPosts, getPostBySlug } from "@/lib/blog"
import TableOfContents from "@/components/blog/TableOfContents"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title}`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [],
    },
  }
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

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

const roseGold = "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)"

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post || !post.published) notFound()

  const allPosts   = getAllPosts()
  const currentIdx = allPosts.findIndex((p) => p.slug === post.slug)
  const related    = allPosts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3)
  const prev       = allPosts[currentIdx - 1] ?? null
  const next       = allPosts[currentIdx + 1] ?? null
  const tags       = post.tags ?? []

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.image,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "Chauffeur Dubai",
      logo: { "@type": "ImageObject", url: "https://chauffeurdubai.ae/logo.png" },
    },
    datePublished: post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://chauffeurdubai.ae/blog/${post.slug}`,
    },
  }

  return (
    <div className="w-full bg-white overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* HERO */}
      <section className="pt-28 pb-12 px-5 md:px-12 lg:px-20 bg-white border-b border-rose-100">
        <div className="max-w-6xl mx-auto">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-[11px] text-zinc-400 hover:text-zinc-900 transition-colors uppercase tracking-[0.15em]"
            >
              <ArrowLeft className="w-3 h-3" /> Blog
            </Link>
            <span className="text-zinc-200">/</span>
            <span className="text-[11px] text-zinc-400 uppercase tracking-[0.15em]">
              {post.category}
            </span>
          </div>

          <div className="max-w-3xl">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-5">
              <span
                className={`text-[10px] font-medium px-2.5 py-1 rounded-full border ${
                  categoryColors[post.category] ?? categoryColors["General"]
                }`}
              >
                {post.category}
              </span>
              {tags.slice(0, 3).map((t, i) => (
                <span
                  key={i}
                  className="text-[10px] px-2.5 py-1 rounded-full bg-zinc-50 border border-zinc-100 text-zinc-400"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 leading-tight tracking-tight mb-5">
              {post.title}
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg text-zinc-500 font-light leading-relaxed mb-7">
              {post.description}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-5 text-[11px] text-zinc-400 pt-6 border-t border-rose-100">
              <span className="font-medium text-zinc-700 text-xs">{post.author}</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                {new Date(post.date).toLocaleDateString("en-AE", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                {post.readingTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.image && (
        <div className="px-5 md:px-12 lg:px-20 py-10 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden bg-zinc-100">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* CONTENT + SIDEBAR */}
      <section className="py-14 px-5 md:px-12 lg:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16">

            {/* Article */}
            <article className="md:col-span-8" id="blog-article">
              <div className="mdx-content">
                <MDXRemote source={post.content} />
              </div>

              {/* Tags */}
              {tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-rose-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                      Tags
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2.5 py-1 rounded-full bg-rose-50 border border-rose-100 text-zinc-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Sidebar */}
            <aside className="md:col-span-4">
              <div className="space-y-5 sticky top-24">

                {/* Table of Contents */}
                <TableOfContents />

                {/* Booking CTA */}
                <div
                  className="rounded-2xl p-6 text-white"
                  style={{ background: roseGold }}
                >
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/60 mb-2">
                    Book Now
                  </p>
                  <p className="text-white text-sm font-semibold leading-snug mb-4">
                    Ready to experience luxury {post.category.toLowerCase()} in Dubai?
                  </p>
                  <a
                    href="https://wa.me/971509852818?text=Hi, I want to book a chauffeur service in Dubai."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-xs font-semibold px-4 py-2.5 rounded-full hover:bg-rose-50 transition-colors"
                    style={{ color: "#b76e79" }}
                  >
                    WhatsApp Us
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>

              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* RELATED POSTS */}
      {related.length > 0 && (
        <section
          className="py-16 px-5 md:px-12 lg:px-20 border-t border-rose-100"
          style={{ background: "linear-gradient(180deg, #fff 0%, #fdf0ef 100%)" }}
        >
          <div className="max-w-6xl mx-auto">
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 mb-8">
              Related Articles
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex flex-col rounded-2xl bg-white border border-rose-100 shadow-sm hover:shadow-md hover:border-rose-300 transition-all p-6"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-[10px] font-medium px-2.5 py-1 rounded-full border ${
                        categoryColors[p.category] ?? categoryColors["General"]
                      }`}
                    >
                      {p.category}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-200 group-hover:text-rose-400 transition-colors" />
                  </div>
                  <h3 className="text-sm font-bold text-zinc-900 leading-snug mb-2 group-hover:text-rose-500 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-zinc-500 font-light line-clamp-2">
                    {p.description}
                  </p>
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-rose-50 text-[11px] text-zinc-400">
                    <span>
                      {new Date(p.date).toLocaleDateString("en-AE", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span>{p.readingTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PREV / NEXT */}
      <section className="py-10 px-5 md:px-12 lg:px-20 bg-white border-t border-rose-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
          {prev ? (
            <Link
              href={`/blog/${prev.slug}`}
              className="group flex flex-col gap-2 rounded-2xl border border-rose-100 bg-white p-6 hover:border-rose-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                <ArrowLeft className="w-3 h-3" /> Previous
              </div>
              <p className="text-sm font-semibold text-zinc-900 group-hover:text-rose-500 transition-colors leading-snug">
                {prev.title}
              </p>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              href={`/blog/${next.slug}`}
              className="group flex flex-col gap-2 rounded-2xl border border-rose-100 bg-white p-6 hover:border-rose-300 hover:shadow-sm transition-all sm:items-end sm:text-right"
            >
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                Next <ArrowRight className="w-3 h-3" />
              </div>
              <p className="text-sm font-semibold text-zinc-900 group-hover:text-rose-500 transition-colors leading-snug">
                {next.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>
    </div>
  )
}
