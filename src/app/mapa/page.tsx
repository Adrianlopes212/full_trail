"use client"

import Header from "@/components/Header"
import MobileNav from "@/components/MobileNav"
import { MapPin, Navigation, Compass, Mountain } from "lucide-react"

export default function MapaPage() {
  const popularTrails = [
    { name: "Pico da Neblina", location: "Amazonas", distance: 42.5, difficulty: "Difícil" },
    { name: "Pedra da Gávea", location: "Rio de Janeiro", distance: 5.8, difficulty: "Moderada" },
    { name: "Pico dos Marins", location: "São Paulo", distance: 12.3, difficulty: "Moderada" },
    { name: "Cachoeira do Tabuleiro", location: "Minas Gerais", distance: 8.5, difficulty: "Fácil" },
  ]

  return (
    <div className="min-h-screen bg-black text-white pb-20 md:pb-0">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2">Mapa de Trilhas</h2>
          <p className="text-gray-400">Explore trilhas próximas a você</p>
        </div>

        {/* Map Placeholder */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent" />
          <div className="relative z-10 flex flex-col items-center justify-center py-20">
            <Compass className="w-24 h-24 text-orange-500 mb-6 animate-spin" style={{ animationDuration: '8s' }} />
            <h3 className="text-2xl font-bold mb-2">Mapa Interativo</h3>
            <p className="text-gray-400 text-center max-w-md mb-6">
              Visualize trilhas próximas, rotas GPS e pontos de interesse em tempo real
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 flex items-center gap-2">
              <Navigation className="w-5 h-5" />
              Ativar Localização
            </button>
          </div>
        </div>

        {/* Popular Trails */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Trilhas Populares</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {popularTrails.map((trail, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-orange-500/50 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-lg font-bold mb-1">{trail.name}</h4>
                    <p className="text-sm text-gray-400 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {trail.location}
                    </p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full ${
                    trail.difficulty === "Fácil" ? "bg-green-500/20 text-green-400" :
                    trail.difficulty === "Moderada" ? "bg-yellow-500/20 text-yellow-400" :
                    "bg-red-500/20 text-red-400"
                  }`}>
                    {trail.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1 text-gray-400">
                    <Mountain className="w-4 h-4" />
                    {trail.distance} km
                  </span>
                  <button className="ml-auto text-orange-500 hover:text-orange-400 font-semibold">
                    Ver Rota →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  )
}
