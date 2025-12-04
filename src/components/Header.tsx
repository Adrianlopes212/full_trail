"use client"

import { Mountain } from "lucide-react"
import { usePathname } from "next/navigation"
import { go_inicio, go_mapa, go_trilha, go_manutencao, go_comunidade, go_perfil } from "@/lib/navigation-actions"

export default function Header() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={go_inicio}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Mountain className="w-8 h-8 text-orange-500" />
            <h1 className="text-2xl font-bold">TrailMaster</h1>
          </button>
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={go_inicio}
              className={`hover:text-orange-500 transition-colors ${isActive("/") ? "text-orange-500" : ""}`}
            >
              Início
            </button>
            <button 
              onClick={go_mapa}
              className={`hover:text-orange-500 transition-colors ${isActive("/mapa") ? "text-orange-500" : ""}`}
            >
              Mapa
            </button>
            <button 
              onClick={go_trilha}
              className={`hover:text-orange-500 transition-colors ${isActive("/trilhas") ? "text-orange-500" : ""}`}
            >
              Trilhas
            </button>
            <button 
              onClick={go_manutencao}
              className={`hover:text-orange-500 transition-colors ${isActive("/manutencao") ? "text-orange-500" : ""}`}
            >
              Manutenção
            </button>
            <button 
              onClick={go_comunidade}
              className={`hover:text-orange-500 transition-colors ${isActive("/comunidade") ? "text-orange-500" : ""}`}
            >
              Comunidade
            </button>
            <button 
              onClick={go_perfil}
              className={`hover:text-orange-500 transition-colors ${isActive("/perfil") ? "text-orange-500" : ""}`}
            >
              Perfil
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}
