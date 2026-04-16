import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Dumbbell, Users, Calendar, DollarSign, LogOut, UserCog, Monitor } from 'lucide-react';

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const tipoUsuario = localStorage.getItem('tipo');

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('tipo');
    navigate('/login');
  }

  const allMenuItems = [
    { name: 'Financeiro', icon: DollarSign, path: '/dashboard', roles: ['ADMIN'] },
    { name: 'Recepção', icon: Monitor, path: '/recepcao', roles: ['RECEPCIONISTA'] },
    { name: 'Alunos', icon: Users, path: '/alunos', roles: ['ADMIN', 'RECEPCIONISTA'] },
    { name: 'Aulas', icon: Calendar, path: '/aulas', roles: ['ADMIN', 'RECEPCIONISTA'] },
    { name: 'Equipe', icon: UserCog, path: '/usuarios', roles: ['ADMIN'] },
  ];

  const menuItems = allMenuItems.filter(item => item.roles.includes(tipoUsuario));

  return (
    <div className="min-h-screen bg-zinc-950 flex text-zinc-100">
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col fixed h-full shadow-2xl">
        <div className="p-6 flex items-center gap-3 border-b border-zinc-800">
          <div className="bg-yellow-400 p-2 rounded-lg"><Dumbbell className="text-black w-6 h-6" /></div>
          <span className="font-black text-lg uppercase tracking-tighter italic">Gestão Fit</span>
        </div>
        <nav className="flex-1 p-4 space-y-2 mt-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.name} to={item.path} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${isActive ? 'bg-yellow-400 text-black font-black' : 'text-zinc-500 hover:text-white'}`}>
                <item.icon size={20} />
                <span className="text-xs uppercase font-black tracking-widest">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <button onClick={handleLogout} className="p-6 border-t border-zinc-800 flex items-center gap-3 text-zinc-600 hover:text-red-500 font-black uppercase text-[10px]">
          <LogOut size={18} /><span>Sair do Sistema</span>
        </button>
      </aside>
      <main className="flex-1 ml-64 p-10"><div className="max-w-6xl mx-auto">{children}</div></main>
    </div>
  );
}