
import React, { useState, useEffect } from 'react';
import { INITIAL_CHURCHES } from './constants';
import { Church } from './types';
import LandingPage from './components/LandingPage.tsx';
import Dashboard from './components/Dashboard.tsx';
import AdminLogin from './components/AdminLogin.tsx';
import MapModal from './components/MapModal.tsx';
import AIChat from './components/AIChat.tsx';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'dashboard' | 'admin-login'>('home');
  const [churches, setChurches] = useState<Church[]>(INITIAL_CHURCHES);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedChurchForMap, setSelectedChurchForMap] = useState<Church | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Persistence
  useEffect(() => {
    const savedFavs = localStorage.getItem('aiceb_favs');
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
  }, []);

  const toggleFavorite = (id: string) => {
    const newFavs = favorites.includes(id) 
      ? favorites.filter(fid => fid !== id) 
      : [...favorites, id];
    setFavorites(newFavs);
    localStorage.setItem('aiceb_favs', JSON.stringify(newFavs));
  };

  const handleAddChurch = (church: Church) => {
    setChurches(prev => [...prev, church]);
  };

  const handleUpdateChurch = (updated: Church) => {
    setChurches(prev => prev.map(c => c.id === updated.id ? updated : c));
  };

  const handleDeleteChurch = (id: string) => {
    setChurches(prev => prev.filter(c => c.id !== id));
  };

  const navigateTo = (screen: 'home' | 'dashboard' | 'admin-login') => {
    setCurrentScreen(screen);
  };

  return (
    <div className="min-h-screen gradient-bg text-slate-900 selection:bg-blue-100 selection:text-blue-700">
      {currentScreen === 'home' && (
        <LandingPage onEnter={() => navigateTo('dashboard')} />
      )}

      {currentScreen === 'dashboard' && (
        <>
          <Dashboard 
            churches={churches}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            isAdmin={isAdmin}
            onLogout={() => { setIsAdmin(false); navigateTo('home'); }}
            onAdminLogin={() => navigateTo('admin-login')}
            onOpenMap={(c) => setSelectedChurchForMap(c)}
            onAdd={handleAddChurch}
            onUpdate={handleUpdateChurch}
            onDelete={handleDeleteChurch}
          />
          
          {/* Botão Flutuante do Chat de IA */}
          <button 
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-8 right-8 w-16 h-16 bg-blue-600 text-white rounded-full shadow-2xl shadow-blue-600/40 flex items-center justify-center text-2xl hover:scale-110 active:scale-95 transition-all z-[140] border-4 border-white"
          >
            ✨
          </button>
        </>
      )}

      {currentScreen === 'admin-login' && (
        <AdminLogin 
          onSuccess={() => { setIsAdmin(true); navigateTo('dashboard'); }}
          onCancel={() => navigateTo('dashboard')}
        />
      )}

      {selectedChurchForMap && (
        <MapModal 
          church={selectedChurchForMap} 
          onClose={() => setSelectedChurchForMap(null)} 
        />
      )}

      {isChatOpen && (
        <AIChat 
          churches={churches} 
          onClose={() => setIsChatOpen(false)} 
        />
      )}
    </div>
  );
};

export default App;
