
import React, { useState, useMemo } from 'react';
import { Church } from './types';
import { REGIONS_LABELS, STATES } from './constants';
import ChurchCard from './ChurchCard';
import AdminPanel from './AdminPanel';

interface Props {
  churches: Church[];
  favorites: string[];
  isAdmin: boolean;
  toggleFavorite: (id: string) => void;
  onLogout: () => void;
  onAdminLogin: () => void;
  onOpenMap: (c: Church) => void;
  onAdd: (c: Church) => void;
  onUpdate: (c: Church) => void;
  onDelete: (id: string) => void;
}

const Dashboard: React.FC<Props> = ({ 
  churches, favorites, toggleFavorite, isAdmin, 
  onLogout, onAdminLogin, onOpenMap, onAdd, onUpdate, onDelete 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, setFilterState] = useState('');
  const [filterRegion, setFilterRegion] = useState('');

  const isFiltering = useMemo(() => {
    return searchTerm.trim() !== '' || filterState !== '' || filterRegion !== '';
  }, [searchTerm, filterState, filterRegion]);

  const filteredChurches = useMemo(() => {
    if (!isFiltering) return [];
    return churches.filter(church => {
      const matchSearch = church.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          church.city.toLowerCase().includes(searchTerm.toLowerCase());
      const matchState = !filterState || church.state === filterState;
      const matchRegion = !filterRegion || church.region === filterRegion;
      return matchSearch && matchState && matchRegion;
    });
  }, [churches, searchTerm, filterState, filterRegion, isFiltering]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-32">
      <header className="flex items-center justify-between mb-12 bg-white/70 p-5 rounded-[28px] backdrop-blur-md border border-white shadow-sm sticky top-4 z-50">
        <div className="flex items-center gap-4">
          <div className="bg-blue-600 p-2 rounded-xl">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tighter uppercase italic">
            AICEB<span className="text-blue-600">CONECTA</span>
          </h2>
        </div>
        <div className="flex gap-3">
          {!isAdmin ? (
            <button onClick={onAdminLogin} className="px-5 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold text-xs uppercase border border-slate-200">
              🔒 ADMIN
            </button>
          ) : (
            <button onClick={onLogout} className="px-5 py-2 bg-red-50 text-red-600 rounded-xl font-bold text-xs uppercase border border-red-100">
              Sair
            </button>
          )}
        </div>
      </header>

      {isAdmin && <AdminPanel onAdd={onAdd} onUpdate={onUpdate} onDelete={onDelete} churches={churches} />}

      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-black text-slate-900 mb-3">Encontre sua Igreja</h1>
        <p className="text-slate-500 font-medium">Use os filtros para localizar congregações.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-16">
        <input 
          type="text" 
          placeholder="Buscar..." 
          className="md:col-span-6 bg-white border border-slate-200 rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className="md:col-span-3 bg-white border border-slate-200 rounded-2xl py-4 px-5 outline-none" value={filterState} onChange={(e) => setFilterState(e.target.value)}>
          <option value="">Estado</option>
          {STATES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select className="md:col-span-3 bg-white border border-slate-200 rounded-2xl py-4 px-5 outline-none" value={filterRegion} onChange={(e) => setFilterRegion(e.target.value)}>
          <option value="">Região</option>
          {Object.entries(REGIONS_LABELS).map(([val, label]) => <option key={val} value={val}>{label}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {!isFiltering ? (
          <div className="col-span-full py-32 text-center text-slate-400">Escolha um filtro para começar</div>
        ) : filteredChurches.length > 0 ? (
          filteredChurches.map((church) => (
            <ChurchCard key={church.id} church={church} isFavorite={favorites.includes(church.id)} onToggleFavorite={() => toggleFavorite(church.id)} onOpenMap={() => onOpenMap(church)} />
          ))
        ) : (
          <div className="col-span-full py-24 text-center border-2 border-dashed border-slate-200 rounded-3xl">Nenhuma igreja encontrada.</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
