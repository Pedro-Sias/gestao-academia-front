import React, { useEffect, useState } from 'react';
import { Users, DollarSign, Activity, TrendingUp } from 'lucide-react';
import api from '../services/api';

export default function AdminDashboard() { 
  const [metricas, setMetricas] = useState({
    alunosAtivos: 0,
    faturamento: 0,
    checkins: 0,
    metas: 0
  });

  useEffect(() => {
    async function loadData() {
      try {
        const response = await api.get('/api/stats'); 
        
        if (response.data) {
          setMetricas({
            alunosAtivos: response.data.alunosAtivos || 0,
            faturamento: response.data.faturamento || 0,
            checkins: response.data.checkins || 0,
            metas: response.data.metas || 0
          });
        }
      } catch (err) {
        console.error("Erro ao carregar dashboard admin:", err);
      }
    }
    loadData();
  }, []);

  
  const stats = [
    { 
      name: 'Alunos Ativos', 
      value: metricas.alunosAtivos, 
      icon: Users, 
      color: 'text-blue-400' 
    },
    { 
      name: 'Faturamento Mensal', 
      value: `R$ ${Number(metricas.faturamento).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 
      icon: DollarSign, 
      color: 'text-green-400' 
    },
    { 
      name: 'Check-ins Hoje', 
      value: metricas.checkins, 
      icon: Activity, 
      color: 'text-orange-400' 
    },
    { 
      name: 'Metas do Mês', 
      value: `${metricas.metas}%`, 
      icon: TrendingUp, 
      color: 'text-purple-400' 
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase">Painel Administrativo</h1>
        <p className="text-zinc-500 text-sm uppercase tracking-widest font-bold">Visão geral da sua unidade</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => (
          <div key={item.name} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl hover:border-yellow-400/50 transition-colors shadow-xl group">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-zinc-800 ${item.color} group-hover:scale-110 transition-transform`}>
                <item.icon size={24} />
              </div>
            </div>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">{item.name}</p>
            <p className="text-3xl font-black text-white mt-1 tracking-tighter italic">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
        <h2 className="text-white font-black uppercase italic mb-4">Atividade Recente</h2>
        <div className="h-48 flex items-center justify-center border-2 border-dashed border-zinc-800 rounded-2xl">
            <p className="text-zinc-600 font-bold uppercase text-xs tracking-widest">Sincronizando gráficos em tempo real...</p>
        </div>
      </div>
    </div>
  );
}