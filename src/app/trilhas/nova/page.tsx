"use client"

import { useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import { supabase } from "@/lib/supabase"
import Header from "@/components/Header"
import MobileNav from "@/components/MobileNav"
import { Play, Pause, Square, Navigation } from "lucide-react"
import { useRouter } from "next/navigation"

// Importação dinâmica do mapa para evitar SSR
const MapComponent = dynamic(() => import("@/components/MapTracker"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-gray-900 rounded-2xl flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
    </div>
  ),
})

type TrailPoint = {
  latitude: number
  longitude: number
  altitude: number | null
  timestamp: string
}

type RecordingState = "idle" | "recording" | "paused"

export default function GravarTrilhaPage() {
  const router = useRouter()
  const [state, setState] = useState<RecordingState>("idle")
  const [pontosDaTrilha, setPontosDaTrilha] = useState<TrailPoint[]>([])
  const [currentPosition, setCurrentPosition] = useState<{ lat: number; lng: number } | null>(null)
  const [distanciaTotal, setDistanciaTotal] = useState(0) // em km
  const [velocidadeAtual, setVelocidadeAtual] = useState(0) // em km/h
  const [velocidadeMaxima, setVelocidadeMaxima] = useState(0) // em km/h
  const [tempoTotal, setTempoTotal] = useState(0) // em segundos
  const [permissionGranted, setPermissionGranted] = useState(false)

  const watchIdRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const pausedTimeRef = useRef<number>(0)
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const lastPositionRef = useRef<{ lat: number; lng: number; timestamp: number } | null>(null)

  // Solicitar permissão de localização ao montar
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPermissionGranted(true)
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.error("Erro ao obter localização:", error)
          alert("⚠️ Permissão de localização negada. Ative o GPS para gravar trilhas.")
        },
        { enableHighAccuracy: true }
      )
    } else {
      alert("❌ Seu navegador não suporta geolocalização")
    }

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current)
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current)
      }
    }
  }, [])

  // Calcular distância entre dois pontos (Haversine)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371 // Raio da Terra em km
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  // Calcular velocidade
  const calculateSpeed = (distance: number, timeInSeconds: number): number => {
    if (timeInSeconds === 0) return 0
    return (distance / timeInSeconds) * 3600 // km/h
  }

  // Iniciar gravação
  const handleIniciar = () => {
    if (!permissionGranted) {
      alert("⚠️ Permissão de localização necessária")
      return
    }

    setState("recording")
    startTimeRef.current = Date.now() - pausedTimeRef.current * 1000
    
    // Iniciar cronômetro
    timerIntervalRef.current = setInterval(() => {
      if (startTimeRef.current) {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000)
        setTempoTotal(elapsed)
      }
    }, 1000)

    // Iniciar tracking de GPS
    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const newPoint: TrailPoint = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          altitude: position.coords.altitude,
          timestamp: new Date().toISOString(),
        }

        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })

        setPontosDaTrilha((prev) => {
          const updated = [...prev, newPoint]

          // Calcular distância se houver ponto anterior
          if (prev.length > 0) {
            const lastPoint = prev[prev.length - 1]
            const distance = calculateDistance(
              lastPoint.latitude,
              lastPoint.longitude,
              newPoint.latitude,
              newPoint.longitude
            )
            setDistanciaTotal((prevDist) => prevDist + distance)

            // Calcular velocidade atual
            if (lastPositionRef.current) {
              const timeDiff = (Date.now() - lastPositionRef.current.timestamp) / 1000 // segundos
              const speed = calculateSpeed(distance, timeDiff)
              setVelocidadeAtual(speed)
              
              // Atualizar velocidade máxima
              if (speed > velocidadeMaxima) {
                setVelocidadeMaxima(speed)
              }
            }
          }

          lastPositionRef.current = {
            lat: newPoint.latitude,
            lng: newPoint.longitude,
            timestamp: Date.now(),
          }

          return updated
        })
      },
      (error) => {
        console.error("Erro no GPS:", error)
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    )
  }

  // Pausar gravação
  const handlePausar = () => {
    setState("paused")
    pausedTimeRef.current = tempoTotal

    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current)
      watchIdRef.current = null
    }

    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current)
      timerIntervalRef.current = null
    }
  }

  // Retomar gravação
  const handleRetomar = () => {
    handleIniciar()
  }

  // Finalizar e salvar
  const handleFinalizar = async () => {
    if (pontosDaTrilha.length === 0) {
      alert("⚠️ Nenhum ponto gravado ainda")
      return
    }

    // Parar tracking
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current)
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current)
    }

    // Calcular velocidade média
    const velocidadeMedia = tempoTotal > 0 ? (distanciaTotal / tempoTotal) * 3600 : 0

    // Criar nome automático
    const now = new Date()
    const nomeTrilha = `Trilha - ${now.toLocaleDateString("pt-BR")} ${now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`

    try {
      const { data, error } = await supabase.from("trilhas").insert({
        nome: nomeTrilha,
        data: now.toISOString(),
        tempo_total: tempoTotal,
        distancia_total: distanciaTotal,
        velocidade_media: velocidadeMedia,
        velocidade_maxima: velocidadeMaxima,
        pontos_gps: pontosDaTrilha,
      }).select()

      if (error) throw error

      alert("✅ Trilha salva com sucesso!")
      router.push("/trilhas")
    } catch (error) {
      console.error("Erro ao salvar trilha:", error)
      alert("❌ Erro ao salvar trilha")
    }
  }

  const formatDistance = (km: number) => {
    return km >= 1 ? `${km.toFixed(2)} km` : `${(km * 1000).toFixed(0)} m`
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const formatSpeed = (kmh: number) => {
    return `${kmh.toFixed(1)} km/h`
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20 md:pb-0">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-4xl font-bold mb-2">Gravar Trilha</h2>
          <p className="text-gray-400">Acompanhe sua trilha em tempo real</p>
        </div>

        {/* Mapa */}
        <div className="mb-6">
          <MapComponent
            currentPosition={currentPosition}
            pontosDaTrilha={pontosDaTrilha}
            isRecording={state === "recording"}
          />
        </div>

        {/* Estatísticas em tempo real */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-400 text-sm mb-1">Distância</p>
            <p className="text-3xl font-bold text-orange-500">{formatDistance(distanciaTotal)}</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-400 text-sm mb-1">Velocidade</p>
            <p className="text-3xl font-bold text-orange-500">{formatSpeed(velocidadeAtual)}</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-400 text-sm mb-1">Tempo</p>
            <p className="text-3xl font-bold text-orange-500">{formatTime(tempoTotal)}</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-400 text-sm mb-1">Vel. Máx</p>
            <p className="text-3xl font-bold text-orange-500">{formatSpeed(velocidadeMaxima)}</p>
          </div>
        </div>

        {/* Botões de controle */}
        <div className="flex flex-col gap-4">
          {state === "idle" && (
            <button
              onClick={handleIniciar}
              disabled={!permissionGranted}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-green-500/20 flex items-center justify-center gap-3"
            >
              <Play className="w-6 h-6" />
              Iniciar Gravação
            </button>
          )}

          {state === "recording" && (
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handlePausar}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-3"
              >
                <Pause className="w-6 h-6" />
                Pausar
              </button>
              <button
                onClick={handleFinalizar}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-red-500/20 flex items-center justify-center gap-3"
              >
                <Square className="w-6 h-6" />
                Finalizar
              </button>
            </div>
          )}

          {state === "paused" && (
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleRetomar}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-green-500/20 flex items-center justify-center gap-3"
              >
                <Play className="w-6 h-6" />
                Retomar
              </button>
              <button
                onClick={handleFinalizar}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-red-500/20 flex items-center justify-center gap-3"
              >
                <Square className="w-6 h-6" />
                Finalizar
              </button>
            </div>
          )}
        </div>

        {/* Info de permissão */}
        {!permissionGranted && (
          <div className="mt-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 flex items-start gap-3">
            <Navigation className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-yellow-500 font-semibold mb-1">Permissão de localização necessária</p>
              <p className="text-gray-400 text-sm">
                Ative o GPS e permita o acesso à localização para gravar trilhas.
              </p>
            </div>
          </div>
        )}

        {/* Pontos coletados */}
        {pontosDaTrilha.length > 0 && (
          <div className="mt-6 bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-400 text-sm mb-2">Pontos coletados</p>
            <p className="text-2xl font-bold text-orange-500">{pontosDaTrilha.length}</p>
          </div>
        )}
      </main>

      <MobileNav />
    </div>
  )
}
