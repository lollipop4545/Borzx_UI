"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSession, signOut } from "next-auth/react"
import { LayoutDashboard, BarChart3, PlusCircle, Settings, LogOut, Users } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
        <Link href="https://app.borzx.site" className="flex items-center gap-2 mr-6">
          <img src="/logo.png" alt="Borzx Logo" className="h-8 w-auto object-contain" />
        </Link>

        <div className="flex items-center space-x-4 lg:space-x-6 mx-auto sm:mx-6 overflow-x-auto no-scrollbar">
          <Link
            href="/app/surl/dashboard"
            className={`text-sm font-medium transition-colors flex items-center gap-2 ${pathname === '/app/surl/dashboard' ? 'text-primary drop-shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <LayoutDashboard className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
          <Link
            href="/app/surl/dashboard/statistics"
            className={`text-sm font-medium transition-colors flex items-center gap-2 ${pathname.startsWith('/app/surl/dashboard/statistics') ? 'text-primary drop-shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <BarChart3 className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">Statistics</span>
          </Link>
          <Link
            href="/app/surl/dashboard/create"
            className={`text-sm font-medium transition-colors flex items-center gap-2 ${pathname === '/app/surl/dashboard/create' ? 'text-primary drop-shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <PlusCircle className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">Create Link</span>
          </Link>

          {/* Admin Specific Links */}
          {(session?.user as any)?.role === "ADMIN" && (
            <Link
              href="/app/surl/admin/users"
              className={`text-sm font-medium transition-colors flex items-center gap-2 ${pathname.startsWith('/app/surl/admin') ? 'text-amber-500 drop-shadow-sm' : 'text-slate-400 hover:text-amber-500'}`}
            >
              <Users className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Users & Roles</span>
            </Link>
          )}
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-sm font-medium text-slate-600 outline-none hover:bg-slate-300 transition-colors"
            >
              {session?.user?.name?.slice(0, 2).toUpperCase() || "US"}
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-md border bg-popover p-1 shadow-md z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-2 py-1.5 text-sm font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{session?.user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session?.user?.email}
                    </p>
                  </div>
                </div>
                <div className="h-px bg-border my-1 -mx-1" />
                <Link
                  href="/app/surl/dashboard/settings"
                  className="relative flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Manage account</span>
                </Link>
                <div className="h-px bg-border my-1 -mx-1" />
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: `${window.location.origin}/auth/login` })}
                  className="relative flex w-full cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm text-red-600 outline-none transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
