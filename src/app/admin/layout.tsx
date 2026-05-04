// app/admin/layout.tsx
import type { Metadata } from "next";
import AdminLayoutClient from "@/components/admin/AdminLayoutClient";
import SeoEditFab from "@/components/admin/SeoEditFab";

export const dynamic = "force-dynamic" // ← add this

export const metadata: Metadata = {
  title: "Admin | Chauffeur Dubai",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminLayoutClient>
      {children}
      <SeoEditFab />
    </AdminLayoutClient>
  );
}