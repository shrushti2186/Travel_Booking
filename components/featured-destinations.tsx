"use client"

import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const destinations = [
  {
    id: 1,
    name: "Paris",
    country: "France",
    image: "/eiffel-tower-paris-city.jpg",
    price: "$599",
    rating: 4.8,
    reviews: 2341,
  },
  {
    id: 2,
    name: "Tokyo",
    country: "Japan",
    image: "/tokyo-skyline-night.png",
    price: "$799",
    rating: 4.9,
    reviews: 1856,
  },
  {
    id: 3,
    name: "Bali",
    country: "Indonesia",
    image: "/bali-beach-tropical.jpg",
    price: "$449",
    rating: 4.7,
    reviews: 3124,
  },
  {
    id: 4,
    name: "New York",
    country: "USA",
    image: "/nyc-skyline.png",
    price: "$399",
    rating: 4.6,
    reviews: 4521,
  },
]

export function FeaturedDestinations() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Featured Destinations</h2>
          <p className="text-lg text-muted-foreground">Explore our most popular travel destinations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <Link key={destination.id} href={`/destination/${destination.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="relative h-48 bg-muted overflow-hidden">
                  <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 right-3 bg-secondary text-secondary-foreground">
                    {destination.price}
                  </Badge>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-foreground">{destination.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{destination.country}</p>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-foreground">★ {destination.rating}</span>
                    <span className="text-xs text-muted-foreground">({destination.reviews} reviews)</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
