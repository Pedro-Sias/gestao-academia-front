import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, Lock, Mail } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState ('');
    const [senha, setSenha] = useState ('');
    const [erro, setErro] = useState ('');
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        setErro('');

        try {
            const response = await api.post('/auth/login', {email, senha});
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch(err) {
            setErro('Email ou senha incorretos.')
        }
    }

    return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-zinc-900 p-8 rounded-2xl border border-zinc-800 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-yellow-400 p-3 rounded-full mb-4">
            <Dumbbell className="text-black w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-white uppercase tracking-wider">Gestão Academia</h1>
          <p className="text-zinc-400 text-sm">Foco no treino, esquece o resto</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-zinc-400 text-sm mb-2 font-medium">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-zinc-600 w-5 h-5" />
              <input 
                type="email" 
                required
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-yellow-400 transition-colors"
                placeholder="seu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-zinc-400 text-sm mb-2 font-medium">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-zinc-600 w-5 h-5" />
              <input 
                type="password" 
                required
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-yellow-400 transition-colors"
                placeholder="••••••••"
                value={senha}
                onChange={e => setSenha(e.target.value)}
              />
            </div>
          </div>

          {erro && <p className="text-red-500 text-sm text-center font-medium">{erro}</p>}

          <button 
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-lg transition-all active:scale-95 shadow-lg shadow-yellow-400/10"
          >
            ENTRAR NO SISTEMA
          </button>
        </form>
      </div>
    </div>
  );
}