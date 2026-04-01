import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
        {/* Provisório até criar a página real */}
        <Route path="/dashboard" element={<div className="p-10 text-white">Logado com sucesso!</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;