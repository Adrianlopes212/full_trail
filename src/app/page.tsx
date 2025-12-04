"use client"

import { useState, useEffect } from "react"
import { MapPin, Users, Store, AlertTriangle, Wrench, TrendingUp, Clock, Award, Mountain, Bike } from "lucide-react"
import { supabase } from "@/lib/supabase"
import Header from "@/components/Header"
import MobileNav from "@/components/MobileNav"
import { useRouter } from "next/navigation"

type Moto = {
  id: string
  nome: string
  modelo: string
  cilindrada: number
  ano: number
  km_atual: number
}

type Trail = {
  id: string
  nome: string
  data: string
  tempo_total: number
  distancia_total: number
  velocidade_media: number
  velocidade_maxima: number
  dificuldade?: string
}

export default function Home() {
  const router = useRouter()
  const [motos, setMotos] = useState<Moto[]>([])
  const [trails, setTrails] = useState<Trail[]>([])
  const [stats, setStats] = useState({
    totalMotos: 0,
    totalTrilhas: 0,
    distanciaTotal: 0,
    tempoTotal: 0
  })

  useEffect(() => {
    carregarDados()
  }, [])

  const carregarDados = async () => {
    // Carregar motos
    const { data: motosData } = await supabase
      .from('motos')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3)

    if (motosData) setMotos(motosData)

    // Carregar trilhas
    const { data: trilhasData } = await supabase
      .from('trilhas')
      .select('*')
      .order('data', { ascending: false })
      .limit(3)

    if (trilhasData) {
      setTrails(trilhasData)
      
      // Calcular estatísticas
      const distanciaTotal = trilhasData.reduce((acc, t) => acc + parseFloat(t.distancia_total.toString()), 0)
      const tempoTotal = trilhasData.reduce((acc, t) => acc + t.tempo_total, 0)
      
      setStats({
        totalMotos: motosData?.length || 0,
        totalTrilhas: trilhasData.length,
        distanciaTotal,
        tempoTotal
      })
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
          <button 
            onClick={() => router.push('/trilhas/nova')}
            className="bg-orange-500 hover:bg-orange-600 text-white p-6 rounded-2xl flex flex-col items-center gap-3 transition-all hover:scale-105 shadow-lg shadow-orange-500/20"
          >
            <MapPin className="w-8 h-8" />
            <span className="font-semibold">Nova Trilha</span>
          </button>

          <button 
            onClick={() => router.push('/motos/nova')}
            className="bg-gray-800 hover:bg-gray-700 text-white p-6 rounded-2xl flex flex-col items-center gap-3 transition-all hover:scale-105"
          >
            <Bike className="w-8 h-8" />
            <span className="font-semibold">Minhas Motos</span>
          </button>

          <button 
            onClick={() => router.push('/esquadrao')}
            className="bg-gray-800 hover:bg-gray-700 text-white p-6 rounded-2xl flex flex-col items-center gap-3 transition-all hover:scale-105"
          >
            <Users className="w-8 h-8" />
            <span className="font-semibold">Esquadrão</span>
          </button>

          <button 
            onClick={() => router.push('/lojas')}
            className="bg-gray-800 hover:bg-gray-700 text-white p-6 rounded-2xl flex flex-col items-center gap-3 transition-all hover:scale-105"
          >
            <Store className="w-8 h-8" />
            <span className="font-semibold">Loja Física</span>
          </button>

          <button 
            onClick={() => router.push('/manutencao')}
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
              <Bike className="w-6 h-6 text-orange-500" />
              <h3 className="text-gray-400 text-sm">Motos</h3>
            </div>
            <p className="text-3xl font-bold">{stats.totalMotos}</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl hover:border-orange-500/50 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <Mountain className="w-6 h-6 text-orange-500" />
              <h3 className="text-gray-400 text-sm">Trilhas</h3>
            </div>
            <p className="text-3xl font-bold">{stats.totalTrilhas}</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl hover:border-orange-500/50 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-orange-500" />
              <h3 className="text-gray-400 text-sm">Distância Total</h3>
            </div>
            <p className="text-3xl font-bold">{formatDistance(stats.distanciaTotal)}</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl hover:border-orange-500/50 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-6 h-6 text-orange-500" />
              <h3 className="text-gray-400 text-sm">Tempo Total</h3>
            </div>
            <p className="text-3xl font-bold">{formatTime(stats.tempoTotal)}</p>
          </div>
        </div>

        {/* Minhas Motos Section */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">Minhas Motos</h3>
            <button 
              onClick={() => router.push('/motos')}
              className="text-orange-500 hover:text-orange-400 text-sm font-semibold"
            >
              Ver todas →
            </button>
          </div>
          
          {motos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Bike className="w-16 h-16 text-gray-700 mb-4" />
              <p className="text-gray-400 mb-6">
                Você ainda não cadastrou nenhuma moto
              </p>
              <button 
                onClick={() => router.push('/motos/nova')}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg shadow-orange-500/20"
              >
                Cadastrar Primeira Moto
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {motos.map((moto) => (
                <div 
                  key={moto.id}
                  onClick={() => router.push(`/motos/${moto.id}`)}
                  className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-orange-500/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Bike className="w-8 h-8 text-orange-500" />
                    <div>
                      <h4 className="font-semibold text-lg">{moto.nome}</h4>
                      <p className="text-sm text-gray-400">{moto.modelo}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>{moto.cilindrada}cc</span>
                    <span>{moto.ano}</span>
                    <span>{moto.km_atual.toLocaleString()} km</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Trails Section */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">Trilhas Recentes</h3>
            {trails.length > 0 && (
              <button 
                onClick={() => router.push('/trilhas')}
                className="text-orange-500 hover:text-orange-400 text-sm font-semibold"
              >
                Ver todas →
              </button>
            )}
          </div>
          
          {trails.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Mountain className="w-16 h-16 text-gray-700 mb-4" />
              <p className="text-gray-400 mb-6">
                Você ainda não gravou nenhuma trilha
              </p>
              <button 
                onClick={() => router.push('/trilhas/nova')}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg shadow-orange-500/20"
              >
                Gravar Primeira Trilha
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {trails.map((trail) => (
                <div 
                  key={trail.id}
                  onClick={() => router.push(`/trilhas/${trail.id}`)}
                  className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-orange-500/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-lg">{trail.nome}</h4>
                      <p className="text-sm text-gray-400">{new Date(trail.data).toLocaleDateString('pt-BR')}</p>
                    </div>
                    {trail.dificuldade && (
                      <span className={`text-xs px-3 py-1 rounded-full ${
                        trail.dificuldade === "Fácil" ? "bg-green-500/20 text-green-400" :
                        trail.dificuldade === "Moderada" ? "bg-yellow-500/20 text-yellow-400" :
                        "bg-red-500/20 text-red-400"
                      }`}>
                        {trail.dificuldade}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      {formatDistance(parseFloat(trail.distancia_total.toString()))}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatTime(trail.tempo_total)}
                    </span>
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
