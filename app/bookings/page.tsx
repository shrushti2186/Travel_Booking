"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { BookingStats } from "@/components/booking-stats"
import { BookingList } from "@/components/booking-list"
import { BookingFilters } from "@/components/booking-filters"

export default function BookingsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/login")
      return
    }
    setIsAuthenticated(true)
  }, [router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <div className="bg-primary/5 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Bookings</h1>
          <p className="text-muted-foreground">Manage and track all your travel bookings</p>
        </div>
      </div>

      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Stats */}
          <BookingStats />

          {/* Filters and Sorting */}
          <div className="mt-12">
            <BookingFilters
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </div>

          {/* Bookings List */}
          <div className="mt-8">
            <BookingList filterStatus={filterStatus} sortBy={sortBy} />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
