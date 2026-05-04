// app/admin/fleet/new/page.tsx
"use client"
import VehicleForm from "../_components/VehicleForm"

export const dynamic = "force-dynamic"

export default function NewVehiclePage() {
  return <VehicleForm mode="new" />
}