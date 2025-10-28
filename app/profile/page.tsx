"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { User, LogOut, Edit2, Save, X } from "lucide-react"

interface UserData {
  id: string
  name: string
  email: string
  createdAt: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({ name: "", email: "" })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }

    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)
    setEditData({ name: parsedUser.name, email: parsedUser.email })
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const handleSaveProfile = () => {
    if (user) {
      const updatedUser = { ...user, ...editData }
      localStorage.setItem("user", JSON.stringify(updatedUser))
      setUser(updatedUser)
      setIsEditing(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
        <Footer />
      </main>
    )
  }

  if (!user) {
    return null
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <div className="flex-1">
        <div className="bg-primary/5 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
            <p className="text-muted-foreground mt-2">Manage your account settings and preferences</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <Card className="lg:col-span-1 p-6 bg-card border-border">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-1">{user.name}</h2>
                <p className="text-sm text-muted-foreground mb-6">{user.email}</p>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full border-border text-foreground hover:bg-muted bg-transparent"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </Card>

            {/* Account Settings */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card className="p-6 bg-card border-border">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-foreground">Personal Information</h3>
                  {!isEditing && (
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      size="sm"
                      className="border-border text-foreground hover:bg-muted bg-transparent"
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-foreground">Full Name</label>
                      <Input
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        className="bg-input border-border text-foreground"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-foreground">Email Address</label>
                      <Input
                        type="email"
                        value={editData.email}
                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                        className="bg-input border-border text-foreground"
                      />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={handleSaveProfile}
                        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button
                        onClick={() => setIsEditing(false)}
                        variant="outline"
                        className="flex-1 border-border text-foreground hover:bg-muted bg-transparent"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Full Name</p>
                      <p className="text-foreground font-medium">{user.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Email Address</p>
                      <p className="text-foreground font-medium">{user.email}</p>
                    </div>
                  </div>
                )}
              </Card>

              {/* Account Information */}
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-bold text-foreground mb-6">Account Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Account ID</p>
                    <p className="text-foreground font-mono text-sm">{user.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Member Since</p>
                    <p className="text-foreground font-medium">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Quick Links */}
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-bold text-foreground mb-6">Quick Links</h3>
                <div className="space-y-3">
                  <Link
                    href="/bookings"
                    className="block p-3 rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-colors"
                  >
                    View My Bookings
                  </Link>
                  <Link
                    href="/flights"
                    className="block p-3 rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-colors"
                  >
                    Search Flights
                  </Link>
                  <Link
                    href="/hotels"
                    className="block p-3 rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-colors"
                  >
                    Search Hotels
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
