"use client"

import { Card } from "@/components/ui/card"
import { Plane, Hotel, Users, TrendingUp } from "lucide-react"

export function AdminDashboard() {
  const stats = [
    {
      label: "Total Flights",
      value: "156",
      icon: Plane,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Total Hotels",
      value: "89",
      icon: Hotel,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      label: "Active Users",
      value: "2,341",
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Revenue (This Month)",
      value: "$45,230",
      icon: TrendingUp,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the admin panel. Manage your inventory and view analytics.</p>
      </div>

      {/* Stats Grid */}
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

      {/* Recent Activity */}
      <Card className="p-6 bg-card border-border">
        <h2 className="text-xl font-bold text-foreground mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { action: "New flight added", time: "2 hours ago", type: "flight" },
            { action: "Hotel inventory updated", time: "4 hours ago", type: "hotel" },
            { action: "New user registration", time: "6 hours ago", type: "user" },
            { action: "Booking completed", time: "8 hours ago", type: "booking" },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <p className="text-foreground">{activity.action}</p>
              <p className="text-sm text-muted-foreground">{activity.time}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
