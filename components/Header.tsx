"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

export default function Header() {
  const [dark, setDark] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark"
    setDark(isDark)
    document.documentElement.classList.toggle("dark", isDark)
  }, [])

  const toggleTheme = () => {
    const newTheme = !dark
    setDark(newTheme)

    if (newTheme) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  const handleLogout = () => {
    document.cookie = "token=; path=/; max-age=0"
    router.replace("/login")
  }

  // ✅ Safe conditional AFTER hooks
  if (pathname === "/login") return null

  return (
    <header className="bg-black text-white p-5 flex justify-between items-center">
      <h1 className="text-2xl font-bold">ProTech Store</h1>

      <div className="flex gap-3">
        <button
          onClick={toggleTheme}
          className="bg-white text-black px-3 py-1 rounded"
        >
          {dark ? "☀️ Light" : "🌙 Dark"}
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  )
}