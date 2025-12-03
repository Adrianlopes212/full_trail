'use client';

import { useState } from 'react';
import { Wrench, Plus, Trash2, ChevronDown, ChevronUp, Check, AlertCircle, DollarSign, Clock, X, Calendar, Gauge } from 'lucide-react';

interface MaintenanceItem {
  id: string;
  name: string;
  completed: boolean;
  dueDate?: string;
  cost?: number;
}

interface MaintenanceCategory {
  id: string;
  name: string;
  icon: any;
  items: MaintenanceItem[];
}

interface MaintenanceHistory {
  id: string;
  title: string;
  date: string;
  km: number;
  cost: number;
  description?: string;
}

interface Motorcycle {
  id: string;
  name: string;
  model: string;
  year: number;
  km: number;
  lastMaintenance: string;
  nextMaintenance: string;
  totalSpent: number;
  healthScore: number;
  categories: MaintenanceCategory[];
  history: MaintenanceHistory[];
}

export default function ManutencaoPage() {
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([
    {
      id: '1',
      name: 'Minha Moto',
      model: 'Honda CG 160',
      year: 2023,
      km: 5420,
      lastMaintenance: '15/10/2024',
      nextMaintenance: '15/01/2025',
      totalSpent: 1850.00,
      healthScore: 92,
      categories: [
        {
          id: 'motor',
          name: 'Motor',
          icon: Wrench,
          items: [
            { id: '1', name: 'Troca de óleo', completed: true, dueDate: '15/01/2025', cost: 120 },
            { id: '2', name: 'Filtro de óleo', completed: true, dueDate: '15/01/2025', cost: 45 },
            { id: '3', name: 'Velas de ignição', completed: false, dueDate: '20/12/2024', cost: 80 },
            { id: '4', name: 'Correia dentada', completed: false, dueDate: '15/03/2025', cost: 350 },
            { id: '5', name: 'Filtro de ar', completed: true, dueDate: '15/01/2025', cost: 35 },
          ]
        },
        {
          id: 'freios',
          name: 'Freios',
          icon: AlertCircle,
          items: [
            { id: '6', name: 'Pastilhas dianteiras', completed: false, dueDate: '10/01/2025', cost: 180 },
            { id: '7', name: 'Pastilhas traseiras', completed: true, dueDate: '15/02/2025', cost: 150 },
            { id: '8', name: 'Fluido de freio', completed: false, dueDate: '15/12/2024', cost: 40 },
            { id: '9', name: 'Discos de freio', completed: true, dueDate: '15/06/2025', cost: 280 },
          ]
        },
        {
          id: 'transmissao',
          name: 'Transmissão',
          icon: Wrench,
          items: [
            { id: '10', name: 'Corrente', completed: false, dueDate: '20/12/2024', cost: 220 },
            { id: '11', name: 'Coroa', completed: true, dueDate: '15/04/2025', cost: 180 },
            { id: '12', name: 'Pinhão', completed: true, dueDate: '15/04/2025', cost: 95 },
            { id: '13', name: 'Lubrificação da corrente', completed: false, dueDate: '01/12/2024', cost: 25 },
          ]
        },
        {
          id: 'suspensao',
          name: 'Suspensão',
          icon: Wrench,
          items: [
            { id: '14', name: 'Óleo do garfo', completed: true, dueDate: '15/02/2025', cost: 90 },
            { id: '15', name: 'Amortecedor traseiro', completed: false, dueDate: '15/05/2025', cost: 450 },
            { id: '16', name: 'Retentores do garfo', completed: true, dueDate: '15/03/2025', cost: 120 },
          ]
        },
        {
          id: 'pneus',
          name: 'Pneus',
          icon: AlertCircle,
          items: [
            { id: '17', name: 'Pneu dianteiro', completed: false, dueDate: '15/01/2025', cost: 320 },
            { id: '18', name: 'Pneu traseiro', completed: false, dueDate: '15/01/2025', cost: 380 },
            { id: '19', name: 'Calibragem', completed: true, dueDate: '01/12/2024', cost: 0 },
            { id: '20', name: 'Balanceamento', completed: true, dueDate: '15/01/2025', cost: 40 },
          ]
        },
        {
          id: 'chassi',
          name: 'Chassi & Estrutura',
          icon: Wrench,
          items: [
            { id: '21', name: 'Revisão geral', completed: true, dueDate: '15/10/2024', cost: 250 },
            { id: '22', name: 'Lubrificação de cabos', completed: false, dueDate: '15/12/2024', cost: 50 },
            { id: '23', name: 'Verificação de parafusos', completed: true, dueDate: '15/11/2024', cost: 0 },
          ]
        },
      ],
      history: [
        {
          id: 'h1',
          title: 'TROCA DO PNEU',
          date: '29/11/2025',
          km: 5320,
          cost: 532.00,
          description: 'Troca do pneu traseiro'
        },
        {
          id: 'h2',
          title: 'REVISÃO COMPLETA',
          date: '15/10/2024',
          km: 5000,
          cost: 450.00,
          description: 'Revisão dos 5000km'
        },
        {
          id: 'h3',
          title: 'TROCA DE ÓLEO',
          date: '20/08/2024',
          km: 4200,
          cost: 165.00,
          description: 'Troca de óleo e filtro'
        },
        {
          id: 'h4',
          title: 'PASTILHAS DE FREIO',
          date: '10/06/2024',
          km: 3500,
          cost: 280.00,
          description: 'Substituição das pastilhas traseiras'
        },
        {
          id: 'h5',
          title: 'CORRENTE E COROA',
          date: '05/04/2024',
          km: 2800,
          cost: 423.00,
          description: 'Troca do kit de transmissão'
        },
      ]
    }
  ]);

  const [selectedMotoId, setSelectedMotoId] = useState<string>('1');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['chassi']);
  const [showNewMaintenanceModal, setShowNewMaintenanceModal] = useState(false);
  const [newMaintenance, setNewMaintenance] = useState({
    title: '',
    date: '',
    km: '',
    cost: '',
    description: ''
  });

  const selectedMoto = motorcycles.find(m => m.id === selectedMotoId);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleItemCompletion = (categoryId: string, itemId: string) => {
    setMotorcycles(prev =>
      prev.map(moto => {
        if (moto.id === selectedMotoId) {
          return {
            ...moto,
            categories: moto.categories.map(cat => {
              if (cat.id === categoryId) {
                return {
                  ...cat,
                  items: cat.items.map(item =>
                    item.id === itemId ? { ...item, completed: !item.completed } : item
                  )
                };
              }
              return cat;
            })
          };
        }
        return moto;
      })
    );
  };

  const deleteMoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (motorcycles.length === 1) {
      alert('Você precisa ter pelo menos uma moto cadastrada!');
      return;
    }
    
    if (confirm(`Tem certeza que deseja deletar ${selectedMoto?.name}?`)) {
      setMotorcycles(prev => {
        const filtered = prev.filter(m => m.id !== selectedMotoId);
        if (filtered.length > 0) {
          setSelectedMotoId(filtered[0].id);
        }
        return filtered;
      });
    }
  };

  const addNewMoto = () => {
    const newMoto: Motorcycle = {
      id: Date.now().toString(),
      name: 'Nova Moto',
      model: 'Modelo',
      year: 2024,
      km: 0,
      lastMaintenance: new Date().toLocaleDateString('pt-BR'),
      nextMaintenance: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
      totalSpent: 0,
      healthScore: 100,
      categories: [
        {
          id: 'motor',
          name: 'Motor',
          icon: Wrench,
          items: []
        }
      ],
      history: []
    };
    setMotorcycles(prev => [...prev, newMoto]);
    setSelectedMotoId(newMoto.id);
  };

  const handleAddMaintenance = () => {
    if (!newMaintenance.title || !newMaintenance.date || !newMaintenance.km || !newMaintenance.cost) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    const maintenance: MaintenanceHistory = {
      id: Date.now().toString(),
      title: newMaintenance.title.toUpperCase(),
      date: newMaintenance.date,
      km: parseInt(newMaintenance.km),
      cost: parseFloat(newMaintenance.cost),
      description: newMaintenance.description
    };

    setMotorcycles(prev =>
      prev.map(moto => {
        if (moto.id === selectedMotoId) {
          return {
            ...moto,
            history: [maintenance, ...moto.history],
            totalSpent: moto.totalSpent + maintenance.cost
          };
        }
        return moto;
      })
    );

    setNewMaintenance({ title: '', date: '', km: '', cost: '', description: '' });
    setShowNewMaintenanceModal(false);
  };

  if (!selectedMoto) return null;

  const completedItems = selectedMoto.categories.reduce(
    (acc, cat) => acc + cat.items.filter(i => i.completed).length,
    0
  );
  const totalItems = selectedMoto.categories.reduce((acc, cat) => acc + cat.items.length, 0);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-24">
      {/* Header */}
      <div className="bg-[#111] border-b border-gray-800 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">MANUTENÇÃO</h1>
            <button
              onClick={addNewMoto}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Nova Moto
            </button>
          </div>

          {/* Motorcycle Selector */}
          <div className="relative">
            <select
              value={selectedMotoId}
              onChange={(e) => setSelectedMotoId(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white appearance-none cursor-pointer hover:border-orange-500 transition-colors"
            >
              {motorcycles.map(moto => (
                <option key={moto.id} value={moto.id}>
                  {moto.name} - {moto.model} ({moto.year})
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-4">
        {/* Motorcycle Info Card */}
        <div className="bg-[#111] rounded-xl p-6 border border-gray-800">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold mb-1">{selectedMoto.name}</h2>
              <p className="text-gray-400">{selectedMoto.model} • {selectedMoto.year}</p>
            </div>
            <button
              onClick={deleteMoto}
              className="bg-red-500/10 hover:bg-red-500/20 text-red-500 p-2 rounded-lg transition-colors"
              title="Deletar moto"
            >
              <Trash2 size={20} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-[#1a1a1a] rounded-lg p-3">
              <p className="text-gray-400 text-sm mb-1">Quilometragem</p>
              <p className="text-2xl font-bold">{selectedMoto.km.toLocaleString('pt-BR')} km</p>
            </div>
            <div className="bg-[#1a1a1a] rounded-lg p-3">
              <p className="text-gray-400 text-sm mb-1">Saúde</p>
              <p className="text-2xl font-bold text-green-500">{selectedMoto.healthScore}%</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#1a1a1a] rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Clock size={16} className="text-blue-500" />
                <p className="text-gray-400 text-xs">Última</p>
              </div>
              <p className="text-sm font-semibold">{selectedMoto.lastMaintenance}</p>
            </div>
            <div className="bg-[#1a1a1a] rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Clock size={16} className="text-orange-500" />
                <p className="text-gray-400 text-xs">Próxima</p>
              </div>
              <p className="text-sm font-semibold">{selectedMoto.nextMaintenance}</p>
            </div>
            <div className="bg-[#1a1a1a] rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign size={16} className="text-green-500" />
                <p className="text-gray-400 text-xs">Gasto</p>
              </div>
              <p className="text-sm font-semibold">R$ {selectedMoto.totalSpent.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Health Summary */}
        <div className="bg-[#111] rounded-xl p-6 border border-gray-800">
          <h3 className="text-lg font-bold mb-4">Resumo de Saúde</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Itens concluídos</span>
              <span className="font-semibold">{completedItems} / {totalItems}</span>
            </div>
            <div className="w-full bg-[#1a1a1a] rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-full transition-all duration-500"
                style={{ width: `${(completedItems / totalItems) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Maintenance Categories */}
        {selectedMoto.categories.map(category => {
          const CategoryIcon = category.icon;
          const isExpanded = expandedCategories.includes(category.id);
          const completedInCategory = category.items.filter(i => i.completed).length;
          const totalInCategory = category.items.length;

          return (
            <div key={category.id} className="bg-[#111] rounded-xl border border-gray-800 overflow-hidden">
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full p-4 flex items-center justify-between hover:bg-[#1a1a1a] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <CategoryIcon size={24} className="text-orange-500" />
                  <div className="text-left">
                    <h3 className="font-bold text-lg">{category.name}</h3>
                    <p className="text-sm text-gray-400">
                      {completedInCategory} / {totalInCategory} concluídos
                    </p>
                  </div>
                </div>
                {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              {isExpanded && (
                <div className="border-t border-gray-800">
                  {category.items.map(item => (
                    <div
                      key={item.id}
                      className="p-4 border-b border-gray-800 last:border-b-0 hover:bg-[#1a1a1a] transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <button
                            onClick={() => toggleItemCompletion(category.id, item.id)}
                            className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                              item.completed
                                ? 'bg-green-500 border-green-500'
                                : 'border-gray-600 hover:border-orange-500'
                            }`}
                          >
                            {item.completed && <Check size={14} className="text-white" />}
                          </button>
                          <div className="flex-1">
                            <p className={`font-medium ${item.completed ? 'line-through text-gray-500' : ''}`}>
                              {item.name}
                            </p>
                            {item.dueDate && (
                              <p className="text-sm text-gray-400 mt-1">
                                Vencimento: {item.dueDate}
                              </p>
                            )}
                          </div>
                        </div>
                        {item.cost !== undefined && item.cost > 0 && (
                          <div className="text-right">
                            <p className="text-sm font-semibold text-orange-500">
                              R$ {item.cost.toFixed(2)}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Histórico de Manutenção */}
        <div className="bg-[#111] rounded-xl border border-gray-800 overflow-hidden">
          <div className="p-4 border-b border-gray-800">
            <h3 className="text-lg font-bold">Histórico de Manutenção</h3>
          </div>
          <div className="divide-y divide-gray-800">
            {selectedMoto.history.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                <p>Nenhuma manutenção registrada ainda</p>
              </div>
            ) : (
              selectedMoto.history.map(item => (
                <div key={item.id} className="p-4 hover:bg-[#1a1a1a] transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{item.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Gauge size={14} />
                          <span>{item.km.toLocaleString('pt-BR')} km</span>
                        </div>
                      </div>
                      {item.description && (
                        <p className="text-sm text-gray-400 mt-2">{item.description}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-orange-500">
                        R$ {item.cost.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Botão Fixo - Registrar Manutenção */}
      <div className="fixed bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a] to-transparent">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setShowNewMaintenanceModal(true)}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-orange-500/20"
          >
            Registrar Manutenção
          </button>
        </div>
      </div>

      {/* Modal - Nova Manutenção */}
      {showNewMaintenanceModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111] rounded-2xl border border-gray-800 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-800 flex items-center justify-between sticky top-0 bg-[#111] z-10">
              <h2 className="text-xl font-bold">Nova Manutenção</h2>
              <button
                onClick={() => setShowNewMaintenanceModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Título da Manutenção *
                </label>
                <input
                  type="text"
                  value={newMaintenance.title}
                  onChange={(e) => setNewMaintenance({ ...newMaintenance, title: e.target.value })}
                  placeholder="Ex: TROCA DE ÓLEO"
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Data *
                </label>
                <input
                  type="date"
                  value={newMaintenance.date}
                  onChange={(e) => setNewMaintenance({ ...newMaintenance, date: e.target.value })}
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Quilometragem *
                </label>
                <input
                  type="number"
                  value={newMaintenance.km}
                  onChange={(e) => setNewMaintenance({ ...newMaintenance, km: e.target.value })}
                  placeholder="Ex: 5420"
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Custo (R$) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={newMaintenance.cost}
                  onChange={(e) => setNewMaintenance({ ...newMaintenance, cost: e.target.value })}
                  placeholder="Ex: 532.00"
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Descrição (opcional)
                </label>
                <textarea
                  value={newMaintenance.description}
                  onChange={(e) => setNewMaintenance({ ...newMaintenance, description: e.target.value })}
                  placeholder="Detalhes sobre a manutenção..."
                  rows={3}
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowNewMaintenanceModal(false)}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddMaintenance}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
