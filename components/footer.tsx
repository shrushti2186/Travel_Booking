"use client"

import Link from "next/link"
import { Plane } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                <Plane className="w-5 h-5 text-foreground" />
              </div>
              <span className="font-bold text-lg">Voyager</span>
            </div>
            <p className="text-sm opacity-75">
              Your trusted partner for discovering and booking amazing travel experiences worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/flights" className="opacity-75 hover:opacity-100 transition-opacity">
                  Flights
                </Link>
              </li>
              <li>
                <Link href="/hotels" className="opacity-75 hover:opacity-100 transition-opacity">
                  Hotels
                </Link>
              </li>
              <li>
                <Link href="/packages" className="opacity-75 hover:opacity-100 transition-opacity">
                  Packages
                </Link>
              </li>
              <li>
                <Link href="/deals" className="opacity-75 hover:opacity-100 transition-opacity">
                  Deals
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="opacity-75 hover:opacity-100 transition-opacity">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="opacity-75 hover:opacity-100 transition-opacity">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="opacity-75 hover:opacity-100 transition-opacity">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="opacity-75 hover:opacity-100 transition-opacity">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="opacity-75 hover:opacity-100 transition-opacity">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="opacity-75 hover:opacity-100 transition-opacity">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="opacity-75 hover:opacity-100 transition-opacity">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-sm opacity-75">
          <p>&copy; 2025 Voyager. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
