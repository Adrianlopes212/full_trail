"use client"

import { useState } from "react"
import { AlertTriangle, Phone, MapPin, Clock, User, MessageSquare } from "lucide-react"
import Header from "@/components/Header"
import MobileNav from "@/components/MobileNav"

export default function SOSPage() {
  const [sosActive, setSosActive] = useState(false)

  const emergencyContacts = [
    { name: "SAMU", phone: "192", type: "Emergência Médica" },
    { name: "Bombeiros", phone: "193", type: "Resgate" },
    { name: "Polícia", phone: "190", type: "Emergência Policial" },
  ]

  const handleActivateSOS = () => {
    if (confirm("🚨 Deseja ATIVAR o SOS de emergência?\n\nIsso enviará sua localização para todos os contatos de emergência cadastrados.")) {
      setSosActive(true)
      alert("✅ SOS ATIVADO!\n\n📍 Localização enviada\n📞 Contatos notificados\n🚁 Serviços de resgate alertados")
    }
  }

  const handleDeactivateSOS = () => {
    if (confirm("Deseja DESATIVAR o SOS?")) {
      setSosActive(false)
      alert("✅ SOS desativado com sucesso")
    }
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20 md:pb-0">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 flex items-center gap-3">
            <AlertTriangle className="w-10 h-10 text-red-500" />
            SOS Emergência
          </h1>
          <p className="text-gray-400 text-lg">
            Sistema de emergência para trilhas
          </p>
        </div>

        {/* SOS Status */}
        {sosActive ? (
          <div className="bg-red-600 border-2 border-red-400 rounded-2xl p-8 mb-8 animate-pulse">
            <div className="text-center">
              <AlertTriangle className="w-20 h-20 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">🚨 SOS ATIVADO</h2>
              <p className="text-lg mb-6">Sua localização está sendo compartilhada</p>
              <button
                onClick={handleDeactivateSOS}
                className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all"
              >
                Desativar SOS
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={handleActivateSOS}
            className="w-full bg-red-600 hover:bg-red-700 text-white p-8 rounded-2xl flex flex-col items-center gap-4 transition-all hover:scale-105 shadow-lg shadow-red-600/20 mb-8"
          >
            <AlertTriangle className="w-16 h-16" />
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">ATIVAR SOS</h2>
              <p className="text-red-200">Toque para ativar emergência</p>
            </div>
          </button>
        )}

        {/* Current Location */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-orange-500" />
            Localização Atual
          </h3>
          <div className="bg-gray-800 rounded-xl p-4 mb-4">
            <p className="text-gray-300 mb-2">📍 Coordenadas GPS:</p>
            <p className="font-mono text-orange-500">-23.5505° S, -46.6333° W</p>
          </div>
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition-all">
            Compartilhar Localização
          </button>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Phone className="w-6 h-6 text-orange-500" />
            Contatos de Emergência
          </h3>
          <div className="space-y-3">
            {emergencyContacts.map((contact, index) => (
              <div
                key={index}
                className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex items-center justify-between hover:border-orange-500/50 transition-colors"
              >
                <div>
                  <h4 className="font-semibold text-lg">{contact.name}</h4>
                  <p className="text-sm text-gray-400">{contact.type}</p>
                </div>
                <a
                  href={`tel:${contact.phone}`}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-semibold transition-all flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  {contact.phone}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Personal Contacts */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <User className="w-6 h-6 text-orange-500" />
            Contatos Pessoais
          </h3>
          <p className="text-gray-400 mb-4">Adicione contatos que serão notificados em caso de emergência</p>
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition-all">
            + Adicionar Contato
          </button>
        </div>

        {/* Safety Tips */}
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-4 text-orange-500 flex items-center gap-2">
            <MessageSquare className="w-6 h-6" />
            Dicas de Segurança
          </h3>
          <ul className="space-y-2 text-gray-300">
            <li>• Sempre avise alguém sobre sua rota antes de sair</li>
            <li>• Mantenha seu celular carregado</li>
            <li>• Leve água e suprimentos extras</li>
            <li>• Conheça os sinais de emergência da região</li>
            <li>• Tenha um kit de primeiros socorros</li>
          </ul>
        </div>
      </main>

      <MobileNav />
    </div>
  )
}
