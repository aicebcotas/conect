
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Proteção para evitar erros em ambientes onde o process.env ainda não foi injetado
const getApiKey = () => {
  try {
    return process.env.API_KEY || '';
  } catch (e) {
    return '';
  }
};

const loadGoogleMaps = () => {
  const apiKey = getApiKey();
  if (!apiKey || document.querySelector('script[src*="maps.googleapis.com"]')) return;
  
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
};

loadGoogleMaps();

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
