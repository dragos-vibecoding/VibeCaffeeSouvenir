'use client';

/**
 * 📅 SECTIUNEA PUNE-TI IN AGENDA
 * Calendar → intervale orare → formular de contact
 */

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { supabase } from '@/lib/supabase';

const EMAILJS_SERVICE = 'service_06hw0je';
const EMAILJS_TEMPLATE = 'template_bff01zh';
const EMAILJS_KEY = 'mCRZCyl1lCE8qAFKZ';

type Faza = 'idle' | 'calendar' | 'ore' | 'formular' | 'confirmat';

function genereazaOre(): string[] {
  const ore: string[] = [];
  for (let h = 9; h < 21; h++) {
    ore.push(`${String(h).padStart(2, '0')}:00`);
    ore.push(`${String(h).padStart(2, '0')}:30`);
  }
  return ore;
}

const ORE = genereazaOre();
const ZILE = ['Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sâ', 'Du'];
const LUNI = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie',
              'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];

function Calendar({ onSelect }: { onSelect: (d: Date) => void }) {
  const azi = new Date();
  const [an, setAn] = useState(azi.getFullYear());
  const [luna, setLuna] = useState(azi.getMonth());

  const primaZi = new Date(an, luna, 1);
  // luni=0 -> index 0 (Lu), dar Date().getDay(): 0=Du,1=Lu...
  const offsetZi = (primaZi.getDay() + 6) % 7; // transforma in Lu=0
  const zileLuna = new Date(an, luna + 1, 0).getDate();

  const prev = () => { if (luna === 0) { setLuna(11); setAn(a => a - 1); } else setLuna(l => l - 1); };
  const next = () => { if (luna === 11) { setLuna(0); setAn(a => a + 1); } else setLuna(l => l + 1); };

  const zileGrid: (number | null)[] = [
    ...Array(offsetZi).fill(null),
    ...Array.from({ length: zileLuna }, (_, i) => i + 1),
  ];

  return (
    <div className="bg-white/60 rounded-2xl p-6 shadow-md w-full max-w-sm mx-auto mt-6">
      {/* Header luna */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prev} className="p-2 rounded-lg hover:bg-[#b5c9a8] transition-colors text-[#4a6741] font-bold">‹</button>
        <span style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif' }}
              className="text-[#2d3a2a] font-semibold text-lg">
          {LUNI[luna]} {an}
        </span>
        <button onClick={next} className="p-2 rounded-lg hover:bg-[#b5c9a8] transition-colors text-[#4a6741] font-bold">›</button>
      </div>

      {/* Header zile */}
      <div className="grid grid-cols-7 mb-2">
        {ZILE.map(z => (
          <div key={z} className="text-center text-xs text-[#4a6741] font-semibold py-1">{z}</div>
        ))}
      </div>

      {/* Zile */}
      <div className="grid grid-cols-7 gap-1">
        {zileGrid.map((zi, i) => {
          if (!zi) return <div key={i} />;
          const data = new Date(an, luna, zi);
          const trecut = data < new Date(azi.getFullYear(), azi.getMonth(), azi.getDate());
          const esteAzi = data.toDateString() === azi.toDateString();
          return (
            <button
              key={i}
              disabled={trecut}
              onClick={() => onSelect(data)}
              className={`rounded-lg py-1.5 text-sm transition-all duration-150
                ${trecut ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-[#4a6741] hover:text-white cursor-pointer'}
                ${esteAzi ? 'bg-[#4a6741]/20 font-bold text-[#2d3a2a]' : 'text-[#2d3a2a]'}
              `}
            >
              {zi}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function AgendaSection() {
  const [faza, setFaza] = useState<Faza>('idle');
  const [dataSelectata, setDataSelectata] = useState<Date | null>(null);
  const [oraSelectata, setOraSelectata] = useState<string | null>(null);
  const [form, setForm] = useState({ nume: '', email: '', telefon: '' });

  const handleData = (d: Date) => { setDataSelectata(d); setFaza('ore'); };
  const handleOra = (o: string) => { setOraSelectata(o); setFaza('formular'); };
  const [loading, setLoading] = useState(false);

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dataSelectata || !oraSelectata) return;
    setLoading(true);

    const { error } = await supabase.from('rezervari').insert({
      nume: form.nume,
      email: form.email,
      telefon: form.telefon,
      persoane: 2,
      data_rezervare: dataSelectata.toISOString().split('T')[0],
      ora_rezervare: oraSelectata,
    });

    if (!error) {
      await emailjs.send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        {
          to_name: form.nume,
          to_email: form.email,
          telefon: form.telefon,
          data_rezervare: formatData(dataSelectata),
          ora_rezervare: oraSelectata,
        },
        EMAILJS_KEY
      );
      setFaza('confirmat');
    }
    setLoading(false);
  };
  const reset = () => { setFaza('idle'); setDataSelectata(null); setOraSelectata(null); setForm({ nume: '', email: '', telefon: '' }); };

  const formatData = (d: Date) =>
    `${d.getDate()} ${LUNI[d.getMonth()]} ${d.getFullYear()}`;

  return (
    <section id="agenda" className="py-20 px-6 bg-[#b5c9a8]">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* IMAGINE */}
        <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/40 w-full">
          <img
            src="/agenda-11.webp"
            alt="Pune-ti in agenda"
            className="w-full object-cover object-center"
            style={{ height: '520px' }}
          />
        </div>

        {/* CONTINUT DREAPTA */}
        <div>

          <p className="text-[#4a6741] uppercase tracking-widest text-sm mb-3 font-semibold"
             style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif' }}>
            Nu uita:
          </p>

          <h2 style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif', fontWeight: 600, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
              className="text-[#2d3a2a] mb-4 leading-tight">
            Ca să știm că vii.
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-6"
             style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif' }}>
            Spune-ne dinainte când vrei să ne revedem și noi ne pregătim deja
            zâmbetele și îmbrățișările.
          </p>

          {/* BUTON ALEGE UN MOMENT */}
          {faza === 'idle' && (
            <button
              onClick={() => setFaza('calendar')}
              className="px-8 py-3 bg-white text-[#4a6741] font-semibold rounded-lg
                transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-black/15 shadow-md"
              style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif', letterSpacing: '0.05em' }}
            >
              ALEGE UN MOMENT
            </button>
          )}

          {/* CALENDAR */}
          {faza === 'calendar' && (
            <div>
              <p className="text-[#3a5432] text-sm mb-2"
                 style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif' }}>
                Alege o dată:
              </p>
              <Calendar onSelect={handleData} />
            </div>
          )}

          {/* INTERVALE ORARE */}
          {faza === 'ore' && dataSelectata && (
            <div>
              <p className="text-[#3a5432] text-sm mb-3"
                 style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif' }}>
                {formatData(dataSelectata)} — alege un interval:
              </p>
              <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto pr-1">
                {ORE.map(ora => (
                  <button
                    key={ora}
                    onClick={() => handleOra(ora)}
                    className="py-2 text-sm bg-white/60 rounded-lg text-[#2d3a2a] font-medium
                      hover:bg-[#4a6741] hover:text-white transition-all duration-150"
                    style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif' }}
                  >
                    {ora}
                  </button>
                ))}
              </div>
              <button onClick={() => setFaza('calendar')} className="mt-3 text-sm text-[#4a6741] underline">← înapoi</button>
            </div>
          )}

          {/* FORMULAR */}
          {faza === 'formular' && (
            <form onSubmit={handleConfirm} className="space-y-4">
              <p className="text-[#3a5432] text-sm"
                 style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif' }}>
                {formatData(dataSelectata!)} la {oraSelectata}
              </p>

              {[
                { label: 'Numele tău', key: 'nume', type: 'text', placeholder: 'Ion Popescu' },
                { label: 'Adresa ta de mail', key: 'email', type: 'email', placeholder: 'ion@email.com' },
                { label: 'Număr telefon', key: 'telefon', type: 'tel', placeholder: '07xx xxx xxx' },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm text-[#3a5432] mb-1"
                         style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif' }}>
                    {label}
                  </label>
                  <input
                    required
                    type={type}
                    placeholder={placeholder}
                    value={form[key as keyof typeof form]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    {...(key === 'telefon' ? { pattern: '[0-9]{10}', minLength: 10, maxLength: 10, title: 'Introduceți exact 10 cifre (ex: 0712345678)' } : {})}
                    className="w-full px-4 py-2.5 rounded-lg bg-white/70 border border-[#4a6741]/20
                      focus:outline-none focus:border-[#4a6741] text-[#2d3a2a] placeholder-gray-400 text-sm"
                    style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif' }}
                  />
                </div>
              ))}

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setFaza('ore')}
                  className="px-5 py-2.5 text-sm text-[#4a6741] underline">
                  ← înapoi
                </button>
                <button type="submit"
                  disabled={loading}
                  className="flex-1 py-2.5 bg-[#4a6741] text-white font-semibold rounded-lg
                    transition-all duration-200 hover:scale-105 hover:shadow-lg shadow-md
                    disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif', letterSpacing: '0.05em' }}>
                  {loading ? 'Se trimite...' : 'CONFIRM'}
                </button>
              </div>
            </form>
          )}

          {/* CONFIRMARE */}
          {faza === 'confirmat' && (
            <div className="bg-white/60 rounded-2xl p-6 text-center shadow-md">
              <p className="text-2xl mb-2">☕</p>
              <h3 className="text-[#2d3a2a] font-semibold mb-2"
                  style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif', fontSize: '1.3rem' }}>
                Ne vedem pe {formatData(dataSelectata!)} la {oraSelectata}!
              </h3>
              <p className="text-gray-500 text-sm mb-4"
                 style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif' }}>
                Cafeaua ta e deja în gând. Te așteptăm, {form.nume}.
              </p>
              <button onClick={reset}
                className="px-6 py-2 bg-[#4a6741] text-white text-sm rounded-lg hover:scale-105 transition-all shadow-md">
                Alege alt moment
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
