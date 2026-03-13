"use client";

export default function ChangePasswordForm() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 text-sm text-amber-700 space-y-2">
      <p className="font-semibold">Environment-based credentials</p>
      <p>
        Since this admin uses <code className="bg-amber-100 px-1.5 py-0.5 rounded text-xs">.env</code> for auth,
        to change your password:
      </p>
      <ol className="list-decimal list-inside space-y-1 text-amber-600 text-xs">
        <li>Go to Vercel Dashboard → Your Project → Settings → Environment Variables</li>
        <li>Update <code className="bg-amber-100 px-1 rounded">ADMIN_PASSWORD</code> to your new password</li>
        <li>Redeploy the project</li>
      </ol>
    </div>
  );
}
