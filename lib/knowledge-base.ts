import { menuItems } from "./menu-data";

const CATEGORII_EMOJI: Record<string, string> = {
  Espresso: "☕",
  Specialty: "🫧",
  Vegan: "🌱",
  "Cold Brew": "🧊",
  Alternative: "🍵",
  Patiserie: "🥐",
};

const CATEGORII_DESCRIERE: Record<string, string> = {
  Espresso: "cafele clasice pe bază de espresso",
  Specialty: "preparare manuală pentru iubitorii de cafea de specialitate",
  Vegan: "preparate cu lapte vegetal (ovăz, cocos) — fără lactate",
  "Cold Brew": "cafea extrasă la rece, servită cu gheață",
  Alternative: "ceaiuri și băuturi fără cafea",
  Patiserie: "produse de patiserie proaspete, coapte zilnic",
};

function formatMeniu(): string {
  const categorii = [...new Set(menuItems.map((item) => item.categorie))];

  return categorii
    .map((cat) => {
      const emoji = CATEGORII_EMOJI[cat] ?? "•";
      const descriere = CATEGORII_DESCRIERE[cat] ?? "";
      const produse = menuItems.filter((item) => item.categorie === cat);
      const isVegan = cat === "Vegan";

      const listaProduse = produse
        .map(
          (p) =>
            `  - ${p.nume} — ${p.pret} lei: ${p.descriere}${isVegan ? " [VEGAN]" : ""}`
        )
        .join("\n");

      return `${emoji} ${cat.toUpperCase()} (${descriere})\n${listaProduse}`;
    })
    .join("\n\n");
}

const celMaiIeftin = [...menuItems].sort((a, b) => a.pret - b.pret)[0];
const celMaiScump = [...menuItems].sort((a, b) => b.pret - a.pret)[0];
const optiuniVegane = menuItems
  .filter((item) => item.categorie === "Vegan")
  .map((item) => `${item.nume} (${item.pret} lei)`)
  .join(", ");

export const KNOWLEDGE_BASE = `
=== VIBE CAFFÉE SOUVENIR — BAZA DE CUNOȘTINȚE ===

DESPRE NOI:
Vibe Caffée Souvenir este o cafenea artizanală unde fiecare ceașcă este preparată cu grijă.
Motto: "O cafea de aducere aminte."

PROGRAM: Luni–Duminică, 08:00–22:00

LOCAȚIE: Strada Amintirii nr. 7

FACILITĂȚI:
- WiFi gratuit
- Pet friendly (animale de companie binevenite)
- Spațiu interior confortabil + terasă (sezon)
- Rezervări disponibile online

NAVIGARE PE SITE — UNDE GĂSEȘTI CE:
- Cafele și băuturi (Espresso, Specialty, Vegan, Cold Brew, Alternative): rubrica "Cafelele noastre"
- Produse de patiserie (croissante, muffins, tarte, brownies, cheesecake): rubrica "Și ceva alături"
- Date de contact, telefon, email, echipă: rubrica "Noi suntem"
- Rezervări: rubrica "Agenda"

MENIU COMPLET (${menuItems.length} produse):
${formatMeniu()}

RECOMANDĂRI:
- Cel mai popular: Cappuccino (16 lei) și Cold Brew Classic (20 lei)
- Cel mai ieftin: ${celMaiIeftin.nume} (${celMaiIeftin.pret} lei)
- Cel mai scump: ${celMaiScump.nume} (${celMaiScump.pret} lei)
- Opțiuni vegane (fără lactate): ${optiuniVegane}
- Patiserie recomandată: Cheesecake (20 lei), Tartă lămâie (18 lei), Felie prăjitură casei (15 lei)

REZERVĂRI:
- Se fac online prin secțiunea "Agenda" de pe site
- Necesită: nume, email, telefon
- Intervale disponibile: 09:00–20:30 (din 30 în 30 de minute)
- Confirmare trimisă automat pe email

CONTACT:
- Telefon și email disponibile în rubrica "Noi suntem" de pe site
- Adresă: Strada Amintirii nr. 7
`;
