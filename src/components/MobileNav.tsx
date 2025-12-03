"use client"

import { Mountain, MapPin, TrendingUp, Users, Wrench } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function MobileNav() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-2 py-3 z-50">
      <div className="flex items-center justify-around">
        <Link 
          href="/"
          className={`flex flex-col items-center gap-1 ${isActive("/") ? "text-orange-500" : "text-gray-400"}`}
        >
          <Mountain className="w-6 h-6" />
          <span className="text-xs">Início</span>
        </Link>
        <Link 
          href="/mapa"
          className={`flex flex-col items-center gap-1 ${isActive("/mapa") ? "text-orange-500" : "text-gray-400"}`}
        >
          <MapPin className="w-6 h-6" />
          <span className="text-xs">Mapa</span>
        </Link>
        <Link 
          href="/trilhas"
          className={`flex flex-col items-center gap-1 ${isActive("/trilhas") ? "text-orange-500" : "text-gray-400"}`}
        >
          <TrendingUp className="w-6 h-6" />
          <span className="text-xs">Trilhas</span>
        </Link>
        <Link 
          href="/manutencao"
          className={`flex flex-col items-center gap-1 ${isActive("/manutencao") ? "text-orange-500" : "text-gray-400"}`}
        >
          <Wrench className="w-6 h-6" />
          <span className="text-xs">Manutenção</span>
        </Link>
        <Link 
          href="/comunidade"
          className={`flex flex-col items-center gap-1 ${isActive("/comunidade") ? "text-orange-500" : "text-gray-400"}`}
        >
          <Users className="w-6 h-6" />
          <span className="text-xs">Comunidade</span>
        </Link>
      </div>
    </nav>
  )
}
