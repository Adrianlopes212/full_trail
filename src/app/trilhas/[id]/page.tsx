"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Header from "@/components/Header"
import MobileNav from "@/components/MobileNav"
import { supabase, type Trail } from "@/lib/supabase"
import { MapPin, Clock, TrendingUp, Gauge, Mountain, ArrowLeft, Calendar } from "lucide-react"

export default function DetalheTrilhaPage() {
  const params = useParams()
  const router = useRouter()
  const [trail, setTrail] = useState<Trail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTrail()
  }, [params.id])

  const loadTrail = async () => {
    try {
      const { data, error } = await supabase
        .from('trilhas')
        .select('*')
        .eq('id', params.id)
        .single()

      if (error) throw error

      setTrail(data)
    } catch (error) {
      console.error('Erro ao carregar trilha:', error)
      alert("❌ Erro ao carregar trilha")
      router.push('/trilhas')
    } finally {
      setLoading(false)
    }
  }

  const formatDistance = (km: number) => {
    return km >= 1 ? `${km.toFixed(2)} km` : `${(km * 1000).toFixed(0)} m`
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
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

  if (!trail) {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20 md:pb-0">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/trilhas')}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para Trilhas
          </button>
          <h2 className="text-4xl font-bold mb-2">{trail.nome}</h2>
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>
              {new Date(trail.data).toLocaleDateString('pt-BR', { 
                day: '2-digit', 
                month: 'long', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        </div>

        {/* Mapa com Percurso */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden mb-6 h-[500px] flex items-center justify-center relative">
          <MapPin className="w-16 h-16 text-gray-700" />
          <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-xl">
            <p className="text-sm text-gray-400">
              {trail.pontos_gps.length} pontos GPS registrados
            </p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Mountain className="w-20 h-20 text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500 text-sm">Visualização do mapa em breve</p>
            </div>
          </div>
        </div>

        {/* Estatísticas Principais */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-6 h-6 text-orange-500" />
              <span className="text-sm text-gray-400">Distância Total</span>
            </div>
            <p className="text-3xl font-bold">{formatDistance(trail.distancia_total)}</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-6 h-6 text-blue-500" />
              <span className="text-sm text-gray-400">Tempo Total</span>
            </div>
            <p className="text-3xl font-bold">{formatTime(trail.tempo_total)}</p>
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <Gauge className="w-6 h-6 text-green-500" />
              <span className="text-sm text-gray-400">Velocidade Média</span>
            </div>
            <p className="text-3xl font-bold">{formatSpeed(trail.velocidade_media)}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <Gauge className="w-6 h-6 text-purple-500" />
              <span className="text-sm text-gray-400">Velocidade Máxima</span>
            </div>
            <p className="text-3xl font-bold">{formatSpeed(trail.velocidade_maxima)}</p>
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-4">Detalhes da Trilha</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-400 mb-1">Pontos GPS Coletados</p>
              <p className="text-2xl font-bold">{trail.pontos_gps.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Dificuldade</p>
              <span className={`inline-block text-sm px-4 py-2 rounded-full font-semibold ${
                trail.dificuldade === "Fácil" ? "bg-green-500/20 text-green-400" :
                trail.dificuldade === "Moderada" ? "bg-yellow-500/20 text-yellow-400" :
                trail.dificuldade === "Difícil" ? "bg-red-500/20 text-red-400" :
                "bg-gray-700 text-gray-400"
              }`}>
                {trail.dificuldade || "Não definida"}
              </span>
            </div>
          </div>
        </div>

        {/* Pontos GPS (Resumo) */}
        {trail.pontos_gps.length > 0 && (
          <div className="mt-6 bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4">Pontos GPS</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {trail.pontos_gps.slice(0, 10).map((ponto, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Ponto {index + 1}</span>
                    <span className="text-gray-500">
                      {new Date(ponto.timestamp).toLocaleTimeString('pt-BR')}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    Lat: {ponto.latitude.toFixed(6)} | Lon: {ponto.longitude.toFixed(6)}
                    {ponto.altitude && ` | Alt: ${ponto.altitude.toFixed(0)}m`}
                  </div>
                </div>
              ))}
              {trail.pontos_gps.length > 10 && (
                <p className="text-center text-gray-500 text-sm py-2">
                  + {trail.pontos_gps.length - 10} pontos adicionais
                </p>
              )}
            </div>
          </div>
        )}
      </main>

      <MobileNav />
    </div>
  )
}
