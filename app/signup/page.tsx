"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Mail, Lock, User, AlertCircle, CheckCircle } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Validation
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setError("Please fill in all fields")
        return
      }

      if (!formData.email.includes("@")) {
        setError("Please enter a valid email")
        return
      }

      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters")
        return
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match")
        return
      }

      // Store user session
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: "user-" + Math.random().toString(36).substr(2, 9),
          name: formData.name,
          email: formData.email,
          createdAt: new Date().toISOString(),
        }),
      )

      setSuccess(true)
      setTimeout(() => {
        router.push("/profile")
      }, 1500)
    } catch (err) {
      setError("Signup failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md p-8 bg-card border-border">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Create Account</h1>
            <p className="text-muted-foreground">Join Voyager and start exploring</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            {error && (
              <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {success && (
              <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="text-sm text-green-600">Account created successfully!</p>
              </div>
            )}

            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input type="checkbox" id="terms" className="w-4 h-4 mt-1" />
              <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                I agree to the Terms of Service and Privacy Policy
              </label>
            </div>

            {/* Sign Up Button */}
            <Button
              type="submit"
              disabled={loading || success}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6"
            >
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:text-primary/90 font-medium">
              Sign in
            </Link>
          </p>
        </Card>
      </div>

      <Footer />
    </main>
  )
}
