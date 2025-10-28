"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit2, Trash2, Search } from "lucide-react"

interface Flight {
  id: string
  airline: string
  departure: string
  arrival: string
  from: string
  to: string
  price: number
  seats: number
  status: "active" | "inactive"
}

export function FlightInventory() {
  const [flights, setFlights] = useState<Flight[]>([
    {
      id: "FL001",
      airline: "United Airlines",
      departure: "08:00",
      arrival: "11:30",
      from: "JFK",
      to: "LAX",
      price: 245,
      seats: 45,
      status: "active",
    },
    {
      id: "FL002",
      airline: "American Airlines",
      departure: "10:15",
      arrival: "13:45",
      from: "JFK",
      to: "LAX",
      price: 289,
      seats: 32,
      status: "active",
    },
    {
      id: "FL003",
      airline: "Delta Air Lines",
      departure: "14:00",
      arrival: "17:20",
      from: "JFK",
      to: "LAX",
      price: 312,
      seats: 0,
      status: "inactive",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const filteredFlights = flights.filter(
    (f) =>
      f.airline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.to.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = (id: string) => {
    setFlights(flights.filter((f) => f.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Flight Inventory</h1>
          <p className="text-muted-foreground">Manage all available flights</p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Flight
        </Button>
      </div>

      {/* Add Flight Form */}
      {showForm && (
        <Card className="p-6 bg-card border-border">
          <h2 className="text-lg font-bold text-foreground mb-4">Add New Flight</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input placeholder="Airline" className="bg-input border-border text-foreground" />
            <Input placeholder="From (e.g., JFK)" className="bg-input border-border text-foreground" />
            <Input placeholder="To (e.g., LAX)" className="bg-input border-border text-foreground" />
            <Input placeholder="Departure Time" type="time" className="bg-input border-border text-foreground" />
            <Input placeholder="Arrival Time" type="time" className="bg-input border-border text-foreground" />
            <Input placeholder="Price" type="number" className="bg-input border-border text-foreground" />
            <Input placeholder="Available Seats" type="number" className="bg-input border-border text-foreground" />
          </div>
          <div className="flex gap-3 mt-4">
            <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
              Save Flight
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
          placeholder="Search flights..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* Flights Table */}
      <Card className="bg-card border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Airline</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Route</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Time</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Price</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Seats</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFlights.map((flight) => (
                <tr key={flight.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 text-foreground">{flight.airline}</td>
                  <td className="px-6 py-4 text-foreground">
                    {flight.from} → {flight.to}
                  </td>
                  <td className="px-6 py-4 text-foreground">
                    {flight.departure} - {flight.arrival}
                  </td>
                  <td className="px-6 py-4 text-foreground font-semibold">${flight.price}</td>
                  <td className="px-6 py-4 text-foreground">{flight.seats}</td>
                  <td className="px-6 py-4">
                    <Badge
                      className={
                        flight.status === "active" ? "bg-green-500/10 text-green-700" : "bg-red-500/10 text-red-700"
                      }
                    >
                      {flight.status}
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
                        onClick={() => handleDelete(flight.id)}
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
        Showing {filteredFlights.length} of {flights.length} flights
      </p>
    </div>
  )
}
