import type React from "react"
import Navigation from "@/components/navigation"
import { Toaster } from "@/components/ui/toaster"
import { AppProvider } from "@/contexts/app-context"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppProvider>
      <div className="student-dashboard-wrapper min-h-screen bg-background">
        <Navigation />
        <main className="pt-16">{children}</main>
        <Toaster />
      </div>
    </AppProvider>
  )
}
