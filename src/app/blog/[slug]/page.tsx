import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

const roseGoldGradient = "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("blogs")
    .select("title, meta_desc, cover_image, slug")
    .eq("slug", slug)
    .single();

  if (!data) return {};
  return {
    title:       data.title,
    description: data.meta_desc,
    alternates:  { canonical: `https://www.chauffeurdubai.ae/blog/${data.slug}` },
    openGraph: {
      title:       data.title,
      description: data.meta_desc,
      images:      data.cover_image ? [{ url: data.cover_image }] : [],
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) notFound();

  return (
    <>
      {/* ── HERO ── */}
      {post.cover_image && (
        <div className="relative w-full pt-16" style={{ background: "#1a0a0b" }}>
          <img
            src={post.cover_image}
            alt={post.cover_alt || post.title}
            className="w-full max-h-[480px] object-cover opacity-80"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }}
          />
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-10">
            <div className="max-w-3xl mx-auto">
              {post.category && (
                <span
                  className="inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full text-white mb-4"
                  style={{ background: roseGoldGradient }}
                >
                  {post.category}
                </span>
              )}
              <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-3">
                {post.title}
              </h1>
              <p className="text-white/60 text-sm">
                {post.author && <>By <span className="text-white/80 font-medium">{post.author}</span> · </>}
                {post.published_at && new Date(post.published_at).toLocaleDateString("en-AE", {
                  year: "numeric", month: "long", day: "numeric",
                })}
                {post.reading_time && <> · {post.reading_time}</>}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── CONTENT ── */}
      <section
        className="py-16 px-4"
        style={{ background: "linear-gradient(180deg, #fff 0%, #fdf0ef 100%)" }}
      >
        <div className="max-w-3xl mx-auto">

          {/* Header when no cover image */}
          {!post.cover_image && (
            <div className="mb-10 pt-16">
              {post.category && (
                <span
                  className="inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full text-white mb-4"
                  style={{ background: roseGoldGradient }}
                >
                  {post.category}
                </span>
              )}
              <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 leading-tight mb-3">
                {post.title}
              </h1>
              <p className="text-zinc-400 text-sm">
                {post.author && <>By <span className="text-zinc-600 font-medium">{post.author}</span> · </>}
                {post.published_at && new Date(post.published_at).toLocaleDateString("en-AE", {
                  year: "numeric", month: "long", day: "numeric",
                })}
                {post.reading_time && <> · {post.reading_time}</>}
              </p>
            </div>
          )}

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="text-[10px] font-semibold px-3 py-1 rounded-full border border-rose-200 text-rose-400 bg-rose-50"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Prose content */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>

      {/* ── PROSE STYLES ── */}
      <style>{`
        .blog-content {
          color: #3f3f46;
          font-size: 1.0625rem;
          line-height: 1.85;
        }

        /* Headings */
        .blog-content h1,
        .blog-content h2,
        .blog-content h3,
        .blog-content h4 {
          font-weight: 700;
          color: #18181b;
          line-height: 1.25;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }
        .blog-content h1 { font-size: 2rem; }
        .blog-content h2 {
          font-size: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #fce7e7;
        }
        .blog-content h3 { font-size: 1.25rem; color: #b76e79; }
        .blog-content h4 { font-size: 1.05rem; }

        /* Paragraphs */
        .blog-content p {
          margin-bottom: 1.5rem;
        }

        /* Links */
        .blog-content a {
          color: #b76e79;
          text-decoration: underline;
          text-underline-offset: 3px;
          font-weight: 500;
        }
        .blog-content a:hover { color: #9d5a65; }

        /* Lists */
        .blog-content ul,
        .blog-content ol {
          margin: 1.5rem 0;
          padding-left: 1.75rem;
        }
        .blog-content ul { list-style-type: disc; }
        .blog-content ol { list-style-type: decimal; }
        .blog-content li {
          margin-bottom: 0.5rem;
        }
        .blog-content li::marker { color: #b76e79; }

        /* Blockquote */
        .blog-content blockquote {
          border-left: 4px solid #b76e79;
          margin: 2rem 0;
          padding: 1rem 1.5rem;
          background: linear-gradient(135deg, #f9eded, #fdf4f0);
          border-radius: 0 0.75rem 0.75rem 0;
          color: #52525b;
          font-style: italic;
        }
        .blog-content blockquote p { margin-bottom: 0; }

        /* Code */
        .blog-content code {
          background: #f4f4f5;
          color: #b76e79;
          padding: 0.15em 0.4em;
          border-radius: 0.3rem;
          font-size: 0.875em;
          font-family: ui-monospace, monospace;
        }
        .blog-content pre {
          background: #18181b;
          color: #e4e4e7;
          padding: 1.25rem 1.5rem;
          border-radius: 0.75rem;
          overflow-x: auto;
          margin: 2rem 0;
          font-size: 0.875rem;
          line-height: 1.7;
        }
        .blog-content pre code {
          background: none;
          color: inherit;
          padding: 0;
          font-size: inherit;
        }

        /* Images */
        .blog-content img {
          width: 100%;
          border-radius: 0.75rem;
          margin: 2rem 0;
          object-fit: cover;
        }

        /* HR */
        .blog-content hr {
          border: none;
          border-top: 2px solid #fce7e7;
          margin: 3rem 0;
        }

        /* Tables */
        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
          font-size: 0.9rem;
        }
        .blog-content th {
          background: linear-gradient(135deg, #f9eded, #fdf4f0);
          color: #b76e79;
          font-weight: 700;
          padding: 0.75rem 1rem;
          text-align: left;
          border-bottom: 2px solid #fce7e7;
        }
        .blog-content td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #fce7e7;
          color: #52525b;
        }
        .blog-content tr:last-child td { border-bottom: none; }

        /* Strong / Em */
        .blog-content strong { color: #18181b; font-weight: 700; }
        .blog-content em { color: #71717a; }

        /* First paragraph lead */
        .blog-content > p:first-of-type {
          font-size: 1.125rem;
          color: #52525b;
          font-weight: 400;
        }
      `}</style>
    </>
  );
}