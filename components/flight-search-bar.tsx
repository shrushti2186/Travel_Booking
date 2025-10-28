"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { MapPin, Calendar, ArrowRight } from "lucide-react"

export function FlightSearchBar() {
  const [from, setFrom] = useState("New York (JFK)")
  const [to, setTo] = useState("Los Angeles (LAX)")
  const [departDate, setDepartDate] = useState("2025-11-15")
  const [returnDate, setReturnDate] = useState("2025-11-22")
  const [passengers, setPassengers] = useState("1")

  return (
    <div className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Card className="p-6 bg-card/95 backdrop-blur border-border">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* From */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">From</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="pl-10 bg-input border-border text-foreground"
                />
              </div>
            </div>

            {/* To */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">To</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="pl-10 bg-input border-border text-foreground"
                />
              </div>
            </div>

            {/* Depart Date */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">Depart</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  type="date"
                  value={departDate}
                  onChange={(e) => setDepartDate(e.target.value)}
                  className="pl-10 bg-input border-border text-foreground"
                />
              </div>
            </div>

            {/* Return Date */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">Return</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="pl-10 bg-input border-border text-foreground"
                />
              </div>
            </div>

            {/* Passengers */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">Passengers</label>
              <select
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6">
            <ArrowRight className="w-4 h-4 mr-2" />
            Update Search
          </Button>
        </Card>
      </div>
    </div>
  )
}
