import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { UserCog, Trash2, Edit, X, Save, RefreshCw, UserPlus } from 'lucide-react';

export default function GerenciarRecepcionistas() {
  const [equipe, setEquipe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Estados para o formulário (Cadastro/Edição)
  const [idEditando, setIdEditando] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    loadEquipe();
  }, []);

  async function loadEquipe() {
    setLoading(true);
    try {
      const response = await api.get('/recepcionistas');
      setEquipe(response.data);
    } catch (err) {
      console.error("Erro ao carregar equipe:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    try {
      const dados = { nome, email, senha, status: "ATIVO" };

      if (idEditando) {
        // Se tem ID, chama o PUT que a gente criou no Java
        await api.put(`/recepcionistas/${idEditando}`, dados);
      } else {
        // Se não tem ID, chama o POST
        await api.post('/recepcionistas', dados);
      }

      closeModal();
      loadEquipe();
    } catch (err) {
      alert(err.response?.data || "Erro ao salvar recepcionista");
    }
  }

  async function handleDelete(id) {
    if (window.confirm("Deseja realmente demitir este funcionário?")) {
      try {
        await api.delete(`/recepcionistas/${id}`);
        loadEquipe();
      } catch (err) {
        alert("Erro ao excluir funcionário.");
      }
    }
  }

  function openModal(funcionario = null) {
    if (funcionario) {
      setIdEditando(funcionario.id);
      setNome(funcionario.nome);
      setEmail(funcionario.email);
      setSenha(''); // Senha a gente deixa em branco na edição por segurança
    }
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setIdEditando(null);
    setNome('');
    setEmail('');
    setSenha('');
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white italic tracking-tighter">GESTÃO DE EQUIPE</h1>
          <p className="text-zinc-500 text-sm uppercase tracking-widest font-bold">Administração de Recepcionistas</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-black py-3 px-6 rounded-xl flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-600/20"
        >
          <UserPlus size={20} /> ADMITIR FUNCIONÁRIO
        </button>
      </div>

      {/* TABELA DE EQUIPE */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden backdrop-blur-md">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-zinc-800/50 text-zinc-500 text-[10px] uppercase font-black tracking-[0.2em] border-b border-zinc-800">
              <th className="p-5">Nome do Funcionário</th>
              <th className="p-5">E-mail de Acesso</th>
              <th className="p-5 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {loading ? (
              <tr><td colSpan="3" className="p-10 text-center text-zinc-500 animate-pulse font-black uppercase">Sincronizando equipe...</td></tr>
            ) : equipe.map((func) => (
              <tr key={func.id} className="hover:bg-zinc-800/30 transition-colors group">
                <td className="p-5 font-bold text-zinc-100 group-hover:text-blue-400 transition-colors">{func.nome}</td>
                <td className="p-5 text-zinc-400 text-sm font-mono">{func.email}</td>
                <td className="p-5 text-right flex justify-end gap-2">
                  <button onClick={() => openModal(func)} className="p-2 text-zinc-500 hover:text-white transition-colors"><Edit size={18}/></button>
                  <button onClick={() => handleDelete(func.id)} className="p-2 text-zinc-500 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL DE CADASTRO/EDIÇÃO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="bg-zinc-950 border border-zinc-800 w-full max-w-md rounded-3xl p-8 shadow-2xl animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">
                {idEditando ? 'Editar Funcionário' : 'Novo Recepcionista'}
              </h2>
              <button onClick={closeModal} className="text-zinc-500 hover:text-white"><X size={24}/></button>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              <input 
                placeholder="Nome Completo" required value={nome} onChange={e => setNome(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-white focus:border-blue-500 outline-none transition-all"
              />
              <input 
                type="email" placeholder="E-mail de Login" required value={email} onChange={e => setEmail(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-white focus:border-blue-500 outline-none transition-all"
              />
              <input 
                type="password" placeholder={idEditando ? "Nova Senha (opcional)" : "Senha de Acesso"} 
                required={!idEditando} value={senha} onChange={e => setSenha(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-white focus:border-blue-500 outline-none transition-all"
              />
              
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20 uppercase italic">
                <Save size={20} /> {idEditando ? 'Salvar Alterações' : 'Confirmar Admissão'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}