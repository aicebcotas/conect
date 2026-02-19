
import React from 'react';

interface Props {
  onEnter: () => void;
}

const LandingPage: React.FC<Props> = ({ onEnter }) => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center text-center p-6">
      <h1 className="text-5xl font-black mb-4">AICEB<span className="text-blue-600">CONECTA</span></h1>
      <p className="text-slate-500 text-lg mb-8 max-w-md">Localize nossas igrejas por todo o Brasil.</p>
      <button onClick={onEnter} className="bg-blue-600 text-white px-10 py-4 rounded-3xl font-bold shadow-xl shadow-blue-600/20 hover:scale-105 transition-all">
        ENTRAR NO APP
      </button>
    </div>
  );
};

export default LandingPage;
