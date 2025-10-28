"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { MapPin, Calendar, Users, Search } from "lucide-react"

export function HotelSearchBar() {
  const [destination, setDestination] = useState("Los Angeles, CA")
  const [checkIn, setCheckIn] = useState("2025-11-15")
  const [checkOut, setCheckOut] = useState("2025-11-22")
  const [guests, setGuests] = useState("2")
  const [rooms, setRooms] = useState("1")

  return (
    <div className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Card className="p-6 bg-card/95 backdrop-blur border-border">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {/* Destination */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">Destination</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="pl-10 bg-input border-border text-foreground"
                />
              </div>
            </div>

            {/* Check-in */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">Check-in</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="pl-10 bg-input border-border text-foreground"
                />
              </div>
            </div>

            {/* Check-out */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">Check-out</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="pl-10 bg-input border-border text-foreground"
                />
              </div>
            </div>

            {/* Guests */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">Guests</label>
              <div className="relative">
                <Users className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 bg-input border border-border rounded-md text-foreground"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Rooms */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">Rooms</label>
              <select
                value={rooms}
                onChange={(e) => setRooms(e.target.value)}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div className="flex flex-col gap-2 justify-end">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
