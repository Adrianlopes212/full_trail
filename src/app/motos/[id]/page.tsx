'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Bike, Calendar, Wrench, DollarSign, Plus } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter, useParams } from 'next/navigation';

type Moto = {
  id: string;
  nome: string;
  modelo: string;
  cilindrada: number;
  ano: number;
  km_atual: number;
};

type Manutencao = {
  id: string;
  tipo: string;
  descricao: string;
  km_realizada: number;
  data_realizada: string;
  custo: number;
};

export default function MotoDetalhesPage() {
  const router = useRouter();
  const params = useParams();
  const motoId = params.id as string;

  const [moto, setMoto] = useState<Moto | null>(null);
  const [manutencoes, setManutencoes] = useState<Manutencao[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (motoId) {
      carregarDados();
    }
  }, [motoId]);

  const carregarDados = async () => {
    setLoading(true);

    // Carregar dados da moto
    const { data: motoData } = await supabase
      .from('motos')
      .select('*')
      .eq('id', motoId)
      .single();

    if (motoData) {
      setMoto(motoData);
    }

    // Carregar manutenções
    const { data: manutencoesData } = await supabase
      .from('manutencoes')
      .select('*')
      .eq('moto_id', motoId)
      .order('data_realizada', { ascending: false });

    if (manutencoesData) {
      setManutencoes(manutencoesData);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!moto) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] text-white flex items-center justify-center">
        <p>Moto não encontrada</p>
      </div>
    );
  }

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
            <div>
              <h1 className="text-2xl font-bold">{moto.nome}</h1>
              <p className="text-gray-400 text-sm">{moto.modelo}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Card de Informações da Moto */}
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-orange-500/20 p-4 rounded-xl">
              <Bike className="w-12 h-12 text-orange-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{moto.nome}</h2>
              <p className="text-gray-400">{moto.modelo}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#0B0B0B] p-4 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">Cilindrada</p>
              <p className="text-2xl font-bold">{moto.cilindrada}cc</p>
            </div>
            <div className="bg-[#0B0B0B] p-4 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">Ano</p>
              <p className="text-2xl font-bold">{moto.ano}</p>
            </div>
            <div className="bg-[#0B0B0B] p-4 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">KM Atual</p>
              <p className="text-2xl font-bold">{moto.km_atual.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Histórico de Manutenções */}
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Wrench className="w-6 h-6 text-orange-500" />
              Histórico de Manutenções
            </h3>
            <button
              onClick={() => router.push(`/motos/${motoId}/manutencao/nova`)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Nova
            </button>
          </div>

          {manutencoes.length === 0 ? (
            <div className="text-center py-8">
              <Wrench className="w-12 h-12 text-gray-700 mx-auto mb-3" />
              <p className="text-gray-400 mb-4">Nenhuma manutenção registrada</p>
              <button
                onClick={() => router.push(`/motos/${motoId}/manutencao/nova`)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-semibold transition-colors"
              >
                Registrar Primeira Manutenção
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {manutencoes.map((manutencao) => (
                <div
                  key={manutencao.id}
                  className="bg-[#0B0B0B] border border-gray-800 rounded-xl p-4 hover:border-orange-500/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-lg">{manutencao.tipo}</h4>
                      {manutencao.descricao && (
                        <p className="text-sm text-gray-400">{manutencao.descricao}</p>
                      )}
                    </div>
                    {manutencao.custo > 0 && (
                      <div className="flex items-center gap-1 text-orange-500">
                        <DollarSign size={16} />
                        <span className="font-semibold">
                          R$ {manutencao.custo.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(manutencao.data_realizada).toLocaleDateString('pt-BR')}
                    </span>
                    <span>{manutencao.km_realizada.toLocaleString()} km</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
