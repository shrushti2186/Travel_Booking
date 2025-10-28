"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plane } from "lucide-react"

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Plane className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground">Voyager</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/flights" className="text-sm text-foreground hover:text-primary transition-colors">
              Flights
            </Link>
            <Link href="/hotels" className="text-sm text-foreground hover:text-primary transition-colors">
              Hotels
            </Link>
            <Link href="/packages" className="text-sm text-foreground hover:text-primary transition-colors">
              Packages
            </Link>
            <Link href="/deals" className="text-sm text-foreground hover:text-primary transition-colors">
              Deals
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
