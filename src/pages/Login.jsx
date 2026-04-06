import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, Lock, Mail } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        setErro('');

        try {
            const response = await api.post('/auth/login', { email, senha });
            
            const { token, tipo } = response.data;

            localStorage.setItem('token', token);

            
            if (tipo === 'ADMIN') {
                navigate('/dashboard');
            } else if (tipo === 'RECEPCIONISTA') {
                navigate('/recepcao');
            } else {
                // Caso você crie um perfil de Aluno no futuro
                navigate('/perfil-aluno');
            }

        } catch (err) {
            console.error("Erro no login:", err);
            setErro('Email ou senha incorretos.');
        }
    }

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-zinc-900 p-8 rounded-2xl border border-zinc-800 shadow-2xl animate-in fade-in zoom-in duration-500">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-yellow-400 p-3 rounded-full mb-4 shadow-[0_0_20px_rgba(250,204,21,0.3)]">
                        <Dumbbell className="text-black w-8 h-8" />
                    </div>
                    <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter">Gestão Academia</h1>
                    <p className="text-zinc-500 text-sm font-medium">FOCO NO TREINO, ESQUECE O RESTO</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-zinc-400 text-[10px] uppercase font-black tracking-widest mb-2">E-mail</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3.5 text-zinc-600 w-5 h-5" />
                            <input 
                                type="email" 
                                required
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-yellow-400 transition-all placeholder:text-zinc-600"
                                placeholder="seu@email.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-zinc-400 text-[10px] uppercase font-black tracking-widest mb-2">Senha</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3.5 text-zinc-600 w-5 h-5" />
                            <input 
                                type="password" 
                                required
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-yellow-400 transition-all placeholder:text-zinc-600"
                                placeholder="••••••••"
                                value={senha}
                                onChange={e => setSenha(e.target.value)}
                            />
                        </div>
                    </div>

                    {erro && (
                        <div className="bg-red-500/10 border border-red-500/20 py-2 rounded-lg">
                            <p className="text-red-500 text-xs text-center font-bold uppercase tracking-tighter">{erro}</p>
                        </div>
                    )}

                    <button 
                        type="submit"
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-black py-4 rounded-xl transition-all active:scale-95 shadow-xl shadow-yellow-400/20 uppercase italic"
                    >
                        Entrar no Sistema
                    </button>
                </form>
            </div>
        </div>
    );
}