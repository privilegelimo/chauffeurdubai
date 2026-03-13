// app/admin/page.tsx
import { requireAuth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { listFiles, getFile } from "@/lib/github"
import matter from "gray-matter"
import Link from "next/link"
import AdminDelete from "./components/admindelete"

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

export default async function AdminPage() {
  const authed = await requireAuth()
  if (!authed) redirect("/admin/login")

  const posts = await getPosts()
  const published = posts.filter((p) => p!.published).length
  const drafts = posts.filter((p) => !p!.published).length

  return (
    <div className="px-8 py-8">

      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Dashboard</h1>
          <p className="text-zinc-500 text-sm mt-1">
            Manage your Chauffeur Dubai blog content
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
            Total Posts
          </p>
          <p className="text-4xl font-bold text-zinc-900">{posts.length}</p>
          <div className="mt-3 h-1 rounded-full bg-rose-50 overflow-hidden">
            <div className="h-full rounded-full" style={{ background: roseGold, width: "100%" }} />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
            Published
          </p>
          <p className="text-4xl font-bold text-zinc-900">{published}</p>
          <div className="mt-3 h-1 rounded-full bg-rose-50 overflow-hidden">
            <div
              className="h-full rounded-full bg-green-400"
              style={{ width: posts.length ? `${(published / posts.length) * 100}%` : "0%" }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
            Drafts
          </p>
          <p className="text-4xl font-bold text-zinc-900">{drafts}</p>
          <div className="mt-3 h-1 rounded-full bg-rose-50 overflow-hidden">
            <div
              className="h-full rounded-full bg-zinc-300"
              style={{ width: posts.length ? `${(drafts / posts.length) * 100}%` : "0%" }}
            />
          </div>
        </div>
      </div>

      {/* Posts Table Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-zinc-900">
          Recent Posts{" "}
          <span className="text-zinc-400 font-normal text-sm">({posts.length})</span>
        </h2>
        <Link
          href="/admin/posts"
          className="text-xs font-semibold hover:opacity-80 transition-opacity"
          style={{ color: "#b76e79" }}
        >
          View all →
        </Link>
      </div>

      {/* Empty State */}
      {posts.length === 0 ? (
        <div className="rounded-3xl border border-rose-100 bg-white shadow-sm py-20 text-center">
          <div
            className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
            style={{ background: roseGoldSubtle }}
          >
            <svg className="w-6 h-6" fill="none" stroke="#b76e79" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-zinc-500 font-medium mb-1">No posts yet</p>
          <p className="text-zinc-400 text-sm mb-5">Start publishing content to your blog</p>
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
            <div className="col-span-6 text-xs font-semibold uppercase tracking-wider text-zinc-400">Post</div>
            <div className="col-span-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">Date</div>
            <div className="col-span-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">Status</div>
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
              <div className="col-span-6 flex items-center gap-3 min-w-0">
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
              <div className="col-span-2">
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
                <AdminDelete slug={post!.slug} sha={post!.sha} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
