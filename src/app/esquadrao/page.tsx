"use client"

import { Users, UserPlus, Trophy, MapPin, Clock } from "lucide-react"
import Header from "@/components/Header"
import MobileNav from "@/components/MobileNav"

export default function EsquadraoPage() {
  const squadMembers = [
    { id: 1, name: "João Silva", level: 15, trails: 42, avatar: "🏍️" },
    { id: 2, name: "Maria Santos", level: 12, trails: 35, avatar: "🏍️" },
    { id: 3, name: "Pedro Costa", level: 18, trails: 58, avatar: "🏍️" },
  ]

  return (
    <div className="min-h-screen bg-black text-white pb-20 md:pb-0">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 flex items-center gap-3">
            <Users className="w-10 h-10 text-orange-500" />
            Meu Esquadrão
          </h1>
          <p className="text-gray-400 text-lg">
            Conecte-se com outros aventureiros
          </p>
        </div>

        {/* Add Member Button */}
        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-2xl flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-lg shadow-orange-500/20 mb-8">
          <UserPlus className="w-6 h-6" />
          <span className="font-semibold">Adicionar Membro</span>
        </button>

        {/* Squad Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl text-center">
            <Users className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <p className="text-3xl font-bold">{squadMembers.length}</p>
            <p className="text-gray-400 text-sm">Membros</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl text-center">
            <MapPin className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <p className="text-3xl font-bold">135</p>
            <p className="text-gray-400 text-sm">Trilhas</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl text-center">
            <Trophy className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <p className="text-3xl font-bold">45</p>
            <p className="text-gray-400 text-sm">Nível Médio</p>
          </div>
        </div>

        {/* Members List */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-6">Membros do Esquadrão</h2>
          <div className="space-y-4">
            {squadMembers.map((member) => (
              <div
                key={member.id}
                className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-orange-500/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-3xl">
                      {member.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{member.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                        <span className="flex items-center gap-1">
                          <Trophy className="w-4 h-4" />
                          Nível {member.level}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {member.trails} trilhas
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-semibold transition-all">
                    Ver Perfil
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mt-8">
          <h2 className="text-2xl font-bold mb-6">Atividade Recente</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 text-sm">
              <Clock className="w-5 h-5 text-orange-500 mt-1" />
              <div>
                <p className="text-white"><strong>João Silva</strong> completou a trilha <strong>Serra do Mar</strong></p>
                <p className="text-gray-400">Há 2 horas</p>
              </div>
            </div>
            <div className="flex items-start gap-4 text-sm">
              <Clock className="w-5 h-5 text-orange-500 mt-1" />
              <div>
                <p className="text-white"><strong>Maria Santos</strong> subiu para o nível 12</p>
                <p className="text-gray-400">Há 5 horas</p>
              </div>
            </div>
            <div className="flex items-start gap-4 text-sm">
              <Clock className="w-5 h-5 text-orange-500 mt-1" />
              <div>
                <p className="text-white"><strong>Pedro Costa</strong> conquistou o troféu <strong>Explorador</strong></p>
                <p className="text-gray-400">Há 1 dia</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  )
}
