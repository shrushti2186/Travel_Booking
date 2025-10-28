"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Wifi, Droplet, Dumbbell } from "lucide-react"

interface HotelResultsProps {
  filters: any
  sortBy: string
  setSortBy: (sort: string) => void
}

const mockHotels = [
  {
    id: 1,
    name: "Luxury Ocean View Resort",
    type: "resort",
    location: "Santa Monica, CA",
    rating: 4.8,
    reviews: 324,
    pricePerNight: 285,
    image: "/luxury-resort-hotel.jpg",
    amenities: ["WiFi", "Pool", "Gym", "Restaurant", "Spa"],
    description: "Stunning beachfront resort with world-class amenities",
  },
  {
    id: 2,
    name: "Downtown Boutique Hotel",
    type: "boutique",
    location: "Downtown LA, CA",
    rating: 4.6,
    reviews: 287,
    pricePerNight: 165,
    image: "/boutique-hotel-downtown.jpg",
    amenities: ["WiFi", "Business Center", "Restaurant"],
    description: "Charming boutique hotel in the heart of downtown",
  },
  {
    id: 3,
    name: "Budget Inn Express",
    type: "budget",
    location: "Hollywood, CA",
    rating: 4.2,
    reviews: 156,
    pricePerNight: 89,
    image: "/budget-hotel.jpg",
    amenities: ["WiFi", "Parking"],
    description: "Affordable and comfortable budget accommodation",
  },
  {
    id: 4,
    name: "Luxury Hilton Downtown",
    type: "luxury",
    location: "Downtown LA, CA",
    rating: 4.9,
    reviews: 512,
    pricePerNight: 425,
    image: "/luxury-hilton-hotel.jpg",
    amenities: ["WiFi", "Pool", "Gym", "Spa", "Restaurant", "Business Center"],
    description: "Premium luxury hotel with exceptional service",
  },
  {
    id: 5,
    name: "Beachside Resort & Spa",
    type: "resort",
    location: "Venice Beach, CA",
    rating: 4.7,
    reviews: 398,
    pricePerNight: 295,
    image: "/beachside-resort-spa.jpg",
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Pet Friendly"],
    description: "Relaxing beachside resort with spa facilities",
  },
  {
    id: 6,
    name: "Modern City Hotel",
    type: "boutique",
    location: "West Hollywood, CA",
    rating: 4.5,
    reviews: 203,
    pricePerNight: 195,
    image: "/modern-city-hotel.png",
    amenities: ["WiFi", "Gym", "Restaurant", "Business Center"],
    description: "Contemporary hotel with modern amenities",
  },
]

export function HotelResults({ filters, sortBy, setSortBy }: HotelResultsProps) {
  const [selectedHotel, setSelectedHotel] = useState<number | null>(null)

  let results = [...mockHotels]

  // Apply filters
  if (filters.priceRange) {
    results = results.filter(
      (h) => h.pricePerNight >= filters.priceRange[0] && h.pricePerNight <= filters.priceRange[1],
    )
  }

  if (filters.hotelType !== "all") {
    results = results.filter((h) => h.type === filters.hotelType)
  }

  if (filters.amenities.length > 0) {
    results = results.filter((h) => filters.amenities.some((a) => h.amenities.includes(a)))
  }

  if (filters.guestRating !== "all") {
    const minRating = Number.parseInt(filters.guestRating)
    results = results.filter((h) => h.rating >= minRating)
  }

  // Apply sorting
  if (sortBy === "price-low") {
    results.sort((a, b) => a.pricePerNight - b.pricePerNight)
  } else if (sortBy === "price-high") {
    results.sort((a, b) => b.pricePerNight - a.pricePerNight)
  } else if (sortBy === "rating") {
    results.sort((a, b) => b.rating - a.rating)
  } else if (sortBy === "recommended") {
    results.sort((a, b) => b.reviews - a.reviews)
  }

  const amenityIcons: Record<string, React.ReactNode> = {
    WiFi: <Wifi className="w-4 h-4" />,
    Pool: <Droplet className="w-4 h-4" />,
    Gym: <Dumbbell className="w-4 h-4" />,
  }

  return (
    <div className="space-y-6">
      {/* Sort Options */}
      <div className="flex gap-2 flex-wrap">
        <span className="text-sm font-medium text-foreground self-center">Sort by:</span>
        {[
          { value: "recommended", label: "Recommended" },
          { value: "price-low", label: "Price: Low to High" },
          { value: "price-high", label: "Price: High to Low" },
          { value: "rating", label: "Rating" },
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
        Showing {results.length} hotel{results.length !== 1 ? "s" : ""}
      </div>

      {/* Hotel Cards */}
      <div className="space-y-4">
        {results.map((hotel) => (
          <Card
            key={hotel.id}
            className={`overflow-hidden bg-card border-border cursor-pointer transition-all hover:shadow-lg ${
              selectedHotel === hotel.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => setSelectedHotel(hotel.id)}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
              {/* Image */}
              <div className="md:col-span-1">
                <img
                  src={hotel.image || "/placeholder.svg"}
                  alt={hotel.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>

              {/* Hotel Info */}
              <div className="md:col-span-2 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{hotel.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(hotel.rating) ? "fill-secondary text-secondary" : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-foreground">{hotel.rating}</span>
                    <span className="text-sm text-muted-foreground">({hotel.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <MapPin className="w-4 h-4" />
                    {hotel.location}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{hotel.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {hotel.amenities.slice(0, 3).map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center gap-1 px-2 py-1 bg-muted rounded text-xs text-foreground"
                      >
                        {amenityIcons[amenity] || null}
                        {amenity}
                      </div>
                    ))}
                    {hotel.amenities.length > 3 && (
                      <div className="px-2 py-1 bg-muted rounded text-xs text-foreground">
                        +{hotel.amenities.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Price & Booking */}
              <div className="md:col-span-1 flex flex-col justify-between items-end">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">per night</p>
                  <p className="text-3xl font-bold text-primary">${hotel.pricePerNight}</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold w-full">
                  Book Now
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {results.length === 0 && (
        <Card className="p-12 bg-card border-border text-center">
          <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-foreground font-medium mb-2">No hotels found</p>
          <p className="text-muted-foreground">Try adjusting your filters or search criteria</p>
        </Card>
      )}
    </div>
  )
}
