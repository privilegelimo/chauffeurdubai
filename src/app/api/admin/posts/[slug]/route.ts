import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

const BLOG_DIR = path.join(process.cwd(), "src/content/blog")

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const filepath = path.join(BLOG_DIR, `${slug}.mdx`)

  if (!fs.existsSync(filepath)) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 })
  }

  const raw = fs.readFileSync(filepath, "utf8")
  const { data, content } = matter(raw)

  return NextResponse.json({
    ...data,
    slug,
    content,
    sha: "",
    tags: Array.isArray(data.tags) ? data.tags : [],
  })
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const body = await req.json()

  const frontmatter = {
    title:           body.title,
    slug:            body.slug || slug,
    date:            body.date,
    description:     body.description,
    excerpt:         body.excerpt || body.description,
    category:        body.category,
    tags:            body.tags,
    image:           body.image,
    coverImage:      body.image,
    author:          body.author || "Chauffeur Dubai",
    published:       body.published,
    metaTitle:       body.metaTitle,
    metaDescription: body.metaDescription,
    canonicalUrl:    body.canonicalUrl,
    focusKeyword:    body.focusKeyword,
  }

  const fileContent = matter.stringify(body.content || "", frontmatter)
  const filepath = path.join(BLOG_DIR, `${slug}.mdx`)
  fs.writeFileSync(filepath, fileContent, "utf8")

  return NextResponse.json({ success: true })
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const filepath = path.join(BLOG_DIR, `${slug}.mdx`)

  if (!fs.existsSync(filepath)) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 })
  }

  fs.unlinkSync(filepath)
  return NextResponse.json({ success: true })
}
