import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { listFiles, getFile, upsertFile } from "@/lib/github";
import matter from "gray-matter";

// GET — list all posts
export async function GET() {
  if (!await requireAuth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const files = await listFiles("src/content/blog");
  const posts = await Promise.all(
    files
      .filter((f) => f.name.endsWith(".mdx"))
      .map(async (f) => {
        const file = await getFile(f.path);
        if (!file) return null;
        const { data } = matter(file.content);
        return { slug: f.name.replace(".mdx", ""), ...data };
      })
  );

  return NextResponse.json(posts.filter(Boolean));
}

// POST — create new post
export async function POST(req: NextRequest) {
  if (!await requireAuth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { slug, frontmatter, content } = await req.json();
  const path = `src/content/blog/${slug}.mdx`;

  const existing = await getFile(path);
  if (existing) return NextResponse.json({ error: "Post already exists" }, { status: 409 });

  const mdx = matter.stringify(content, frontmatter);
  const ok = await upsertFile(path, mdx, `Add blog post: ${slug}`);

  return ok
    ? NextResponse.json({ success: true })
    : NextResponse.json({ error: "Failed to create post" }, { status: 500 });
}
