"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit2, Trash2, Search, Star } from "lucide-react"

interface Hotel {
  id: string
  name: string
  location: string
  rating: number
  price: number
  rooms: number
  status: "active" | "inactive"
}

export function HotelInventory() {
  const [hotels, setHotels] = useState<Hotel[]>([
    {
      id: "HT001",
      name: "Luxury Ocean View Resort",
      location: "Santa Monica, CA",
      rating: 4.8,
      price: 285,
      rooms: 24,
      status: "active",
    },
    {
      id: "HT002",
      name: "Downtown Boutique Hotel",
      location: "Downtown LA, CA",
      rating: 4.6,
      price: 165,
      rooms: 18,
      status: "active",
    },
    {
      id: "HT003",
      name: "Budget Inn Express",
      location: "Hollywood, CA",
      rating: 4.2,
      price: 89,
      rooms: 0,
      status: "inactive",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)

  const filteredHotels = hotels.filter(
    (h) =>
      h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = (id: string) => {
    setHotels(hotels.filter((h) => h.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Hotel Inventory</h1>
          <p className="text-muted-foreground">Manage all available hotels</p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Hotel
        </Button>
      </div>

      {/* Add Hotel Form */}
      {showForm && (
        <Card className="p-6 bg-card border-border">
          <h2 className="text-lg font-bold text-foreground mb-4">Add New Hotel</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input placeholder="Hotel Name" className="bg-input border-border text-foreground" />
            <Input placeholder="Location" className="bg-input border-border text-foreground" />
            <Input
              placeholder="Rating (1-5)"
              type="number"
              step="0.1"
              className="bg-input border-border text-foreground"
            />
            <Input placeholder="Price per Night" type="number" className="bg-input border-border text-foreground" />
            <Input placeholder="Available Rooms" type="number" className="bg-input border-border text-foreground" />
          </div>
          <div className="flex gap-3 mt-4">
            <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
              Save Hotel
            </Button>
            <Button
              onClick={() => setShowForm(false)}
              variant="outline"
              className="flex-1 border-border text-foreground hover:bg-muted bg-transparent"
            >
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search hotels..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* Hotels Table */}
      <Card className="bg-card border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Hotel Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Location</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Rating</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Price/Night</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Rooms</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHotels.map((hotel) => (
                <tr key={hotel.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 text-foreground font-medium">{hotel.name}</td>
                  <td className="px-6 py-4 text-foreground">{hotel.location}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-secondary text-secondary" />
                      <span className="text-foreground">{hotel.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-foreground font-semibold">${hotel.price}</td>
                  <td className="px-6 py-4 text-foreground">{hotel.rooms}</td>
                  <td className="px-6 py-4">
                    <Badge
                      className={
                        hotel.status === "active" ? "bg-green-500/10 text-green-700" : "bg-red-500/10 text-red-700"
                      }
                    >
                      {hotel.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-border text-foreground hover:bg-muted bg-transparent"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(hotel.id)}
                        className="border-destructive text-destructive hover:bg-destructive/10 bg-transparent"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Results Count */}
      <p className="text-sm text-muted-foreground">
        Showing {filteredHotels.length} of {hotels.length} hotels
      </p>
    </div>
  )
}
