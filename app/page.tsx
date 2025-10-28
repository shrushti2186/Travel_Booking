"use client"
import { Navigation } from "@/components/navigation"
import { HeroSearch } from "@/components/hero-search"
import { FeaturedDestinations } from "@/components/featured-destinations"
import { TravelBenefits } from "@/components/travel-benefits"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSearch />
      <FeaturedDestinations />
      <TravelBenefits />
      <Newsletter />
      <Footer />
    </main>
  )
}
