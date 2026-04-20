import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

const BLOG_DIR = path.join(process.cwd(), "src/content/blog")

export async function POST(req: NextRequest) {
  const body = await req.json()

  if (!body.title || !body.slug || !body.content) {
    return NextResponse.json({ error: "Title, slug, and content are required" }, { status: 400 })
  }

  const filepath = path.join(BLOG_DIR, `${body.slug}.mdx`)
  if (fs.existsSync(filepath)) {
    return NextResponse.json({ error: "A post with this slug already exists" }, { status: 409 })
  }

  const frontmatter = {
    title:           body.title,
    slug:            body.slug,
    date:            body.date || new Date().toISOString().split("T")[0],
    description:     body.description,
    excerpt:         body.description,
    category:        body.category || "General",
    tags:            Array.isArray(body.tags) ? body.tags : [],
    image:           body.image || "",
    coverImage:      body.image || "",
    author:          body.author || "Chauffeur Dubai",
    published:       body.published ?? false,
    metaTitle:       body.metaTitle || body.title,
    metaDescription: body.metaDescription || body.description,
    canonicalUrl:    body.canonicalUrl || `https://chauffeurdubai.ae/blog/${body.slug}`,
    focusKeyword:    body.focusKeyword || "",
  }

  if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true })

  const fileContent = matter.stringify(body.content, frontmatter)
  fs.writeFileSync(filepath, fileContent, "utf8")

  return NextResponse.json({ success: true, slug: body.slug })
}
