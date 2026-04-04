import React from 'react';
import { Users, DollarSign, Activity, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  
  const stats = [
    { name: 'Alunos Ativos', value: '154', icon: Users, color: 'text-blue-400' },
    { name: 'Faturamento Mensal', value: 'R$ 12.450', icon: DollarSign, color: 'text-green-400' },
    { name: 'Check-ins Hoje', value: '42', icon: Activity, color: 'text-orange-400' },
    { name: 'Metas do Mês', value: '85%', icon: TrendingUp, color: 'text-purple-400' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-zinc-400">Visão geral da sua unidade.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => (
          <div key={item.name} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl hover:border-yellow-400/50 transition-colors shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-zinc-800 ${item.color}`}>
                <item.icon size={24} />
              </div>
            </div>
            <p className="text-zinc-400 text-sm font-medium">{item.name}</p>
            <p className="text-3xl font-bold mt-1 tracking-tight">{item.value}</p>
          </div>
        ))}
      </div>

      
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
        <h2 className="text-xl font-bold mb-4">Atividade Recente</h2>
        <div className="h-40 flex items-center justify-center border-2 border-dashed border-zinc-800 rounded-xl">
           <p className="text-zinc-500 italic">Gráfico de faturamento em breve...</p>
        </div>
      </div>
    </div>
  );
}