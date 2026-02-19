
import React, { useState, useRef, useEffect } from 'react';
import { GeminiService } from './geminiService';
import { Church } from './types';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

interface Props {
  churches: Church[];
  onClose: () => void;
}

const AIChat: React.FC<Props> = ({ churches, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Olá! Sou o assistente da AICEB. Como posso ajudar?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const gemini = useRef(new GeminiService());

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }, { role: 'bot', text: "" }]);
    setInput('');
    setLoading(true);

    try {
      let fullResponse = "";
      const stream = gemini.current.queryChurchesStream(userMsg, churches);
      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: 'bot', text: fullResponse };
          return newMessages;
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 w-[90vw] md:w-[400px] h-[550px] bg-white border border-slate-200 rounded-[32px] shadow-2xl z-[150] flex flex-col overflow-hidden animate-fadeIn">
      <div className="bg-blue-600 p-5 flex justify-between items-center">
        <h3 className="font-bold text-white">Assistente AICEB</h3>
        <button onClick={onClose} className="text-white">✕</button>
      </div>
      <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200'}`}>
              {m.text || (loading ? '...' : '')}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t flex gap-2">
        <input className="flex-1 bg-slate-50 border rounded-xl px-4 py-2 outline-none" placeholder="Pergunte algo..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} />
        <button onClick={handleSend} disabled={loading} className="bg-blue-600 text-white px-4 rounded-xl">🚀</button>
      </div>
    </div>
  );
};

export default AIChat;
