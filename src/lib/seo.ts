import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";

const BASE_URL = "https://www.chauffeurdubai.ae";

export async function generateSEO(pagePath: string): Promise<Metadata> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("seo_pages")
    .select("*")
    .eq("page_path", pagePath)
    .single();

  if (!data) return {};

  const title       = data.title       ?? undefined;
  const description = data.description ?? undefined;
  const ogTitle     = data.og_title    ?? title;
  const ogDesc      = data.og_desc     ?? description;
  const ogImage     = data.og_image    ?? `${BASE_URL}/og-image.jpg`;
  const canonical   = data.canonical   ?? `${BASE_URL}${pagePath}`;

  return {
    title,
    description,
    keywords:   data.keywords ?? undefined,
    alternates: { canonical },
    openGraph: {
      title:       ogTitle,
      description: ogDesc,
      url:         canonical,
      images:      [{ url: ogImage, alt: ogTitle ?? "" }],
      type:        "website",
    },
    twitter: {
      card:        "summary_large_image",
      title:       ogTitle,
      description: ogDesc,
      images:      [ogImage],
    },
  };
}