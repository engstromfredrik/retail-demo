import React, { useState, useRef, useEffect } from 'react';
import { Icons } from '../constants';
import { ProductData } from '../types';
import { askProductQuestion } from '../services/geminiService';

interface AIAssistantProps {
  product: ProductData;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'ai'; text: string }>>([
    { role: 'ai', text: `Hi! I'm your ${product.brand} assistant. Ask me anything about ${product.name}!` }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMsg = query;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setQuery('');
    setLoading(true);

    const answer = await askProductQuestion(userMsg, product);
    
    setMessages(prev => [...prev, { role: 'ai', text: answer }]);
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-2xl bg-gradient-to-r from-gs1-blue to-indigo-600 text-white transition-all transform hover:scale-105 z-50 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <Icons.Sparkles />
        <span className="ml-2 font-medium">Ask AI</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 md:w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-gs1-blue to-indigo-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Icons.Sparkles />
              <span className="font-semibold">Product Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 rounded-full p-1 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-3 text-sm shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-gs1-blue text-white rounded-br-none' 
                    : 'bg-white text-slate-800 rounded-bl-none border border-slate-200'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-slate-200 shadow-sm flex gap-2 items-center">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-slate-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about ingredients, recipes..."
                className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-gs1-blue/20 outline-none"
              />
              <button 
                type="submit"
                disabled={loading || !query.trim()}
                className="p-2 bg-gs1-blue text-white rounded-xl hover:bg-blue-900 disabled:opacity-50 transition-colors"
              >
                <Icons.ArrowLeft /> 
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};