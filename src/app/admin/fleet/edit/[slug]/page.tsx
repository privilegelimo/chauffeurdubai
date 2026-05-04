// app/admin/fleet/edit/[slug]/page.tsx
"use client"
import { useParams } from "next/navigation"
import VehicleForm from "../../_components/VehicleForm"

export const dynamic = "force-dynamic"

export default function EditVehiclePage() {
  const { slug } = useParams<{ slug: string }>()
  return <VehicleForm mode="edit" slug={slug} />
}