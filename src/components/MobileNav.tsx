"use client"

import { Mountain, MapPin, TrendingUp, Users, Bike } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

export default function MobileNav() {
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (path: string) => pathname === path || pathname.startsWith(path)

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-2 py-3 z-50">
      <div className="flex items-center justify-around">
        <button 
          onClick={() => router.push("/")}
          className={`flex flex-col items-center gap-1 ${isActive("/") && pathname === "/" ? "text-orange-500" : "text-gray-400"}`}
        >
          <Mountain className="w-6 h-6" />
          <span className="text-xs">Início</span>
        </button>
        <button 
          onClick={() => router.push("/motos")}
          className={`flex flex-col items-center gap-1 ${isActive("/motos") ? "text-orange-500" : "text-gray-400"}`}
        >
          <Bike className="w-6 h-6" />
          <span className="text-xs">Motos</span>
        </button>
        <button 
          onClick={() => router.push("/mapa")}
          className={`flex flex-col items-center gap-1 ${isActive("/mapa") ? "text-orange-500" : "text-gray-400"}`}
        >
          <MapPin className="w-6 h-6" />
          <span className="text-xs">Mapa</span>
        </button>
        <button 
          onClick={() => router.push("/trilhas")}
          className={`flex flex-col items-center gap-1 ${isActive("/trilhas") ? "text-orange-500" : "text-gray-400"}`}
        >
          <TrendingUp className="w-6 h-6" />
          <span className="text-xs">Trilhas</span>
        </button>
        <button 
          onClick={() => router.push("/comunidade")}
          className={`flex flex-col items-center gap-1 ${isActive("/comunidade") ? "text-orange-500" : "text-gray-400"}`}
        >
          <Users className="w-6 h-6" />
          <span className="text-xs">Comunidade</span>
        </button>
      </div>
    </nav>
  )
}
