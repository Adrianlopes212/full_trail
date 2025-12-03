"use client"

import { Mountain } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Mountain className="w-8 h-8 text-orange-500" />
            <h1 className="text-2xl font-bold">TrailMaster</h1>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/"
              className={`hover:text-orange-500 transition-colors ${isActive("/") ? "text-orange-500" : ""}`}
            >
              Início
            </Link>
            <Link 
              href="/mapa"
              className={`hover:text-orange-500 transition-colors ${isActive("/mapa") ? "text-orange-500" : ""}`}
            >
              Mapa
            </Link>
            <Link 
              href="/trilhas"
              className={`hover:text-orange-500 transition-colors ${isActive("/trilhas") ? "text-orange-500" : ""}`}
            >
              Trilhas
            </Link>
            <Link 
              href="/manutencao"
              className={`hover:text-orange-500 transition-colors ${isActive("/manutencao") ? "text-orange-500" : ""}`}
            >
              Manutenção
            </Link>
            <Link 
              href="/comunidade"
              className={`hover:text-orange-500 transition-colors ${isActive("/comunidade") ? "text-orange-500" : ""}`}
            >
              Comunidade
            </Link>
            <Link 
              href="/perfil"
              className={`hover:text-orange-500 transition-colors ${isActive("/perfil") ? "text-orange-500" : ""}`}
            >
              Perfil
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
