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
import { Mail, Lock, AlertCircle } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Simulate API call
      if (!email || !password) {
        setError("Please fill in all fields")
        return
      }

      if (!email.includes("@")) {
        setError("Please enter a valid email")
        return
      }

      // Store user session in localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: "user-" + Math.random().toString(36).substr(2, 9),
          email,
          name: email.split("@")[0],
          createdAt: new Date().toISOString(),
        }),
      )

      router.push("/profile")
    } catch (err) {
      setError("Login failed. Please try again.")
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your Voyager account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="w-4 h-4" />
              <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                Remember me
              </label>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">Or</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary hover:text-primary/90 font-medium">
              Sign up
            </Link>
          </p>

          {/* Forgot Password */}
          <p className="text-center text-sm mt-4">
            <Link href="#" className="text-primary hover:text-primary/90 font-medium">
              Forgot password?
            </Link>
          </p>
        </Card>
      </div>

      <Footer />
    </main>
  )
}
