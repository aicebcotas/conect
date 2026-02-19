
import React, { useState } from 'react';

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
}

const AdminLogin: React.FC<Props> = ({ onSuccess, onCancel }) => {
  const [pin, setPin] = useState('');
  const handleLogin = () => { if (pin === '1234') onSuccess(); else alert('Erro'); };

  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-xl z-[200] flex items-center justify-center p-6">
      <div className="max-w-xs w-full text-center">
        <h2 className="text-2xl font-bold mb-6">PIN de Acesso</h2>
        <input type="password" maxLength={4} className="w-full text-center text-4xl p-4 border rounded-2xl mb-4" value={pin} onChange={e => setPin(e.target.value)} />
        <button onClick={handleLogin} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold">ENTRAR</button>
        <button onClick={onCancel} className="mt-4 text-slate-400">Cancelar</button>
      </div>
    </div>
  );
};

export default AdminLogin;
