"use client";

// Since auth is .env based, this component shows instructions
// for adding a second admin via environment variables
export default function AddUserForm() {
  return (
    <div className="bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-4 text-sm text-zinc-600 space-y-2">
      <p className="font-semibold text-zinc-700">Adding more admin users</p>
      <p className="text-xs text-zinc-500">
        This system uses a single admin account via environment variables.
        To support multiple users, consider upgrading to a Supabase-backed auth system.
      </p>
      <p className="text-xs text-zinc-400">
        Current admin: <code className="bg-zinc-100 px-1.5 py-0.5 rounded">{process.env.NEXT_PUBLIC_ADMIN_ENABLED ? "Configured via .env" : "Not set"}</code>
      </p>
    </div>
  );
}
