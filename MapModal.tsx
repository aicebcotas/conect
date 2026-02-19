
import React, { useEffect, useRef } from 'react';
import { Church } from './types';

interface Props {
  church: Church;
  onClose: () => void;
}

const MapModal: React.FC<Props> = ({ church, onClose }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const google = (window as any).google;
    if (mapRef.current && google) {
      const geocoder = new google.maps.Geocoder();
      const query = `${church.name}, ${church.city}, ${church.state}, Brasil`;

      geocoder.geocode({ address: query }, (results: any, status: any) => {
        if (status === 'OK' && results?.[0]) {
          const location = results[0].geometry.location;
          const map = new google.maps.Map(mapRef.current!, { center: location, zoom: 15 });
          new google.maps.Marker({ position: location, map, title: church.name });
        }
      });
    }
  }, [church]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-[32px] w-full max-w-3xl h-[70vh] flex flex-col overflow-hidden">
        <div className="p-6 border-b flex justify-between">
          <h3 className="font-bold">{church.name}</h3>
          <button onClick={onClose}>✕</button>
        </div>
        <div ref={mapRef} className="flex-1 bg-slate-100" />
      </div>
    </div>
  );
};

export default MapModal;
