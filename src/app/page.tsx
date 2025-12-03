"use client"

import { useState, useEffect } from "react"
import { MapPin, Users, Store, AlertTriangle, Wrench, TrendingUp, Clock, Award, Mountain } from "lucide-react"
import { store, type UserStats, type Trail } from "@/lib/store"
import Header from "@/components/Header"
import MobileNav from "@/components/MobileNav"
import Link from "next/link"

export default function Home() {
  const [stats, setStats] = useState<UserStats>(store.getStats())
  const [trails, setTrails] = useState<Trail[]>(store.getTrails())

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setStats(store.getStats())
      setTrails(store.getTrails())
    })
    return unsubscribe
  }, [])

  const handleSOS = () => {
    if (confirm("🚨 Deseja ativar o SOS de emergência?\n\nIsso enviará sua localização para contatos de emergência.")) {
      alert("✅ SOS ATIVADO!\n\n📍 Localização enviada para contatos de emergência\n📞 Serviços de resgate notificados")
    }
  }

  const formatDistance = (km: number) => {
    return km >= 1 ? `${km.toFixed(1)} km` : `${(km * 1000).toFixed(0)} m`
  }

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20 md:pb-0">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">
            Olá, Aventureiro! 👋
          </h2>
          <p className="text-gray-400 text-lg">
            Pronto para sua próxima aventura?
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          <Link 
            href="/trilhas/nova"
            className="bg-orange-500 hover:bg-orange-600 text-white p-6 rounded-2xl flex flex-col items-center gap-3 transition-all hover:scale-105 shadow-lg shadow-orange-500/20"
          >
            <MapPin className="w-8 h-8" />
            <span className="font-semibold">Nova Trilha</span>
          </Link>

          <Link 
            href="/comunidade"
            className="bg-gray-800 hover:bg-gray-700 text-white p-6 rounded-2xl flex flex-col items-center gap-3 transition-all hover:scale-105"
          >
            <Users className="w-8 h-8" />
            <span className="font-semibold">Esquadrão</span>
          </Link>

          <button 
            onClick={() => alert("🏪 Loja Física em breve!\n\nEncontre equipamentos e acessórios para suas aventuras.")}
            className="bg-gray-800 hover:bg-gray-700 text-white p-6 rounded-2xl flex flex-col items-center gap-3 transition-all hover:scale-105"
          >
            <Store className="w-8 h-8" />
            <span className="font-semibold">Loja Física</span>
          </button>

          <button 
            onClick={handleSOS}
            className="bg-red-600 hover:bg-red-700 text-white p-6 rounded-2xl flex flex-col items-center gap-3 transition-all hover:scale-105 shadow-lg shadow-red-600/20"
          >
            <AlertTriangle className="w-8 h-8" />
            <span className="font-semibold">SOS</span>
          </button>

          <button 
            onClick={() => alert("🔧 Manutenção em breve!\n\nDicas e guias para cuidar dos seus equipamentos.")}
            className="bg-gray-800 hover:bg-gray-700 text-white p-6 rounded-2xl flex flex-col items-center gap-3 transition-all hover:scale-105"
          >
            <Wrench className="w-8 h-8" />
            <span className="font-semibold">Manutenção</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl hover:border-orange-500/50 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <Mountain className="w-6 h-6 text-orange-500" />
              <h3 className="text-gray-400 text-sm">Trilhas</h3>
            </div>
            <p className="text-3xl font-bold">{stats.trilhas}</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl hover:border-orange-500/50 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-orange-500" />
              <h3 className="text-gray-400 text-sm">Distância Total</h3>
            </div>
            <p className="text-3xl font-bold">{formatDistance(stats.distancia)}</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl hover:border-orange-500/50 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-6 h-6 text-orange-500" />
              <h3 className="text-gray-400 text-sm">Tempo Total</h3>
            </div>
            <p className="text-3xl font-bold">{formatTime(stats.tempo)}</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl hover:border-orange-500/50 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-6 h-6 text-orange-500" />
              <h3 className="text-gray-400 text-sm">Nível</h3>
            </div>
            <p className="text-3xl font-bold">{stats.nivel}</p>
            <p className="text-xs text-gray-500 mt-1">{stats.pontos} pontos</p>
          </div>
        </div>

        {/* Recent Trails Section */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">Trilhas Recentes</h3>
            {trails.length > 0 && (
              <Link 
                href="/trilhas"
                className="text-orange-500 hover:text-orange-400 text-sm font-semibold"
              >
                Ver todas →
              </Link>
            )}
          </div>
          
          {trails.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Mountain className="w-16 h-16 text-gray-700 mb-4" />
              <p className="text-gray-400 mb-6">
                Você ainda não gravou nenhuma trilha
              </p>
              <Link 
                href="/trilhas/nova"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg shadow-orange-500/20"
              >
                Gravar Primeira Trilha
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {trails.slice(0, 3).map((trail) => (
                <div 
                  key={trail.id}
                  className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-orange-500/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-lg">{trail.name}</h4>
                      <p className="text-sm text-gray-400">{trail.location}</p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      trail.difficulty === "Fácil" ? "bg-green-500/20 text-green-400" :
                      trail.difficulty === "Moderada" ? "bg-yellow-500/20 text-yellow-400" :
                      "bg-red-500/20 text-red-400"
                    }`}>
                      {trail.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      {formatDistance(trail.distance)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatTime(trail.duration)}
                    </span>
                    <span className="ml-auto">{new Date(trail.date).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <MobileNav />
    </div>
  )
}
