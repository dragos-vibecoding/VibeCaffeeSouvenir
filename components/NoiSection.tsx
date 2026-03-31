export default function NoiSection() {
  return (
    <section id="despre" className="py-20 px-6 bg-[#b5c9a8]">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/40 w-full">
          <img
            src="/noi-1.webp"
            alt="Cafeneaua noastra"
            className="w-full object-cover object-top"
            style={{ height: '520px' }}
          />
        </div>

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

          <ul
            className="space-y-2"
            style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif' }}
          >
            <li className="flex items-center gap-2 text-gray-600 text-base">
              <span className="text-[#4a6741]">•</span>
              <span><span className="font-semibold text-[#2d3a2a]">Ne auzim:</span> 0700 123 456</span>
            </li>
            <li className="flex items-center gap-2 text-gray-600 text-base">
              <span className="text-[#4a6741]">•</span>
              <span><span className="font-semibold text-[#2d3a2a]">Ne citim:</span> contact@vibecaffeesouvenir.ro</span>
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
}
