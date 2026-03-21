'use client';

/**
 * 📍 SECTIUNEA UNDE SUNTEM
 */

import { useState } from 'react';
import { useScrollSound } from '@/lib/hooks/useScrollSound';

export default function UndeSuntemSection() {
  const [deschis, setDeschis] = useState(false);
  const sectionRef = useScrollSound();

  return (
    <section ref={sectionRef} id="unde-suntem" className="py-20 px-6 bg-[#b5c9a8]">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* IMAGINE + BUTON */}
        <div className="flex flex-col items-center gap-4">

          <div
            onClick={() => setDeschis(!deschis)}
            className="rounded-2xl overflow-hidden shadow-2xl shadow-black/40 group cursor-pointer w-full"
          >
            <img
              src="/unde-suntem.webp"
              alt="Unde suntem"
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
            {deschis ? 'Închide' : 'UNDE SUNTEM'}
          </button>

        </div>

        {/* TEXT */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            deschis ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'
          }`}
        >
          <p
            className="text-[#4a6741] uppercase tracking-widest text-sm mb-3 font-semibold"
            style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif' }}
          >
            Locația noastră:
          </p>

          <h2
            style={{
              fontFamily: '"Footlight MT Light", "Footlight MT", serif',
              fontWeight: 600,
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            }}
            className="text-[#2d3a2a] mb-6 leading-tight"
          >
            Ne găsești aici
          </h2>

          <p
            className="text-gray-600 text-lg leading-relaxed"
            style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif' }}
          >
            Suntem aici, Strada Amintirii nr. 7, lângă casa aia cu magnolie înflorită
            în curte, un loc liniștit în care să îți cauți pacea. Dacă nu îți arată
            harta cum să ajungi la noi, ia-te după inimă și, mai ales, după mirosul
            de cafea proaspăt râșnită.
          </p>
        </div>

      </div>
    </section>
  );
}
