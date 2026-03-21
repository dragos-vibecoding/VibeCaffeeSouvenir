/**
 * 🎯 HERO STARTER - Versiunea simplă pentru cursanți
 *
 * Aceasta este versiunea MINIMALISTĂ de la care plecăm în curs.
 * Fără animații, fără video, fără JavaScript complex.
 * Doar HTML + Tailwind CSS = fundația de bază.
 */

export default function HeroStarter() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#b5c9a8] overflow-hidden">

      {/* BANNER - sectiunea mediana */}
      <div className="relative w-full" style={{ height: '60vh' }}>
        <img
          src="/hero-banner.webp"
          alt="Vibe Caffée Souvenir"
          className="w-full h-full object-cover"
        />
        {/* Overlay inchis pentru contrast text */}
        <div className="absolute inset-0 bg-black/40" />

        {/* TEXT OVERLAY */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">

          {/* TITLU */}
          <h1
            style={{
              fontFamily: '"Footlight MT Light", "Footlight MT", serif',
              fontWeight: 600,
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              textShadow: '2px 4px 12px rgba(0,0,0,0.7), 0 2px 4px rgba(0,0,0,0.5)',
              letterSpacing: '0.02em',
            }}
            className="text-white mb-4"
          >
            Vibe Caffée Souvenir
          </h1>

          {/* SUBTITLU */}
          <p
            style={{
              fontFamily: '"Footlight MT Light", "Footlight MT", serif',
              fontWeight: 400,
              fontSize: 'clamp(1.1rem, 2.5vw, 1.75rem)',
              textShadow: '1px 2px 8px rgba(0,0,0,0.6)',
              letterSpacing: '0.05em',
            }}
            className="text-white/90"
          >
            O cafea de aducere aminte
          </p>

        </div>
      </div>

      {/* BUTOANE CTA */}
      <div className="flex gap-4 mt-10 z-20">

        {/* Buton NOI */}
        <a
          href="#despre"
          className="inline-block px-10 py-4 bg-white text-[#4a6741] font-semibold rounded-lg
            transition-all duration-200
            hover:scale-105 hover:shadow-xl hover:shadow-black/20
            shadow-md"
        >
          NOI
        </a>

        {/* Buton MENIU */}
        <a
          href="#meniu"
          className="inline-block px-10 py-4 bg-[#4a6741] text-white font-semibold rounded-lg
            transition-all duration-200
            hover:scale-105 hover:shadow-xl hover:shadow-black/20
            shadow-md"
        >
          MENIU
        </a>

      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span
          style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif', letterSpacing: '0.1em' }}
          className="text-[#3a5432] text-xs uppercase opacity-70"
        >
          scroll
        </span>
        {/* Chenarul animat */}
        <div className="w-6 h-10 rounded-full border-2 border-[#4a6741] flex items-start justify-center p-1">
          <div
            className="w-1.5 h-2.5 bg-[#4a6741] rounded-full"
            style={{ animation: 'scrollDot 1.6s ease-in-out infinite' }}
          />
        </div>
        {/* Sageata jos */}
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none" className="opacity-60">
          <path d="M1 1L8 8L15 1" stroke="#3a5432" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* CSS animatie scroll dot */}
      <style>{`
        @keyframes scrollDot {
          0%   { transform: translateY(0);    opacity: 1; }
          60%  { transform: translateY(16px); opacity: 0.2; }
          100% { transform: translateY(0);    opacity: 1; }
        }
      `}</style>

      {/* IMAGINEA 2 - dreapta, coborata: mai mult in zona olive decat in banner */}
      <img
        src="/deco-2.webp"
        alt="Decor cafea"
        style={{
          position: 'absolute',
          right: '3%',
          top: 'calc(60vh - 120px)',
          height: '480px',
          width: 'auto',
          objectFit: 'contain',
          zIndex: 10,
          filter: 'drop-shadow(4px 8px 20px rgba(0,0,0,0.25))',
        }}
      />

    </section>
  );
}
