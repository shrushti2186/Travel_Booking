"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"

interface HotelFiltersProps {
  filters: {
    priceRange: [number, number]
    rating: number
    amenities: string[]
    hotelType: string
    guestRating: string
  }
  setFilters: (filters: any) => void
}

export function HotelFilters({ filters, setFilters }: HotelFiltersProps) {
  const amenities = ["WiFi", "Pool", "Gym", "Parking", "Restaurant", "Spa", "Business Center", "Pet Friendly"]
  const hotelTypes = [
    { value: "all", label: "All Hotels" },
    { value: "luxury", label: "Luxury" },
    { value: "boutique", label: "Boutique" },
    { value: "budget", label: "Budget" },
    { value: "resort", label: "Resort" },
  ]

  const handlePriceChange = (value: number[]) => {
    setFilters({ ...filters, priceRange: [value[0], value[1]] })
  }

  const handleAmenityToggle = (amenity: string) => {
    const updated = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity]
    setFilters({ ...filters, amenities: updated })
  }

  return (
    <div className="space-y-6">
      {/* Price Filter */}
      <Card className="p-6 bg-card border-border">
        <h3 className="font-semibold text-foreground mb-4">Price per Night</h3>
        <Slider
          value={filters.priceRange}
          onValueChange={handlePriceChange}
          min={0}
          max={500}
          step={10}
          className="mb-4"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${filters.priceRange[0]}</span>
          <span>${filters.priceRange[1]}</span>
        </div>
      </Card>

      {/* Guest Rating Filter */}
      <Card className="p-6 bg-card border-border">
        <h3 className="font-semibold text-foreground mb-4">Guest Rating</h3>
        <div className="space-y-3">
          {[
            { value: "all", label: "All Ratings" },
            { value: "5", label: "5 Stars" },
            { value: "4", label: "4+ Stars" },
            { value: "3", label: "3+ Stars" },
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="guestRating"
                value={option.value}
                checked={filters.guestRating === option.value}
                onChange={(e) => setFilters({ ...filters, guestRating: e.target.value })}
                className="w-4 h-4"
              />
              <span className="text-sm text-foreground">{option.label}</span>
            </label>
          ))}
        </div>
      </Card>

      {/* Hotel Type Filter */}
      <Card className="p-6 bg-card border-border">
        <h3 className="font-semibold text-foreground mb-4">Hotel Type</h3>
        <div className="space-y-3">
          {hotelTypes.map((type) => (
            <label key={type.value} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="hotelType"
                value={type.value}
                checked={filters.hotelType === type.value}
                onChange={(e) => setFilters({ ...filters, hotelType: e.target.value })}
                className="w-4 h-4"
              />
              <span className="text-sm text-foreground">{type.label}</span>
            </label>
          ))}
        </div>
      </Card>

      {/* Amenities Filter */}
      <Card className="p-6 bg-card border-border">
        <h3 className="font-semibold text-foreground mb-4">Amenities</h3>
        <div className="space-y-3">
          {amenities.map((amenity) => (
            <label key={amenity} className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                checked={filters.amenities.includes(amenity)}
                onCheckedChange={() => handleAmenityToggle(amenity)}
              />
              <span className="text-sm text-foreground">{amenity}</span>
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
            priceRange: [0, 500],
            rating: 0,
            amenities: [],
            hotelType: "all",
            guestRating: "all",
          })
        }
      >
        Clear All Filters
      </Button>
    </div>
  )
}
