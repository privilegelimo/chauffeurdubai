import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { uploadImage } from "@/lib/github";

export async function POST(req: NextRequest) {
  if (!await requireAuth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const base64 = Buffer.from(bytes).toString("base64");
  const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

  const ok = await uploadImage(filename, base64);
  return ok
    ? NextResponse.json({ url: `/images/blog/${filename}` })
    : NextResponse.json({ error: "Upload failed" }, { status: 500 });
}
