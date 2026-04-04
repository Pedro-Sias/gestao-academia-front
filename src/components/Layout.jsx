import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Dumbbell, Users, Calendar, DollarSign, LogOut, LayoutDashboard, User } from 'lucide-react';


export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/login');
  }

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Alunos', icon: Users, path: '/alunos' },
    { name: 'Aulas', icon: Calendar, path: '/aulas' },
    { name: 'Financeiro', icon: DollarSign, path: '/financeiro' },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 flex text-zinc-100">
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col fixed h-full shadow-2xl">
        <div className="p-6 flex items-center gap-3 border-b border-zinc-800">
          <div className="bg-yellow-400 p-2 rounded-lg">
            <Dumbbell className="text-black w-6 h-6" />
          </div>
          <span className="font-bold text-lg uppercase tracking-tighter">Gestão Fit</span>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  isActive 
                    ? 'bg-yellow-400 text-black font-bold shadow-lg shadow-yellow-400/10' 
                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <button 
          onClick={handleLogout}
          className="p-6 border-t border-zinc-800 flex items-center gap-3 text-zinc-500 hover:text-red-500 transition-colors group"
        >
          <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
          <span className="font-medium">Sair do Sistema</span>
        </button>
      </aside>

      <main className="flex-1 ml-64 p-10">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}