import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { UserPlus, MoreVertical, Search } from 'lucide-react';

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAlunos() {
      try {
        const response = await api.get('/api/alunos');
        setAlunos(response.data);
      } catch (err) {
        console.error("Erro ao carregar alunos:", err);
      } finally {
        setLoading(false);
      }
    }
    loadAlunos();
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white italic tracking-tighter">GESTÃO DE ALUNOS</h1>
          <p className="text-zinc-400 text-sm">Administre a matilha da academia.</p>
        </div>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-black py-3 px-6 rounded-xl flex items-center gap-2 transition-all active:scale-95 shadow-[0_0_20px_rgba(250,204,21,0.2)]">
          <UserPlus size={20} />
          NOVA MATRÍCULA
        </button>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden backdrop-blur-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-800/50 text-zinc-500 text-xs uppercase font-bold tracking-widest border-b border-zinc-800">
              <th className="p-5">Nome do Aluno</th>
              <th className="p-5">E-mail</th>
              <th className="p-5">Status</th>
              <th className="p-5 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {loading ? (
              <tr><td colSpan="4" className="p-10 text-center text-zinc-500 animate-pulse font-bold">BUSCANDO NO BANCO...</td></tr>
            ) : alunos.length > 0 ? (
              alunos.map((aluno) => (
                <tr key={aluno.id} className="hover:bg-zinc-800/30 transition-colors group">
                  <td className="p-5 font-bold text-zinc-100 group-hover:text-yellow-400 transition-colors">{aluno.nome}</td>
                  <td className="p-5 text-zinc-400 text-sm">{aluno.email}</td>
                  <td className="p-5">
                    <span className="bg-green-500/10 text-green-500 text-[10px] px-3 py-1 rounded-full font-black uppercase border border-green-500/20">Ativo</span>
                  </td>
                  <td className="p-5 text-right text-zinc-500">
                    <button className="hover:text-white transition-colors p-2 hover:bg-zinc-800 rounded-lg">
                      <MoreVertical size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-20 text-center text-zinc-600 italic font-medium">
                  Nenhum aluno cadastrado no sistema.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}