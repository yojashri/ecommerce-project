"use client"

import { useEffect, useState } from "react"

export default function Header() {
const [dark, setDark] = useState(false)

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

return (
<header className="bg-black text-white p-5 flex justify-between items-center">
<h1 className="text-2xl font-bold">ProTech Store</h1>

<button  
    onClick={toggleTheme}  
    className="bg-white text-black px-3 py-1 rounded"  
  >  
    {dark ? "☀️ Light" : "🌙 Dark"}  
  </button>  
</header>

)
}