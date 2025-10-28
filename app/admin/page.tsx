"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminDashboard } from "@/components/admin-dashboard"
import { FlightInventory } from "@/components/flight-inventory"
import { HotelInventory } from "@/components/hotel-inventory"

export default function AdminPage() {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/login")
      return
    }

    // Simple admin check - in production, this would be verified on the backend
    const userData = JSON.parse(user)
    if (userData.email?.includes("admin")) {
      setIsAdmin(true)
    } else {
      router.push("/")
    }
  }, [router])

  if (!isAdmin) {
    return null
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <div className="flex-1 flex">
        {/* Sidebar */}
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {activeTab === "dashboard" && <AdminDashboard />}
            {activeTab === "flights" && <FlightInventory />}
            {activeTab === "hotels" && <HotelInventory />}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
