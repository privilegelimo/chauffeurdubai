// app/admin/edit/[slug]/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import {
  AlertCircle, CheckCircle, Loader2,
  ChevronDown, ChevronUp, Eye, EyeOff, Trash2,
} from "lucide-react"

const RichEditor = dynamic(() => import("@/components/admin/RichEditor"), { ssr: false })

const roseGold = "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)"

const CATEGORIES = [
  "Travel Tips", "Dubai Guide", "Airport Transfers",
  "Corporate Travel", "Luxury Vehicles", "Events", "News", "General",
]

function generateSchema(form: {
  title: string; description: string; image: string;
  date: string; slug: string;
}) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: form.title,
    description: form.description,
    image: form.image || "",
    author: { "@type": "Person", name: "Chauffeur Dubai" },
    publisher: {
      "@type": "Organization",
      name: "Chauffeur Dubai",
      logo: { "@type": "ImageObject", url: "https://chauffeurdubai.ae/logo.png" },
    },
    datePublished: form.date || new Date().toISOString().split("T")[0],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://chauffeurdubai.ae/blog/${form.slug}`,
    },
  }, null, 2)
}

const inputClass =
  "w-full bg-white border border-rose-100 rounded-xl px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all text-sm shadow-sm"
const labelClass =
  "block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2"

export default function EditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const router = useRouter()
  const [slug, setSlug] = useState("")
  const [sha, setSha] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [seoOpen, setSeoOpen] = useState(true)
  const [schemaOpen, setSchemaOpen] = useState(false)
  const [showSlug, setShowSlug] = useState(true)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    excerpt: "",
    category: "",
    tags: "",
    image: "",
    content: "",
    date: new Date().toISOString().split("T")[0],
    published: false,
    metaTitle: "",
    metaDescription: "",
    canonicalUrl: "",
    focusKeyword: "",
  })

  // Resolve params and fetch post
  useEffect(() => {
    async function load() {
      const { slug: resolvedSlug } = await params
      setSlug(resolvedSlug)

      try {
        const res = await fetch(`/api/admin/posts/${resolvedSlug}`)
        if (!res.ok) throw new Error("Post not found")
        const data = await res.json()
        setSha(data.sha || "")
        setForm({
          title:           data.title        || "",
          slug:            data.slug         || resolvedSlug,
          description:     data.description  || data.excerpt || "",
          excerpt:         data.excerpt      || data.description || "",
          category:        data.category     || "",
          tags:            Array.isArray(data.tags) ? data.tags.join(", ") : data.tags || "",
          image:           data.image        || data.coverImage || "",
          content:         data.content      || "",
          date:            data.date         || new Date().toISOString().split("T")[0],
          published:       data.published    ?? false,
          metaTitle:       data.metaTitle    || data.title || "",
          metaDescription: data.metaDescription || data.excerpt || data.description || "",
          canonicalUrl:    data.canonicalUrl || `https://chauffeurdubai.ae/blog/${resolvedSlug}`,
          focusKeyword:    data.focusKeyword || "",
        })
      } catch (err) {
        setError("Failed to load post. Please go back and try again.")
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [params])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    if (name === "description") {
      setForm((prev) => ({
        ...prev,
        description: value,
        excerpt: value,
        metaDescription: value,
      }))
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    setSuccess("")

    if (!form.title || !form.slug || !form.content) {
      setError("Title, slug, and content are required.")
      setIsSubmitting(false)
      return
    }

    try {
      const res = await fetch(`/api/admin/posts/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          sha,
          tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
          excerpt: form.description,
          coverImage: form.image,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to update post")
      setSuccess("Post updated successfully!")
      setTimeout(() => router.push("/admin"), 1500)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const res = await fetch(`/api/admin/posts/${slug}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sha }),
      })
      if (!res.ok) throw new Error("Failed to delete post")
      router.push("/admin")
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to delete")
      setIsDeleting(false)
      setShowDeleteConfirm(false)
    }
  }

  if (isLoading) {
    return (
      <div className="px-8 py-8 flex items-center justify-center min-h-64">
        <div className="flex items-center gap-3 text-zinc-400">
          <Loader2 size={20} className="animate-spin" style={{ color: "#b76e79" }} />
          <span className="text-sm">Loading post...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <span
            className="hover:text-rose-400 cursor-pointer transition-colors"
            onClick={() => router.push("/admin")}
          >
            Dashboard
          </span>
          <span>/</span>
          <span
            className="hover:text-rose-400 cursor-pointer transition-colors"
            onClick={() => router.push("/admin/posts")}
          >
            Posts
          </span>
          <span>/</span>
          <span style={{ color: "#b76e79" }} className="font-medium truncate max-w-xs">
            {form.title || slug}
          </span>
        </div>

        {/* View live */}
        <a
          href={`/blog/${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold hover:opacity-70 transition-opacity flex items-center gap-1"
          style={{ color: "#b76e79" }}
        >
          <Eye size={13} /> View live →
        </a>
      </div>

      {/* Alerts */}
      {error && (
        <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2">
          <AlertCircle size={16} className="shrink-0" />
          {error}
        </div>
      )}
      {success && (
        <div className="mb-6 px-4 py-3 bg-rose-50 border border-rose-200 rounded-xl text-sm flex items-center gap-2" style={{ color: "#b76e79" }}>
          <CheckCircle size={16} className="shrink-0" />
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* LEFT — Main Content */}
          <div className="xl:col-span-2 space-y-5">

            {/* Title */}
            <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-6">
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Post title..."
                className="w-full text-2xl font-bold text-zinc-900 placeholder-zinc-300 focus:outline-none border-none bg-transparent"
                required
              />
              {showSlug && (
                <div className="flex items-center mt-3 pt-3 border-t border-rose-50 gap-2">
                  <span className="text-xs text-zinc-400">URL:</span>
                  <span className="text-xs text-zinc-400">chauffeurdubai.ae/blog/</span>
                  <input
                    type="text"
                    name="slug"
                    value={form.slug}
                    onChange={handleChange}
                    className="text-xs text-rose-500 focus:outline-none border-b border-rose-100 focus:border-rose-300 bg-transparent flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSlug(!showSlug)}
                    className="text-zinc-400 hover:text-zinc-600"
                  >
                    <EyeOff size={13} />
                  </button>
                </div>
              )}
            </div>

            {/* Rich Editor */}
            <div>
              <label className={labelClass}>Content</label>
              {!isLoading && (
                <RichEditor
                  value={form.content}
                  onChange={(val) => setForm((prev) => ({ ...prev, content: val }))}
                />
              )}
            </div>

            {/* Excerpt */}
            <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-6">
              <label className={labelClass}>
                Excerpt{" "}
                <span className="text-zinc-400 normal-case font-normal">
                  — shown in blog listing & search engines
                </span>
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                placeholder="Short description of this post..."
                className={`${inputClass} resize-none`}
              />
              <p className="text-xs text-zinc-400 mt-1.5">
                {form.description.length}/160 characters
                {form.description.length > 160 && (
                  <span className="text-red-400 ml-2">Too long for meta description</span>
                )}
              </p>
            </div>

            {/* SEO Panel */}
            <div className="bg-white rounded-2xl border border-rose-100 shadow-sm overflow-hidden">
              <button
                type="button"
                onClick={() => setSeoOpen(!seoOpen)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-rose-50/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    SEO Settings
                  </span>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full bg-rose-50 border border-rose-100"
                    style={{ color: "#b76e79" }}
                  >
                    Recommended
                  </span>
                </div>
                {seoOpen
                  ? <ChevronUp size={16} className="text-zinc-400" />
                  : <ChevronDown size={16} className="text-zinc-400" />}
              </button>

              {seoOpen && (
                <div className="px-6 pb-6 space-y-4 border-t border-rose-50">
                  {/* Google Preview */}
                  <div className="mt-4 p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                    <p className="text-[10px] uppercase tracking-wider text-zinc-400 mb-3">
                      Google Preview
                    </p>
                    <p className="text-blue-600 text-sm font-medium truncate">
                      {form.metaTitle || form.title || "Post Title"}
                    </p>
                    <p className="text-green-700 text-xs mt-0.5">
                      chauffeurdubai.ae/blog/{form.slug || "post-slug"}
                    </p>
                    <p className="text-zinc-500 text-xs mt-1 line-clamp-2">
                      {form.metaDescription || form.description || "Post description will appear here..."}
                    </p>
                  </div>

                  <div>
                    <label className={labelClass}>Focus Keyword</label>
                    <input
                      type="text"
                      name="focusKeyword"
                      value={form.focusKeyword}
                      onChange={handleChange}
                      placeholder="e.g. chauffeur service dubai"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Meta Title{" "}
                      <span className="text-zinc-400 normal-case font-normal">
                        ({(form.metaTitle || form.title).length}/60)
                      </span>
                    </label>
                    <input
                      type="text"
                      name="metaTitle"
                      value={form.metaTitle}
                      onChange={handleChange}
                      placeholder="SEO title"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Meta Description{" "}
                      <span className="text-zinc-400 normal-case font-normal">
                        ({form.metaDescription.length}/160)
                      </span>
                    </label>
                    <textarea
                      name="metaDescription"
                      value={form.metaDescription}
                      onChange={handleChange}
                      rows={2}
                      placeholder="SEO description"
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Canonical URL</label>
                    <input
                      type="text"
                      name="canonicalUrl"
                      value={form.canonicalUrl}
                      onChange={handleChange}
                      placeholder={`https://chauffeurdubai.ae/blog/${form.slug}`}
                      className={inputClass}
                    />
                  </div>

                  {/* Internal Links */}
                  <div className="p-4 bg-rose-50/50 rounded-xl border border-rose-100">
                    <p className="text-[10px] uppercase tracking-wider text-zinc-400 mb-2">
                      Internal Link Suggestions
                    </p>
                    {[
                      { label: "Airport Transfer Dubai", href: "/services/airport-transfer" },
                      { label: "Corporate Chauffeur Dubai", href: "/services/corporate-chauffeur" },
                      { label: "Contact Us", href: "/contact" },
                    ].map(({ label, href }) => (
                      <div key={href} className="flex items-center justify-between py-1">
                        <span className="text-xs text-zinc-600">{label}</span>
                        <code
                          className="text-[10px] px-2 py-0.5 rounded"
                          style={{ background: "#fdf0ef", color: "#b76e79" }}
                        >
                          {href}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Schema Panel */}
            <div className="bg-white rounded-2xl border border-rose-100 shadow-sm overflow-hidden">
              <button
                type="button"
                onClick={() => setSchemaOpen(!schemaOpen)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-rose-50/50 transition-colors"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Schema Markup (Auto-generated)
                </span>
                {schemaOpen
                  ? <ChevronUp size={16} className="text-zinc-400" />
                  : <ChevronDown size={16} className="text-zinc-400" />}
              </button>
              {schemaOpen && (
                <div className="px-6 pb-6 border-t border-rose-50">
                  <pre
                    className="mt-4 p-4 rounded-xl text-xs overflow-x-auto leading-relaxed"
                    style={{ background: "#09090b", color: "#a1a1aa" }}
                  >
                    {generateSchema({
                      title: form.title,
                      description: form.metaDescription || form.description,
                      image: form.image,
                      date: form.date,
                      slug: form.slug,
                    })}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — Sidebar */}
          <div className="space-y-5">

            {/* Publish Box */}
            <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-6">
              <p className={labelClass}>Publish</p>

              <div className="space-y-3 mb-5">
                <div>
                  <label className="text-xs text-zinc-500 mb-1 block">Status</label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div
                      className={`relative w-10 h-5 rounded-full transition-all ${
                        form.published ? "" : "bg-zinc-200"
                      }`}
                      style={form.published
                        ? { background: "linear-gradient(135deg, #b76e79, #c9956c)" }
                        : {}}
                    >
                      <input
                        type="checkbox"
                        name="published"
                        checked={form.published}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div
                        className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${
                          form.published ? "left-5" : "left-0.5"
                        }`}
                      />
                    </div>
                    <span className="text-sm font-medium text-zinc-700">
                      {form.published ? "Published" : "Draft"}
                    </span>
                  </label>
                </div>

                <div>
                  <label className="text-xs text-zinc-500 mb-1 block">Publish Date</label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: roseGold }}
              >
                {isSubmitting ? (
                  <><Loader2 size={16} className="animate-spin" /> Saving...</>
                ) : (
                  "Save Changes"
                )}
              </button>
              <button
                type="button"
                onClick={() => router.push("/admin")}
                className="w-full mt-2 px-6 py-2.5 bg-white border border-rose-100 hover:border-rose-300 text-zinc-500 hover:text-zinc-900 font-medium rounded-xl transition-all text-sm"
              >
                Cancel
              </button>
            </div>

            {/* Category */}
            <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-6">
              <label className={labelClass}>Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className={`${inputClass} appearance-none`}
              >
                <option value="">Select category</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-6">
              <label className={labelClass}>
                Tags{" "}
                <span className="text-zinc-400 normal-case font-normal">comma-separated</span>
              </label>
              <input
                type="text"
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="dubai, chauffeur, airport"
                className={inputClass}
              />
              {form.tags && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {form.tags.split(",").map((t) => t.trim()).filter(Boolean).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2.5 py-1 rounded-full bg-rose-50 border border-rose-100 text-zinc-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Featured Image */}
            <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-6">
              <label className={labelClass}>Featured Image</label>
              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="/images/blog/my-image.webp"
                className={inputClass}
              />
              {form.image && (
                <div className="mt-3 rounded-xl overflow-hidden border border-rose-100 aspect-[16/9] bg-zinc-50">
                  <img
                    src={form.image}
                    alt="Featured"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none"
                    }}
                  />
                </div>
              )}
              <p className="text-[10px] text-zinc-400 mt-2">
                Place images in{" "}
                <code className="text-rose-400">public/images/blog/</code>
              </p>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-red-400 mb-3">
                Danger Zone
              </p>
              {!showDeleteConfirm ? (
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition-all text-sm font-medium"
                >
                  <Trash2 size={14} />
                  Delete Post
                </button>
              ) : (
                <div className="space-y-2">
                  <p className="text-xs text-zinc-500 text-center mb-3">
                    Are you sure? This cannot be undone.
                  </p>
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-all text-sm font-semibold disabled:opacity-60"
                  >
                    {isDeleting ? (
                      <><Loader2 size={14} className="animate-spin" /> Deleting...</>
                    ) : (
                      <><Trash2 size={14} /> Yes, Delete</>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(false)}
                    className="w-full px-4 py-2 rounded-xl border border-zinc-200 text-zinc-500 hover:bg-zinc-50 transition-all text-sm"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </form>
    </div>
  )
}
