"use client"

import { useState } from "react"
import { MapPin, Users, Store, AlertTriangle, Wrench, TrendingUp, Clock, Award, Mountain } from "lucide-react"

export default function Home() {
  const [activeTab, setActiveTab] = useState("inicio")
  const [stats] = useState({
    trilhas: 0,
    distancia: "0 km",
    tempo: "0h 0min",
    nivel: "Iniciante"
  })

  const handleNewTrail = () => {
    alert("Iniciando nova trilha! 🏔️")
  }

  const handleSquad = () => {
    alert("Abrindo Esquadrão! 👥")
  }

  const handleStore = () => {
    alert("Abrindo Loja Física! 🏪")
  }

  const handleSOS = () => {
    alert("🚨 SOS ATIVADO! Enviando localização de emergência...")
  }

  const handleMaintenance = () => {
    alert("Abrindo Manutenção! 🔧")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mountain className="w-8 h-8 text-orange-500" />
              <h1 className="text-2xl font-bold">TrailMaster</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => setActiveTab("inicio")}
                className={`hover:text-orange-500 transition-colors ${activeTab === "inicio" ? "text-orange-500" : ""}`}
              >
                Início
              </button>
              <button 
                onClick={() => setActiveTab("mapa")}
                className={`hover:text-orange-500 transition-colors ${activeTab === "mapa" ? "text-orange-500" : ""}`}
              >
                Mapa
              </button>
              <button 
                onClick={() => setActiveTab("trilhas")}
                className={`hover:text-orange-500 transition-colors ${activeTab === "trilhas" ? "text-orange-500" : ""}`}
              >
                Trilhas
              </button>
              <button 
                onClick={() => setActiveTab("comunidade")}
                className={`hover:text-orange-500 transition-colors ${activeTab === "comunidade" ? "text-orange-500" : ""}`}
              >
                Comunidade
              </button>
              <button 
                onClick={() => setActiveTab("perfil")}
                className={`hover:text-orange-500 transition-colors ${activeTab === "perfil" ? "text-orange-500" : ""}`}
              >
                Perfil
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
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
            onClick={handleNewTrail}
            className="bg-orange-500 hover:bg-orange-600 text-white p-6 rounded-2xl flex flex-col items-center gap-3 transition-all hover:scale-105 shadow-lg shadow-orange-500/20"
          >
            <MapPin className="w-8 h-8" />
            <span className="font-semibold">Nova Trilha</span>
          </button>

          <button 
            onClick={handleSquad}
            className="bg-gray-800 hover:bg-gray-700 text-white p-6 rounded-2xl flex flex-col items-center gap-3 transition-all hover:scale-105"
          >
            <Users className="w-8 h-8" />
            <span className="font-semibold">Esquadrão</span>
          </button>

          <button 
            onClick={handleStore}
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
            onClick={handleMaintenance}
            className="bg-gray-800 hover:bg-gray-700 text-white p-6 rounded-2xl flex flex-col items-center gap-3 transition-all hover:scale-105"
          >
            <Wrench className="w-8 h-8" />
            <span className="font-semibold">Manutenção</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-2">
              <Mountain className="w-6 h-6 text-orange-500" />
              <h3 className="text-gray-400 text-sm">Trilhas</h3>
            </div>
            <p className="text-3xl font-bold">{stats.trilhas}</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-orange-500" />
              <h3 className="text-gray-400 text-sm">Distância Total</h3>
            </div>
            <p className="text-3xl font-bold">{stats.distancia}</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-6 h-6 text-orange-500" />
              <h3 className="text-gray-400 text-sm">Tempo Total</h3>
            </div>
            <p className="text-3xl font-bold">{stats.tempo}</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-6 h-6 text-orange-500" />
              <h3 className="text-gray-400 text-sm">Nível</h3>
            </div>
            <p className="text-3xl font-bold">{stats.nivel}</p>
          </div>
        </div>

        {/* Recent Trails Section */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-6">Trilhas Recentes</h3>
          
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Mountain className="w-16 h-16 text-gray-700 mb-4" />
            <p className="text-gray-400 mb-6">
              Você ainda não gravou nenhuma trilha
            </p>
            <button 
              onClick={handleNewTrail}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg shadow-orange-500/20"
            >
              Gravar Primeira Trilha
            </button>
          </div>
        </div>
      </main>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-4 py-3">
        <div className="flex items-center justify-around">
          <button 
            onClick={() => setActiveTab("inicio")}
            className={`flex flex-col items-center gap-1 ${activeTab === "inicio" ? "text-orange-500" : "text-gray-400"}`}
          >
            <Mountain className="w-6 h-6" />
            <span className="text-xs">Início</span>
          </button>
          <button 
            onClick={() => setActiveTab("mapa")}
            className={`flex flex-col items-center gap-1 ${activeTab === "mapa" ? "text-orange-500" : "text-gray-400"}`}
          >
            <MapPin className="w-6 h-6" />
            <span className="text-xs">Mapa</span>
          </button>
          <button 
            onClick={() => setActiveTab("trilhas")}
            className={`flex flex-col items-center gap-1 ${activeTab === "trilhas" ? "text-orange-500" : "text-gray-400"}`}
          >
            <TrendingUp className="w-6 h-6" />
            <span className="text-xs">Trilhas</span>
          </button>
          <button 
            onClick={() => setActiveTab("comunidade")}
            className={`flex flex-col items-center gap-1 ${activeTab === "comunidade" ? "text-orange-500" : "text-gray-400"}`}
          >
            <Users className="w-6 h-6" />
            <span className="text-xs">Comunidade</span>
          </button>
        </div>
      </nav>
    </div>
  )
}
