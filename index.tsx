
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Dynamically load Google Maps script with the provided API key
const loadGoogleMaps = () => {
  if (document.querySelector('script[src*="maps.googleapis.com"]')) return;
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY}`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
};

loadGoogleMaps();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
