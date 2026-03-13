import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { getFile, upsertFile, deleteFile } from "@/lib/github";
import matter from "gray-matter";

// GET — get single post
export async function GET(_: NextRequest, { params }: { params: { slug: string } }) {
  if (!await requireAuth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const path = `src/content/blog/${params.slug}.mdx`;
  const file = await getFile(path);
  if (!file) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { data, content } = matter(file.content);
  return NextResponse.json({ frontmatter: data, content, sha: file.sha });
}

// PUT — update post
export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  if (!await requireAuth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { frontmatter, content, sha } = await req.json();
  const path = `src/content/blog/${params.slug}.mdx`;

  const mdx = matter.stringify(content, frontmatter);
  const ok = await upsertFile(path, mdx, `Update blog post: ${params.slug}`, sha);

  return ok
    ? NextResponse.json({ success: true })
    : NextResponse.json({ error: "Failed to update" }, { status: 500 });
}

// DELETE — delete post
export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
  if (!await requireAuth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { sha } = await req.json();
  const path = `src/content/blog/${params.slug}.mdx`;
  const ok = await deleteFile(path, sha, `Delete blog post: ${params.slug}`);

  return ok
    ? NextResponse.json({ success: true })
    : NextResponse.json({ error: "Failed to delete" }, { status: 500 });
}
