'use client';

/**
 * ⭐ SECTIUNEA SPUNE - Recenzii conectate la Supabase
 */

import { useState, useEffect } from 'react';
import { useScrollSound } from '@/lib/hooks/useScrollSound';
import { supabase } from '@/lib/supabase';

interface Recenzie {
  id?: string;
  nume: string;
  stele: number;
  mesaj: string;
  created_at?: string;
}

function Stele({ valoare, onClick }: { valoare: number; onClick?: (n: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onClick?.(n)}
          onMouseEnter={() => onClick && setHover(n)}
          onMouseLeave={() => onClick && setHover(0)}
          className={`text-2xl transition-transform duration-100 ${onClick ? 'cursor-pointer hover:scale-110' : 'cursor-default'}`}
          style={{ color: n <= (hover || valoare) ? '#d97706' : '#d1d5db' }}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function formatData(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('ro-RO', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

export default function SpuneSection() {
  const [deschis, setDeschis] = useState(false);
  const sectionRef = useScrollSound();

  const [stele, setStele] = useState(0);
  const [mesaj, setMesaj] = useState('');
  const [nume, setNume] = useState('');
  const [recenzii, setRecenzii] = useState<Recenzie[]>([]);
  const [trimis, setTrimis] = useState(false);
  const [loading, setLoading] = useState(false);

  // Incarca recenziile din Supabase
  useEffect(() => {
    supabase
      .from('recenzii')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => { if (data) setRecenzii(data); });
  }, []);

  const handleTrimite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stele || !mesaj.trim()) return;
    setLoading(true);

    const { data, error } = await supabase
      .from('recenzii')
      .insert({ nume: nume.trim() || 'Anonim', stele, mesaj: mesaj.trim() })
      .select()
      .single();

    if (!error && data) {
      setRecenzii(prev => [data, ...prev]);
      setTrimis(true);
      setMesaj('');
      setNume('');
      setStele(0);
      setTimeout(() => setTrimis(false), 3000);
    }
    setLoading(false);
  };

  return (
    <section ref={sectionRef} id="spune" className="py-20 px-6 bg-[#b5c9a8]">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

        {/* IMAGINE + BUTON */}
        <div className="flex flex-col items-center gap-4">
          <div
            onClick={() => setDeschis(!deschis)}
            className="rounded-2xl overflow-hidden shadow-2xl shadow-black/40 group cursor-pointer w-full"
          >
            <img
              src="/opinie.webp"
              alt="Spune-ne parerea ta"
              className="w-full object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-105"
              style={{ height: '520px' }}
            />
          </div>

          <button
            onClick={() => setDeschis(!deschis)}
            className="px-10 py-3 bg-[#4a6741] text-white font-semibold rounded-lg
              transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-black/20 shadow-md"
            style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif', letterSpacing: '0.05em' }}
          >
            {deschis ? 'Închide' : 'SPUNE'}
          </button>
        </div>

        {/* CONTINUT DREAPTA */}
        <div className={`transition-all duration-500 ease-in-out ${
          deschis ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'
        }`}>

          <p
            className="text-[#4a6741] uppercase tracking-widest text-sm mb-3 font-semibold"
            style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif' }}
          >
            Parerea ta conteaza:
          </p>

          <h2
            style={{
              fontFamily: '"Footlight MT Light", "Footlight MT", serif',
              fontWeight: 600,
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            }}
            className="text-[#2d3a2a] mb-4 leading-tight"
          >
            Cum a fost?
          </h2>

          <p
            className="text-gray-600 text-base leading-relaxed mb-6"
            style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif' }}
          >
            A fost cum ți-ai dorit? Te-am dezamăgit cu ceva? Ce ți-ai dori mai bine
            sau mai mult data viitoare? Și fii sincer.
          </p>

          {/* FORMULAR */}
          <form onSubmit={handleTrimite} className="space-y-4">
            <div>
              <p className="text-sm text-[#3a5432] mb-2"
                 style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif' }}>
                Nota ta:
              </p>
              <Stele valoare={stele} onClick={setStele} />
            </div>

            <input
              type="text"
              placeholder="Numele tău (opțional)"
              value={nume}
              onChange={e => setNume(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-white/70 border border-[#4a6741]/20
                focus:outline-none focus:border-[#4a6741] text-[#2d3a2a] placeholder-gray-400 text-sm"
              style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif' }}
            />

            <textarea
              required
              rows={4}
              placeholder="Scrie-ne parerea ta..."
              value={mesaj}
              onChange={e => setMesaj(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-white/70 border border-[#4a6741]/20
                focus:outline-none focus:border-[#4a6741] text-[#2d3a2a] placeholder-gray-400 text-sm resize-none"
              style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif' }}
            />

            <button
              type="submit"
              disabled={!stele || !mesaj.trim() || loading}
              className="w-full py-3 bg-[#4a6741] text-white font-semibold rounded-lg
                transition-all duration-200 hover:scale-105 hover:shadow-lg shadow-md
                disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif', letterSpacing: '0.05em' }}
            >
              {trimis ? '✓ Mulțumim!' : loading ? 'Se trimite...' : 'TRIMITE'}
            </button>
          </form>

          {/* CE CRED ALTII */}
          <div className="mt-10">
            <h3
              className="text-[#3a5432] font-semibold mb-5 pb-2 border-b border-[#4a6741]/30"
              style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif', fontSize: '1.2rem' }}
            >
              Ce cred alții {recenzii.length > 0 && `(${recenzii.length})`}
            </h3>

            {recenzii.length === 0 ? (
              <p className="text-gray-400 text-sm italic"
                 style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif' }}>
                Fii primul care lasă o recenzie.
              </p>
            ) : (
              <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                {recenzii.map((r, i) => (
                  <div key={r.id || i} className="bg-white/50 rounded-xl px-4 py-3 shadow-sm">
                    <div className="flex justify-between items-center mb-1">
                      <span
                        className="text-[#2d3a2a] font-semibold text-sm"
                        style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif' }}
                      >
                        {r.nume}
                      </span>
                      {r.created_at && (
                        <span className="text-gray-400 text-xs">{formatData(r.created_at)}</span>
                      )}
                    </div>
                    <Stele valoare={r.stele} />
                    <p
                      className="text-gray-600 text-sm mt-1.5 leading-relaxed"
                      style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif' }}
                    >
                      {r.mesaj}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
