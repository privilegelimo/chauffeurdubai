import { generateSEO } from "@/lib/seo";
import HomeClient from "@/components/HomeClient";

export async function generateMetadata() {
  return generateSEO("/");
}

export default function HomePage() {
  return <HomeClient />;
}