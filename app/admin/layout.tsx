import type React from "react"
import { Toaster } from "@/components/ui/toaster"
import AdminNavigation from "@/components/admin-navigation"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="admin-dashboard-wrapper min-h-screen bg-background">
      <AdminNavigation />
      <main className="pt-16">{children}</main>
      <Toaster />
    </div>
  )
}
