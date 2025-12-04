"use client"

import { useState, useEffect } from "react"
import { supabase, type Trail } from "@/lib/supabase"
import Header from "@/components/Header"
import MobileNav from "@/components/MobileNav"
import Link from "next/link"
import { Mountain, TrendingUp, Clock, Trash2, Plus, Filter, Gauge } from "lucide-react"

export default function TrilhasPage() {
  const [trails, setTrails] = useState<Trail[]>([])
  const [filter, setFilter] = useState<"all" | "Fácil" | "Moderada" | "Difícil">("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTrails()
  }, [])

  const loadTrails = async () => {
    try {
      const { data, error } = await supabase
        .from('trilhas')
        .select('*')
        .order('data', { ascending: false })

      if (error) throw error

      setTrails(data || [])
    } catch (error) {
      console.error('Erro ao carregar trilhas:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredTrails = filter === "all" 
    ? trails 
    : trails.filter(t => t.dificuldade === filter)

  const handleDelete = async (id: string, nome: string) => {
    if (confirm(`🗑️ Deseja excluir a trilha "${nome}"?`)) {
      try {
        const { error } = await supabase
          .from('trilhas')
          .delete()
          .eq('id', id)

        if (error) throw error

        alert("✅ Trilha excluída com sucesso!")
        loadTrails()
      } catch (error) {
        console.error('Erro ao excluir trilha:', error)
        alert("❌ Erro ao excluir trilha")
      }
    }
  }

  const formatDistance = (km: number) => {
    return km >= 1 ? `${km.toFixed(1)} km` : `${(km * 1000).toFixed(0)} m`
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`
  }

  const formatSpeed = (kmh: number) => {
    return `${kmh.toFixed(1)} km/h`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white pb-20 md:pb-0">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        </main>
        <MobileNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20 md:pb-0">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold mb-2">Minhas Trilhas</h2>
            <p className="text-gray-400">{trails.length} trilhas registradas</p>
          </div>
          <Link
            href="/trilhas/nova"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg shadow-orange-500/20 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Nova Trilha
          </Link>
        </div>

        {/* Filter */}
        <div className="mb-6 flex items-center gap-3 overflow-x-auto pb-2">
          <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
          {(["all", "Fácil", "Moderada", "Difícil"] as const).map((level) => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
                filter === level
                  ? "bg-orange-500 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {level === "all" ? "Todas" : level}
            </button>
          ))}
        </div>

        {/* Trails List */}
        {filteredTrails.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center">
            <Mountain className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-400 mb-6">
              {filter === "all" 
                ? "Você ainda não tem trilhas registradas" 
                : `Nenhuma trilha ${filter} encontrada`}
            </p>
            <Link
              href="/trilhas/nova"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              Gravar Primeira Trilha
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredTrails.map((trail) => (
              <Link
                key={trail.id}
                href={`/trilhas/${trail.id}`}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-orange-500/50 transition-colors block"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{trail.nome}</h3>
                    <p className="text-gray-400 text-sm">
                      {new Date(trail.data).toLocaleDateString('pt-BR', { 
                        day: '2-digit', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {trail.dificuldade && (
                      <span className={`text-xs px-3 py-1 rounded-full ${
                        trail.dificuldade === "Fácil" ? "bg-green-500/20 text-green-400" :
                        trail.dificuldade === "Moderada" ? "bg-yellow-500/20 text-yellow-400" :
                        "bg-red-500/20 text-red-400"
                      }`}>
                        {trail.dificuldade}
                      </span>
                    )}
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleDelete(trail.id, trail.nome)
                      }}
                      className="text-red-500 hover:text-red-400 p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-800 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-orange-500" />
                      <span className="text-xs text-gray-400">Distância</span>
                    </div>
                    <p className="text-lg font-bold">{formatDistance(trail.distancia_total)}</p>
                  </div>

                  <div className="bg-gray-800 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <span className="text-xs text-gray-400">Tempo</span>
                    </div>
                    <p className="text-lg font-bold">{formatTime(trail.tempo_total)}</p>
                  </div>

                  <div className="bg-gray-800 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Gauge className="w-4 h-4 text-orange-500" />
                      <span className="text-xs text-gray-400">Vel. Média</span>
                    </div>
                    <p className="text-lg font-bold">{formatSpeed(trail.velocidade_media)}</p>
                  </div>

                  <div className="bg-gray-800 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Gauge className="w-4 h-4 text-orange-500" />
                      <span className="text-xs text-gray-400">Vel. Máx</span>
                    </div>
                    <p className="text-lg font-bold">{formatSpeed(trail.velocidade_maxima)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <MobileNav />
    </div>
  )
}
