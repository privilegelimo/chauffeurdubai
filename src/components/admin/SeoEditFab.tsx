"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Settings } from "lucide-react";

type SeoRow = {
  id?: string;
  page_path: string;
  title: string;
  description: string;
  keywords: string;
  og_title: string;
  og_desc: string;
  og_image: string;
  canonical: string;
};

export default function SeoEditFab() {
  const pathname             = usePathname();
  const supabase             = createClient();
  const [open, setOpen]      = useState(false);
  const [saving, setSaving]  = useState(false);
  const [msg, setMsg]        = useState("");
  const [row, setRow]        = useState<SeoRow>({
    page_path:   "",
    title:       "",
    description: "",
    keywords:    "",
    og_title:    "",
    og_desc:     "",
    og_image:    "",
    canonical:   "",
  });

  // Hide FAB on /admin/* pages themselves
  const isAdminPage = pathname.startsWith("/admin");

  const load = useCallback(async () => {
    const { data } = await supabase
      .from("seo_pages")
      .select("*")
      .eq("page_path", pathname)
      .single();

    if (data) {
      setRow(data);
    } else {
      // Pre-fill path, let admin fill the rest
      setRow({
        page_path:   pathname,
        title:       "",
        description: "",
        keywords:    "",
        og_title:    "",
        og_desc:     "",
        og_image:    "",
        canonical:   `https://www.chauffeurdubai.ae${pathname}`,
      });
    }
  }, [pathname]);

  useEffect(() => {
    if (open) load();
  }, [open, load]);

  async function save() {
    setSaving(true);
    setMsg("");

    const { error } = row.id
      ? await supabase
          .from("seo_pages")
          .update({ ...row, updated_at: new Date().toISOString() })
          .eq("id", row.id)
      : await supabase
          .from("seo_pages")
          .insert(row);

    setSaving(false);
    if (error) { setMsg("Error: " + error.message); return; }
    setMsg("Saved ✓");
  }

  if (isAdminPage) return null;

  const field = (key: keyof SeoRow, label: string, rowCount = 1) => (
    <div>
      <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">
        {label}
      </label>
      {rowCount > 1 ? (
        <textarea
          rows={rowCount}
          value={(row as any)[key]}
          onChange={(e) => setRow((p) => ({ ...p, [key]: e.target.value }))}
          className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-400"
        />
      ) : (
        <input
          type="text"
          value={(row as any)[key]}
          onChange={(e) => setRow((p) => ({ ...p, [key]: e.target.value }))}
          className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-400"
        />
      )}
    </div>
  );

  return (
    <>
      {/* ── Floating Button ── */}
      <button
        onClick={() => { setOpen(true); setMsg(""); }}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-zinc-900 hover:bg-zinc-700 text-white text-xs font-bold px-4 py-3 rounded-full shadow-xl transition-all"
      >
        <Settings size={14} />
        Edit SEO
      </button>

      {/* ── Drawer ── */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="flex-1 bg-black/40"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div className="w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 sticky top-0 bg-white z-10">
              <div>
                <p className="font-bold text-zinc-900">Edit SEO</p>
                <p className="font-mono text-xs text-zinc-400 mt-0.5">{pathname}</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 text-xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Fields */}
            <div className="px-6 py-5 space-y-4 flex-1">
              {field("title", "Meta Title")}
              {field("description", "Meta Description", 3)}
              {field("keywords", "Keywords")}
              {field("og_title", "OG Title")}
              {field("og_desc", "OG Description", 2)}
              {field("og_image", "OG Image URL")}
              {field("canonical", "Canonical URL")}

              {/* Char counters */}
              <div className="flex gap-6 text-xs">
                <span className={row.title.length > 60 ? "text-red-500" : "text-zinc-400"}>
                  Title: {row.title.length}/60
                </span>
                <span className={row.description.length > 160 ? "text-red-500" : "text-zinc-400"}>
                  Desc: {row.description.length}/160
                </span>
              </div>

              {msg && (
                <p className={`text-sm font-medium ${msg.startsWith("Error") ? "text-red-500" : "text-green-600"}`}>
                  {msg}
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-zinc-100 sticky bottom-0 bg-white flex gap-3">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 text-sm font-semibold text-zinc-500 hover:text-zinc-700 py-2.5 rounded-xl border border-zinc-200 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={save}
                disabled={saving}
                className="flex-1 bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white font-bold text-sm py-2.5 rounded-xl transition-all"
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}