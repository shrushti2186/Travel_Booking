"use client"

import { Card } from "@/components/ui/card"
import { Shield, Zap, DollarSign, Clock } from "lucide-react"

const benefits = [
  {
    icon: DollarSign,
    title: "Best Price Guarantee",
    description: "We guarantee the lowest prices on flights and hotels. If you find a better deal, we'll match it.",
  },
  {
    icon: Zap,
    title: "Instant Booking",
    description: "Book your travel in seconds with our streamlined booking process and instant confirmation.",
  },
  {
    icon: Shield,
    title: "Secure & Safe",
    description: "Your personal and payment information is protected with industry-leading security standards.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Our dedicated support team is available round the clock to help with any travel needs.",
  },
]

export function TravelBenefits() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose Voyager?</h2>
          <p className="text-lg text-muted-foreground">Experience the best travel booking platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
