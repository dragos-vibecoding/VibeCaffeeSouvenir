/**
 * 🏡 SECTIUNEA NOI - Povestea cafenelei
 */

export default function NoiSection() {
  return (
    <section id="despre" className="py-20 px-6 bg-[#b5c9a8]">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* IMAGINE */}
        <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/40 group">
          <img
            src="/noi-1.webp"
            alt="Cafeneaua noastra"
            className="w-full object-cover object-top transition-transform duration-500 ease-in-out group-hover:scale-105"
            style={{ height: '520px' }}
          />
        </div>

        {/* TEXT */}
        <div>
          <p
            className="text-[#4a6741] uppercase tracking-widest text-sm mb-3 font-semibold"
            style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif' }}
          >
            Noi suntem:
          </p>

          <h2
            style={{
              fontFamily: '"Footlight MT Light", "Footlight MT", serif',
              fontWeight: 600,
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            }}
            className="text-[#2d3a2a] mb-6 leading-tight"
          >
            Cafeaua pentru un moment memorabil
          </h2>

          <p
            className="text-gray-600 text-lg leading-relaxed mb-8"
            style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif' }}
          >
            Mmmmmmmmmmmmirosul acesta un pic amărui, dar proaspăt, sunetul boabelor
            proaspăt răsnite, apoi gustul, GUSTUL, gustul acela care
            îți începe ziua într-un fel aparte și special. Îl vei purta cu tine, te
            vei întoarce la el și noi vom fi aici. Ai un scaun și o masă lângă
            fereastră ca să privești strada și viața orașului.
          </p>

          <a
            href="#"
            className="inline-block px-8 py-3 bg-[#4a6741] text-white font-semibold rounded-lg
              transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-black/15 shadow-md"
            style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif', letterSpacing: '0.05em' }}
          >
            Înapoi
          </a>
        </div>

      </div>
    </section>
  );
}
