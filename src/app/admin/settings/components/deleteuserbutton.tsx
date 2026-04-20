"use client";

import { useRouter } from "next/navigation";

// Placeholder — since auth is single-user via .env
// this just logs out the current session
export default function DeleteUserButton() {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("This will log you out. Continue?")) return;
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <button
      onClick={handleDelete}
      className="px-4 py-2 rounded-xl bg-red-50 border border-red-200 text-red-500 text-sm font-semibold hover:bg-red-100 transition-colors"
    >
      Remove Session
    </button>
  );
}
