import React, { useEffect, useState } from 'react';
import { Users, UserPlus, Search, CheckCircle } from 'lucide-react';
import api from '../services/api';

export default function Recepcao() {
  const [alunosAtivos, setAlunosAtivos] = useState(0);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await api.get('/api/stats');
        setAlunosAtivos(res.data.alunosAtivos);
      } catch (e) { 
        console.error("Erro ao buscar estatísticas reais:", e); 
      }
    }
    loadStats();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase">Estação de Recepção</h1>
        <p className="text-zinc-500 text-sm uppercase tracking-widest font-bold">Controle de Acesso e Matrículas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl flex items-center gap-6">
          <div className="bg-blue-500/20 p-4 rounded-2xl text-blue-500">
            <Users size={32}/>
          </div>
          <div>
            <p className="text-zinc-500 text-xs font-black uppercase">Alunos na Unidade</p>
            <p className="text-3xl font-black text-white">{alunosAtivos}</p>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl flex items-center gap-6">
          <div className="bg-yellow-400/20 p-4 rounded-2xl text-yellow-400">
            <CheckCircle size={32}/>
          </div>
          <div>
            <p className="text-zinc-500 text-xs font-black uppercase">Check-ins Hoje</p>
            <p className="text-3xl font-black text-white">0</p>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
        <h2 className="text-white font-black uppercase italic mb-6">Ações Rápidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-3 bg-zinc-800 hover:bg-zinc-700 text-white p-6 rounded-2xl font-bold transition-all border border-zinc-700">
            <Search size={20} /> BUSCAR ALUNO
          </button>
          <button className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/20">
            <UserPlus size={20} /> NOVA MATRÍCULA
          </button>
        </div>
      </div>
    </div>
  );
}