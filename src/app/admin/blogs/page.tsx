"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Pencil, Trash2, X, Eye, EyeOff } from "lucide-react";

type Blog = {
  id?: string;
  slug: string;
  title: string;
  meta_desc: string;
  seo_keywords: string;
  excerpt: string;
  content: string;
  cover_image: string;
  cover_alt: string;
  author: string;
  category: string;
  tags: string[];
  published: boolean;
  published_at?: string | null;
};

const emptyBlog = (): Blog => ({
  slug: "", title: "", meta_desc: "", seo_keywords: "",
  excerpt: "", content: "", cover_image: "", cover_alt: "",
  author: "Chauffeur Dubai", category: "", tags: [],
  published: false, published_at: null,
});

export default function AdminBlogsPage() {
  const supabase = createClient();
  const [blogs, setBlogs]       = useState<Blog[]>([]);
  const [edit, setEdit]         = useState<Blog | null>(null);
  const [saving, setSaving]     = useState(false);
  const [msg, setMsg]           = useState("");
  const [search, setSearch]     = useState("");

  async function load() {
    const { data } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });
    setBlogs(data ?? []);
  }

  useEffect(() => { load(); }, []);

  async function save() {
    if (!edit) return;
    setSaving(true); setMsg("");
    const payload = {
      ...edit,
      published_at: edit.published && !edit.published_at
        ? new Date().toISOString()
        : edit.published_at,
      updated_at: new Date().toISOString(),
    };
    const { error } = edit.id
      ? await supabase.from("blogs").update(payload).eq("id", edit.id)
      : await supabase.from("blogs").insert(payload);
    setSaving(false);
    if (error) { setMsg("Error: " + error.message); return; }
    setMsg("Saved ✓"); setEdit(null); load();
  }

  async function deleteBlog(id: string) {
    if (!confirm("Delete this post?")) return;
    await supabase.from("blogs").delete().eq("id", id);
    load();
  }

  async function togglePublish(blog: Blog) {
    await supabase.from("blogs").update({
      published: !blog.published,
      published_at: !blog.published ? new Date().toISOString() : blog.published_at,
      updated_at: new Date().toISOString(),
    }).eq("id", blog.id!);
    load();
  }

  function field(key: keyof Blog, label: string, rows = 1) {
    const val = (edit as any)[key];
    const isArray = Array.isArray(val);
    const strVal  = isArray ? (val as string[]).join(", ") : (val ?? "");
    return (
      <div className={rows > 1 ? "col-span-2" : ""}>
        <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">
          {label}{isArray && <span className="text-zinc-400 normal-case font-normal ml-1">(comma separated)</span>}
        </label>
        {rows > 1
          ? <textarea
              rows={rows}
              value={strVal}
              onChange={(e) => setEdit((p) => ({
                ...p!,
                [key]: isArray ? e.target.value.split(",").map(t => t.trim()) : e.target.value,
              }))}
              className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-400 font-mono"
            />
          : <input
              type="text"
              value={strVal}
              onChange={(e) => setEdit((p) => ({
                ...p!,
                [key]: isArray ? e.target.value.split(",").map(t => t.trim()) : e.target.value,
              }))}
              className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-400"
            />
        }
      </div>
    );
  }

  const filtered = blogs.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-zinc-900">Blog Manager</h1>
        <button
          onClick={() => { setEdit(emptyBlog()); setMsg(""); }}
          className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-all"
        >
          <Plus size={15} /> New Post
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-sm mb-6 focus:outline-none focus:border-rose-400"
      />

      {msg && !edit && (
        <p className={`mb-4 text-sm font-medium ${msg.startsWith("Error") ? "text-red-500" : "text-green-600"}`}>{msg}</p>
      )}

      {/* Blog List */}
      <div className="space-y-3">
        {filtered.map((blog) => (
          <div key={blog.id} className="bg-white rounded-2xl border border-zinc-200 shadow-sm px-5 py-4 flex items-center gap-4">
            {blog.cover_image && (
              <img src={blog.cover_image} alt={blog.cover_alt} className="w-14 h-14 rounded-xl object-cover shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-zinc-900 text-sm truncate">{blog.title}</p>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">{blog.slug}</p>
              <div className="flex items-center gap-2 mt-1">
                {blog.category && (
                  <span className="text-xs bg-rose-50 text-rose-500 font-semibold px-2 py-0.5 rounded-full">{blog.category}</span>
                )}
                {blog.tags?.slice(0, 3).map(t => (
                  <span key={t} className="text-xs bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded-full">{t}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => togglePublish(blog)}
                title={blog.published ? "Unpublish" : "Publish"}
                className={`p-1.5 rounded-lg transition-colors ${blog.published ? "text-green-500 hover:text-green-700" : "text-zinc-300 hover:text-zinc-500"}`}
              >
                {blog.published ? <Eye size={15} /> : <EyeOff size={15} />}
              </button>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${blog.published ? "bg-green-50 text-green-600" : "bg-zinc-100 text-zinc-400"}`}>
                {blog.published ? "Live" : "Draft"}
              </span>
              <button onClick={() => { setEdit(blog); setMsg(""); }} className="p-1.5 text-zinc-400 hover:text-rose-500 transition-colors">
                <Pencil size={14} />
              </button>
              <button onClick={() => deleteBlog(blog.id!)} className="p-1.5 text-zinc-400 hover:text-red-500 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-zinc-400 text-sm text-center py-12">No posts yet. Create your first blog post.</p>
        )}
      </div>

      {/* ── Edit Modal ── */}
      {edit && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 sticky top-0 bg-white z-10">
              <h2 className="font-bold text-zinc-900">{edit.id ? "Edit Post" : "New Post"}</h2>
              <button onClick={() => setEdit(null)}><X size={18} className="text-zinc-400" /></button>
            </div>

            <div className="px-6 py-5 grid grid-cols-2 gap-4">
              {field("title",        "Title")}
              {field("slug",         "Slug")}
              {field("category",     "Category")}
              {field("author",       "Author")}
              {field("cover_image",  "Cover Image Path")}
              {field("cover_alt",    "Cover Image Alt")}
              {field("tags",         "Tags")}
              {field("seo_keywords", "SEO Keywords")}
              {field("meta_desc",    "Meta Description", 2)}
              {field("excerpt",      "Excerpt", 3)}
              {field("content",      "Content (HTML or Markdown)", 12)}

              {/* Published toggle */}
              <div className="col-span-2 flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEdit(p => ({ ...p!, published: !p!.published }))}
                  className={`relative w-11 h-6 rounded-full transition-colors ${edit.published ? "bg-green-500" : "bg-zinc-300"}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${edit.published ? "translate-x-5" : ""}`} />
                </button>
                <span className="text-sm font-semibold text-zinc-700">
                  {edit.published ? "Published (Live)" : "Draft (Hidden)"}
                </span>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-zinc-100 flex justify-end gap-3 sticky bottom-0 bg-white">
              {msg && <p className={`text-sm font-medium mr-auto ${msg.startsWith("Error") ? "text-red-500" : "text-green-600"}`}>{msg}</p>}
              <button onClick={() => setEdit(null)} className="text-sm font-semibold text-zinc-500 px-4 py-2 rounded-lg border border-zinc-200">Cancel</button>
              <button onClick={save} disabled={saving} className="bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white font-semibold text-sm px-6 py-2.5 rounded-lg transition-all">
                {saving ? "Saving…" : "Save Post"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}