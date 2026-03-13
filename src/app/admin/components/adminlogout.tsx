"use client";

import { useRouter } from "next/navigation";

export default function AdminLogout() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded-xl border border-zinc-200 text-sm font-semibold text-zinc-500 hover:bg-zinc-50 transition-colors"
    >
      Logout
    </button>
  );
}
