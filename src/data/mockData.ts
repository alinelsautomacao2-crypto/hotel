import { Accommodation, Experience, ButlerRequest } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_hotel_sanctuario_1791031804076.jpg';
export const SUITE_IMAGE = '/src/assets/images/grand_villa_suite_1791031816693.jpg';
export const SPA_IMAGE = '/src/assets/images/spa_botanical_wellness_1791031830919.jpg';
export const CULINARY_IMAGE = '/src/assets/images/culinary_michelin_eos_1791031842523.jpg';

export const ACCOMMODATIONS: Accommodation[] = [
  {
    id: 'grand-villa-sanctuario',
    title: 'Grand Villa Sanctuário',
    category: 'villa_pool',
    tagline: 'Piscina de borda infinita aquecida & Mordomo exclusivo 24h',
    areaM2: 280,
    guestsMax: 4,
    bedType: 'Super King Trousseau 1000 fios',
    viewOrientation: 'Pôr do Sol & Falésias do Oceano',
    acousticRating: 'STC 65 (Isolamento acústico superior)',
    pricePerNightEUR: 2450,
    image: SUITE_IMAGE,
    gallery: [
      SUITE_IMAGE,
      HERO_IMAGE,
      SPA_IMAGE,
    ],
    highlight: 'Acomodação Insígnia',
    description: 'Nossa maior e mais exclusiva residência privativa. Esculpida diretamente nas encostas de rocha basáltica, a Grand Villa integra arquitetura contemporânea e elementos da natureza nativa em 280m² de absoluta privacidade.',
    architecturalDetails: 'Construída com lajes de basalto vulcânico polido à mão, forros em carvalho francês de demolição e caixilharia de alumínio marítimo Schüco com isolamento STC 65. Integra lareira a bioetanol embutida na pedra e decks de teca certificada FSC.',
    amenities: [
      'Mordomo privativo 24h certificado The Guild of Professional Butlers',
      'Piscina privativa aquecida com borda infinita de 14 metros',
      'Adega Grand Cru climatizada com 48 rótulos selecionados',
      'Amenidades completas Bulgari Au Thé Vert & Hermès Paris',
      'Menu de travesseiros com 8 opções ortopédicas e de plumas de ganso',
      'Café da manhã servido na vila assinado pelo chef 2 estrelas Michelin',
      'Transfer privativo em Maybach S-Class ou helitransfer incluso',
      'Sistema de som Bang & Olufsen Beolab em todos os ambientes'
    ],
    features: [
      '280 m² de área privativa',
      'Piscina infinita aquecida',
      'Mordomo 24h exclusivo',
      'Banheira de imersão de pedra vulcânica'
    ]
  },
  {
    id: 'suite-presidencial-royal',
    title: 'Suíte Presidencial Royal',
    category: 'master_suite',
    tagline: 'Mármore Nero Marquina & Jacuzzi panorâmica no terraço',
    areaM2: 190,
    guestsMax: 3,
    bedType: 'California King Rivolta Carmignani',
    viewOrientation: 'Vista Panorâmica 180° Mar & Montanha',
    acousticRating: 'STC 62',
    pricePerNightEUR: 1850,
    image: HERO_IMAGE,
    gallery: [
      HERO_IMAGE,
      SUITE_IMAGE,
      CULINARY_IMAGE
    ],
    highlight: 'Favorita dos Casais',
    description: 'Uma ode à sofisticação atemporal. Painéis de mármore Nero Marquina contrastam suavemente com móveis sob medida em couro cognac e tecidos naturais de linho cru.',
    architecturalDetails: 'Revestimento monolítico de mármore italiano polido, esquadrias com corte térmico duplo e piso radiante aquecido no banheiro máster. Amplo terraço de 50m² suspenso sobre a costa.',
    amenities: [
      'Jacuzzi de hidromassagem aquecida no terraço com cromoterapia',
      'Linha exclusiva de banho e fragrâncias Hermès Eau d\'Orange Verte',
      'Sala de estar com lareira ecológica e bar com destilados artesanais',
      'Serviço de arrumação e desembalagem de malas pelo mordomo',
      'Acesso privativo ao circuito termal do Spa Sanctuário',
      'Café da manhã servido na suíte ou no terraço panorâmico'
    ],
    features: [
      '190 m² de puro requinte',
      'Jacuzzi privativa no terraço',
      'Mármore Nero Marquina',
      'Sala de estar independente'
    ]
  },
  {
    id: 'suite-panorama-ocean',
    title: 'Suíte Panorama Ocean',
    category: 'ocean_view',
    tagline: 'Lareira ecológica, enxoval Trousseau & brisa do mar',
    areaM2: 120,
    guestsMax: 2,
    bedType: 'King Size Trousseau 1000 fios',
    viewOrientation: 'Oceano Atlântico Frontal',
    acousticRating: 'STC 60',
    pricePerNightEUR: 1350,
    image: SUITE_IMAGE,
    gallery: [
      SUITE_IMAGE,
      SPA_IMAGE,
      HERO_IMAGE
    ],
    highlight: 'Vista Deslumbrante',
    description: 'Projetada para que o horizonte azul seja a moldura viva de cada instante. Amplas portas de vidro do chão ao teto unem o interior aconchegante à varanda em balanço sobre as falésias.',
    architecturalDetails: 'Madeira teca natural, cortinas motorizadas de linho que filtram a luz dourada do fim de tarde e acabamentos em latão champanhe escovado.',
    amenities: [
      'Lareira ecológica integrada ao lounge de leitura',
      'Chuveiro duplo de alta vazão com claraboia natural',
      'Produtos botânicos Sanctuário Spa com óleos essenciais orgânicos',
      'Máquina de café barista Illy com grãos de torra especial',
      'Frutas da estação e doces finos artesanais repostos diariamente',
      'Check-in e check-out flexíveis mediante disponibilidade'
    ],
    features: [
      '120 m² de serenidade',
      'Frente total para o mar',
      'Lareira ecológica',
      'Banheira de imersão com vista'
    ]
  },
  {
    id: 'garden-sanctuary-villa',
    title: 'Garden Sanctuary Villa',
    category: 'soaking_tub',
    tagline: 'Jardim botânico privativo, ofurô de cedro & tatame zen',
    areaM2: 150,
    guestsMax: 2,
    bedType: 'Super King com colchão artesanal orgânico',
    viewOrientation: 'Jardim Botânico Privativo & Pátio Zen',
    acousticRating: 'STC 64',
    pricePerNightEUR: 1480,
    image: SPA_IMAGE,
    gallery: [
      SPA_IMAGE,
      SUITE_IMAGE,
      HERO_IMAGE
    ],
    highlight: 'Refúgio de Bem-Estar',
    description: 'Um santuário dentro do santuário. Imersa na densa vegetação nativa com total resguardo visual, ideal para quem busca desconexão, equilíbrio energético e silêncio absoluto.',
    architecturalDetails: 'Biofilia intensiva com jardim interno e externo, deque em cumaru envelhecido, fonte de água de nascente natural em pedra sabão e ofurô japonês esculpido em cedro aromático.',
    amenities: [
      'Ofurô japonês externo aquecido a 39°C com sais botânicos',
      'Tatame privativo para prática de yoga e meditação com instrutor particular',
      'Chá botânico de ervas frescas colhidas na horta do hotel todas as manhãs',
      'Difusor de aromaterapia com sinergias personalizadas para o sono',
      'Tapetes de yoga Lululemon e pesos livres em madeira nobre'
    ],
    features: [
      '150 m² com jardim privativo',
      'Ofurô de cedro ao ar livre',
      'Deck de yoga & meditação',
      'Ambiente 100% biofílico'
    ]
  },
  {
    id: 'cliffside-penthouse-horizon',
    title: 'Cliffside Penthouse Horizon',
    category: 'villa_pool',
    tagline: 'Adega Grand Cru, piano Steinway & terraço 360°',
    areaM2: 220,
    guestsMax: 4,
    bedType: '2 Suítes King Trousseau 1000 fios',
    viewOrientation: '360° Mar Aberto e Montanhas Vulcânicas',
    acousticRating: 'STC 66',
    pricePerNightEUR: 2150,
    image: HERO_IMAGE,
    gallery: [
      HERO_IMAGE,
      CULINARY_IMAGE,
      SUITE_IMAGE
    ],
    highlight: 'Exclusividade Suprema',
    description: 'No ponto mais alto da propriedade, a cobertura oferece privacidade inalcançável e um panorama cinematográfico de 360 graus entre o mar aberto e as montanhas.',
    architecturalDetails: 'Estrutura suspensa em balanço com vidro estrutural duplo triplo-laminado, revestimento interno em carvalho americano e mármore Calacatta Gold.',
    amenities: [
      'Piscina aquecida em balanço sobre o despenhadeiro',
      'Piano de cauda Steinway & Sons modelo B',
      'Adega walk-in com sommelier dedicado para degustações',
      'Cozinha gourmet completa com chef privativo sob demanda',
      'Acesso direto por elevador biométrico privativo'
    ],
    features: [
      '220 m² no ponto mais alto',
      'Piscina suspensa no penhasco',
      'Adega walk-in privativa',
      'Elevador biométrico privativo'
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-circuito-aguas',
    title: 'Circuito de Águas Termais & Elixir Francês',
    category: 'spa',
    tagline: 'Termas minerais naturais a 38°C & esfoliação de sal marinho',
    duration: '120 min',
    priceEUR: 290,
    image: SPA_IMAGE,
    description: 'Imersão em piscinas termais vulcânicas ricas em magnésio e silício, alternadas com hidrojatos revigorantes e ducha escocesa, finalizada com esfoliação botânica e elixir hidratante.',
    highlights: [
      'Piscinas de rocha vulcânica natural',
      'Esfoliação com sal marinho e óleo de amêndoas doces',
      'Chá de flores orgânicas e infusão no repouso com vista',
      'Acesso exclusivo à sauna finlandesa e banho turco'
    ],
    scheduleOptions: ['09:30', '11:30', '15:00', '17:30', '19:30']
  },
  {
    id: 'exp-massagem-prana',
    title: 'Massagem Ayurvédica Prana com Pedras Vulcânicas',
    category: 'spa',
    tagline: 'Alinhamento dos chakras com pedras aquecidas de basalto',
    duration: '90 min',
    priceEUR: 240,
    image: SPA_IMAGE,
    description: 'Técnica milenar combinada à energia telúrica do basalto aquecido do próprio Sanctuário. Desperta a circulação, alivia tensões profundas e induz a um estado meditativo absoluto.',
    highlights: [
      'Pedras de basalto negro colhidas nas falésias locais',
      'Óleos essenciais ayurvédicos formulados sob medida',
      'Trabalho focado nos pontos marma e liberação miofascial',
      'Sons de taças tibetanas na abertura e encerramento'
    ],
    scheduleOptions: ['10:00', '14:00', '16:00', '18:00']
  },
  {
    id: 'exp-vinoterapia-casal',
    title: 'Ritual Íntimo de Vinoterapia para Casal',
    category: 'spa',
    tagline: 'Banho de imersão em barrica de carvalho com polifenóis da uva',
    duration: '150 min',
    priceEUR: 580,
    image: SPA_IMAGE,
    description: 'Uma celebração sensorial a dois. Começa com uma esfoliação de sementes de uva cabernet, seguida por um banho aromático em barricas de carvalho e massagem relaxante simultânea.',
    highlights: [
      'Degustação de espumante Grand Cru Millésime e caviar',
      'Banho a dois com polifenóis e óleos de semente de uva',
      'Massagem de 60 minutos para o casal',
      'Cabine VIP privativa com lareira acesa e velas aromáticas'
    ],
    scheduleOptions: ['15:30', '18:30']
  },
  {
    id: 'exp-menu-aura-michelin',
    title: 'Menu Degustação Restaurante Éos (2★ Michelin)',
    category: 'dining',
    tagline: '9 tempos harmonizados pelo Chef Executivo Matteo Valente',
    duration: '3h 30min',
    priceEUR: 320,
    image: CULINARY_IMAGE,
    description: 'Uma jornada culinária inesquecível premiada com 2 estrelas no Guia Michelin. Pratos que reverenciam frutos do mar frescos, cogumelos silvestres e ingredientes da horta biodinâmica do Sanctuário.',
    highlights: [
      'Harmonização completa com rótulos raros pelo Head Sommelier',
      'Mesa com vista privilegiada para o jardim iluminado por tochas',
      'Sobremesa autoral finalizada à mesa com infusão de fumaça aromática',
      'Apresentação e conversa privativa com o Chef Matteo Valente'
    ],
    scheduleOptions: ['19:00', '20:15', '21:30']
  },
  {
    id: 'exp-horizon-rooftop',
    title: 'Coquetelaria Botânica no Horizon Rooftop Lounge',
    category: 'dining',
    tagline: 'Mixologia de autor, destilados raros e pôr do sol inesquecível',
    duration: '2 horas',
    priceEUR: 140,
    image: CULINARY_IMAGE,
    description: 'No terraço panorâmico mais exclusivo da costa. Drinks botânicos infusionados a frio com ervas e flores do nosso horto botânico, acompanhados de petiscos gourmet preparados na brasa.',
    highlights: [
      'Três coquetéis autorais exclusivos por hóspede',
      'Tábua de queijos artesanais de cura prolongada e charcutaria nobre',
      'DJ set intimista de jazz e lounge music ao vivo',
      'Mesa de lounge reservada na primeira fila para o pôr do sol'
    ],
    scheduleOptions: ['17:00', '18:30', '20:00']
  },
  {
    id: 'exp-iate-riva-sunset',
    title: 'Carta Náutica Privativa em Iate Riva 68\' ao Pôr do Sol',
    category: 'expeditions',
    tagline: 'Navegação pelas enseadas secretas com capitão e marinheiro',
    duration: '4 horas',
    priceEUR: 1650,
    image: HERO_IMAGE,
    description: 'Embarque em uma embarcação italiana lendária. Desfrute de paradas para mergulho em águas cristalinas, serviço de bordo com champanhe Dom Pérignon gelado e canapés frescos.',
    highlights: [
      'Iate exclusivo com tripulação completa e combustível',
      'Equipamentos de seabob e snorkel de alta performance',
      'Champagne Dom Pérignon Vintage e ostras frescas a bordo',
      'Transfer em Maybach da vila até o píer privativo'
    ],
    scheduleOptions: ['14:30']
  },
  {
    id: 'exp-heli-tour-canions',
    title: 'Voo Panorâmico de Helicóptero sobre os Cânions e Costa',
    category: 'expeditions',
    tagline: 'Decolagem do heliponto do Sanctuário em aeronave Airbus H130',
    duration: '45 min',
    priceEUR: 890,
    image: HERO_IMAGE,
    description: 'Sobrevoe as escarpas monumentais, praias desertas e os vales verdejantes da região. Uma perspectiva aérea arrebatadora com fones Bose noise-cancelling e espumante após o pouso.',
    highlights: [
      'Aeronave executiva panorâmica com ar-condicionado',
      'Piloto sênior com comentários geográficos e históricos',
      'Decolagem e pouso no heliponto IFR homologado do hotel',
      'Registro fotográfico profissional em alta resolução'
    ],
    scheduleOptions: ['09:00', '11:00', '16:00']
  }
];

export const BUTLER_REQUESTS: ButlerRequest[] = [
  {
    id: 'req-champagne',
    title: 'Champagne & Caviar de Boas-Vindas',
    description: 'Garrafa de Dom Pérignon Vintage gelada a 7°C com 50g de Caviar Imperial na suíte.',
    category: 'dining',
    quickAction: 'Solicitar Champagne na Suíte'
  },
  {
    id: 'req-pillow-menu',
    title: 'Seleção Personalizada de Travesseiros',
    description: 'Escolha entre plumas húngaras, viscoelástico com infusão de lavanda ou anatômico de látex.',
    category: 'amenity',
    quickAction: 'Ajustar Menu de Travesseiros'
  },
  {
    id: 'req-michelin-table',
    title: 'Mesa Privativa no Restaurante Éos',
    description: 'Reserva preferencial da mesa do jardim de inverno para o jantar de hoje às 20h30.',
    category: 'dining',
    quickAction: 'Garantir Mesa no Éos'
  },
  {
    id: 'req-maybach-transfer',
    title: 'Transfer Executivo Mercedes-Maybach',
    description: 'Motorista privativo uniformizado para chegadas, partidas ou passeios pela região.',
    category: 'transfer',
    quickAction: 'Agendar Maybach Chauffeur'
  },
  {
    id: 'req-in-suite-spa',
    title: 'Massagem Relaxante no Quarto',
    description: 'Terapeuta do Sanctuário Spa com maca aquecida e óleos orgânicos diretamente no seu terraço.',
    category: 'wellness',
    quickAction: 'Chamar Terapeuta na Suíte'
  }
];

export const HOTEL_PILLARS = [
  {
    icon: 'Sparkles',
    title: 'Mordomo Pessoal 24h',
    subtitle: 'Guild of Professional Butlers',
    desc: 'Atendimento discreto e impecável para organizar itinerários, desembalar malas e preparar cada detalhe.'
  },
  {
    icon: 'UtensilsCrossed',
    title: '2 Estrelas Michelin',
    subtitle: 'Restaurante Éos por Chef Valente',
    desc: 'Alta gastronomia focada em frescor orgânico e harmonizações de safras lendárias.'
  },
  {
    icon: 'Waves',
    title: 'Termas Vulcânicas',
    subtitle: 'Circuito Mineral a 38°C',
    desc: 'Águas termais alcalinas que emergem das profundezas basálticas, ricas em sílica rejuvenescedora.'
  },
  {
    icon: 'Compass',
    title: 'Heliponto & Maybach',
    subtitle: 'Logística de Alta Classe',
    desc: 'Heliponto IFR iluminado para chegadas noturnas e frota de Mercedes-Maybach S-Class à disposição.'
  }
];

export const TESTIMONIALS = [
  {
    name: 'Elena Rostova',
    title: 'Hóspede Frequente',
    city: 'Zurique, Suíça',
    quote: 'O Sanctuário redefine o significado de hospitalidade de luxo. A privacidade da Grand Villa e a gentileza intuitiva do mordomo tornaram nossa estadia inesquecível.'
  },
  {
    name: 'Lord Alistair Vance',
    title: 'Membro Ambassador Club',
    city: 'Londres, Reino Unido',
    quote: 'O restaurante Éos está no mesmo patamar dos melhores 3 estrelas de Paris. O silêncio da noite contemplando o mar é o maior luxo do mundo contemporâneo.'
  },
  {
    name: 'Beatriz Monteiro & Carlos Eduardo',
    title: 'Lua de Mel',
    city: 'São Paulo, Brasil',
    quote: 'Cada mínimo detalhe foi pensado: das flores frescas no quarto ao ritual a dois no spa. Jamais experimentamos um serviço tão afetuoso e impecável.'
  }
];

export const TRANSLATIONS = {
  pt: {
    tagline: 'Onde o silêncio encontra a perfeição',
    forbesBadge: 'FORBES TRAVEL GUIDE 5★ · THE LEADING HOTELS OF THE WORLD',
    navHome: 'Início',
    navSuites: 'Suítes & Vilas',
    navBook: 'Reservar',
    navExperiences: 'Vivências',
    navConcierge: 'Concierge VIP',
    searchCheckIn: 'Check-in',
    searchCheckOut: 'Check-out',
    searchGuests: 'Hóspedes',
    searchPromo: 'Código VIP',
    searchButton: 'Verificar Disponibilidade',
    startingFrom: 'Diárias a partir de',
    perNight: '/ noite',
    reserveNow: 'Reservar Agora',
    viewDetails: 'Ficha Técnica',
    amenitiesTitle: 'Mimos & Inclusões de Cortesia',
    architecturalNarrative: 'Arquitetura & Filosofia Construtiva',
    policiesTitle: 'Políticas de Estadia & Cancelamento',
    proceedBooking: 'Garantir Reserva Privativa',
    selectDatesTitle: 'Selecione as Datas de Estadia',
    totalEstimated: 'Investimento Total',
    taxesIncluded: 'Impostos e taxa de serviço 10% inclusos',
    exclusiveButlerChat: 'Conversar com Mordomo via WhatsApp',
    filterAll: 'Todas as Vilas (18)',
    filterPool: 'Vilas com Piscina',
    filterMaster: 'Suítes Master',
    filterOcean: 'Vista Mar',
    filterTub: 'Banheira de Imersão',
    expSpa: 'Spa & Bem-Estar',
    expDining: 'Alta Gastronomia 2★',
    expAdventures: 'Expedições Privativas',
    vipClubName: 'Sanctuário Ambassador Tier',
    vipWelcome: 'Bem-vindo ao Atendimento Privativo'
  },
  en: {
    tagline: 'Where silence meets ultimate perfection',
    forbesBadge: 'FORBES TRAVEL GUIDE 5★ · THE LEADING HOTELS OF THE WORLD',
    navHome: 'Home',
    navSuites: 'Suites & Villas',
    navBook: 'Book Stay',
    navExperiences: 'Experiences',
    navConcierge: 'VIP Concierge',
    searchCheckIn: 'Check-in',
    searchCheckOut: 'Check-out',
    searchGuests: 'Guests',
    searchPromo: 'VIP Code',
    searchButton: 'Check Availability',
    startingFrom: 'Rates from',
    perNight: '/ night',
    reserveNow: 'Book Now',
    viewDetails: 'Specifications',
    amenitiesTitle: 'Complimentary Inclusions & Luxuries',
    architecturalNarrative: 'Architecture & Craft Philosophy',
    policiesTitle: 'Stay & Cancellation Policies',
    proceedBooking: 'Secure Private Booking',
    selectDatesTitle: 'Select Stay Dates',
    totalEstimated: 'Total Investment',
    taxesIncluded: 'Taxes and 10% hospitality charge included',
    exclusiveButlerChat: 'Direct WhatsApp to Butler',
    filterAll: 'All Residences (18)',
    filterPool: 'Villas with Pool',
    filterMaster: 'Master Suites',
    filterOcean: 'Ocean View',
    filterTub: 'Deep Soaking Tub',
    expSpa: 'Spa & Wellness',
    expDining: 'Michelin 2★ Dining',
    expAdventures: 'Private Expeditions',
    vipClubName: 'Sanctuário Ambassador Tier',
    vipWelcome: 'Welcome to Private Butler Service'
  },
  fr: {
    tagline: 'Où le silence rencontre la perfection absolue',
    forbesBadge: 'FORBES TRAVEL GUIDE 5★ · THE LEADING HOTELS OF THE WORLD',
    navHome: 'Accueil',
    navSuites: 'Suites & Villas',
    navBook: 'Réserver',
    navExperiences: 'Expériences',
    navConcierge: 'Concierge VIP',
    searchCheckIn: 'Arrivée',
    searchCheckOut: 'Départ',
    searchGuests: 'Voyageurs',
    searchPromo: 'Code Privilège',
    searchButton: 'Vérifier la Disponibilité',
    startingFrom: 'À partir de',
    perNight: '/ nuit',
    reserveNow: 'Réserver',
    viewDetails: 'Détails & Fiche',
    amenitiesTitle: 'Prestations Incluses & Privilèges',
    architecturalNarrative: 'Architecture & Philosophie des Matériaux',
    policiesTitle: 'Conditions de Séjour & Annulation',
    proceedBooking: 'Confirmer la Réservation',
    selectDatesTitle: 'Sélectionnez vos dates',
    totalEstimated: 'Investissement Total',
    taxesIncluded: 'Taxes et service 10% inclus',
    exclusiveButlerChat: 'Contacter le Majordome WhatsApp',
    filterAll: 'Toutes (18)',
    filterPool: 'Villas avec Piscine',
    filterMaster: 'Suites Maître',
    filterOcean: 'Vue Océan',
    filterTub: 'Baignoire Balnéo',
    expSpa: 'Spa & Bien-Être',
    expDining: 'Haute Gastronomie 2★',
    expAdventures: 'Expéditions Privées',
    vipClubName: 'Niveau Ambassadeur Sanctuário',
    vipWelcome: 'Bienvenue au Service Majordome'
  },
  es: {
    tagline: 'Donde el silencio encuentra la perfección',
    forbesBadge: 'FORBES TRAVEL GUIDE 5★ · THE LEADING HOTELS OF THE WORLD',
    navHome: 'Inicio',
    navSuites: 'Suites & Villas',
    navBook: 'Reservar',
    navExperiences: 'Experiencias',
    navConcierge: 'Conserje VIP',
    searchCheckIn: 'Check-in',
    searchCheckOut: 'Check-out',
    searchGuests: 'Huéspedes',
    searchPromo: 'Código VIP',
    searchButton: 'Consultar Disponibilidad',
    startingFrom: 'Tarifas desde',
    perNight: '/ noche',
    reserveNow: 'Reservar Ahora',
    viewDetails: 'Ficha Técnica',
    amenitiesTitle: 'Cortesías e Inclusiones Exclusivas',
    architecturalNarrative: 'Arquitectura y Filosofía de Materiales',
    policiesTitle: 'Políticas de Estadía y Cancelación',
    proceedBooking: 'Confirmar Reserva Privada',
    selectDatesTitle: 'Seleccione sus Fechas',
    totalEstimated: 'Inversión Total',
    taxesIncluded: 'Impuestos y 10% cargo por servicio incluidos',
    exclusiveButlerChat: 'Conversar con Mayordomo WhatsApp',
    filterAll: 'Todas las Villas (18)',
    filterPool: 'Villas con Piscina',
    filterMaster: 'Suites Principales',
    filterOcean: 'Vista al Mar',
    filterTub: 'Bañera de Inmersión',
    expSpa: 'Spa & Bienestar',
    expDining: 'Alta Gastronomía 2★',
    expAdventures: 'Expediciones Privadas',
    vipClubName: 'Categoría Embajador Sanctuário',
    vipWelcome: 'Bienvenido al Servicio Exclusivo de Mayordomo'
  }
};
