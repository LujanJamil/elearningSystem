"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Package, GraduationCap, UserCircle, Bell } from "lucide-react"
import { useEffect, useState } from "react"

export default function Navigation() {
  const pathname = usePathname()
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
    return pathname === path
  }

  const navItems = [
    {
      name: "Home",
      href: "/dashboard",
      icon: Home,
    },
    {
      name: "My class",
      href: "/dashboard",
      icon: Package,
    },
    {
      name: "My courses",
      href: "/dashboard/courses",
      icon: GraduationCap,
    },
    {
      name: "Account",
      href: "/dashboard/account",
      icon: UserCircle,
    },
    {
      name: "Notifications",
      href: "/dashboard/notifications",
      icon: Bell,
    },
  ]

  return (
    <nav className="navbar-bottom">
      <div className="container-fluid px-1 px-md-3">
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
                  <Icon className={`icon ${isActive(item.href) ? "icon-blue" : ""}`} size={isMobile ? 20 : 24} />
                  <span className={`${isMobile ? "small" : ""}`}>{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
