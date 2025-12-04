"use client"

import { useState } from "react"
import { Play, Square, MapPin, Clock, TrendingUp, Save } from "lucide-react"
import Header from "@/components/Header"
import MobileNav from "@/components/MobileNav"
import { go_trilha } from "@/lib/navigation-actions"

export default function GravarPrimeiraTrilhaPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [duration, setDuration] = useState(0)
  const [distance, setDistance] = useState(0)

  const handleStartRecording = () => {
    if (confirm("🎯 Iniciar gravação da sua primeira trilha?\n\nVamos registrar sua localização, distância e tempo.")) {
      setIsRecording(true)
      alert("✅ Gravação iniciada!\n\n📍 GPS ativado\n⏱️ Cronômetro iniciado")
    }
  }

  const handleStopRecording = () => {
    if (confirm("⏹️ Deseja parar a gravação?\n\nSua trilha será salva automaticamente.")) {
      setIsRecording(false)
      alert("✅ Trilha gravada com sucesso!\n\n🎉 Parabéns pela sua primeira trilha!")
      setTimeout(() => {
        go_trilha()
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20 md:pb-0">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            🎉 Primeira Trilha
          </h1>
          <p className="text-gray-400 text-lg">
            Vamos gravar sua primeira aventura!
          </p>
        </div>

        {/* Recording Status */}
        {isRecording ? (
          <div className="bg-red-600 border-2 border-red-400 rounded-2xl p-8 mb-8 animate-pulse">
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                <div className="w-16 h-16 bg-red-600 rounded-full animate-pulse"></div>
              </div>
              <h2 className="text-3xl font-bold mb-2">🔴 GRAVANDO</h2>
              <p className="text-lg mb-6">Sua trilha está sendo registrada</p>
            </div>
          </div>
        ) : (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-8">
            <div className="text-center">
              <Play className="w-20 h-20 text-orange-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">Pronto para começar?</h2>
              <p className="text-gray-400 mb-6">Toque no botão abaixo para iniciar a gravação</p>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl text-center">
            <Clock className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <p className="text-3xl font-bold">{Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}</p>
            <p className="text-gray-400 text-sm">Tempo</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl text-center">
            <TrendingUp className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <p className="text-3xl font-bold">{distance.toFixed(1)}</p>
            <p className="text-gray-400 text-sm">km</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl text-center">
            <MapPin className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <p className="text-3xl font-bold">0</p>
            <p className="text-gray-400 text-sm">Pontos</p>
          </div>
        </div>

        {/* Control Button */}
        {isRecording ? (
          <button
            onClick={handleStopRecording}
            className="w-full bg-red-600 hover:bg-red-700 text-white p-8 rounded-2xl flex flex-col items-center gap-4 transition-all hover:scale-105 shadow-lg shadow-red-600/20 mb-8"
          >
            <Square className="w-16 h-16" />
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">PARAR GRAVAÇÃO</h2>
              <p className="text-red-200">Toque para finalizar sua trilha</p>
            </div>
          </button>
        ) : (
          <button
            onClick={handleStartRecording}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white p-8 rounded-2xl flex flex-col items-center gap-4 transition-all hover:scale-105 shadow-lg shadow-orange-500/20 mb-8"
          >
            <Play className="w-16 h-16" />
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">INICIAR GRAVAÇÃO</h2>
              <p className="text-orange-200">Toque para começar sua primeira trilha</p>
            </div>
          </button>
        )}

        {/* Instructions */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-bold mb-4">📋 Como funciona?</h3>
          <div className="space-y-3 text-gray-300">
            <div className="flex items-start gap-3">
              <span className="text-orange-500 font-bold">1.</span>
              <p>Toque em "INICIAR GRAVAÇÃO" quando estiver pronto para começar</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-orange-500 font-bold">2.</span>
              <p>O app vai registrar automaticamente sua localização, distância e tempo</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-orange-500 font-bold">3.</span>
              <p>Quando terminar, toque em "PARAR GRAVAÇÃO" para salvar sua trilha</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-orange-500 font-bold">4.</span>
              <p>Sua primeira trilha será salva e você ganhará pontos de experiência!</p>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-4 text-orange-500">💡 Dicas para sua primeira trilha</h3>
          <ul className="space-y-2 text-gray-300">
            <li>• Mantenha o GPS ativado durante toda a trilha</li>
            <li>• Certifique-se de ter bateria suficiente no celular</li>
            <li>• Leve água e equipamentos de segurança</li>
            <li>• Avise alguém sobre sua rota</li>
            <li>• Divirta-se e aproveite a aventura! 🏍️</li>
          </ul>
        </div>
      </main>

      <MobileNav />
    </div>
  )
}
