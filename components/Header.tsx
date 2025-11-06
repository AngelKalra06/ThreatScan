"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/app/context/AuthContext"
import { Button } from "@/components/ui/button"

export default function Header() {
  const pathname = usePathname()
  const { isLoggedIn, logout, isAuthReady } = useAuth()

  const navLink = (href: string, label: string) => {
    const isActive = pathname === href
    return (
      <Link
        href={href}
        className={`px-3 py-2 rounded-lg transition-colors ${
          isActive
            ? "text-white bg-cyan-500/20"
            : "text-gray-300 hover:text-white hover:bg-gray-700/40"
        }`}
      >
        {label}
      </Link>
    )
  }

  return (
    <div className="w-full border-b border-gray-800/60 bg-gray-900/70 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-white font-bold text-xl">ThreatScan</Link>
        <nav className="flex items-center gap-2">
          {navLink("/home", "Home")}
          {navLink("/", "Scan")}
          {navLink("/report", "History")}
        </nav>
        <div>
          {!isAuthReady ? null : isLoggedIn ? (
            <Button onClick={logout} variant="outline" className="border-cyan-500/50 text-cyan-300 bg-transparent hover:bg-cyan-500/10">
              Logout
            </Button>
          ) : (
            <Link href="/login">
              <Button variant="outline" className="border-cyan-500/50 text-cyan-300 bg-transparent hover:bg-cyan-500/10">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}


