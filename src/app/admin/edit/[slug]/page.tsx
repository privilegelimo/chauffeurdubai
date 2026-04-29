"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import ImageUploader from "@/components/admin/ImageUploader"
import { createClient } from "@/lib/supabase/client"
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
      logo: { "@type": "ImageObject", url: "https://www.chauffeurdubai.ae/logo.png" },
    },
    datePublished: form.date || new Date().toISOString().split("T")[0],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.chauffeurdubai.ae/blog/${form.slug}`,
    },
  }, null, 2)
}

function calcReadingTime(content: string): string {
  const words = content?.trim().split(/\s+/).length ?? 0
  return `${Math.max(1, Math.round(words / 200))} min read`
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
  const router   = useRouter()
  const supabase = createClient()

  const [slug, setSlug]                         = useState("")
  const [rowId, setRowId]                       = useState<string>("")
  const [isLoading, setIsLoading]               = useState(true)
  const [isSubmitting, setIsSubmitting]         = useState(false)
  const [isDeleting, setIsDeleting]             = useState(false)
  const [error, setError]                       = useState("")
  const [success, setSuccess]                   = useState("")
  const [seoOpen, setSeoOpen]                   = useState(true)
  const [schemaOpen, setSchemaOpen]             = useState(false)
  const [showSlug, setShowSlug]                 = useState(true)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const [form, setForm] = useState({
    title:           "",
    slug:            "",
    description:     "",
    category:        "",
    tags:            "",
    image:           "",
    content:         "",
    date:            new Date().toISOString().split("T")[0],
    published:       false,
    metaTitle:       "",
    metaDescription: "",
    canonicalUrl:    "",
    focusKeyword:    "",
  })

  // ── Load post from Supabase ─────────────────────────────────────────────────
  useEffect(() => {
    async function load() {
      const { slug: resolvedSlug } = await params
      setSlug(resolvedSlug)

      const { data, error: sbError } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", resolvedSlug)
        .single()

      if (sbError || !data) {
        setError("Failed to load post. Please go back and try again.")
        setIsLoading(false)
        return
      }

      setRowId(data.id)
      setForm({
        title:           data.title        || "",
        slug:            data.slug         || resolvedSlug,
        description:     data.excerpt      || data.meta_desc || "",
        category:        data.category     || "",
        tags:            Array.isArray(data.tags) ? data.tags.join(", ") : "",
        image:           data.cover_image  || "",
        content:         data.content      || "",
        date:            data.published_at
                           ? data.published_at.split("T")[0]
                           : new Date().toISOString().split("T")[0],
        published:       data.published    ?? false,
        metaTitle:       data.title        || "",
        metaDescription: data.meta_desc    || data.excerpt || "",
        canonicalUrl:    `https://www.chauffeurdubai.ae/blog/${resolvedSlug}`,
        focusKeyword:    data.seo_keywords || "",
      })

      setIsLoading(false)
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
        description:     value,
        metaDescription: value,
      }))
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }))
    }
  }

  // ── Update ──────────────────────────────────────────────────────────────────
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

    const { error: sbError } = await supabase
      .from("blogs")
      .update({
        slug:         form.slug,
        title:        form.metaTitle || form.title,
        meta_desc:    form.metaDescription || form.description,
        seo_keywords: form.focusKeyword,
        excerpt:      form.description,
        content:      form.content,
        cover_image:  form.image,
        cover_alt:    form.title,
        category:     form.category,
        tags:         form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        published:    form.published,
        published_at: form.published ? new Date(form.date).toISOString() : null,
        reading_time: calcReadingTime(form.content),
        updated_at:   new Date().toISOString(),
      })
      .eq("id", rowId)

    setIsSubmitting(false)

    if (sbError) {
      setError(sbError.message)
      return
    }

    setSuccess("Post updated successfully!")
    setTimeout(() => router.push("/admin/blogs"), 1500)
  }

  // ── Delete ──────────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    setIsDeleting(true)

    const { error: sbError } = await supabase
      .from("blogs")
      .delete()
      .eq("id", rowId)

    if (sbError) {
      setError(sbError.message)
      setIsDeleting(false)
      setShowDeleteConfirm(false)
      return
    }

    router.push("/admin/blogs")
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
            onClick={() => router.push("/admin/blogs")}
          >
            Blog Manager
          </span>
          <span>/</span>
          <span style={{ color: "#b76e79" }} className="font-medium truncate max-w-xs">
            {form.title || slug}
          </span>
        </div>
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
              <RichEditor
                value={form.content}
                onChange={(val) => setForm((prev) => ({ ...prev, content: val }))}
              />
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
                      placeholder={`https://www.chauffeurdubai.ae/blog/${form.slug}`}
                      className={inputClass}
                    />
                  </div>

                  <div className="p-4 bg-rose-50/50 rounded-xl border border-rose-100">
                    <p className="text-[10px] uppercase tracking-wider text-zinc-400 mb-2">
                      Internal Link Suggestions
                    </p>
                    {[
                      { label: "Airport Transfer Dubai",    href: "/services/airport-transfer" },
                      { label: "Corporate Chauffeur Dubai", href: "/services/corporate-chauffeur" },
                      { label: "Contact Us",                href: "/contact" },
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
                      title:       form.title,
                      description: form.metaDescription || form.description,
                      image:       form.image,
                      date:        form.date,
                      slug:        form.slug,
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
                      className={`relative w-10 h-5 rounded-full transition-all ${form.published ? "" : "bg-zinc-200"}`}
                      style={form.published ? { background: roseGold } : {}}
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
                {isSubmitting
                  ? <><Loader2 size={16} className="animate-spin" /> Saving...</>
                  : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => router.push("/admin/blogs")}
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
  <ImageUploader
    value={form.image}
    onChange={(url) => setForm((prev) => ({ ...prev, image: url }))}
  />
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
                    {isDeleting
                      ? <><Loader2 size={14} className="animate-spin" /> Deleting...</>
                      : <><Trash2 size={14} /> Yes, Delete</>}
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