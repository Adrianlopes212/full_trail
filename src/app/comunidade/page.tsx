"use client"

import Header from "@/components/Header"
import MobileNav from "@/components/MobileNav"
import { Users, MessageCircle, Heart, Share2, Award } from "lucide-react"

export default function ComunidadePage() {
  const posts = [
    {
      user: "Carlos Silva",
      avatar: "CS",
      time: "2h atrás",
      content: "Acabei de completar a Trilha da Pedra Grande! Vista incrível! 🏔️",
      likes: 24,
      comments: 5,
      trail: "Pedra Grande - 8.5km"
    },
    {
      user: "Ana Costa",
      avatar: "AC",
      time: "5h atrás",
      content: "Alguém já fez a trilha do Pico dos Marins? Dicas?",
      likes: 12,
      comments: 8,
      trail: null
    },
    {
      user: "João Santos",
      avatar: "JS",
      time: "1d atrás",
      content: "Grupo para trilha no fim de semana! Quem topa? 🎒",
      likes: 31,
      comments: 15,
      trail: null
    },
  ]

  const topUsers = [
    { name: "Maria Oliveira", level: "Mestre", points: 3250, avatar: "MO" },
    { name: "Pedro Lima", level: "Veterano", points: 2180, avatar: "PL" },
    { name: "Julia Ferreira", level: "Aventureiro", points: 1890, avatar: "JF" },
  ]

  return (
    <div className="min-h-screen bg-black text-white pb-20 md:pb-0">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2">Comunidade</h2>
          <p className="text-gray-400">Conecte-se com outros aventureiros</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Feed */}
          <div className="md:col-span-2 space-y-4">
            {/* New Post */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <textarea
                placeholder="Compartilhe sua aventura..."
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                rows={3}
              />
              <div className="flex items-center justify-end gap-3 mt-3">
                <button className="text-gray-400 hover:text-orange-500 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-semibold transition-all hover:scale-105">
                  Publicar
                </button>
              </div>
            </div>

            {/* Posts */}
            {posts.map((post, index) => (
              <div key={index} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {post.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold">{post.user}</h4>
                      <span className="text-sm text-gray-400">{post.time}</span>
                    </div>
                    <p className="text-gray-300 mb-3">{post.content}</p>
                    {post.trail && (
                      <div className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 inline-block text-sm text-orange-500">
                        📍 {post.trail}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-6 pt-4 border-t border-gray-800">
                  <button className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5" />
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors ml-auto">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Users */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-orange-500" />
                Top Aventureiros
              </h3>
              <div className="space-y-4">
                {topUsers.map((user, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {user.avatar}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{user.name}</h4>
                      <p className="text-xs text-gray-400">{user.level} • {user.points} pts</p>
                    </div>
                    <span className="text-2xl font-bold text-orange-500">#{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Groups */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-500" />
                Grupos Ativos
              </h3>
              <div className="space-y-3">
                {["Trilheiros SP", "Aventureiros RJ", "Montanhistas BR"].map((group, index) => (
                  <button
                    key={index}
                    className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl px-4 py-3 text-left transition-colors"
                  >
                    <p className="font-semibold text-sm">{group}</p>
                    <p className="text-xs text-gray-400">{Math.floor(Math.random() * 500) + 100} membros</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  )
}
