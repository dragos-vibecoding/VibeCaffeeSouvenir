'use client';

import { menuItems } from '@/lib/menu-data';

const categoriiCafea = ['Espresso', 'Specialty', 'Vegan', 'Cold Brew', 'Alternative'];

export default function CafelelNoastreSection() {
  return (
    <section id="cafelele-noastre" className="py-20 px-6 bg-[#b5c9a8]">
      <div className="max-w-5xl mx-auto">

        {/* FOTO + DESCRIERE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">

          <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/40 w-full">
            <img
              src="/caffee.webp"
              alt="Cafelele noastre"
              className="w-full object-cover object-center"
              style={{ height: '520px' }}
            />
          </div>

          <div>
            <p
              className="text-[#4a6741] uppercase tracking-widest text-sm mb-3 font-semibold"
              style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif' }}
            >
              Cafelele noastre
            </p>

            <h2
              style={{
                fontFamily: '"Footlight MT Light", "Footlight MT", serif',
                fontWeight: 600,
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              }}
              className="text-[#2d3a2a] mb-6 leading-tight"
            >
              Facem fiecare ceașcă aparte și unică.
            </h2>

            <p
              className="text-gray-600 text-lg leading-relaxed"
              style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif' }}
            >
              Cu lapte sau fără, cu textură spumată sau fierbinte ori cu gheață.
              Totul pentru ca tu să ai de unde alege pentru clipa ta la noi.
            </p>
          </div>

        </div>

        {/* MENIU CAFEA */}
        <div className="border-t border-[#4a6741]/20 mb-16" />

        <div className="text-center mb-14">
          <p
            className="text-[#4a6741] uppercase tracking-widest text-sm mb-3 font-semibold"
            style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif' }}
          >
            Selecția noastră
          </p>
          <h2
            style={{
              fontFamily: '"Footlight MT Light", "Footlight MT", serif',
              fontWeight: 600,
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            }}
            className="text-[#2d3a2a]"
          >
            Cafelele Vibe Caffée
          </h2>
        </div>

        {categoriiCafea.map((cat) => (
          <div key={cat} className="mb-10">
            <h3
              style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif', fontWeight: 600 }}
              className="text-[#3a5432] text-xl mb-4 pb-2 border-b border-[#4a6741]/30"
            >
              {cat}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {menuItems
                .filter((item) => item.categorie === cat)
                .map((item) => (
                  <div
                    key={item.nume}
                    className="flex items-stretch bg-white/40 rounded-xl overflow-hidden
                      hover:bg-white/65 transition-all duration-200 hover:shadow-md group"
                  >
                    <img
                      src={item.image}
                      alt={item.nume}
                      className="w-20 h-20 object-cover flex-shrink-0 self-center"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    <div className="flex flex-col justify-center flex-1 px-4 py-3">
                      <div className="flex justify-between items-center mb-1">
                        <p
                          className="text-[#2d3a2a] font-semibold text-base group-hover:text-[#3a5432] transition-colors"
                          style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif' }}
                        >
                          {item.nume}
                        </p>
                        <span
                          className="text-[#4a6741] font-bold text-base ml-3 whitespace-nowrap"
                          style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif' }}
                        >
                          {item.pret} lei
                        </span>
                      </div>
                      <p
                        className="text-gray-500 text-sm leading-snug"
                        style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif' }}
                      >
                        {item.descriere}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}
