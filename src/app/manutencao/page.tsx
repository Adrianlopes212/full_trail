'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Wrench, Cog, Gauge, CircleDot, Zap, Package, Check, Calendar } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Moto {
  id: string;
  nome: string;
  modelo: string;
  ano: number;
  km_atual: number;
}

interface Manutencao {
  id: string;
  moto_id: string;
  categoria: string;
  item: string;
  data: string;
  km: number;
  descricao?: string;
}

interface ItemManutencao {
  nome: string;
  ultimaData?: string;
  ultimoKm?: number;
  feito: boolean;
}

interface CategoriaManutencao {
  id: string;
  nome: string;
  icon: any;
  itens: ItemManutencao[];
}

export default function ManutencaoPage() {
  const [motos, setMotos] = useState<Moto[]>([]);
  const [motoSelecionada, setMotoSelecionada] = useState<string>('');
  const [manutencoes, setManutencoes] = useState<Manutencao[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState<{ categoria: string; item: string } | null>(null);
  const [showNovaMotoModal, setShowNovaMotoModal] = useState(false);
  const [novaMoto, setNovaMoto] = useState({ nome: '', modelo: '', ano: '', km: '' });
  const [novaManutencao, setNovaManutencao] = useState({ data: '', km: '', descricao: '' });

  // Categorias de manutenção com itens padrão
  const categorias: CategoriaManutencao[] = [
    {
      id: 'motor',
      nome: 'Motor',
      icon: Wrench,
      itens: [
        { nome: 'Troca de óleo', feito: false },
        { nome: 'Filtro de óleo', feito: false },
        { nome: 'Velas de ignição', feito: false },
        { nome: 'Filtro de ar', feito: false },
        { nome: 'Correia dentada', feito: false },
      ]
    },
    {
      id: 'transmissao',
      nome: 'Transmissão',
      icon: Cog,
      itens: [
        { nome: 'Corrente', feito: false },
        { nome: 'Coroa', feito: false },
        { nome: 'Pinhão', feito: false },
        { nome: 'Lubrificação da corrente', feito: false },
      ]
    },
    {
      id: 'suspensao',
      nome: 'Suspensão & Rodas',
      icon: CircleDot,
      itens: [
        { nome: 'Óleo do garfo', feito: false },
        { nome: 'Amortecedor traseiro', feito: false },
        { nome: 'Retentores do garfo', feito: false },
        { nome: 'Pneu dianteiro', feito: false },
        { nome: 'Pneu traseiro', feito: false },
      ]
    },
    {
      id: 'freios',
      nome: 'Freios',
      icon: Gauge,
      itens: [
        { nome: 'Pastilhas dianteiras', feito: false },
        { nome: 'Pastilhas traseiras', feito: false },
        { nome: 'Fluido de freio', feito: false },
        { nome: 'Discos de freio', feito: false },
      ]
    },
    {
      id: 'eletrica',
      nome: 'Elétrica',
      icon: Zap,
      itens: [
        { nome: 'Bateria', feito: false },
        { nome: 'Farol', feito: false },
        { nome: 'Lanterna', feito: false },
        { nome: 'Setas', feito: false },
      ]
    },
    {
      id: 'outros',
      nome: 'Outros',
      icon: Package,
      itens: [
        { nome: 'Revisão geral', feito: false },
        { nome: 'Lubrificação de cabos', feito: false },
        { nome: 'Verificação de parafusos', feito: false },
      ]
    }
  ];

  // Carregar motos do banco
  useEffect(() => {
    carregarMotos();
  }, []);

  // Carregar manutenções quando selecionar uma moto
  useEffect(() => {
    if (motoSelecionada) {
      carregarManutencoes();
    }
  }, [motoSelecionada]);

  const carregarMotos = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return;
    }

    const { data, error } = await supabase
      .from('motos')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (data && data.length > 0) {
      setMotos(data);
      if (!motoSelecionada) {
        setMotoSelecionada(data[0].id);
      }
    }
  };

  const carregarManutencoes = async () => {
    const { data, error } = await supabase
      .from('manutencao')
      .select('*')
      .eq('moto_id', motoSelecionada)
      .order('data', { ascending: false });

    if (data) {
      setManutencoes(data);
    }
  };

  const obterUltimaManutencao = (categoria: string, item: string) => {
    const manutencao = manutencoes.find(
      m => m.categoria === categoria && m.item === item
    );
    return manutencao;
  };

  const abrirModalManutencao = (categoria: string, item: string) => {
    setItemSelecionado({ categoria, item });
    setShowModal(true);
  };

  const registrarManutencao = async () => {
    if (!itemSelecionado || !novaManutencao.data || !novaManutencao.km) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    const { error } = await supabase
      .from('manutencao')
      .insert({
        moto_id: motoSelecionada,
        categoria: itemSelecionado.categoria,
        item: itemSelecionado.item,
        data: novaManutencao.data,
        km: parseInt(novaManutencao.km),
        descricao: novaManutencao.descricao
      });

    if (!error) {
      setShowModal(false);
      setNovaManutencao({ data: '', km: '', descricao: '' });
      setItemSelecionado(null);
      carregarManutencoes();
    }
  };

  const adicionarNovaMoto = async () => {
    if (!novaMoto.nome || !novaMoto.modelo || !novaMoto.ano || !novaMoto.km) {
      alert('Preencha todos os campos!');
      return;
    }

    const { data, error } = await supabase
      .from('motos')
      .insert({
        nome: novaMoto.nome,
        modelo: novaMoto.modelo,
        ano: parseInt(novaMoto.ano),
        km_atual: parseInt(novaMoto.km)
      })
      .select()
      .single();

    if (!error && data) {
      setShowNovaMotoModal(false);
      setNovaMoto({ nome: '', modelo: '', ano: '', km: '' });
      carregarMotos();
      setMotoSelecionada(data.id);
    }
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white pb-24">
      {/* Header */}
      <div className="bg-[#1A1A1A] border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => window.history.back()}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold">MANUTENÇÃO</h1>
            <button
              onClick={() => window.location.href = '/motos/nova'}
              className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              Nova Moto
            </button>
          </div>

          {/* Select de Moto */}
          <div className="relative">
            <select
              value={motoSelecionada}
              onChange={(e) => setMotoSelecionada(e.target.value)}
              className="w-full bg-[#0B0B0B] border border-gray-700 rounded-xl px-4 py-3 text-white appearance-none cursor-pointer hover:border-orange-500 transition-colors"
            >
              <option value="">Selecione uma Moto</option>
              {motos.map(moto => (
                <option key={moto.id} value={moto.id}>
                  {moto.nome} - {moto.modelo} ({moto.ano})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      {motoSelecionada && (
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
          {categorias.map(categoria => {
            const Icon = categoria.icon;
            return (
              <div key={categoria.id} className="bg-[#1A1A1A] rounded-2xl border border-gray-800 overflow-hidden">
                {/* Título da Categoria */}
                <div className="bg-gradient-to-r from-orange-500/10 to-transparent p-4 border-b border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-500/20 p-2 rounded-lg">
                      <Icon size={24} className="text-orange-500" />
                    </div>
                    <h2 className="text-xl font-bold">{categoria.nome}</h2>
                  </div>
                </div>

                {/* Itens da Categoria */}
                <div className="p-2">
                  {categoria.itens.map((item, index) => {
                    const ultimaManutencao = obterUltimaManutencao(categoria.id, item.nome);
                    const foiFeito = !!ultimaManutencao;

                    return (
                      <button
                        key={index}
                        onClick={() => abrirModalManutencao(categoria.id, item.nome)}
                        className="w-full bg-[#0B0B0B] hover:bg-[#252525] border border-gray-800 rounded-xl p-4 mb-2 transition-all hover:border-orange-500/50"
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-left flex-1">
                            <p className="font-semibold text-lg mb-1">{item.nome}</p>
                            {ultimaManutencao && (
                              <p className="text-sm text-gray-400">
                                Última: {formatarData(ultimaManutencao.data)} ({ultimaManutencao.km} km)
                              </p>
                            )}
                          </div>
                          {foiFeito && (
                            <div className="bg-green-500/20 p-2 rounded-full">
                              <Check size={20} className="text-green-500" />
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal - Registrar Manutenção */}
      {showModal && itemSelecionado && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1A1A1A] rounded-2xl border border-gray-800 w-full max-w-md">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-xl font-bold">Registrar Manutenção</h2>
              <p className="text-gray-400 mt-1">{itemSelecionado.item}</p>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Data *
                </label>
                <input
                  type="date"
                  value={novaManutencao.data}
                  onChange={(e) => setNovaManutencao({ ...novaManutencao, data: e.target.value })}
                  className="w-full bg-[#0B0B0B] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Quilometragem *
                </label>
                <input
                  type="number"
                  value={novaManutencao.km}
                  onChange={(e) => setNovaManutencao({ ...novaManutencao, km: e.target.value })}
                  placeholder="Ex: 5420"
                  className="w-full bg-[#0B0B0B] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Descrição (opcional)
                </label>
                <textarea
                  value={novaManutencao.descricao}
                  onChange={(e) => setNovaManutencao({ ...novaManutencao, descricao: e.target.value })}
                  placeholder="Detalhes sobre a manutenção..."
                  rows={3}
                  className="w-full bg-[#0B0B0B] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setNovaManutencao({ data: '', km: '', descricao: '' });
                    setItemSelecionado(null);
                  }}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-xl font-semibold transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={registrarManutencao}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition-colors"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Nova Moto */}
      {showNovaMotoModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1A1A1A] rounded-2xl border border-gray-800 w-full max-w-md">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-xl font-bold">Nova Moto</h2>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Nome *
                </label>
                <input
                  type="text"
                  value={novaMoto.nome}
                  onChange={(e) => setNovaMoto({ ...novaMoto, nome: e.target.value })}
                  placeholder="Ex: Minha Moto"
                  className="w-full bg-[#0B0B0B] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Modelo *
                </label>
                <input
                  type="text"
                  value={novaMoto.modelo}
                  onChange={(e) => setNovaMoto({ ...novaMoto, modelo: e.target.value })}
                  placeholder="Ex: Honda CG 160"
                  className="w-full bg-[#0B0B0B] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Ano *
                </label>
                <input
                  type="number"
                  value={novaMoto.ano}
                  onChange={(e) => setNovaMoto({ ...novaMoto, ano: e.target.value })}
                  placeholder="Ex: 2023"
                  className="w-full bg-[#0B0B0B] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Quilometragem Atual *
                </label>
                <input
                  type="number"
                  value={novaMoto.km}
                  onChange={(e) => setNovaMoto({ ...novaMoto, km: e.target.value })}
                  placeholder="Ex: 5420"
                  className="w-full bg-[#0B0B0B] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowNovaMotoModal(false);
                    setNovaMoto({ nome: '', modelo: '', ano: '', km: '' });
                  }}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-xl font-semibold transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={adicionarNovaMoto}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition-colors"
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
