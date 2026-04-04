import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { UserPlus, MoreVertical, X, CheckCircle } from 'lucide-react';

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Estados para o formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [planoId, setPlanoId] = useState(1); // Exemplo: 1=Mensal, 2=Anual

  useEffect(() => {
    loadAlunos();
  }, []);

  async function loadAlunos() {
    setLoading(true);
    try {
      const response = await api.get('/api/alunos');
      setAlunos(response.data);
    } catch (err) {
      console.error("Erro ao carregar alunos:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    try {
      const novoAluno = { nome, email, planoId: Number(planoId) };
      await api.post('/api/alunos', novoAluno);
      
      // Se salvou, limpa tudo e fecha
      setNome('');
      setEmail('');
      setIsModalOpen(false);
      loadAlunos(); // Recarrega a tabela na hora!
    } catch (err) {
      alert("Erro ao matricular aluno. Confere o console!");
      console.error(err);
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white italic tracking-tighter">GESTÃO DE ALUNOS</h1>
          <p className="text-zinc-400 text-sm">Administre a matilha da academia.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-black py-3 px-6 rounded-xl flex items-center gap-2 transition-all active:scale-95 shadow-[0_0_20px_rgba(250,204,21,0.2)]"
        >
          <UserPlus size={20} />
          NOVA MATRÍCULA
        </button>
      </div>

      {/* Tabela (O código que você já tinha) */}
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
              <tr><td colSpan="4" className="p-10 text-center text-zinc-500 animate-pulse font-bold uppercase">BUSCANDO NO BANCO...</td></tr>
            ) : alunos.length > 0 ? (
              alunos.map((aluno) => (
                <tr key={aluno.id} className="hover:bg-zinc-800/30 transition-colors group">
                  <td className="p-5 font-bold text-zinc-100 group-hover:text-yellow-400 transition-colors">{aluno.nome}</td>
                  <td className="p-5 text-zinc-400 text-sm">{aluno.email}</td>
                  <td className="p-5">
                    <span className="bg-green-500/10 text-green-500 text-[10px] px-3 py-1 rounded-full font-black uppercase border border-green-500/20">Ativo</span>
                  </td>
                  <td className="p-5 text-right">
                    <button className="text-zinc-500 hover:text-white p-2 hover:bg-zinc-800 rounded-lg"><MoreVertical size={20} /></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4" className="p-20 text-center text-zinc-600 italic">Nenhum aluno cadastrado.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL DE CADASTRO (A MÁGICA ACONTECE AQUI) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-3xl p-8 shadow-2xl animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-white italic tracking-tighter">MATRICULAR ALUNO</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white"><X size={24}/></button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Nome Completo</label>
                <input 
                  required value={nome} onChange={(e) => setNome(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white focus:outline-none focus:border-yellow-400 transition-colors"
                  placeholder="Ex: Pedro Dev"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 block">E-mail de Contato</label>
                <input 
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white focus:outline-none focus:border-yellow-400 transition-colors"
                  placeholder="aluno@email.com"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Tipo de Plano</label>
                <select 
                  value={planoId} onChange={(e) => setPlanoId(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white focus:outline-none focus:border-yellow-400 appearance-none"
                >
                  <option value={1}>PLANO MENSAL</option>
                  <option value={2}>PLANO TRIMESTRAL</option>
                  <option value={3}>PLANO ANUAL (VIP)</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 mt-6 transition-all active:scale-95 shadow-lg shadow-yellow-400/10"
              >
                <CheckCircle size={20} />
                CONFIRMAR MATRÍCULA
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}