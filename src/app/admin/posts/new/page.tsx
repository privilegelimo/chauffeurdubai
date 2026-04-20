import { redirect } from "next/navigation";

// Just alias to /admin/new
export default function PostsNewPage() {
  redirect("/admin/new");
}
