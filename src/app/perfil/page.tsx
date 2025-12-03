"use client"

import { useState, useEffect } from "react"
import { store, type UserStats } from "@/lib/store"
import Header from "@/components/Header"
import MobileNav from "@/components/MobileNav"
import { User, Award, TrendingUp, Mountain, Clock, Settings, LogOut, Camera } from "lucide-react"

export default function PerfilPage() {
  const [stats, setStats] = useState<UserStats>(store.getStats())
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Aventureiro",
    bio: "Apaixonado por trilhas e natureza 🏔️",
    location: "São Paulo, Brasil"
  })

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setStats(store.getStats())
    })
    return unsubscribe
  }, [])

  const achievements = [
    { name: "Primeira Trilha", icon: "🎯", unlocked: stats.trilhas >= 1 },
    { name: "Explorador", icon: "🗺️", unlocked: stats.trilhas >= 5 },
    { name: "Maratonista", icon: "🏃", unlocked: stats.distancia >= 50 },
    { name: "Veterano", icon: "⭐", unlocked: stats.trilhas >= 10 },
    { name: "Mestre das Trilhas", icon: "👑", unlocked: stats.trilhas >= 25 },
    { name: "100km Club", icon: "💯", unlocked: stats.distancia >= 100 },
  ]

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

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Profile Header */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <User className="w-16 h-16" />
              </div>
              <button className="absolute bottom-0 right-0 bg-orange-500 hover:bg-orange-600 p-2 rounded-full transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 focus:outline-none focus:border-orange-500"
                  />
                  <input
                    type="text"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 focus:outline-none focus:border-orange-500"
                  />
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 focus:outline-none focus:border-orange-500"
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold mb-2">{profile.name}</h2>
                  <p className="text-gray-400 mb-1">{profile.bio}</p>
                  <p className="text-sm text-gray-500">📍 {profile.location}</p>
                </>
              )}

              <div className="flex items-center justify-center md:justify-start gap-3 mt-4">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-semibold transition-all hover:scale-105"
                >
                  {isEditing ? "Salvar" : "Editar Perfil"}
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-xl transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center">
            <Mountain className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <p className="text-3xl font-bold mb-1">{stats.trilhas}</p>
            <p className="text-sm text-gray-400">Trilhas</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center">
            <TrendingUp className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <p className="text-3xl font-bold mb-1">{formatDistance(stats.distancia)}</p>
            <p className="text-sm text-gray-400">Distância</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center">
            <Clock className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <p className="text-3xl font-bold mb-1">{formatTime(stats.tempo)}</p>
            <p className="text-sm text-gray-400">Tempo</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center">
            <Award className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <p className="text-3xl font-bold mb-1">{stats.nivel}</p>
            <p className="text-sm text-gray-400">{stats.pontos} pts</p>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-6">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-orange-500" />
            Conquistas
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`border rounded-2xl p-6 text-center transition-all ${
                  achievement.unlocked
                    ? "bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-500/50"
                    : "bg-gray-800 border-gray-700 opacity-50"
                }`}
              >
                <div className="text-4xl mb-2">{achievement.icon}</div>
                <p className="font-semibold text-sm">{achievement.name}</p>
                {achievement.unlocked && (
                  <p className="text-xs text-orange-500 mt-1">✓ Desbloqueado</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button className="bg-gray-900 hover:bg-gray-800 border border-gray-800 text-white p-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
            <Settings className="w-5 h-5" />
            Configurações
          </button>
          <button className="bg-red-600/20 hover:bg-red-600/30 border border-red-600/50 text-red-500 p-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
            <LogOut className="w-5 h-5" />
            Sair
          </button>
        </div>
      </main>

      <MobileNav />
    </div>
  )
}
