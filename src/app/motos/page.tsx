'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Bike, Plus, Wrench } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

type Moto = {
  id: string;
  nome: string;
  modelo: string;
  cilindrada: number;
  ano: number;
  km_atual: number;
  created_at: string;
};

export default function MotosPage() {
  const router = useRouter();
  const [motos, setMotos] = useState<Moto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarMotos();
  }, []);

  const carregarMotos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('motos')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setMotos(data);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white pb-24">
      {/* Header */}
      <div className="bg-[#1A1A1A] border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/')}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <h1 className="text-2xl font-bold">MINHAS MOTOS</h1>
            </div>
            <button
              onClick={() => router.push('/motos/nova')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Nova Moto
            </button>
          </div>
        </div>
      </div>

      {/* Lista de Motos */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : motos.length === 0 ? (
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {motos.map((moto) => (
              <div 
                key={moto.id}
                className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-6 hover:border-orange-500/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-500/20 p-3 rounded-xl">
                      <Bike className="w-8 h-8 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{moto.nome}</h3>
                      <p className="text-gray-400">{moto.modelo}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Cilindrada</p>
                    <p className="text-lg font-semibold">{moto.cilindrada}cc</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Ano</p>
                    <p className="text-lg font-semibold">{moto.ano}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">KM Atual</p>
                    <p className="text-lg font-semibold">{moto.km_atual.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => router.push(`/motos/${moto.id}`)}
                    className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-xl font-semibold transition-colors"
                  >
                    Ver Detalhes
                  </button>
                  <button
                    onClick={() => router.push(`/motos/${moto.id}/manutencao`)}
                    className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-xl transition-colors"
                  >
                    <Wrench size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
