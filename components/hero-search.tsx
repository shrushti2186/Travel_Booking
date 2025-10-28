"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Plane, MapPin, Calendar, Users } from "lucide-react"

export function HeroSearch() {
  const [tripType, setTripType] = useState("roundtrip")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [departDate, setDepartDate] = useState("")
  const [returnDate, setReturnDate] = useState("")
  const [passengers, setPassengers] = useState("1")

  const handleSearch = () => {
    // Navigate to search results
    console.log("Searching for flights:", { tripType, from, to, departDate, returnDate, passengers })
  }

  return (
    <section className="relative min-h-[600px] bg-gradient-to-br from-primary/10 via-background to-background overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 text-balance">
            Discover Your Next Adventure
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Find the best flights, hotels, and travel packages to destinations around the world
          </p>
        </div>

        <Card className="max-w-4xl mx-auto p-8 bg-card/95 backdrop-blur border-border shadow-xl">
          {/* Trip Type Selection */}
          <div className="flex gap-4 mb-8 border-b border-border pb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="roundtrip"
                checked={tripType === "roundtrip"}
                onChange={(e) => setTripType(e.target.value)}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium text-foreground">Round Trip</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="oneway"
                checked={tripType === "oneway"}
                onChange={(e) => setTripType(e.target.value)}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium text-foreground">One Way</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="multicity"
                checked={tripType === "multicity"}
                onChange={(e) => setTripType(e.target.value)}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium text-foreground">Multi-City</span>
            </label>
          </div>

          {/* Search Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            {/* From */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">From</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Departure city"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* To */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">To</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Destination city"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground"
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
            {tripType === "roundtrip" && (
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
            )}

            {/* Passengers */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">Passengers</label>
              <div className="relative">
                <Users className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 bg-input border border-border rounded-md text-foreground"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Passenger" : "Passengers"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg"
          >
            <Plane className="w-5 h-5 mr-2" />
            Search Flights
          </Button>
        </Card>
      </div>
    </section>
  )
}
