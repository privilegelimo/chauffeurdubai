"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const roseGoldGradient = "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)";

interface PostEditorProps {
  slug?: string;
  sha?: string;
  initialFrontmatter?: Record<string, unknown>;
  initialContent?: string;
  mode: "new" | "edit";
}

export default function PostEditor({
  slug: initialSlug,
  sha,
  initialFrontmatter,
  initialContent = "",
  mode,
}: PostEditorProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [frontmatter, setFrontmatter] = useState({
    title: (initialFrontmatter?.title as string) || "",
    excerpt: (initialFrontmatter?.excerpt as string) || "",
    date: (initialFrontmatter?.date as string) || new Date().toISOString().split("T")[0],
    author: (initialFrontmatter?.author as string) || "Chauffeur Dubai Team",
    coverImage: (initialFrontmatter?.coverImage as string) || "",
    tags: ((initialFrontmatter?.tags as string[]) || []).join(", "),
    published: (initialFrontmatter?.published as boolean) ?? true,
  });

  const [slug, setSlug]       = useState(initialSlug || "");
  const [content, setContent] = useState(initialContent);
  const [saving, setSaving]   = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState("");

  function generateSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
    const data = await res.json();

    if (res.ok) {
      setFrontmatter((f) => ({ ...f, coverImage: data.url }));
    } else {
      setError("Image upload failed");
    }
    setUploading(false);
  }

  async function handleSave() {
    if (!slug || !frontmatter.title) {
      setError("Title and slug are required");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    const payload = {
      slug,
      sha,
      frontmatter: {
        ...frontmatter,
        tags: frontmatter.tags.split(",").map((t) => t.trim()).filter(Boolean),
        published: frontmatter.published,
      },
      content,
    };

    const res = await fetch(
      mode === "new" ? "/api/admin/posts" : `/api/admin/posts/${slug}`,
      {
        method: mode === "new" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (res.ok) {
      setSuccess(mode === "new" ? "Post created! Deploying to Vercel..." : "Post updated! Deploying to Vercel...");
      setTimeout(() => router.push("/admin"), 1500);
    } else {
      const data = await res.json();
      setError(data.error || "Save failed");
    }
    setSaving(false);
  }

  return (
    <div className="min-h-screen bg-zinc-50">

      {/* Header */}
      <header className="bg-white border-b border-rose-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push("/admin")} className="text-zinc-400 hover:text-zinc-600 text-sm">
            ← Back
          </button>
          <span className="text-zinc-300">|</span>
          <h1 className="text-sm font-bold text-zinc-900">
            {mode === "new" ? "New Post" : `Editing: ${frontmatter.title}`}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-xs font-semibold text-zinc-500">Published</span>
            <div
              onClick={() => setFrontmatter((f) => ({ ...f, published: !f.published }))}
              className={`w-10 h-5 rounded-full transition-colors relative ${frontmatter.published ? "bg-green-400" : "bg-zinc-300"}`}
            >
              <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${frontmatter.published ? "translate-x-5" : "translate-x-0.5"}`} />
            </div>
          </label>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            style={{ background: roseGoldGradient }}
          >
            {saving ? "Saving..." : mode === "new" ? "Publish" : "Save Changes"}
          </button>
        </div>
      </header>

      {/* Alerts */}
      {error && <div className="mx-6 mt-4 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">{error}</div>}
      {success && <div className="mx-6 mt-4 px-4 py-3 bg-green-50 border border-green-200 text-green-600 text-sm rounded-xl">{success}</div>}

      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── Main editor ── */}
        <div className="lg:col-span-2 space-y-4">

          {/* Title */}
          <input
            type="text"
            placeholder="Post title..."
            value={frontmatter.title}
            onChange={(e) => {
              setFrontmatter((f) => ({ ...f, title: e.target.value }));
              if (mode === "new") setSlug(generateSlug(e.target.value));
            }}
            className="w-full px-5 py-4 bg-white border border-rose-100 rounded-2xl text-xl font-bold text-zinc-900 placeholder-zinc-300 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all"
          />

          {/* Slug */}
          <div className="flex items-center gap-2 bg-white border border-rose-100 rounded-xl px-4 py-2.5">
            <span className="text-xs text-zinc-400">/blog/</span>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              disabled={mode === "edit"}
              className="flex-1 text-sm font-mono text-zinc-700 outline-none disabled:opacity-50 bg-transparent"
              placeholder="post-slug"
            />
          </div>

          {/* Content */}
          <div className="bg-white border border-rose-100 rounded-2xl overflow-hidden">
            <div className="px-4 py-2 border-b border-zinc-100 flex items-center gap-2">
              <span className="text-xs font-semibold text-zinc-400">MARKDOWN CONTENT</span>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog post in markdown..."
              rows={25}
              className="w-full px-5 py-4 text-sm font-mono text-zinc-800 leading-relaxed outline-none resize-none bg-transparent"
            />
          </div>
        </div>

        {/* ── Sidebar ── */}
        <div className="space-y-4">

          {/* Cover Image */}
          <div className="bg-white border border-rose-100 rounded-2xl p-5">
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Cover Image</p>
            {frontmatter.coverImage && (
              <img src={frontmatter.coverImage} alt="Cover" className="w-full aspect-video object-cover rounded-xl mb-3" />
            )}
            <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="w-full py-2.5 rounded-xl border-2 border-dashed border-rose-200 text-sm font-semibold hover:border-rose-400 transition-colors disabled:opacity-50"
              style={{ color: "#b76e79" }}
            >
              {uploading ? "Uploading..." : "Upload Image"}
            </button>
            {frontmatter.coverImage && (
              <input
                type="text"
                value={frontmatter.coverImage}
                onChange={(e) => setFrontmatter((f) => ({ ...f, coverImage: e.target.value }))}
                className="w-full mt-2 px-3 py-2 text-xs rounded-lg border border-zinc-200 text-zinc-500 outline-none"
                placeholder="/images/blog/..."
              />
            )}
          </div>

          {/* Meta */}
          <div className="bg-white border border-rose-100 rounded-2xl p-5 space-y-4">
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Post Details</p>

            <div>
              <label className="text-xs font-semibold text-zinc-500 block mb-1">Excerpt</label>
              <textarea
                value={frontmatter.excerpt}
                onChange={(e) => setFrontmatter((f) => ({ ...f, excerpt: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-xl outline-none focus:border-rose-300 resize-none"
                placeholder="Short description..."
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-500 block mb-1">Date</label>
              <input
                type="date"
                value={frontmatter.date}
                onChange={(e) => setFrontmatter((f) => ({ ...f, date: e.target.value }))}
                className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-xl outline-none focus:border-rose-300"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-500 block mb-1">Author</label>
              <input
                type="text"
                value={frontmatter.author}
                onChange={(e) => setFrontmatter((f) => ({ ...f, author: e.target.value }))}
                className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-xl outline-none focus:border-rose-300"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-500 block mb-1">Tags (comma separated)</label>
              <input
                type="text"
                value={frontmatter.tags}
                onChange={(e) => setFrontmatter((f) => ({ ...f, tags: e.target.value }))}
                className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-xl outline-none focus:border-rose-300"
                placeholder="dubai, chauffeur, luxury"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
