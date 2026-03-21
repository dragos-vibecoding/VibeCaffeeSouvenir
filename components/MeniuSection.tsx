/**
 * 🍵 SECTIUNEA MENIU
 */

const menuItems = [
  { categorie: 'Espresso', nume: 'Espresso', pret: 12, descriere: 'Shot dublu, intens și aromat' },
  { categorie: 'Espresso', nume: 'Americano', pret: 14, descriere: 'Espresso cu apă caldă' },
  { categorie: 'Espresso', nume: 'Cappuccino', pret: 16, descriere: 'Espresso cu lapte spumat' },
  { categorie: 'Espresso', nume: 'Flat White', pret: 17, descriere: 'Ristretto cu lapte catifelat' },
  { categorie: 'Specialty', nume: 'Pour Over', pret: 19, descriere: 'Preparare manuală, note florale' },
  { categorie: 'Specialty', nume: 'Cold Brew', pret: 20, descriere: '18 ore extracție la rece' },
  { categorie: 'Specialty', nume: 'Matcha Latte', pret: 21, descriere: 'Matcha ceremonial cu lapte' },
  { categorie: 'Specialty', nume: 'Turmeric Latte', pret: 19, descriere: 'Curcuma, ghimbir, lapte de cocos' },
  { categorie: 'Patiserie', nume: 'Croissant cu unt', pret: 14, descriere: 'Crocant, proaspăt în fiecare zi' },
  { categorie: 'Patiserie', nume: 'Muffin ciocolată', pret: 12, descriere: 'Cu ciocolată neagră 70%' },
];

const categorii = ['Espresso', 'Specialty', 'Patiserie'];

export default function MeniuSection() {
  return (
    <section id="meniu" className="py-20 px-6 bg-[#b5c9a8]">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
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
            Meniul Vibe Caffée
          </h2>
        </div>

        {/* CATEGORII */}
        {categorii.map((cat) => (
          <div key={cat} className="mb-10">
            <h3
              style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif', fontWeight: 600 }}
              className="text-[#3a5432] text-xl mb-4 pb-2 border-b border-[#4a6741]/30"
            >
              {cat}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {menuItems
                .filter((item) => item.categorie === cat)
                .map((item) => (
                  <div
                    key={item.nume}
                    className="flex justify-between items-start bg-white/40 rounded-xl px-5 py-4
                      hover:bg-white/60 transition-all duration-200 hover:shadow-md group"
                  >
                    <div>
                      <p
                        className="text-[#2d3a2a] font-semibold group-hover:text-[#3a5432] transition-colors"
                        style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif' }}
                      >
                        {item.nume}
                      </p>
                      <p className="text-gray-500 text-sm mt-0.5">{item.descriere}</p>
                    </div>
                    <span
                      className="text-[#4a6741] font-semibold ml-4 whitespace-nowrap"
                      style={{ fontFamily: '"Footlight MT Light", "Footlight MT", serif' }}
                    >
                      {item.pret} lei
                    </span>
                  </div>
                ))}
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}
