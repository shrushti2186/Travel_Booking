"use client"

import { Card } from "@/components/ui/card"
import { Plane, Hotel, DollarSign, Calendar } from "lucide-react"

export function BookingStats() {
  const stats = [
    {
      label: "Total Bookings",
      value: "8",
      icon: Calendar,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Upcoming Trips",
      value: "3",
      icon: Plane,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      label: "Hotels Booked",
      value: "5",
      icon: Hotel,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Total Spent",
      value: "$4,250",
      icon: DollarSign,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className="p-6 bg-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
