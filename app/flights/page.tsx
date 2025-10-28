"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FlightSearchBar } from "@/components/flight-search-bar"
import { FlightFilters } from "@/components/flight-filters"
import { FlightResults } from "@/components/flight-results"

export default function FlightsPage() {
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    airlines: [],
    stops: "all",
    departTime: "all",
    arrivalTime: "all",
    duration: "all",
  })

  const [sortBy, setSortBy] = useState("price")

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="bg-primary/5 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Find Flights</h1>
          <p className="text-muted-foreground">Showing results for your search</p>
        </div>
      </div>

      <FlightSearchBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <FlightFilters filters={filters} setFilters={setFilters} />
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <FlightResults filters={filters} sortBy={sortBy} setSortBy={setSortBy} />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
