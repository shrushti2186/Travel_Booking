"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plane } from "lucide-react"

interface FlightResultsProps {
  filters: any
  sortBy: string
  setSortBy: (sort: string) => void
}

const mockFlights = [
  {
    id: 1,
    airline: "United Airlines",
    departure: "08:00",
    arrival: "11:30",
    duration: "3h 30m",
    stops: 0,
    price: 245,
    from: "JFK",
    to: "LAX",
    date: "Nov 15, 2025",
  },
  {
    id: 2,
    airline: "American Airlines",
    departure: "10:15",
    arrival: "13:45",
    duration: "3h 30m",
    stops: 0,
    price: 289,
    from: "JFK",
    to: "LAX",
    date: "Nov 15, 2025",
  },
  {
    id: 3,
    airline: "Delta Air Lines",
    departure: "14:00",
    arrival: "17:20",
    duration: "3h 20m",
    stops: 0,
    price: 312,
    from: "JFK",
    to: "LAX",
    date: "Nov 15, 2025",
  },
  {
    id: 4,
    airline: "Southwest Airlines",
    departure: "06:30",
    arrival: "10:15",
    duration: "3h 45m",
    stops: 1,
    price: 198,
    from: "JFK",
    to: "LAX",
    date: "Nov 15, 2025",
  },
  {
    id: 5,
    airline: "JetBlue Airways",
    departure: "12:00",
    arrival: "15:30",
    duration: "3h 30m",
    stops: 0,
    price: 267,
    from: "JFK",
    to: "LAX",
    date: "Nov 15, 2025",
  },
  {
    id: 6,
    airline: "United Airlines",
    departure: "16:45",
    arrival: "20:15",
    duration: "3h 30m",
    stops: 0,
    price: 298,
    from: "JFK",
    to: "LAX",
    date: "Nov 15, 2025",
  },
]

export function FlightResults({ filters, sortBy, setSortBy }: FlightResultsProps) {
  const [selectedFlight, setSelectedFlight] = useState<number | null>(null)

  let results = [...mockFlights]

  // Apply filters
  if (filters.priceRange) {
    results = results.filter((f) => f.price >= filters.priceRange[0] && f.price <= filters.priceRange[1])
  }

  if (filters.airlines.length > 0) {
    results = results.filter((f) => filters.airlines.includes(f.airline))
  }

  if (filters.stops !== "all") {
    if (filters.stops === "nonstop") {
      results = results.filter((f) => f.stops === 0)
    } else if (filters.stops === "1stop") {
      results = results.filter((f) => f.stops <= 1)
    }
  }

  // Apply sorting
  if (sortBy === "price") {
    results.sort((a, b) => a.price - b.price)
  } else if (sortBy === "duration") {
    results.sort((a, b) => {
      const aDuration = Number.parseInt(a.duration)
      const bDuration = Number.parseInt(b.duration)
      return aDuration - bDuration
    })
  } else if (sortBy === "departure") {
    results.sort((a, b) => a.departure.localeCompare(b.departure))
  }

  return (
    <div className="space-y-6">
      {/* Sort Options */}
      <div className="flex gap-2 flex-wrap">
        <span className="text-sm font-medium text-foreground self-center">Sort by:</span>
        {[
          { value: "price", label: "Price" },
          { value: "duration", label: "Duration" },
          { value: "departure", label: "Departure Time" },
        ].map((option) => (
          <Button
            key={option.value}
            variant={sortBy === option.value ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy(option.value)}
            className={sortBy === option.value ? "bg-primary text-primary-foreground" : "border-border text-foreground"}
          >
            {option.label}
          </Button>
        ))}
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {results.length} flight{results.length !== 1 ? "s" : ""}
      </div>

      {/* Flight Cards */}
      <div className="space-y-4">
        {results.map((flight) => (
          <Card
            key={flight.id}
            className={`p-6 bg-card border-border cursor-pointer transition-all hover:shadow-lg ${
              selectedFlight === flight.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => setSelectedFlight(flight.id)}
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              {/* Airline & Time */}
              <div>
                <p className="text-sm text-muted-foreground mb-1">{flight.airline}</p>
                <p className="text-2xl font-bold text-foreground">{flight.departure}</p>
                <p className="text-xs text-muted-foreground">{flight.from}</p>
              </div>

              {/* Duration */}
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <div className="flex-1 h-px bg-border" />
                  <div className="w-2 h-2 bg-primary rounded-full" />
                </div>
                <p className="text-sm font-medium text-foreground">{flight.duration}</p>
                <p className="text-xs text-muted-foreground">
                  {flight.stops === 0 ? "Nonstop" : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`}
                </p>
              </div>

              {/* Arrival */}
              <div>
                <p className="text-sm text-muted-foreground mb-1">Arrival</p>
                <p className="text-2xl font-bold text-foreground">{flight.arrival}</p>
                <p className="text-xs text-muted-foreground">{flight.to}</p>
              </div>

              {/* Price */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Price per person</p>
                <p className="text-3xl font-bold text-primary">${flight.price}</p>
              </div>

              {/* Select Button */}
              <div className="flex justify-center">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8">
                  Select
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {results.length === 0 && (
        <Card className="p-12 bg-card border-border text-center">
          <Plane className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-foreground font-medium mb-2">No flights found</p>
          <p className="text-muted-foreground">Try adjusting your filters or search criteria</p>
        </Card>
      )}
    </div>
  )
}
