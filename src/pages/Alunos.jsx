import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { UserPlus, X, CheckCircle, DollarSign, Wallet } from 'lucide-react';

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFinanceiroOpen, setIsFinanceiroOpen] = useState(false);
  const [mensalidades, setMensalidades] = useState([]);
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [planoId, setPlanoId] = useState(1);

  useEffect(() => {
    loadAlunos();
  }, []);

  async function loadAlunos() {
    setLoading(true);
    try {
      const response = await api.get('/api/alunos');
      setAlunos(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function abrirFinanceiro(aluno) {
    setAlunoSelecionado(aluno);
    setIsFinanceiroOpen(true);
    try {
      const response = await api.get('/api/mensalidades');
      const filtradas = response.data.filter(m => {
        const nomeNoBanco = m.nomeAluno ? m.nomeAluno.trim().toLowerCase() : "";
        const nomeClicado = aluno.nome ? aluno.nome.trim().toLowerCase() : "";
        return nomeNoBanco === nomeClicado;
      });
      setMensalidades(filtradas);
    } catch (err) {
      console.error(err);
    }
  }

  async function handlePagar(id) {
    try {
      await api.put(`/api/mensalidades/${id}/pagar`);
      const response = await api.get('/api/mensalidades');
      const filtradas = response.data.filter(m => {
        const nomeNoBanco = m.nomeAluno ? m.nomeAluno.trim().toLowerCase() : "";
        const nomeClicado = alunoSelecionado.nome ? alunoSelecionado.nome.trim().toLowerCase() : "";
        return nomeNoBanco === nomeClicado;
      });
      setMensalidades(filtradas);
    } catch (err) {
      alert("Erro ao processar pagamento.");
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    try {
      const novoAluno = { nome, email, planoId: Number(planoId) };
      await api.post('/api/alunos', novoAluno);
      setNome('');
      setEmail('');
      setIsModalOpen(false);
      loadAlunos();
    } catch (err) {
      alert("Erro ao matricular aluno.");
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white italic tracking-tighter uppercase">Gestão de Alunos</h1>
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
              <tr><td colSpan="4" className="p-10 text-center text-zinc-500 animate-pulse font-bold uppercase">Buscando no banco...</td></tr>
            ) : alunos.map((aluno) => (
              <tr key={aluno.id} className="hover:bg-zinc-800/30 transition-colors group">
                <td className="p-5 font-bold text-zinc-100 group-hover:text-yellow-400 transition-colors">{aluno.nome}</td>
                <td className="p-5 text-zinc-400 text-sm">{aluno.email}</td>
                <td className="p-5">
                  <span className="bg-green-500/10 text-green-500 text-[10px] px-3 py-1 rounded-full font-black uppercase border border-green-500/20">Ativo</span>
                </td>
                <td className="p-5 text-right space-x-2">
                  <button 
                    onClick={() => abrirFinanceiro(aluno)}
                    className="text-emerald-400 hover:text-emerald-300 p-2 hover:bg-emerald-500/10 rounded-lg transition-all"
                  >
                    <DollarSign size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isFinanceiroOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-2xl rounded-3xl p-8 shadow-2xl animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">Financeiro</h2>
                <p className="text-yellow-400 font-bold text-sm uppercase">{alunoSelecionado?.nome}</p>
              </div>
              <button onClick={() => setIsFinanceiroOpen(false)} className="text-zinc-500 hover:text-white"><X size={24}/></button>
            </div>

            <div className="space-y-4">
              {mensalidades.length > 0 ? mensalidades.map((m) => (
                <div key={m.id} className="bg-zinc-800/50 border border-zinc-700 p-4 rounded-2xl flex justify-between items-center">
                  <div>
                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Vencimento: {m.dataVencimento}</p>
                    <p className="text-xl font-black text-white italic">R$ {m.valor.toFixed(2)}</p>
                  </div>
                  
                  {m.status === 'PAGO' ? (
                    <span className="flex items-center gap-2 text-emerald-400 font-black text-xs uppercase bg-emerald-400/10 px-4 py-2 rounded-xl border border-emerald-400/20">
                      <CheckCircle size={16} /> Pago
                    </span>
                  ) : (
                    <button 
                      onClick={() => handlePagar(m.id)}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white font-black py-2 px-6 rounded-xl flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-emerald-500/10"
                    >
                      <Wallet size={16} /> Dar Baixa
                    </button>
                  )}
                </div>
              )) : (
                <div className="text-center py-10">
                  <p className="text-zinc-500 italic mb-2">Nenhuma mensalidade encontrada.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-md rounded-3xl p-8 shadow-2xl animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">Matricular Aluno</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white"><X size={24}/></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Nome Completo</label>
                <input required value={nome} onChange={(e) => setNome(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white focus:outline-none focus:border-yellow-400" />
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 block">E-mail</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white focus:outline-none focus:border-yellow-400" />
              </div>
              <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 mt-6 transition-all active:scale-95">
                <CheckCircle size={20} /> Confirmar Matrícula
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}