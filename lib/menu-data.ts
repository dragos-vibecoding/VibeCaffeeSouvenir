export type MenuItem = {
  categorie: string;
  nume: string;
  pret: number;
  descriere: string;
  image: string;
};

export const menuItems: MenuItem[] = [
  // ESPRESSO CLASSICS
  { categorie: 'Espresso', nume: 'Espresso', pret: 12, descriere: 'Shot dublu, intens și aromat', image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&auto=format&fit=crop' },
  { categorie: 'Espresso', nume: 'Ristretto', pret: 12, descriere: 'Concentrat, plin de caracter', image: 'https://images.unsplash.com/photo-1560963689-b5682b6440f8?w=400&auto=format&fit=crop' },
  { categorie: 'Espresso', nume: 'Americano', pret: 14, descriere: 'Espresso cu apă caldă', image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=400&auto=format&fit=crop' },
  { categorie: 'Espresso', nume: 'Cappuccino', pret: 16, descriere: 'Espresso cu lapte spumat', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&auto=format&fit=crop' },
  { categorie: 'Espresso', nume: 'Latte', pret: 17, descriere: 'Espresso cu lapte cald și spumă fină', image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=400&auto=format&fit=crop' },
  { categorie: 'Espresso', nume: 'Flat White', pret: 17, descriere: 'Ristretto cu lapte catifelat', image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=400&auto=format&fit=crop' },

  // SPECIALTY COFFEE
  { categorie: 'Specialty', nume: 'Pour Over', pret: 19, descriere: 'Preparare manuală, note florale', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&auto=format&fit=crop' },
  { categorie: 'Specialty', nume: 'AeroPress', pret: 18, descriere: 'Presiune joasă, aromă curată', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&auto=format&fit=crop' },
  { categorie: 'Specialty', nume: 'Chemex', pret: 20, descriere: 'Filtrare lentă, corp ușor', image: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=400&auto=format&fit=crop' },
  { categorie: 'Specialty', nume: 'Cortado', pret: 16, descriere: 'Espresso cu lapte rece, în proporție egală', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&auto=format&fit=crop' },

  // VEGAN OPTIONS
  { categorie: 'Vegan', nume: 'Oat Latte', pret: 18, descriere: 'Espresso cu lapte de ovăz', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop' },
  { categorie: 'Vegan', nume: 'Coconut Cappuccino', pret: 18, descriere: 'Spumă de lapte de cocos', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&auto=format&fit=crop' },
  { categorie: 'Vegan', nume: 'Matcha Latte', pret: 21, descriere: 'Matcha ceremonial cu lapte de ovăz', image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&auto=format&fit=crop' },
  { categorie: 'Vegan', nume: 'Turmeric Latte', pret: 19, descriere: 'Curcuma, ghimbir, lapte de cocos', image: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=400&auto=format&fit=crop' },

  // COLD BREW
  { categorie: 'Cold Brew', nume: 'Cold Brew Classic', pret: 20, descriere: '18 ore extracție la rece', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&auto=format&fit=crop' },
  { categorie: 'Cold Brew', nume: 'Cold Brew Tonic', pret: 22, descriere: 'Cold brew cu apă tonică și citrice', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&auto=format&fit=crop' },
  { categorie: 'Cold Brew', nume: 'Cold Brew Latte', pret: 21, descriere: 'Cold brew cu lapte și gheață', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&auto=format&fit=crop' },
  { categorie: 'Cold Brew', nume: 'Nitro Cold Brew', pret: 23, descriere: 'Infuzat cu azot, cremos și mat', image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&auto=format&fit=crop' },

  // ALTERNATIVE
  { categorie: 'Alternative', nume: 'Ceai Earl Grey', pret: 12, descriere: 'Bergamotă și note florale', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&auto=format&fit=crop' },
  { categorie: 'Alternative', nume: 'Ceai Verde Jasmin', pret: 12, descriere: 'Delicat și parfumat', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&auto=format&fit=crop' },

  // PATISERIE
  { categorie: 'Patiserie', nume: 'Croissant cu unt', pret: 14, descriere: 'Crocant, proaspăt în fiecare zi', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&auto=format&fit=crop' },
  { categorie: 'Patiserie', nume: 'Croissant migdale', pret: 16, descriere: 'Cu cremă de migdale și zahăr pudră', image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=400&auto=format&fit=crop' },
  { categorie: 'Patiserie', nume: 'Muffin ciocolată', pret: 12, descriere: 'Cu ciocolată neagră 70%', image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&auto=format&fit=crop' },
  { categorie: 'Patiserie', nume: 'Muffin afine', pret: 12, descriere: 'Pufos, cu afine proaspete', image: 'https://images.unsplash.com/photo-1604882737680-b08f33bb9ced?w=400&auto=format&fit=crop' },
  { categorie: 'Patiserie', nume: 'Tartă lămâie', pret: 18, descriere: 'Cremă fină de lămâie, bezea italiană', image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&auto=format&fit=crop' },
  { categorie: 'Patiserie', nume: 'Tartă fructe de pădure', pret: 19, descriere: 'Fructe de sezon, cremă vanilie', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&auto=format&fit=crop' },
  { categorie: 'Patiserie', nume: 'Brownie', pret: 14, descriere: 'Dens, umed, cu nuci pecan', image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=400&auto=format&fit=crop' },
  { categorie: 'Patiserie', nume: 'Cheesecake', pret: 20, descriere: 'New York style, sos de fructe roșii', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&auto=format&fit=crop' },
  { categorie: 'Patiserie', nume: 'Ecler caramel', pret: 16, descriere: 'Glazură de caramel, cremă chantilly', image: 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=400&auto=format&fit=crop' },
  { categorie: 'Patiserie', nume: 'Felie prăjitură casei', pret: 15, descriere: 'Rețeta bunicii, schimbată zilnic', image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&auto=format&fit=crop' },
];

export const categorii = ['Espresso', 'Specialty', 'Vegan', 'Cold Brew', 'Alternative', 'Patiserie'];
