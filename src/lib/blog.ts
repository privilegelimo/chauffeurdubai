// src/lib/blog.ts
import fs from "fs"
import path from "path"
import matter from "gray-matter"

const BLOG_DIR = path.join(process.cwd(), "src/content/blog")

export type Post = {
  slug: string
  title: string
  description: string
  excerpt: string
  date: string
  author: string
  category: string
  tags: string[]
  image: string
  coverImage: string
  published: boolean
  readingTime: string
  content: string
}

function calcReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length
  const mins = Math.ceil(words / 200)
  return `${mins} min read`
}

function normalizePost(data: Record<string, unknown>, content: string, fallbackSlug: string): Post {
  return {
    slug:        (data.slug as string)       || fallbackSlug,
    title:       (data.title as string)      || "",
    description: (data.description as string) || (data.excerpt as string) || "",
    excerpt:     (data.excerpt as string)    || (data.description as string) || "",
    date:        (data.date as string)       || "",
    author:      (data.author as string)     || "Chauffeur Dubai",
    category:    (data.category as string)   || "General",
    tags:        Array.isArray(data.tags) ? data.tags as string[] : [],
    image:       (data.image as string)      || (data.coverImage as string) || "",
    coverImage:  (data.coverImage as string) || (data.image as string)      || "",
    published:   typeof data.published === "boolean" ? data.published : false,
    readingTime: calcReadingTime(content),
    content,
  }
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8")
      const { data, content } = matter(raw)
      return normalizePost(data, content, filename.replace(".mdx", ""))
    })
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): Post | null {
  const filepath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filepath)) return null
  const raw = fs.readFileSync(filepath, "utf8")
  const { data, content } = matter(raw)
  return normalizePost(data, content, slug)
}
