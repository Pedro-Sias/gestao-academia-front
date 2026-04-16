import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';
import Dashboard from './pages/AdminDashboard';
import Alunos from './pages/Alunos';
import GerenciarRecepcionistas from './pages/GerenciarRecepcionistas';
import Recepcao from './pages/RecepcaoDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route 
          path="/dashboard" 
          element={
            <Layout>
              <Dashboard />
            </Layout>
          } 
        />

        <Route 
          path="/alunos" 
          element={
            <Layout>
              <Alunos />
            </Layout>
          } 
        />

        <Route 
          path="/recepcao" 
          element={
            <Layout>
              <Recepcao />
            </Layout>
          } 
        />

        <Route 
          path="/aulas" 
          element={
            <Layout>
              <div className="p-8 bg-zinc-900 rounded-2xl border border-zinc-800">
                <h1 className="text-2xl font-black text-white uppercase italic">Gestão de Aulas</h1>
                <p className="text-zinc-500 mt-2">Módulo em desenvolvimento...</p>
              </div>
            </Layout>
          } 
        />

        <Route 
          path="/usuarios" 
          element={
            <Layout>
              <GerenciarRecepcionistas />
            </Layout>
          } 
        />

        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;