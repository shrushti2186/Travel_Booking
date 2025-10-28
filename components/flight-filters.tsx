"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"

interface FlightFiltersProps {
  filters: {
    priceRange: [number, number]
    airlines: string[]
    stops: string
    departTime: string
    arrivalTime: string
    duration: string
  }
  setFilters: (filters: any) => void
}

export function FlightFilters({ filters, setFilters }: FlightFiltersProps) {
  const airlines = ["United Airlines", "American Airlines", "Delta Air Lines", "Southwest Airlines", "JetBlue Airways"]
  const stopOptions = [
    { value: "all", label: "All Flights" },
    { value: "nonstop", label: "Nonstop Only" },
    { value: "1stop", label: "1 Stop Max" },
    { value: "2stops", label: "2+ Stops" },
  ]

  const handlePriceChange = (value: number[]) => {
    setFilters({ ...filters, priceRange: [value[0], value[1]] })
  }

  const handleAirlineToggle = (airline: string) => {
    const updated = filters.airlines.includes(airline)
      ? filters.airlines.filter((a) => a !== airline)
      : [...filters.airlines, airline]
    setFilters({ ...filters, airlines: updated })
  }

  return (
    <div className="space-y-6">
      {/* Price Filter */}
      <Card className="p-6 bg-card border-border">
        <h3 className="font-semibold text-foreground mb-4">Price Range</h3>
        <Slider
          value={filters.priceRange}
          onValueChange={handlePriceChange}
          min={0}
          max={1000}
          step={10}
          className="mb-4"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${filters.priceRange[0]}</span>
          <span>${filters.priceRange[1]}</span>
        </div>
      </Card>

      {/* Stops Filter */}
      <Card className="p-6 bg-card border-border">
        <h3 className="font-semibold text-foreground mb-4">Stops</h3>
        <div className="space-y-3">
          {stopOptions.map((option) => (
            <label key={option.value} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="stops"
                value={option.value}
                checked={filters.stops === option.value}
                onChange={(e) => setFilters({ ...filters, stops: e.target.value })}
                className="w-4 h-4"
              />
              <span className="text-sm text-foreground">{option.label}</span>
            </label>
          ))}
        </div>
      </Card>

      {/* Airlines Filter */}
      <Card className="p-6 bg-card border-border">
        <h3 className="font-semibold text-foreground mb-4">Airlines</h3>
        <div className="space-y-3">
          {airlines.map((airline) => (
            <label key={airline} className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                checked={filters.airlines.includes(airline)}
                onCheckedChange={() => handleAirlineToggle(airline)}
              />
              <span className="text-sm text-foreground">{airline}</span>
            </label>
          ))}
        </div>
      </Card>

      {/* Depart Time Filter */}
      <Card className="p-6 bg-card border-border">
        <h3 className="font-semibold text-foreground mb-4">Departure Time</h3>
        <div className="space-y-3">
          {[
            { value: "all", label: "All Times" },
            { value: "morning", label: "Morning (6am - 12pm)" },
            { value: "afternoon", label: "Afternoon (12pm - 6pm)" },
            { value: "evening", label: "Evening (6pm - 12am)" },
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="departTime"
                value={option.value}
                checked={filters.departTime === option.value}
                onChange={(e) => setFilters({ ...filters, departTime: e.target.value })}
                className="w-4 h-4"
              />
              <span className="text-sm text-foreground">{option.label}</span>
            </label>
          ))}
        </div>
      </Card>

      {/* Clear Filters */}
      <Button
        variant="outline"
        className="w-full border-border text-foreground hover:bg-muted bg-transparent"
        onClick={() =>
          setFilters({
            priceRange: [0, 1000],
            airlines: [],
            stops: "all",
            departTime: "all",
            arrivalTime: "all",
            duration: "all",
          })
        }
      >
        Clear All Filters
      </Button>
    </div>
  )
}
