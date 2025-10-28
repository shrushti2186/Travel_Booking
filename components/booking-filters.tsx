"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Search, Filter } from "lucide-react"

interface BookingFiltersProps {
  filterStatus: string
  setFilterStatus: (status: string) => void
  sortBy: string
  setSortBy: (sort: string) => void
}

export function BookingFilters({ filterStatus, setFilterStatus, sortBy, setSortBy }: BookingFiltersProps) {
  const statuses = [
    { value: "all", label: "All Bookings" },
    { value: "upcoming", label: "Upcoming" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ]

  const sortOptions = [
    { value: "recent", label: "Most Recent" },
    { value: "oldest", label: "Oldest First" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "price-low", label: "Price: Low to High" },
  ]

  return (
    <Card className="p-6 bg-card border-border">
      <div className="space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search bookings..."
            className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Filters and Sort */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Status Filter */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <label className="text-sm font-medium text-foreground">Status</label>
            </div>
            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => (
                <Button
                  key={status.value}
                  variant={filterStatus === status.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus(status.value)}
                  className={
                    filterStatus === status.value
                      ? "bg-primary text-primary-foreground"
                      : "border-border text-foreground hover:bg-muted bg-transparent"
                  }
                >
                  {status.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-3">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </Card>
  )
}
