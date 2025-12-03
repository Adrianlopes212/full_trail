"use client"

import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { store } from "@/lib/store"
import Header from "@/components/Header"
import MobileNav from "@/components/MobileNav"
import { MapPin, Clock, TrendingUp, Mountain, Save } from "lucide-react"

export default function NovaTrilha() {
  const router = useRouter()
  const [isRecording, setIsRecording] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    distance: "",
    duration: "",
    difficulty: "Fácil" as "Fácil" | "Moderada" | "Difícil"
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.location || !formData.distance || !formData.duration) {
      alert("⚠️ Preencha todos os campos!")
      return
    }

    store.addTrail({
      name: formData.name,
      location: formData.location,
      distance: parseFloat(formData.distance),
      duration: parseInt(formData.duration),
      difficulty: formData.difficulty,
      date: new Date().toISOString()
    })

    alert("✅ Trilha salva com sucesso!")
    router.push("/trilhas")
  }

  const startRecording = () => {
    setIsRecording(true)
    alert("🎯 Gravação iniciada!\n\nSeu GPS está rastreando a trilha.\nClique em 'Parar Gravação' quando terminar.")
  }

  const stopRecording = () => {
    setIsRecording(false)
    // Simula dados de uma trilha gravada
    setFormData({
      ...formData,
      distance: "5.2",
      duration: "120"
    })
    alert("⏸️ Gravação pausada!\n\nPreencha os detalhes da trilha abaixo.")
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20 md:pb-0">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2">Nova Trilha</h2>
          <p className="text-gray-400">Registre sua aventura</p>
        </div>

        {/* Recording Button */}
        <div className="mb-8">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white p-6 rounded-2xl flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-lg shadow-orange-500/20"
            >
              <MapPin className="w-6 h-6" />
              <span className="font-semibold text-lg">Iniciar Gravação GPS</span>
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="w-full bg-red-600 hover:bg-red-700 text-white p-6 rounded-2xl flex items-center justify-center gap-3 transition-all animate-pulse"
            >
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
              <span className="font-semibold text-lg">Gravando... (Clique para parar)</span>
            </button>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Nome da Trilha</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Trilha da Pedra Grande"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Localização</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Ex: Serra da Mantiqueira, SP"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Distância (km)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.distance}
                  onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                  placeholder="5.2"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Duração (min)
                </label>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="120"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                <Mountain className="w-4 h-4" />
                Dificuldade
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(["Fácil", "Moderada", "Difícil"] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setFormData({ ...formData, difficulty: level })}
                    className={`py-3 rounded-xl font-semibold transition-all ${
                      formData.difficulty === level
                        ? level === "Fácil"
                          ? "bg-green-500 text-white"
                          : level === "Moderada"
                          ? "bg-yellow-500 text-white"
                          : "bg-red-500 text-white"
                        : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            Salvar Trilha
          </button>
        </form>
      </main>

      <MobileNav />
    </div>
  )
}
