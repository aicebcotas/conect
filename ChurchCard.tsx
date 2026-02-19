
import React from 'react';
import { Church } from './types';
import { REGIONS_LABELS } from './constants';

interface Props {
  church: Church;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onOpenMap: () => void;
}

const ChurchCard: React.FC<Props> = ({ church, isFavorite, onToggleFavorite, onOpenMap }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-xl transition-all flex flex-col h-full">
      <div className="flex justify-between mb-4">
        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          {REGIONS_LABELS[church.region]}
        </span>
        <button onClick={onToggleFavorite} className="text-xl">
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      <h3 className="text-lg font-bold mb-2">{church.name}</h3>
      <p className="text-sm text-slate-500 mb-6 flex-1">📍 {church.city}, {church.state}</p>
      <button onClick={onOpenMap} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest">
        VER NO MAPA
      </button>
    </div>
  );
};

export default ChurchCard;
