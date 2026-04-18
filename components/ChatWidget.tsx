'use client';

import { useState, useRef, useEffect } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Bună! Sunt Barista Bot ☕ Cu ce te pot ajuta? Pot răspunde la întrebări despre meniu, prețuri, rezervări sau program.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: data.reply || 'Ne pare rău, a apărut o eroare.' }]);
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: 'Hopa! Nu a mers. Hai să încercăm din nou! 😃' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Buton flotant */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#4a6741] text-white shadow-lg flex items-center justify-center text-2xl hover:bg-[#3a5432] transition-colors"
        aria-label="Chat"
      >
        {open ? '✕' : '☕'}
      </button>

      {/* Fereastra chat */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-[#b5c9a8]">
          {/* Header */}
          <div className="bg-[#4a6741] text-white px-4 py-3 flex items-center gap-2">
            <span className="text-xl">☕</span>
            <div>
              <p className="font-semibold text-sm">Barista Bot</p>
              <p className="text-xs opacity-75">Vibe Caffée Souvenir</p>
            </div>
          </div>

          {/* Mesaje */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-80 bg-[#f7f9f5]">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#4a6741] text-white rounded-br-sm'
                      : 'bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white px-3 py-2 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100 text-sm text-gray-400">
                  scrie...
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-100 bg-white flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Scrie un mesaj..."
              className="flex-1 text-sm border border-gray-200 rounded-full px-4 py-2 outline-none focus:border-[#4a6741] transition-colors"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="w-9 h-9 rounded-full bg-[#4a6741] text-white flex items-center justify-center hover:bg-[#3a5432] disabled:opacity-40 transition-colors flex-shrink-0"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
