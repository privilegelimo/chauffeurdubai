import { requireAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getFile } from "@/lib/github";
import matter from "gray-matter";
import Link from "next/link";
import AdminDelete from "../../components/admindelete";

const roseGoldGradient = "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)";

export default async function PostPreviewPage({ params }: { params: { slug: string } }) {
  const authed = await requireAuth();
  if (!authed) redirect("/admin/login");

  const file = await getFile(`src/content/blog/${params.slug}.mdx`);
  if (!file) redirect("/admin");

  const { data: meta } = matter(file.content);

  return (
    <div className="min-h-screen bg-zinc-50">

      {/* Header */}
      <header className="bg-white border-b border-rose-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-zinc-400 hover:text-zinc-600 text-sm">← Back</Link>
          <span className="text-zinc-300">|</span>
          <h1 className="text-sm font-bold text-zinc-900 truncate max-w-xs">{meta.title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/blog/${params.slug}`}
            target="_blank"
            className="px-4 py-2 rounded-xl border border-zinc-200 text-sm font-semibold text-zinc-500 hover:bg-zinc-50 transition-colors"
          >
            View Live →
          </Link>
          <Link
            href={`/admin/edit/${params.slug}`}
            className="px-4 py-2 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            style={{ background: roseGoldGradient }}
          >
            Edit Post
          </Link>
          <AdminDelete slug={params.slug} />
        </div>
      </header>

      {/* Post Details */}
      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl border border-rose-100 shadow-sm overflow-hidden">

          {meta.coverImage && (
            <img src={meta.coverImage} alt={meta.title} className="w-full aspect-video object-cover" />
          )}

          <div className="p-8">
            {/* Status badge */}
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${meta.published ? "bg-green-100 text-green-600" : "bg-zinc-100 text-zinc-500"}`}>
                {meta.published ? "Published" : "Draft"}
              </span>
              <span className="text-xs text-zinc-400">
                {new Date(meta.date).toLocaleDateString("en-AE", { day: "numeric", month: "long", year: "numeric" })}
              </span>
            </div>

            <h1 className="text-2xl font-bold text-zinc-900 mb-3">{meta.title}</h1>
            <p className="text-zinc-500 text-sm mb-6">{meta.excerpt}</p>

            {/* Meta grid */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-zinc-50 rounded-xl p-4">
                <p className="text-xs text-zinc-400 mb-1">Author</p>
                <p className="font-semibold text-zinc-700">{meta.author || "—"}</p>
              </div>
              <div className="bg-zinc-50 rounded-xl p-4">
                <p className="text-xs text-zinc-400 mb-1">Slug</p>
                <p className="font-mono text-zinc-700 text-xs">/blog/{params.slug}</p>
              </div>
              <div className="bg-zinc-50 rounded-xl p-4 col-span-2">
                <p className="text-xs text-zinc-400 mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {(meta.tags || []).map((tag: string) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs text-white font-semibold" style={{ background: roseGoldGradient }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
