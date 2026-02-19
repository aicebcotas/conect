
import React, { useState, useEffect } from 'react';
import { INITIAL_CHURCHES } from './constants';
import { Church } from './types';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import AdminLogin from './components/AdminLogin';
import MapModal from './components/MapModal';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'dashboard' | 'admin-login'>('home');
  const [churches, setChurches] = useState<Church[]>(INITIAL_CHURCHES);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedChurchForMap, setSelectedChurchForMap] = useState<Church | null>(null);

  // Persistence (mocked)
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
    </div>
  );
};

export default App;
