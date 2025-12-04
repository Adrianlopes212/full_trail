"use client"

import { Store, MapPin, Phone, Clock, Navigation } from "lucide-react"
import Header from "@/components/Header"
import MobileNav from "@/components/MobileNav"

export default function LojaFisicaPage() {
  const stores = [
    {
      id: 1,
      name: "Off-Road Center São Paulo",
      address: "Av. Paulista, 1000 - Bela Vista, São Paulo - SP",
      phone: "(11) 3000-0000",
      hours: "Seg-Sex: 9h-18h | Sáb: 9h-14h",
      distance: "2.5 km",
    },
    {
      id: 2,
      name: "Trilha Shop Rio de Janeiro",
      address: "Rua das Laranjeiras, 500 - Laranjeiras, Rio de Janeiro - RJ",
      phone: "(21) 3000-0000",
      hours: "Seg-Sex: 9h-18h | Sáb: 9h-14h",
      distance: "5.8 km",
    },
    {
      id: 3,
      name: "Adventure Store Campinas",
      address: "Av. Norte Sul, 200 - Centro, Campinas - SP",
      phone: "(19) 3000-0000",
      hours: "Seg-Sex: 9h-18h | Sáb: 9h-14h",
      distance: "12.3 km",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white pb-20 md:pb-0">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 flex items-center gap-3">
            <Store className="w-10 h-10 text-orange-500" />
            Lojas Físicas
          </h1>
          <p className="text-gray-400 text-lg">
            Encontre a loja mais próxima de você
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 mb-8">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Digite seu CEP ou endereço..."
              className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-semibold transition-all">
              Buscar
            </button>
          </div>
        </div>

        {/* Stores List */}
        <div className="space-y-6">
          {stores.map((store) => (
            <div
              key={store.id}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-orange-500/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{store.name}</h2>
                  <div className="flex items-center gap-2 text-orange-500 text-sm mb-2">
                    <Navigation className="w-4 h-4" />
                    <span>{store.distance} de distância</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                  <span>{store.address}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <span>{store.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Clock className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <span>{store.hours}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition-all hover:scale-105">
                  Como Chegar
                </button>
                <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-xl font-semibold transition-all">
                  Ligar Agora
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-6 mt-8">
          <h3 className="text-xl font-bold mb-2 text-orange-500">💡 Dica</h3>
          <p className="text-gray-300">
            Entre em contato antes de visitar para confirmar disponibilidade de produtos e horários especiais.
          </p>
        </div>
      </main>

      <MobileNav />
    </div>
  )
}
