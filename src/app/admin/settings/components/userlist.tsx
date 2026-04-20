"use client";

const roseGoldGradient = "linear-gradient(135deg, #b76e79, #e8a4a0, #c9956c)";

export default function UserList() {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between px-4 py-3 bg-white border border-rose-100 rounded-xl">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
            style={{ background: roseGoldGradient }}
          >
            A
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-800">Admin</p>
            <p className="text-xs text-zinc-400">Full access · Configured via .env</p>
          </div>
        </div>
        <span className="text-xs bg-green-100 text-green-600 font-semibold px-2.5 py-1 rounded-full">
          Active
        </span>
      </div>
    </div>
  );
}
