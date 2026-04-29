import { generateSEO } from "@/lib/seo";
import FleetClient from "@/components/FleetClient";

export async function generateMetadata() {
  return generateSEO("/fleet");
}

export default function FleetPage() {
  return <FleetClient />;
}