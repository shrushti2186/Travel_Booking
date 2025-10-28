"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribed(true)
    setEmail("")
    setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-4">
          <Mail className="w-8 h-8" />
        </div>
        <h2 className="text-4xl font-bold mb-4">Get Exclusive Travel Deals</h2>
        <p className="text-lg mb-8 opacity-90">
          Subscribe to our newsletter and receive the best travel offers directly in your inbox
        </p>

        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-primary-foreground text-foreground placeholder:text-muted-foreground border-0"
          />
          <Button
            type="submit"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold whitespace-nowrap"
          >
            Subscribe
          </Button>
        </form>

        {subscribed && <p className="mt-4 text-sm opacity-90">✓ Thank you for subscribing!</p>}
      </div>
    </section>
  )
}
