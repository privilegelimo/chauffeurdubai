import { requireAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import ChangePasswordForm from "./components/changepasswordform";

const roseGoldGradient = "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)";

export default async function SettingsPage() {
  const authed = await requireAuth();
  if (!authed) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-zinc-50">

      {/* Header */}
      <header className="bg-white border-b border-rose-100 px-6 py-4 flex items-center gap-3">
        <Link href="/admin" className="text-zinc-400 hover:text-zinc-600 text-sm">← Back</Link>
        <span className="text-zinc-300">|</span>
        <h1 className="text-sm font-bold text-zinc-900">Settings</h1>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-10 space-y-6">

        {/* Change Password */}
        <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-8">
          <h2 className="text-base font-bold text-zinc-900 mb-1">Change Password</h2>
          <p className="text-sm text-zinc-400 mb-6">
            Update your <code className="bg-zinc-100 px-1.5 py-0.5 rounded text-xs">.env</code> file and redeploy to change credentials.
          </p>
          <ChangePasswordForm />
        </div>

        {/* GitHub Info */}
        <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-8">
          <h2 className="text-base font-bold text-zinc-900 mb-1">GitHub Connection</h2>
          <p className="text-sm text-zinc-400 mb-4">Posts are committed directly to your repository.</p>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-zinc-100">
              <span className="text-zinc-500">Repository</span>
              <a
                href={`https://github.com/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}`}
                target="_blank"
                className="font-mono text-xs font-semibold hover:opacity-70"
                style={{ color: "#b76e79" }}
              >
                {process.env.GITHUB_OWNER}/{process.env.GITHUB_REPO}
              </a>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-zinc-100">
              <span className="text-zinc-500">Branch</span>
              <span className="font-mono text-xs font-semibold text-zinc-700">{process.env.GITHUB_BRANCH}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-zinc-500">Auto Deploy</span>
              <span className="text-green-500 font-semibold text-xs">✓ Vercel (on every commit)</span>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-8">
          <h2 className="text-base font-bold text-red-500 mb-1">Danger Zone</h2>
          <p className="text-sm text-zinc-400 mb-4">Permanently clear the admin session.</p>
          <Link
            href="/api/admin/logout"
            className="inline-block px-5 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-500 text-sm font-semibold hover:bg-red-100 transition-colors"
          >
            Sign Out of Admin
          </Link>
        </div>

      </main>
    </div>
  );
}
