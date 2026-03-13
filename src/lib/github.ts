const GITHUB_API = "https://api.github.com";
const OWNER  = process.env.GITHUB_OWNER!;
const REPO   = process.env.GITHUB_REPO!;
const BRANCH = process.env.GITHUB_BRANCH!;
const TOKEN  = process.env.GITHUB_TOKEN!;

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "Content-Type": "application/json",
};

// ── Get file (returns content + sha) ────────────────────────────────────────
export async function getFile(path: string) {
  const res = await fetch(`${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`, { headers });
  if (!res.ok) return null;
  const data = await res.json();
  return {
    content: Buffer.from(data.content, "base64").toString("utf8"),
    sha: data.sha as string,
  };
}

// ── List files in a folder ───────────────────────────────────────────────────
export async function listFiles(path: string) {
  const res = await fetch(`${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`, { headers });
  if (!res.ok) return [];
  const data = await res.json();
  return data as { name: string; path: string; sha: string }[];
}

// ── Create or update file ────────────────────────────────────────────────────
export async function upsertFile(path: string, content: string, message: string, sha?: string) {
  const body: Record<string, string> = {
    message,
    content: Buffer.from(content).toString("base64"),
    branch: BRANCH,
  };
  if (sha) body.sha = sha;

  const res = await fetch(`${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${path}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
  });
  return res.ok;
}

// ── Delete file ──────────────────────────────────────────────────────────────
export async function deleteFile(path: string, sha: string, message: string) {
  const res = await fetch(`${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${path}`, {
    method: "DELETE",
    headers,
    body: JSON.stringify({ message, sha, branch: BRANCH }),
  });
  return res.ok;
}

// ── Upload image (base64) ────────────────────────────────────────────────────
export async function uploadImage(filename: string, base64: string) {
  const path = `public/images/blog/${filename}`;
  const existing = await getFile(path);
  return await upsertFile(path, base64, `Upload image: ${filename}`, existing?.sha);
}
