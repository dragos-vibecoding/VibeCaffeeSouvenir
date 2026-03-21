/**
 * 🎯 HERO STARTER - Versiunea simplă pentru cursanți
 *
 * Aceasta este versiunea MINIMALISTĂ de la care plecăm în curs.
 * Fără animații, fără video, fără JavaScript complex.
 * Doar HTML + Tailwind CSS = fundația de bază.
 */

export default function HeroStarter() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#b5c9a8]">

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



      {/* IMAGINEA 2 - centrata orizontal, intre banner si prima sectiune */}
      <div className="flex justify-center w-full mt-6 mb-4">
        <img
          src="/deco-2.webp"
          alt="Decor cafea"
          style={{
            height: '320px',
            width: 'auto',
            objectFit: 'contain',
            filter: 'drop-shadow(4px 8px 20px rgba(0,0,0,0.2))',
          }}
        />
      </div>

    </section>
  );
}
