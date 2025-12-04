'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter, useParams } from 'next/navigation';

type Moto = {
  id: string;
  nome: string;
  modelo: string;
};

export default function NovaManutencaoPage() {
  const router = useRouter();
  const params = useParams();
  const motoId = params.id as string;

  const [moto, setMoto] = useState<Moto | null>(null);
  const [formData, setFormData] = useState({
    tipo: '',
    descricao: '',
    km_realizada: '',
    data_realizada: new Date().toISOString().split('T')[0],
    custo: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (motoId) {
      carregarMoto();
    }
  }, [motoId]);

  const carregarMoto = async () => {
    const { data } = await supabase
      .from('motos')
      .select('id, nome, modelo')
      .eq('id', motoId)
      .single();

    if (data) {
      setMoto(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.tipo || !formData.km_realizada || !formData.data_realizada) {
      alert('Preencha os campos obrigatórios!');
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from('manutencoes')
      .insert({
        moto_id: motoId,
        tipo: formData.tipo,
        descricao: formData.descricao || null,
        km_realizada: parseInt(formData.km_realizada),
        data_realizada: formData.data_realizada,
        custo: formData.custo ? parseFloat(formData.custo) : 0
      });

    if (error) {
      alert(`Erro ao salvar: ${error.message}`);
      setLoading(false);
      return;
    }

    router.push(`/motos/${motoId}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
              <h1 className="text-2xl font-bold">NOVA MANUTENÇÃO</h1>
              {moto && (
                <p className="text-gray-400 text-sm">{moto.nome} - {moto.modelo}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Formulário */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="bg-[#1A1A1A] rounded-2xl border border-gray-800 p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Tipo de Manutenção *
              </label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                className="w-full bg-[#0B0B0B] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition-colors"
                required
              >
                <option value="">Selecione...</option>
                <option value="Troca de Óleo">Troca de Óleo</option>
                <option value="Revisão">Revisão</option>
                <option value="Troca de Pneu">Troca de Pneu</option>
                <option value="Freios">Freios</option>
                <option value="Corrente">Corrente</option>
                <option value="Suspensão">Suspensão</option>
                <option value="Elétrica">Elétrica</option>
                <option value="Outros">Outros</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Descrição
              </label>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                placeholder="Detalhes da manutenção..."
                rows={3}
                className="w-full bg-[#0B0B0B] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Quilometragem *
              </label>
              <input
                type="number"
                name="km_realizada"
                value={formData.km_realizada}
                onChange={handleChange}
                placeholder="Ex: 5420"
                className="w-full bg-[#0B0B0B] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Data da Manutenção *
              </label>
              <input
                type="date"
                name="data_realizada"
                value={formData.data_realizada}
                onChange={handleChange}
                className="w-full bg-[#0B0B0B] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Custo (R$)
              </label>
              <input
                type="number"
                step="0.01"
                name="custo"
                value={formData.custo}
                onChange={handleChange}
                placeholder="Ex: 150.00"
                className="w-full bg-[#0B0B0B] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
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
                type="submit"
                disabled={loading}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Salvando...' : 'Salvar Manutenção'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
