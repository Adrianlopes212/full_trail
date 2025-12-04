'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NovaMotoPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white pb-24">
      {/* Header */}
      <div className="bg-[#1A1A1A] border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold">NOVA MOTO</h1>
          </div>
        </div>
      </div>

      {/* Formulário */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <form className="bg-[#1A1A1A] rounded-2xl border border-gray-800 p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Nome *
              </label>
              <input
                type="text"
                name="nome"
                placeholder="Ex: Minha CG"
                className="w-full bg-[#0B0B0B] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Modelo *
              </label>
              <input
                type="text"
                name="modelo"
                placeholder="Ex: CG 160"
                className="w-full bg-[#0B0B0B] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Cilindrada *
              </label>
              <input
                type="text"
                name="cilindrada"
                placeholder="Ex: 160cc"
                className="w-full bg-[#0B0B0B] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Ano *
              </label>
              <input
                type="number"
                name="ano"
                placeholder="Ex: 2023"
                className="w-full bg-[#0B0B0B] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Quilometragem Atual *
              </label>
              <input
                type="number"
                name="km_atual"
                placeholder="Ex: 5420"
                className="w-full bg-[#0B0B0B] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
                required
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-xl font-semibold transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                id="salvar-moto-btn"
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition-colors"
              >
                Salvar Moto
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
