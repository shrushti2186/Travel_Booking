"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HotelSearchBar } from "@/components/hotel-search-bar"
import { HotelFilters } from "@/components/hotel-filters"
import { HotelResults } from "@/components/hotel-results"

export default function HotelsPage() {
  const [filters, setFilters] = useState({
    priceRange: [0, 500],
    rating: 0,
    amenities: [],
    hotelType: "all",
    guestRating: "all",
  })

  const [sortBy, setSortBy] = useState("recommended")

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="bg-primary/5 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Find Hotels</h1>
          <p className="text-muted-foreground">Discover the perfect accommodation for your stay</p>
        </div>
      </div>

      <HotelSearchBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <HotelFilters filters={filters} setFilters={setFilters} />
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <HotelResults filters={filters} sortBy={sortBy} setSortBy={setSortBy} />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
