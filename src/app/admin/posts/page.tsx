// app/admin/posts/page.tsx
import { requireAuth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { listFiles, getFile } from "@/lib/github"
import matter from "gray-matter"
import Link from "next/link"
import AdminDelete from "../components/admindelete"

async function getPosts() {
  const files = await listFiles("src/content/blog")
  const posts = await Promise.all(
    files
      .filter((f) => f.name.endsWith(".mdx"))
      .map(async (f) => {
        const file = await getFile(f.path)
        if (!file) return null
        const { data } = matter(file.content)
        return {
          slug: f.name.replace(".mdx", ""),
          title: data.title,
          date: data.date,
          published: data.published,
          category: data.category || null,
          sha: file.sha,
        }
      })
  )
  return posts
    .filter(Boolean)
    .sort((a, b) => new Date(b!.date).getTime() - new Date(a!.date).getTime())
}

const roseGold = "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)"
const roseGoldSubtle = "linear-gradient(135deg, #f9eded, #fdf4f0)"

export default async function PostsPage() {
  const authed = await requireAuth()
  if (!authed) redirect("/admin/login")

  const posts = await getPosts()
  const published = posts.filter((p) => p!.published).length
  const drafts = posts.filter((p) => !p!.published).length

  return (
    <div className="px-8 py-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">All Posts</h1>
          <p className="text-zinc-500 text-sm mt-1">
            {posts.length} total &middot; {published} published &middot; {drafts} draft{drafts !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/new"
          className="px-5 py-2.5 rounded-full text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-md"
          style={{ background: roseGold }}
        >
          + New Post
        </Link>
      </div>

      {/* Filter Pills */}
      <div className="flex items-center gap-2 mb-6">
        {[
          { label: `All (${posts.length})`, active: true },
          { label: `Published (${published})`, active: false },
          { label: `Drafts (${drafts})`, active: false },
        ].map(({ label, active }) => (
          <span
            key={label}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold border cursor-default ${
              active ? "text-white border-transparent shadow-sm" : "bg-white border-rose-100 text-zinc-500"
            }`}
            style={active ? { background: roseGold } : {}}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Empty State */}
      {posts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-rose-100 shadow-sm py-24 text-center">
          <div
            className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
            style={{ background: roseGoldSubtle }}
          >
            <svg className="w-6 h-6" fill="none" stroke="#b76e79" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-zinc-600 font-semibold mb-1">No posts yet</p>
          <p className="text-zinc-400 text-sm mb-6">Start publishing content to your blog</p>
          <Link
            href="/admin/new"
            className="inline-flex px-6 py-2.5 rounded-full text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-md"
            style={{ background: roseGold }}
          >
            Create First Post
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-rose-100 overflow-hidden shadow-sm">

          {/* Table Header */}
          <div className="grid grid-cols-12 px-6 py-3 border-b border-rose-50 bg-rose-50/40">
            <div className="col-span-5 text-xs font-semibold uppercase tracking-wider text-zinc-400">Post</div>
            <div className="col-span-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">Category</div>
            <div className="col-span-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">Date</div>
            <div className="col-span-1 text-xs font-semibold uppercase tracking-wider text-zinc-400">Status</div>
            <div className="col-span-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 text-right">Actions</div>
          </div>

          {/* Rows */}
          {posts.map((post, i) => (
            <div
              key={post!.slug}
              className={`grid grid-cols-12 items-center px-6 py-4 hover:bg-rose-50/30 transition-colors ${
                i !== posts.length - 1 ? "border-b border-zinc-100" : ""
              }`}
            >
              {/* Title */}
              <div className="col-span-5 flex items-center gap-3 min-w-0">
                <div
                  className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center"
                  style={{ background: roseGoldSubtle }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="#b76e79" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-zinc-900 text-sm truncate">{post!.title}</p>
                  <p className="text-xs text-zinc-400 truncate mt-0.5">/blog/{post!.slug}</p>
                </div>
              </div>

              {/* Category */}
              <div className="col-span-2">
                {post!.category ? (
                  <span
                    className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 border border-rose-100"
                    style={{ color: "#b76e79" }}
                  >
                    {post!.category}
                  </span>
                ) : (
                  <span className="text-xs text-zinc-300">—</span>
                )}
              </div>

              {/* Date */}
              <div className="col-span-2">
                <p className="text-xs text-zinc-500">
                  {new Date(post!.date).toLocaleDateString("en-AE", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              {/* Status */}
              <div className="col-span-1">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                    post!.published
                      ? "bg-green-50 text-green-600 border border-green-200"
                      : "bg-zinc-100 text-zinc-500 border border-zinc-200"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${post!.published ? "bg-green-500" : "bg-zinc-400"}`} />
                  {post!.published ? "Live" : "Draft"}
                </span>
              </div>

              {/* Actions */}
              <div className="col-span-2 flex items-center gap-2 justify-end">
                <Link
                  href={`/admin/edit/${post!.slug}`}
                  className="px-3 py-1.5 rounded-lg border border-rose-200 text-xs font-semibold hover:bg-rose-50 transition-colors"
                  style={{ color: "#b76e79" }}
                >
                  Edit
                </Link>
                <Link
                  href={`/blog/${post!.slug}`}
                  target="_blank"
                  className="px-3 py-1.5 rounded-lg border border-zinc-200 text-xs font-semibold text-zinc-500 hover:bg-zinc-50 transition-colors"
                >
                  View
                </Link>
                <AdminDelete slug={post!.slug}/>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
