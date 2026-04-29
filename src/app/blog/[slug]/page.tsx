import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("blogs").select("title,meta_desc,cover_image,slug").eq("slug", slug).single();
  if (!data) return {};
  return {
    title: data.title,
    description: data.meta_desc,
    alternates: { canonical: `https://www.chauffeurdubai.ae/blog/${data.slug}` },
    openGraph: {
      title: data.title,
      description: data.meta_desc,
      images: [{ url: data.cover_image }],
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
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
    <article className="max-w-3xl mx-auto px-4 py-16">
      {post.cover_image && (
        <img src={post.cover_image} alt={post.cover_alt} className="w-full rounded-2xl mb-8 aspect-video object-cover" />
      )}
      <span className="text-xs font-bold text-rose-500 uppercase tracking-widest">{post.category}</span>
      <h1 className="text-4xl font-bold text-zinc-900 mt-2 mb-4">{post.title}</h1>
      <p className="text-zinc-400 text-sm mb-8">
        By {post.author} · {new Date(post.published_at).toLocaleDateString("en-AE", { year: "numeric", month: "long", day: "numeric" })}
      </p>
      <div
        className="prose prose-zinc max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}