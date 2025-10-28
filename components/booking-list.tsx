"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plane, Hotel, MapPin, Calendar, ChevronDown, ChevronUp } from "lucide-react"

interface BookingListProps {
  filterStatus: string
  sortBy: string
}

const mockBookings = [
  {
    id: "BK001",
    type: "flight",
    title: "New York to Los Angeles",
    airline: "United Airlines",
    date: "2025-11-15",
    returnDate: "2025-11-22",
    price: 245,
    status: "upcoming",
    passengers: 2,
    confirmationCode: "UA123456",
    details: {
      departure: "08:00 AM",
      arrival: "11:30 AM",
      duration: "3h 30m",
      from: "JFK",
      to: "LAX",
    },
  },
  {
    id: "BK002",
    type: "hotel",
    title: "Luxury Ocean View Resort",
    location: "Santa Monica, CA",
    date: "2025-11-15",
    checkOut: "2025-11-22",
    price: 1995,
    status: "upcoming",
    nights: 7,
    confirmationCode: "HT789012",
    details: {
      roomType: "Deluxe Ocean View",
      guests: 2,
      amenities: ["WiFi", "Pool", "Spa"],
    },
  },
  {
    id: "BK003",
    type: "flight",
    title: "Los Angeles to San Francisco",
    airline: "Southwest Airlines",
    date: "2025-10-20",
    returnDate: "2025-10-23",
    price: 198,
    status: "completed",
    passengers: 1,
    confirmationCode: "SW456789",
    details: {
      departure: "06:30 AM",
      arrival: "08:15 AM",
      duration: "1h 45m",
      from: "LAX",
      to: "SFO",
    },
  },
  {
    id: "BK004",
    type: "hotel",
    title: "Downtown Boutique Hotel",
    location: "San Francisco, CA",
    date: "2025-10-20",
    checkOut: "2025-10-23",
    price: 495,
    status: "completed",
    nights: 3,
    confirmationCode: "BT234567",
    details: {
      roomType: "Standard Room",
      guests: 1,
      amenities: ["WiFi", "Restaurant"],
    },
  },
  {
    id: "BK005",
    type: "flight",
    title: "Miami to New York",
    airline: "JetBlue Airways",
    date: "2025-12-10",
    returnDate: "2025-12-17",
    price: 267,
    status: "upcoming",
    passengers: 2,
    confirmationCode: "JB567890",
    details: {
      departure: "12:00 PM",
      arrival: "03:30 PM",
      duration: "3h 30m",
      from: "MIA",
      to: "JFK",
    },
  },
]

export function BookingList({ filterStatus, sortBy }: BookingListProps) {
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null)

  let filteredBookings = [...mockBookings]

  // Apply status filter
  if (filterStatus !== "all") {
    filteredBookings = filteredBookings.filter((b) => b.status === filterStatus)
  }

  // Apply sorting
  if (sortBy === "recent") {
    filteredBookings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } else if (sortBy === "oldest") {
    filteredBookings.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  } else if (sortBy === "price-high") {
    filteredBookings.sort((a, b) => b.price - a.price)
  } else if (sortBy === "price-low") {
    filteredBookings.sort((a, b) => a.price - b.price)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-500/10 text-blue-700"
      case "completed":
        return "bg-green-500/10 text-green-700"
      case "cancelled":
        return "bg-red-500/10 text-red-700"
      default:
        return "bg-muted text-foreground"
    }
  }

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  return (
    <div className="space-y-4">
      {filteredBookings.length === 0 ? (
        <Card className="p-12 bg-card border-border text-center">
          <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-foreground font-medium mb-2">No bookings found</p>
          <p className="text-muted-foreground">You don't have any bookings matching the selected filters</p>
        </Card>
      ) : (
        filteredBookings.map((booking) => (
          <Card
            key={booking.id}
            className="bg-card border-border overflow-hidden cursor-pointer hover:shadow-lg transition-all"
            onClick={() => setExpandedBooking(expandedBooking === booking.id ? null : booking.id)}
          >
            {/* Main Booking Info */}
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                {/* Left Section */}
                <div className="flex items-start gap-4 flex-1">
                  {/* Icon */}
                  <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                    {booking.type === "flight" ? (
                      <Plane className="w-6 h-6 text-primary" />
                    ) : (
                      <Hotel className="w-6 h-6 text-primary" />
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-lg font-bold text-foreground">{booking.title}</h3>
                      <Badge className={getStatusColor(booking.status)}>{getStatusLabel(booking.status)}</Badge>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(booking.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      {booking.type === "flight" && (
                        <div className="flex items-center gap-1">
                          <Plane className="w-4 h-4" />
                          {booking.passengers} {booking.passengers === 1 ? "Passenger" : "Passengers"}
                        </div>
                      )}
                      {booking.type === "hotel" && (
                        <div className="flex items-center gap-1">
                          <Hotel className="w-4 h-4" />
                          {booking.nights} {booking.nights === 1 ? "Night" : "Nights"}
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {booking.type === "flight" ? booking.airline : booking.location}
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground mt-2">
                      Confirmation: <span className="font-mono">{booking.confirmationCode}</span>
                    </p>
                  </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">Total Price</p>
                    <p className="text-2xl font-bold text-primary">${booking.price}</p>
                  </div>
                  <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                    {expandedBooking === booking.id ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Expanded Details */}
            {expandedBooking === booking.id && (
              <div className="border-t border-border bg-muted/30 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {booking.type === "flight" ? (
                    <>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Departure</p>
                        <p className="font-semibold text-foreground">{booking.details.departure}</p>
                        <p className="text-sm text-muted-foreground">{booking.details.from}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Arrival</p>
                        <p className="font-semibold text-foreground">{booking.details.arrival}</p>
                        <p className="text-sm text-muted-foreground">{booking.details.to}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Duration</p>
                        <p className="font-semibold text-foreground">{booking.details.duration}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Return Date</p>
                        <p className="font-semibold text-foreground">
                          {new Date(booking.returnDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Room Type</p>
                        <p className="font-semibold text-foreground">{booking.details.roomType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Check-out</p>
                        <p className="font-semibold text-foreground">
                          {new Date(booking.checkOut).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Guests</p>
                        <p className="font-semibold text-foreground">{booking.details.guests}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Amenities</p>
                        <div className="flex flex-wrap gap-2">
                          {booking.details.amenities.map((amenity) => (
                            <span key={amenity} className="px-2 py-1 bg-background rounded text-xs text-foreground">
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                    View Details
                  </Button>
                  {booking.status === "upcoming" && (
                    <Button
                      variant="outline"
                      className="flex-1 border-border text-foreground hover:bg-muted bg-transparent"
                    >
                      Modify Booking
                    </Button>
                  )}
                  {booking.status === "upcoming" && (
                    <Button
                      variant="outline"
                      className="flex-1 border-destructive text-destructive hover:bg-destructive/10 bg-transparent"
                    >
                      Cancel Booking
                    </Button>
                  )}
                </div>
              </div>
            )}
          </Card>
        ))
      )}
    </div>
  )
}
