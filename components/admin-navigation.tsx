"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, BookOpen, Bell, Settings, LogOut } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminNavigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)

  // Check if the device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + "/")
  }

  const handleLogout = () => {
    // In a real app, you would handle the logout logic here
    router.push("/")
  }

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: Home,
    },
    {
      name: "Students",
      href: "/admin/students",
      icon: Users,
    },
    {
      name: "Courses",
      href: "/admin/courses",
      icon: BookOpen,
    },
    {
      name: "Notifications",
      href: "/admin/notifications",
      icon: Bell,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  return (
    <>
      {/* Top Navigation for Desktop */}
      <nav className="bg-dark-blue fixed top-0 left-0 right-0 z-50 shadow-md hidden md:block">
        <div className="container-fluid px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/admin/dashboard" className="flex items-center">
                <img
                  src="/logo.png"
                  alt="Sama Islamic Digital College"
                  className="h-10 w-10 rounded-full border border-primary p-1 mr-3"
                />
                <span className="text-white font-semibold text-lg">Admin Portal</span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              {navItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <Link
                    key={index}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? "text-white bg-primary/20"
                        : "text-gray-300 hover:text-white hover:bg-primary/10"
                    }`}
                  >
                    <div className="flex items-center">
                      <Icon className="h-5 w-5 mr-2" />
                      {item.name}
                    </div>
                  </Link>
                )
              })}

              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-red-900/30 transition-colors"
              >
                <div className="flex items-center">
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Navigation for Mobile */}
      <nav className="navbar-bottom md:hidden bg-dark-blue">
        <div className="container-fluid px-1">
          <ul className="navbar-nav d-flex flex-row justify-content-between align-items-center m-0 p-0">
            {navItems.map((item, index) => {
              const Icon = item.icon
              return (
                <li key={index} className="nav-item">
                  <Link
                    href={item.href}
                    className={`nav-link ${isActive(item.href) ? "active" : ""}`}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    <Icon className={`icon ${isActive(item.href) ? "icon-blue" : ""}`} size={20} />
                    <span className="small">{item.name}</span>
                  </Link>
                </li>
              )
            })}
            <li className="nav-item">
              <button onClick={handleLogout} className="nav-link">
                <LogOut className="icon text-red-500" size={20} />
                <span className="small">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}
