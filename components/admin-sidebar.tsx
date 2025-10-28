"use client"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Plane, Hotel, Settings, LogOut } from "lucide-react"

interface AdminSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.href = "/"
  }

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "flights", label: "Flight Inventory", icon: Plane },
    { id: "hotels", label: "Hotel Inventory", icon: Hotel },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-bold text-foreground">Admin Panel</h2>
        <p className="text-sm text-muted-foreground mt-1">Inventory Management</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full border-border text-foreground hover:bg-muted bg-transparent justify-start"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
