
import React, { useState } from 'react';
import { Church, Region } from './types';
import { REGIONS_LABELS, STATES } from './constants';

interface Props {
  onAdd: (c: Church) => void;
  onUpdate: (c: Church) => void;
  onDelete: (id: string) => void;
  churches: Church[];
}

const AdminPanel: React.FC<Props> = ({ onAdd, onUpdate, onDelete, churches }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<Church>>({ region: 'amazonica', state: 'PA' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ ...formData, id: Date.now().toString() } as Church);
    setIsAdding(false);
    setFormData({ region: 'amazonica', state: 'PA' });
  };

  return (
    <div className="bg-white border p-6 rounded-3xl mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold">Painel Admin</h3>
        <button onClick={() => setIsAdding(!isAdding)} className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm">
          {isAdding ? 'Fechar' : 'Nova Igreja'}
        </button>
      </div>
      {isAdding && (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-slate-50 rounded-2xl">
          <input className="border p-2 rounded-lg" placeholder="Nome" onChange={e => setFormData({...formData, name: e.target.value})} required />
          <input className="border p-2 rounded-lg" placeholder="Cidade" onChange={e => setFormData({...formData, city: e.target.value})} required />
          <button type="submit" className="bg-blue-600 text-white py-2 rounded-lg md:col-span-2">Salvar</button>
        </form>
      )}
      <div className="max-h-60 overflow-y-auto">
        {churches.map(c => (
          <div key={c.id} className="flex justify-between p-2 border-b text-sm">
            <span>{c.name}</span>
            <button onClick={() => onDelete(c.id)} className="text-red-500">Excluir</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
