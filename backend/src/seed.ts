/**
 * 🌱 SCRIPT DE SEED — YONYWOOD
 * Extrait et injecte toutes les données initiales du front-end dans PostgreSQL.
 * 
 * Données sources:
 * - ../src/data/mockData.ts (DOCUMENTARIES, PROTAGONISTS, DUOS)
 * - ../src/data/explorerTopicsData.ts (EXPLORER_CATEGORIES, EXPLORER_CATALOG)
 */

import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['info', 'warn', 'error'],
});

// =========================================
// DONNÉES SÉRIES DOCUMENTAIRES
// =========================================
const DOCUMENTARIES = [
  {
    id: 'jesus-legba',
    slug: 'jesus-legba',
    title: 'Jésus <> Èṣù',
    subtitle: 'Deux traditions. Une même question de foi.',
    centralQuestion: 'La foi',
    shortSynopsis: "Quand la foi chrétienne et la tradition ancestrale dialoguent d'égal à égal au Bénin face aux grands mystères humains : l'épreuve, le pardon et la réconciliation.",
    description: "Au Bénin, berceau du culte des ancêtres et terre de ferveur biblique, deux croyances cohabitent sous le même toit sans jamais s'affronter frontalement.",
    coverImage: '/assets/posters/jesus-esu.png',
    posterUrl: '/assets/posters/jesus-esu.png',
    teaserVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    teaserDuration: '1:15',
    episodeCount: 5,
    protagonistsCount: 8,
    targetFunding: 50000,
    currentFunding: 0,
    territories: ['Ouidah', 'Cotonou', 'Allada', 'Abomey'],
    universes: [
      { name: 'Jésus', tagline: "L'espérance chrétienne et le don de soi", description: "Parcours de foi ecclésiale, d'oraison silencieuse, d'accueil du prochain et d'engagement au cœur des communautés contemporaines.", territory: 'Bénin (Littoral) & Diaspora' },
      { name: 'Èṣù', tagline: 'Le gardien des carrefours et des seuils sacrés', description: "Spiritualité ancestrale où Èṣù ouvre les voies, protège les demeures et relie le monde visible aux forces cosmiques.", territory: 'Bénin (Allada, Abomey, Ouidah)' }
    ],
    questions: [
      { number: '01', title: 'La Rencontre', prompt: "Racontez-nous un moment de votre vie où vous avez réellement rencontré votre foi. Que s'est-il passé ?", audioDuration: '0:42', audioVoiceName: 'Dah Zounon & Père Matthieu' },
      { number: '02', title: "L'Épreuve", prompt: "Racontez-nous une épreuve ou un moment difficile de votre vie où votre foi a été mise à l'épreuve.", audioDuration: '0:38', audioVoiceName: 'Sœur Blandine Dossou' },
      { number: '03', title: 'La Transmission', prompt: "Si vous pouviez transmettre une seule chose de votre foi à quelqu'un qui cherche aujourd'hui son chemin...", audioDuration: '0:45', audioVoiceName: 'Père Matthieu' },
      { number: '04', title: 'La Personne qui vous a Changé', prompt: "Racontez-nous l'histoire d'une personne que votre foi a mise sur votre chemin.", audioDuration: '0:49', audioVoiceName: 'Dah Zounon' },
      { number: '05', title: "L'Héritage", prompt: "Imaginez que dans cent ans, quelqu'un découvre votre histoire sans jamais vous avoir rencontré.", audioDuration: '0:52', audioVoiceName: 'Voix de la Communauté' },
    ],
  },
  {
    id: 'finagnon-qosqorico',
    slug: 'finagnon-qosqorico',
    title: 'Finagnon <> Qosqorico',
    subtitle: 'Bénin <> Pérou. Deux territoires. Une même réflexion sur ce qui nous relie à un lieu.',
    centralQuestion: 'Le territoire',
    shortSynopsis: "Des cités lacustres de Ganvié aux cimes sacrées de Cusco et Pisac, pêcheurs et paysans dialoguent sur l'enracinement, l'eau, la montagne et l'amour inconditionnel d'une terre.",
    description: "Des cités lacustres de Ganvié, bâties sur pilotis pour échapper aux razzias du Dahomey, jusqu'aux terrasses millénaires de Pisac et Cusco au Pérou.",
    coverImage: '/assets/posters/finagnon-qosqorico.png',
    posterUrl: '/assets/posters/finagnon-qosqorico.png',
    teaserVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    teaserDuration: '1:45',
    episodeCount: 5,
    protagonistsCount: 6,
    targetFunding: 50000,
    currentFunding: 0,
    territories: ['Ganvié (Bénin)', 'Cusco (Pérou)', 'Grand-Popo', 'Pisac'],
    universes: [
      { name: 'Finagnon', tagline: 'La mémoire lacustre et la terre rouge du golfe de Guinée', description: "Des cités sur pilotis de Ganvié aux collines argileuses, un dialogue perpétuel entre l'eau bienfaitrice et l'enracinement des aïeux.", territory: 'Bénin (Ganvié, Grand-Popo)' },
      { name: 'Qosqorico', tagline: 'Les cimes andines et le souffle des terrasses sacrées', description: "Entre Cusco et la Vallée Sacrée, la relation intime à la Pachamama, la pierre millénaire et la culture vivante des hauts plateaux.", territory: 'Pérou (Cusco, Vallée Sacrée, Pisac)' }
    ],
    questions: [
      { number: '01', title: 'Chez Soi', prompt: "Racontez-nous un moment où vous avez compris que vous étiez vraiment chez vous.", audioDuration: '0:40', audioVoiceName: 'Tobi & Sayri (Bénin / Pérou)' },
      { number: '02', title: 'Partir', prompt: "Racontez-nous une fois où vous avez dû quitter un lieu qui comptait profondément pour vous.", audioDuration: '0:36', audioVoiceName: 'Koffi Tisserand' },
      { number: '03', title: 'Revenir', prompt: "Racontez-nous votre histoire d'un retour dans un lieu qui avait changé.", audioDuration: '0:44', audioVoiceName: 'Amara Tisserande' },
      { number: '04', title: 'Ce qui Reste', prompt: "Racontez-nous quelque chose de votre territoire que vous avez reçu de ceux qui étaient là avant vous.", audioDuration: '0:48', audioVoiceName: 'Piroguiers de Ganvié' },
      { number: '05', title: 'Demain', prompt: "Imaginez que quelqu'un découvre votre territoire dans cent ans.", audioDuration: '0:50', audioVoiceName: 'Chant Collectif Ganvié & Andes' },
    ],
  },
  {
    id: 'blacks-one-beyond-eve',
    slug: 'blacks-one-beyond-eve',
    title: 'Blacks One <> Beyond Eve',
    subtitle: "Deux expériences collectives. Une exploration de l'identité et de ce que nous devenons.",
    centralQuestion: "L'identité",
    shortSynopsis: "Entre la vitalité urbaine des collectifs de hip-hop à Dakar et les cercles de femmes créatrices d'Abidjan et d'Europe, une quête collective pour réinventer notre souveraineté intime.",
    description: "À Dakar, la jeunesse se réapproprie l'espace public par le verbe, le hip-hop et la fraternité des rues (Blacks One), transformant la précarité en dignité collective.",
    coverImage: '/assets/posters/blacks-one-beyond-eve.png',
    posterUrl: '/assets/posters/blacks-one-beyond-eve.png',
    teaserVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    teaserDuration: '1:30',
    episodeCount: 5,
    protagonistsCount: 6,
    targetFunding: 50000,
    currentFunding: 0,
    territories: ['Dakar', 'Abidjan', 'Paris', 'Marseille'],
    universes: [
      { name: 'Blacks One', tagline: "L'affirmation par le rythme, le verbe et la fraternité", description: "Collectifs artistiques et urbains forgeant des espaces de dignité, de création partagée et de reconquête des récits d'émancipation.", territory: 'Dakar & banlieues francophones' },
      { name: 'Beyond Eve', tagline: 'La réinvention de la lignée féminine et du devenir', description: "Cercles de transmission intergénérationnelle où femmes artistes, chercheuses et artisanes dénouent les stéréotypes pour tisser un futur souverain.", territory: 'Abidjan, Marseille & Bruxelles' }
    ],
    questions: [
      { number: '01', title: 'Qui suis-je ?', prompt: "Racontez-nous un moment de votre vie où quelque chose vous a fait comprendre qui vous étiez vraiment.", audioDuration: '0:39', audioVoiceName: 'Malik & Éléonore' },
      { number: '02', title: 'Le Regard des Autres', prompt: "Racontez-nous une fois où le regard de quelqu'un sur vous a changé votre manière de vous regarder vous-même.", audioDuration: '0:43', audioVoiceName: 'Éléonore (Marseille)' },
      { number: '03', title: "CE QUE L'ON PORTE", prompt: "Racontez-nous quelque chose que vous avez reçu de votre histoire, de votre famille ou de ceux qui vous ont précédé.", audioDuration: '0:47', audioVoiceName: 'Malik Barou (Dakar)' },
      { number: '04', title: 'Devenir', prompt: "Racontez-nous un moment où vous avez compris que vous étiez en train de devenir quelqu'un de différent.", audioDuration: '0:41', audioVoiceName: 'Collectif Beyond Eve' },
      { number: '05', title: 'À Celui qui Viendra', prompt: "Racontez-nous une histoire de votre vie que vous aimeriez transmettre à quelqu'un qui viendra après vous.", audioDuration: '0:50', audioVoiceName: 'Ablaye Cissoko & Voix Dakar' },
    ],
  },
  {
    id: 'dixeat-fiat-luxe',
    slug: 'dixeat-fiat-luxe',
    title: 'Dixeat <> Fiat Luxe',
    subtitle: "Ceux qui nourrissent les autres <> ceux qui créent des expériences d'exception.",
    centralQuestion: "L'expérience",
    shortSynopsis: "Des marmites populaires de Dantokpa aux tables d'exception à Paris et Milan, des artisans de bouche et scénographes révèlent l'art du don, du détail et du souvenir impérissable.",
    description: "Dans la fumée des marmites de Dantokpa à Cotonou, Dixeat incarne l'artisanat nourricier populaire.",
    coverImage: '/assets/posters/dixeat-fiat-luxe.png',
    posterUrl: '/assets/posters/dixeat-fiat-luxe.png',
    teaserVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    teaserDuration: '1:20',
    episodeCount: 5,
    protagonistsCount: 6,
    targetFunding: 50000,
    currentFunding: 0,
    territories: ['Cotonou', 'Paris', 'Marrakech', 'Lomé'],
    universes: [
      { name: 'Dixeat', tagline: "L'artisanat nourricier populaire et la générosité brute", description: "La chaleur des marmites de rue, l'igname pilée au lever du jour, le partage sans fard où chaque repas est un pacte de solidarité.", territory: 'Cotonou, Dantokpa & marchés ouest-africains' },
      { name: 'Fiat Luxe', tagline: 'La haute scénographie du détail et le temps suspendu', description: "L'orfèvrerie des arts de la table, la scénographie olfactive, la précision du geste qui transforme l'éphémère en mémoire inoubliable.", territory: 'Paris, Marrakech, Milan' }
    ],
    questions: [
      { number: '01', title: 'Le Goût', prompt: "Racontez-nous un moment où vous avez créé quelque chose pour quelqu'un et où vous avez compris que vous lui aviez vraiment fait plaisir.", audioDuration: '0:35', audioVoiceName: 'Chef Koffi & Hélène' },
      { number: '02', title: "L'Attention", prompt: "Racontez-nous une fois où vous avez accordé une attention particulière à quelqu'un pour lui offrir quelque chose qu'il n'oublierait pas.", audioDuration: '0:44', audioVoiceName: 'Hélène Saint-Amand' },
      { number: '03', title: 'Le Détail', prompt: "Racontez-nous une expérience que vous avez créée et dont vous vous souvenez encore à cause d'un tout petit détail.", audioDuration: '0:42', audioVoiceName: 'Chef Koffi (Dantokpa)' },
      { number: '04', title: 'La Surprise', prompt: "Racontez-nous une fois où vous avez voulu surprendre quelqu'un et où les choses ne se sont pas passées exactement comme prévu.", audioDuration: '0:46', audioVoiceName: 'Scénographe Fiat Luxe' },
      { number: '05', title: "CE QUE L'ON OFFRE", prompt: "Racontez-nous une chose que vous avez offerte à quelqu'un et dont vous vous souvenez encore aujourd'hui.", audioDuration: '0:50', audioVoiceName: 'Chœur Cotonou & Paris' },
    ],
  },
  {
    id: 'investors-builders',
    slug: 'investors-builders',
    title: 'Investors <> Builders',
    subtitle: 'Ceux qui financent le futur <> ceux qui bâtissent le réel.',
    centralQuestion: "L'alliance",
    shortSynopsis: "Entre l'audace du capital patient et la rigueur du terrain, une rencontre sans filtre entre investisseurs d'impact et bâtisseurs d'infrastructures.",
    description: "D'un côté, ceux qui allouent des capitaux, évaluent les risques et parient sur des visions à long terme. De l'autre, ceux qui conçoivent, bâtissent et transforment la matière au quotidien.",
    coverImage: '/investors-builders.png',
    posterUrl: '/investors-builders.png',
    teaserVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    teaserDuration: '1:35',
    episodeCount: 5,
    protagonistsCount: 6,
    targetFunding: 50000,
    currentFunding: 0,
    territories: ['Dakar', 'Cotonou', 'Abidjan', 'Paris', 'Kigali'],
    universes: [
      { name: 'Investors', tagline: "Le capital patient, l'allocation stratégique et le discernement", description: "Mécènes, fonds d'impact et investisseurs engagés qui soutiennent l'économie productive et les visions pérennes.", territory: 'Paris, Dakar, Abidjan & Diaspora' },
      { name: 'Builders', tagline: "L'ancrage dans la matière, le prototype et la force bâtisseuse", description: "Entrepreneurs d'infrastructures, ingénieurs et maîtres artisans qui construisent les piliers de l'économie concrète.", territory: 'Cotonou, Kigali, Nairobi, Abidjan' }
    ],
    questions: [
      { number: '01', title: 'Le Pari Fondateur', prompt: "Racontez-nous le premier projet ou pari décisif où vous avez engagé vos ressources ou vos mains sans certitude de réussir.", audioDuration: '0:42', audioVoiceName: 'Fatou Diallo & Kwame Mensah' },
      { number: '02', title: 'Le Risque & La Tempête', prompt: "Racontez-nous une situation critique où tout semblait menacer de s'effondrer.", audioDuration: '0:45', audioVoiceName: 'Kwame Mensah' },
      { number: '03', title: 'La Rencontre Décisive', prompt: "Racontez-nous une rencontre entre financeur et bâtisseur qui a changé votre regard sur la valeur de ce que vous faites.", audioDuration: '0:40', audioVoiceName: 'Fatou Diallo' },
      { number: '04', title: 'La Réalité du Terrain', prompt: "Que vous a appris la poussière du chantier ou la confrontation à la matière que les chiffres ne disaient pas ?", audioDuration: '0:48', audioVoiceName: 'Bâtisseurs du réel' },
      { number: '05', title: "L'Héritage Durable", prompt: "Dans cinquante ans, quelle empreinte tangible souhaitez-vous que votre alliance ait laissée ?", audioDuration: '0:50', audioVoiceName: 'Voix de la Communauté' },
    ],
  },
];

// =========================================
// DONNÉES PROTAGONISTES
// =========================================
const PROTAGONISTS = [
  {
    id: 'koffi-tisserand',
    slug: 'koffi-tisserand',
    documentaryId: 'finagnon-qosqorico',
    name: 'Koffi',
    age: 54,
    role: 'Tisserand traditionnel',
    territory: 'Porto-Novo',
    country: 'Bénin',
    flag: '🇧🇯',
    bio: 'Tisserand à Porto-Novo, Koffi perpétue un savoir transmis de père en fils. Ses étoffes racontent les marchés et les rites de la côte.',
    photoUrl: '/assets/protagonists/koffi-tisserand.jpg',
    universeTag: 'Finagnon',
    quote: "« Le tissage est une langue qu'on apprend sans parler. »",
    treeData: {
      passeurs: [
        { id: 'p-tanaka', name: 'Maître Tanaka', role: 'Maître ébéniste', country: 'Japon', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80' }
      ],
      transmissions: [
        { id: 't-koffi-1', title: "Le rythme du peigne d'acajou", ancestorOrMentor: 'Son père Mensah Houndété (1932–2012)', description: "L'art de tendre la chaîne sans briser les fibres de coton.", connectedProtagonistId: 'amara-tisserande' }
      ],
      duos: [
        { id: 'duo-koffi-amara-ref', partnerName: 'Amara', partnerRole: 'Tisserande andine', partnerPhoto: '/assets/protagonists/amara-tisserande.jpg', duoId: 'duo-koffi-amara', question: "« Que transmet une main qui tisse depuis toujours ? »" }
      ],
      creations: [
        { id: 'c-koffi-1', title: 'Étoffes rituelles de Porto-Novo', type: "Tissage d'exception", description: 'Tissées sur métier horizontal en fil de coton biologique.', priceOrDetail: 'Fabrication artisanale sur commande' }
      ],
      projects: [
        { id: 'p-koffi-1', title: "L'Atelier Vivant des Jeunes Tisserands", stage: 'Chantier participatif à Porto-Novo', description: "Création d'un hangar d'apprentissage gratuit pour former 12 jeunes." }
      ],
      opportunities: [
        { id: 'o-koffi-1', title: "Résidence d'initiation au tissage traditionnel", description: 'Accueil de 2 créateurs textiles par an pour une immersion de 3 semaines.', badge: 'Résidence ouverte' }
      ],
      needs: [
        { id: 'n-koffi-1', title: 'Sourcing de fil de coton biologique ouest-africain', urgency: 'Prioritaire', description: 'Recherche de coopératives agricoles féminines produisant du fil écru.' }
      ]
    },
    stories: [
      {
        id: 'story-koffi-tiss-01',
        title: 'Le bruit de la navette avant le jour',
        questionNumber: '01',
        questionTitle: 'Le Geste Ancestral',
        duration: '08:40',
        videoDurationSeconds: 520,
        summary: "Koffi raconte ce matin brumeux où son père l'a réveillé à 4 heures pour écouter la cadence de la navette sans allumer de lampe.",
        videoCoverUrl: '/assets/protagonists/koffi-tisserand.jpg',
        credits: [
          { role: 'story_owner', label: "Propriétaire de l'histoire", name: 'Koffi' },
          { role: 'director', label: 'Réalisateur', name: 'Ayaba Senou' }
        ]
      }
    ]
  },
  {
    id: 'amara-tisserande',
    slug: 'amara-tisserande',
    documentaryId: 'finagnon-qosqorico',
    name: 'Amara',
    age: 42,
    role: 'Tisserande andine',
    territory: 'Cusco (Vallée Sacrée)',
    country: 'Pérou',
    flag: '🇵🇪',
    bio: 'Tisserande des hauteurs de Cusco, Amara travaille la laine et les teintes végétales. Ses tissus portent les symboles de sa communauté.',
    photoUrl: '/assets/protagonists/amara-tisserande.jpg',
    universeTag: 'Qosqorico',
    quote: "« Chaque fil garde la mémoire de la montagne. »",
    treeData: {
      transmissions: [
        { id: 't-amara-1', title: 'La teinture à la cochenille sauvage', ancestorOrMentor: 'Sa mère Rosa Huamán', description: 'Obtenir treize nuances de pourpre en ajustant le jus de citron vert.', connectedProtagonistId: 'koffi-tisserand' }
      ],
      duos: [
        { id: 'duo-amara-koffi-ref', partnerName: 'Koffi', partnerRole: 'Tisserand de Porto-Novo', partnerPhoto: '/assets/protagonists/koffi-tisserand.jpg', duoId: 'duo-koffi-amara', question: "« Que transmet une main qui tisse depuis toujours ? »" }
      ],
      creations: [
        { id: 'c-amara-1', title: 'Lliclla andine cérémonielle', type: "Châle de laine d'alpaga", description: 'Tissé sur métier à ceinture, motifs racontant les cycles des constellations.' }
      ],
      projects: [
        { id: 'p-amara-1', title: 'La Maison des Tisseuses de Chinchero', stage: 'Construction en adobe', description: "Créer un espace autonome où 25 femmes peuvent teindre et filer." }
      ],
      opportunities: [
        { id: 'o-amara-1', title: 'Cercle de transmission du filage au fuseau', description: 'Ateliers mensuels ouverts aux enfants de la vallée.', badge: 'Transmission communautaire' }
      ],
      needs: [
        { id: 'n-amara-1', title: 'Cuves en cuivre pour bains de teinture douce', urgency: 'En cours', description: 'Équipement pour stabiliser les pigments naturels sans mordant toxique.' }
      ]
    },
    stories: [
      {
        id: 'story-amara-01',
        title: 'Le premier motif gravé dans la laine',
        questionNumber: '01',
        questionTitle: 'Le Geste Ancestral',
        duration: '09:15',
        videoDurationSeconds: 555,
        summary: "Amara raconte comment sa grand-mère lui a attaché les mains au métier à l'âge de huit ans.",
        videoCoverUrl: '/assets/protagonists/amara-tisserande.jpg',
        credits: [
          { role: 'story_owner', label: "Propriétaire de l'histoire", name: 'Amara' },
          { role: 'director', label: 'Réalisateur', name: 'Mateo Quispe Flores' }
        ]
      }
    ]
  },
  {
    id: 'dah-zounon',
    slug: 'dah-zounon',
    documentaryId: 'jesus-legba',
    name: 'Dah Zounon Gbegnon',
    age: 62,
    role: 'Dignitaire de la Tradition & Gardien des Seuils',
    territory: 'Allada / Ouidah',
    country: 'Bénin',
    flag: '🇧🇯',
    bio: "Héritier d'une lignée de prêtres vodoun d'Allada, Dah Zounon veille sur l'autel de Legba depuis quarante ans.",
    photoUrl: '/assets/protagonists/dah-zounon.jpg',
    universeTag: 'Èṣù',
    quote: "« Legba ne ferme jamais une porte sans avoir déjà placé la clé entre les mains de celui qui écoute. »",
    treeData: {
      transmissions: [
        { id: 't-1', title: "L'onction des carrefours", ancestorOrMentor: 'Son grand-père Hounnon Kpossou (1918–1996)', description: "L'apprentissage du silence auprès des pierres levées.", connectedProtagonistId: 'pere-matthieu' }
      ],
      duos: [
        { id: 'duo-1', partnerName: 'Père Matthieu Agonhossou', partnerRole: 'Prêtre catholique & enseignant', partnerPhoto: '/assets/protagonists/pere-matthieu.jpg', duoId: 'duo-jesus-legba-01', question: "01 — La Rencontre : Le jour où la foi a cessé d'être un mot" }
      ],
      opportunities: [
        { id: 'o-1', title: "Immersion aux rites d'accueil de Legba", description: 'Sessions saisonnières de découverte des pratiques de seuil.', badge: 'Immersion initiatique' }
      ],
      creations: [
        { id: 'c-1', title: 'Baume artisanal des voyageurs', type: 'Baume artisanal', description: "Formule ancestrale préparée lors du solstice d'harmattan.", priceOrDetail: 'Fabrication rituelle limitée' }
      ],
      projects: [
        { id: 'p-1', title: 'Le Sanctuaire-Conservatoire des plantes sacrées', stage: 'Jeune pousse (terrassement en cours)', description: "Création d'un arboretum protégé de 4 hectares." }
      ],
      needs: [
        { id: 'n-1', title: 'Archivage sonore et traduction en langues locales', urgency: 'Prioritaire', description: "Besoin d'un jeune ingénieur du son pour numériser 60 heures de chants oraux." }
      ]
    },
    stories: [
      {
        id: 'story-dah-01',
        title: "Le feu sous l'iroko noir",
        questionNumber: '01',
        questionTitle: 'La Rencontre',
        duration: '11:42',
        videoDurationSeconds: 702,
        summary: "À l'âge de dix-neuf ans, Dah Zounon fuyait le village après un naufrage familial.",
        videoCoverUrl: '/assets/protagonists/dah-zounon.jpg',
        credits: [
          { role: 'story_owner', label: "Propriétaire de l'histoire", name: 'Dah Zounon Gbegnon' },
          { role: 'director', label: 'Réalisateur', name: 'Ayaba Senou' }
        ]
      }
    ]
  },
  {
    id: 'pere-matthieu',
    slug: 'pere-matthieu',
    documentaryId: 'jesus-legba',
    name: 'Père Matthieu Agonhossou',
    age: 46,
    role: 'Prêtre diocésain, philosophe & éducateur',
    territory: 'Cotonou / Ouidah',
    country: 'Bénin',
    flag: '🇧🇯',
    bio: "Né au bord de la lagune de Cotonou, ordonné à Ouidah, le Père Matthieu conjugue l'étude de saint Augustin avec une écoute attentive des traditions de son terroir.",
    photoUrl: '/assets/protagonists/pere-matthieu.jpg',
    universeTag: 'Jésus',
    quote: "« La foi n'est pas une citadelle contre l'autre, c'est une table basse dressée en plein vent où l'on attend celui qui a soif. »",
    treeData: {
      transmissions: [
        { id: 't-3', title: "Le bréviaire au bord de l'eau", ancestorOrMentor: 'Monseigneur Isidore de Souza', description: 'Le courage civique au service de la paix nationale.', connectedProtagonistId: 'dah-zounon' }
      ],
      duos: [
        { id: 'duo-1-bis', partnerName: 'Dah Zounon Gbegnon', partnerRole: 'Dignitaire Vodoun', partnerPhoto: '/assets/protagonists/dah-zounon.jpg', duoId: 'duo-jesus-legba-01', question: "01 — La Rencontre : L'éveil devant l'invisible" }
      ],
      opportunities: [
        { id: 'o-3', title: 'Ateliers de lecture philosophique pour lycéens', description: 'Ouverture hebdomadaire de sa bibliothèque personnelle à 30 élèves.', badge: 'Éducation ouverte' }
      ],
      creations: [
        { id: 'c-3', title: 'Cahiers de méditation sur les proverbes du golfe', type: 'Essai éditorial', description: 'Recueil de 120 pages rapprochant les Béatitudes des maximes fòn.' }
      ],
      projects: [
        { id: 'p-2', title: "La Maison du Repos et de l'Écoute", stage: 'Plans architecturaux finalisés', description: 'Un lieu neutre pour accueillir sans distinction de culte les personnes éprouvées.' }
      ],
      needs: [
        { id: 'n-2', title: 'Équipement en panneaux solaires', urgency: 'En recherche de donateurs', description: "Alimenter la salle d'études pour permettre aux jeunes d'étudier le soir." }
      ]
    },
    stories: [
      {
        id: 'story-matthieu-01',
        title: 'Le silence dans la nef de Ouidah',
        questionNumber: '01',
        questionTitle: 'La Rencontre',
        duration: '13:05',
        videoDurationSeconds: 785,
        summary: "Pendant ses années de doute à l'université, Matthieu est entré par hasard dans la basilique déserte de Ouidah en plein midi.",
        videoCoverUrl: '/assets/protagonists/pere-matthieu.jpg',
        credits: [
          { role: 'story_owner', label: "Propriétaire de l'histoire", name: 'Père Matthieu Agonhossou' },
          { role: 'director', label: 'Réalisateur', name: 'Ayaba Senou' }
        ]
      }
    ]
  },
  {
    id: 'tobi-houndegla',
    slug: 'tobi-houndegla',
    documentaryId: 'finagnon-qosqorico',
    name: 'Tobi Houndegla',
    age: 38,
    role: 'Maître charpentier de pirogues & pêcheur',
    territory: 'Ganvié (Cité lacustre)',
    country: 'Bénin',
    flag: '🇧🇯',
    bio: "À Ganvié, on dit que Tobi connaît l'âge de chaque pieu d'acajou enfoncé sous la lagune Nokoué.",
    photoUrl: '/assets/protagonists/tobi-houndegla.jpg',
    universeTag: 'Finagnon',
    quote: "« L'eau ne t'appartient pas : c'est toi qui deviens une goutte de son histoire. »",
    treeData: {
      transmissions: [
        { id: 't-4', title: "Le choix des troncs d'iroko flottés", ancestorOrMentor: 'Son père Basile Houndegla', description: 'Savoir lire les veines du bois pour que la proue fende le courant.' }
      ],
      duos: [
        { id: 'duo-2', partnerName: 'Sayri Quispe', partnerRole: 'Cultivateur de maïs & tisseur andin', partnerPhoto: '/assets/protagonists/sayri-quispe.jpg', duoId: 'duo-finagnon-qosqorico-01', question: "01 — Chez Soi : Là où le corps reconnaît la terre ou l'onde" }
      ],
      opportunities: [
        { id: 'o-4', title: 'Apprentissage de la charpente navale traditionnelle', description: 'Accueil de deux jeunes par an pour transmettre la forge des clous forgés à la main.', badge: 'Atelier vivant' }
      ],
      creations: [
        { id: 'c-4', title: 'Pirogues sculptées en modèle réduit pour la mémoire', type: "Artisanat d'art", description: "Modèles fidèles à échelle 1/10e représentant les embarcations historiques du XVIIIe siècle." }
      ],
      projects: [
        { id: 'p-3', title: 'Restauration des passerelles communes de Ganvié', stage: 'Mobilisation communautaire', description: 'Chantier participatif pour remplacer les pieux fragilisés avant la crue.' }
      ],
      needs: [
        { id: 'n-3', title: 'Scies à ruban manuelles de précision', urgency: 'Modérée', description: "Pour soulager l'effort physique des apprentis lors de l'ébauche des coques." }
      ]
    },
    stories: [
      {
        id: 'story-tobi-01',
        title: 'Le premier coup de pagaie seul',
        questionNumber: '01',
        questionTitle: 'Chez Soi',
        duration: '09:28',
        videoDurationSeconds: 568,
        summary: "Le jour de ses sept ans, son père l'a laissé seul au milieu de la lagune brumeuse avec une perche de bambou.",
        videoCoverUrl: '/assets/protagonists/tobi-houndegla.jpg',
        credits: [
          { role: 'story_owner', label: "Propriétaire de l'histoire", name: 'Tobi Houndegla' },
          { role: 'director', label: 'Réalisateur', name: 'Mateo Quispe' }
        ]
      }
    ]
  },
  {
    id: 'sayri-quispe',
    slug: 'sayri-quispe',
    documentaryId: 'finagnon-qosqorico',
    name: 'Sayri Quispe Huamán',
    age: 34,
    role: 'Cultivateur de semences anciennes & tisseur Quechua',
    territory: 'Vallée Sacrée / Pisac',
    country: 'Pérou',
    flag: '🇵🇪',
    bio: "Vivant à 3 600 mètres d'altitude sur les contreforts de la Vallée Sacrée des Incas, Sayri cultive plus de quarante variétés de maïs natif.",
    photoUrl: '/assets/protagonists/sayri-quispe.jpg',
    universeTag: 'Qosqorico',
    quote: "« La montagne ne parle pas avec des mots, elle parle avec le vent et la couleur des feuilles de maïs. »",
    treeData: {
      transmissions: [
        { id: 't-5', title: 'Le secret des teintures végétales de la vallée', ancestorOrMentor: 'Sa grand-mère Mama Asunta', description: "L'usage de la cochenille et des lichens d'altitude pour fixer des pourpres et des ocres indélébiles." }
      ],
      duos: [
        { id: 'duo-2-bis', partnerName: 'Tobi Houndegla', partnerRole: 'Charpentier de pirogues de Ganvié', partnerPhoto: '/assets/protagonists/tobi-houndegla.jpg', duoId: 'duo-finagnon-qosqorico-01', question: "01 — Chez Soi : Deux mondes reliés par la fidélité à un élément" }
      ],
      opportunities: [
        { id: 'o-5', title: 'Partage de semences paysannes libres', description: 'Échange annuel de graines avec les communautés des vallées voisines.', badge: 'Biodiversité' }
      ],
      creations: [
        { id: 'c-5', title: "Ponchos d'alpaga teints aux herbes sauvages", type: "Tissage d'exception", description: "Pièces uniques tissées sur métier à ceinture demandant jusqu'à trois mois de travail minutieux." }
      ],
      projects: [
        { id: 'p-4', title: 'La Banque Communautaire de Semences de Pisac', stage: "Murs d'adobe érigés", description: 'Un silo thermique traditionnel pour conserver les semences sans réfrigération électrique.' }
      ],
      needs: [
        { id: 'n-4', title: 'Collecte de mémoire orale en quechua', urgency: 'Urgente', description: 'Enregistrer les chants de récolte des anciens avant leur disparition.' }
      ]
    },
    stories: [
      {
        id: 'story-sayri-01',
        title: 'Le sel de Maras au lever du soleil',
        questionNumber: '01',
        questionTitle: 'Chez Soi',
        duration: '10:14',
        videoDurationSeconds: 614,
        summary: "Sayri se rappelle la première aurore passée seul sur la terrasse familiale, les doigts engourdis par la gelée matinale.",
        videoCoverUrl: '/assets/protagonists/sayri-quispe.jpg',
        credits: [
          { role: 'story_owner', label: "Propriétaire de l'histoire", name: 'Sayri Quispe Huamán' },
          { role: 'director', label: 'Réalisateur', name: 'Mateo Quispe' }
        ]
      }
    ]
  },
  {
    id: 'malik-diop',
    slug: 'malik-diop',
    documentaryId: 'blacks-one-beyond-eve',
    name: 'Malik Diop',
    age: 31,
    role: 'Chorégraphe de danses urbaines & passeur de mémoires',
    territory: 'Dakar / Paris',
    country: 'Sénégal & France',
    flag: '🇸🇳',
    bio: "Formé dans les battles de rue de la Médina de Dakar puis sur les scènes internationales, Malik a fondé le collectif Blacks One.",
    photoUrl: '/assets/protagonists/malik-diop.jpg',
    universeTag: 'Blacks One',
    quote: "« Ton identité n'est pas une cage qu'on t'assigne : c'est le rythme que tu inventes pour faire vibrer le sol sous tes pas. »",
    treeData: {
      transmissions: [
        { id: 't-6', title: 'Les pas du sabar royal des Lébous', ancestorOrMentor: 'Son oncle El Hadj Diop', description: "La cadence des pieds nus sur la terre battue qui raconte l'histoire d'un peuple de pêcheurs insoumis." }
      ],
      duos: [
        { id: 'duo-3', partnerName: 'Éléonore Vance', partnerRole: 'Artiste textile & fondatrice de collectif', partnerPhoto: '/assets/protagonists/eleonore-vance.jpg', duoId: 'duo-blacks-one-beyond-eve-01', question: "03 — Ce que l'on Porte : Ce que l'on a reçu et qu'on ne peut poser" }
      ],
      opportunities: [
        { id: 'o-6', title: 'Résidence tremplin pour danseurs émergents', description: 'Bourses de création pour 4 jeunes talents par an à Dakar.', badge: 'Tremplin chorégraphique' }
      ],
      creations: [
        { id: 'c-6', title: "Spectacle vivant « Mémoire de Sable »", type: 'Création scénique', description: "Pièce pour 7 danseurs explorant les migrations intérieures et la fierté retrouvée." }
      ],
      projects: [
        { id: 'p-5', title: "L'École Buissonnière des Rythmes", stage: 'Ateliers itinérants dans les quartiers', description: 'Former des médiateurs culturels pour réinvestir les places publiques par la danse.' }
      ],
      needs: [
        { id: 'n-5', title: 'Espaces de répétition sécurisés à Dakar', urgency: 'Recherche de partenariats municipaux', description: 'Trouver un hangar ou une friche pour les répétitions de la troupe.' }
      ]
    },
    stories: [
      {
        id: 'story-malik-01',
        title: 'Le premier cercle sous le réverbère',
        questionNumber: '03',
        questionTitle: "Ce que l'on Porte",
        duration: '12:10',
        videoDurationSeconds: 730,
        summary: "Malik raconte l'instant où, rejeté d'une grande audition à Paris pour « manque d'académisme », il a compris que son bagage le plus précieux n'était pas leur validation.",
        videoCoverUrl: '/assets/protagonists/malik-diop.jpg',
        credits: [
          { role: 'story_owner', label: "Propriétaire de l'histoire", name: 'Malik Diop' },
          { role: 'director', label: 'Réalisateur', name: 'Kadiatou Bocoum' }
        ]
      }
    ]
  },
  {
    id: 'eleonore-vance',
    slug: 'eleonore-vance',
    documentaryId: 'blacks-one-beyond-eve',
    name: 'Éléonore Vance',
    age: 39,
    role: 'Artiste plasticienne, tisseuse de récits & curatrice',
    territory: 'Marseille / Abidjan',
    country: "Côte d'Ivoire & France",
    flag: '🇨🇮',
    bio: "Entre les ateliers de la Canebière et les teinturières d'Abobo, Éléonore interroge ce que les femmes portent sans jamais l'avoir choisi.",
    photoUrl: '/assets/protagonists/eleonore-vance.jpg',
    universeTag: 'Beyond Eve',
    quote: "« On hérite de silences aussi lourds que des pierres. Mon travail est de les défaire brin par brin pour en faire une voile. »",
    treeData: {
      transmissions: [
        { id: 't-7', title: 'Le pagne kita de ma grand-mère Akissi', ancestorOrMentor: 'Akissi Vance', description: "L'art de lire les motifs de royauté qui n'étaient jamais prononcés à voix haute." }
      ],
      duos: [
        { id: 'duo-3-bis', partnerName: 'Malik Diop', partnerRole: 'Chorégraphe', partnerPhoto: '/assets/protagonists/malik-diop.jpg', duoId: 'duo-blacks-one-beyond-eve-01', question: "03 — Ce que l'on Porte : Récits cousus dans la chair" }
      ],
      opportunities: [
        { id: 'o-7', title: 'Mentorat artistique pour femmes plasticiennes', description: 'Accompagnement annuel de 3 jeunes diplômées dans la structuration de leur démarche.', badge: 'Mentorat' }
      ],
      creations: [
        { id: 'c-7', title: "« Les Noms Oubliés »", type: 'Œuvre textile', description: 'Fresque de 4 mètres de haut brodée à la main avec les noms des aïeules disparues.' }
      ],
      projects: [
        { id: 'p-6', title: 'La Maison Beyond Eve Marseille', stage: 'Recherche de lieu pérenne', description: "Un atelier partagé réunissant des artisanes de la Méditerranée et d'Afrique de l'Ouest." }
      ],
      needs: [
        { id: 'n-6', title: 'Métier à tisser horizontal grand format', urgency: 'En cours', description: "Recherche d'un artisan menuisier pour concevoir un métier adapté aux pièces de 5 mètres." }
      ]
    },
    stories: [
      {
        id: 'story-eleonore-01',
        title: "Le coffre de fer d'Abidjan",
        questionNumber: '03',
        questionTitle: "Ce que l'on Porte",
        duration: '11:45',
        videoDurationSeconds: 705,
        summary: "À la mort de sa mère, Éléonore a ouvert la vieille malle en fer blanc conservée sous le lit.",
        videoCoverUrl: '/assets/protagonists/eleonore-vance.jpg',
        credits: [
          { role: 'story_owner', label: "Propriétaire de l'histoire", name: 'Éléonore Vance' },
          { role: 'director', label: 'Réalisatrice', name: 'Kadiatou Bocoum' }
        ]
      }
    ]
  },
  {
    id: 'chef-koffi',
    slug: 'chef-koffi',
    documentaryId: 'dixeat-fiat-luxe',
    name: 'Chef Koffi Mensah',
    age: 44,
    role: 'Artisan cuisinier de rue & chercheur de goûts',
    territory: 'Cotonou (Dantokpa)',
    country: 'Bénin',
    flag: '🇧🇯',
    bio: "Au cœur du grand marché de Dantokpa, Koffi cuisine depuis l'aube sur des réchauds à braises.",
    photoUrl: '/assets/protagonists/chef-koffi.jpg',
    universeTag: 'Dixeat',
    quote: "« La cuisine n'a pas besoin d'étoiles : elle a besoin de bras qui n'ont pas peur de la fumée et d'un cœur qui veut rassasier l'âme. »",
    treeData: {
      transmissions: [
        { id: 't-8', title: 'Le secret du piment noir confit', ancestorOrMentor: 'Sa tante Da Tété', description: 'La cuisson lente au feu de coque de coco qui donne cette rondeur fumée incomparable.' }
      ],
      duos: [
        { id: 'duo-4', partnerName: "Hélène de Saint-Amand", partnerRole: "Maître d'hôtel & scénographe sensorielle", partnerPhoto: '/assets/protagonists/helene-saint-amand.jpg', duoId: 'duo-dixeat-fiat-luxe-01', question: "01 — Le Goût : Quand l'émotion traverse la première bouchée" }
      ],
      opportunities: [
        { id: 'o-8', title: 'Formation gratuite des jeunes du quartier aux bases culinaires', description: 'Chaque semestre, Koffi prend 3 apprentis sans qualification.', badge: 'Apprentissage solidaire' }
      ],
      creations: [
        { id: 'c-8', title: "Pâte d'épices de brousse en pots de terre cuite", type: 'Condiment signature', description: 'Mélange fermenté de graines de néré, piment doux et sel de lagune séché au soleil.' }
      ],
      projects: [
        { id: 'p-7', title: 'La Cantine Populaire Zéro Déchet de Dantokpa', stage: 'Recherche de matériel inox', description: 'Créer un point de distribution alimentaire pour les portefaix du marché.' }
      ],
      needs: [
        { id: 'n-7', title: 'Fours à basse consommation de bois', urgency: 'Prioritaire', description: 'Remplacer les foyers ouverts pour préserver la santé pulmonaire des cuisinières.' }
      ]
    },
    stories: [
      {
        id: 'story-koffi-01',
        title: "Le bol d'igname au milieu de l'orage",
        questionNumber: '01',
        questionTitle: 'Le Goût',
        duration: '08:52',
        videoDurationSeconds: 532,
        summary: "Koffi raconte ce soir de déluge où un voyageur sans le sou, trempé jusqu'aux os, s'est effondré en larmes devant sa marmite fumante.",
        videoCoverUrl: '/assets/protagonists/chef-koffi.jpg',
        credits: [
          { role: 'story_owner', label: "Propriétaire de l'histoire", name: 'Chef Koffi Mensah' },
          { role: 'director', label: 'Réalisateur', name: 'Adrien Vasseur' }
        ]
      }
    ]
  },
  {
    id: 'helene-saint-amand',
    slug: 'helene-saint-amand',
    documentaryId: 'dixeat-fiat-luxe',
    name: 'Hélène de Saint-Amand',
    age: 52,
    role: "Maître d'hôtel, scénographe de table & créatrice d'expériences",
    territory: 'Paris / Marrakech',
    country: 'France',
    flag: '🇫🇷',
    bio: "Passée par les palaces parisiens et les riads d'exception de Marrakech, Hélène conçoit l'hospitalité comme une dramaturgie invisible.",
    photoUrl: '/assets/protagonists/helene-saint-amand.jpg',
    universeTag: 'Fiat Luxe',
    quote: "« Le luxe n'est pas ce qui brille : c'est l'attention totale portée à l'instant où quelqu'un pose enfin son fardeau pour se laisser nourrir. »",
    treeData: {
      transmissions: [
        { id: 't-9', title: "L'art du pas feutré et du regard périphérique", ancestorOrMentor: "Monsieur François, Premier Maître d'Hôtel au Ritz (1975)", description: "Devancer le désir d'un convive sans jamais imposer sa présence physique." }
      ],
      duos: [
        { id: 'duo-4-bis', partnerName: 'Chef Koffi Mensah', partnerRole: 'Cuisinier de rue', partnerPhoto: '/assets/protagonists/chef-koffi.jpg', duoId: 'duo-dixeat-fiat-luxe-01', question: "01 — Le Goût : Deux artisans de l'instant précieux" }
      ],
      opportunities: [
        { id: 'o-9', title: 'Masterclass sur la mémoire olfactive et la réception', description: "Sessions trimestrielles pour jeunes professionnels de l'hôtellerie d'art.", badge: 'Masterclass' }
      ],
      creations: [
        { id: 'c-9', title: "« Larmes d\'Atlas »", type: 'Art de la table', description: 'Série limitée conçue avec les maîtres verriers de Marrakech.' }
      ],
      projects: [
        { id: 'p-8', title: 'Le Dîner Silencieux au Jardin Majorelle', stage: 'Production en cours', description: 'Une expérience gastronomique nocturne où les convives dégustent sans un mot.' }
      ],
      needs: [
        { id: 'n-8', title: 'Sourcing de lin brut biologique non blanchi', urgency: 'En cours', description: "Trouver une filature artisanale respectant le cycle végétal sans apprêt chimique." }
      ]
    },
    stories: [
      {
        id: 'story-helene-01',
        title: "Le verre d'eau offert sans un mot",
        questionNumber: '01',
        questionTitle: 'Le Goût',
        duration: '10:48',
        videoDurationSeconds: 648,
        summary: "Hélène se souvient d'un grand dîner d'État où le geste le plus marquant ne fut pas le caviar servi, mais une simple coupe d'eau de source tiède.",
        videoCoverUrl: '/assets/protagonists/helene-saint-amand.jpg',
        credits: [
          { role: 'story_owner', label: "Propriétaire de l'histoire", name: 'Hélène de Saint-Amand' },
          { role: 'director', label: 'Réalisateur', name: 'Adrien Vasseur' }
        ]
      }
    ]
  },
  {
    id: 'fatou-diallo',
    slug: 'fatou-diallo',
    documentaryId: 'investors-builders',
    name: 'Fatou Diallo',
    age: 42,
    role: 'Investisseuse à impact & mécène',
    territory: 'Dakar & Paris',
    country: 'Sénégal',
    flag: '🇸🇳',
    bio: "Pionnière de l'investissement à impact, Fatou finance des ateliers artisanaux, des coopératives agricoles et des infrastructures régénératrices à travers l'Afrique de l'Ouest.",
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    universeTag: 'Investors',
    quote: "« Investir, ce n'est pas acheter l'avenir, c'est donner les moyens au présent de s'enraciner. »",
    treeData: {
      transmissions: [
        { id: 't-fatou-1', title: 'Le discernement du capital patient', ancestorOrMentor: 'Amadou Kane, mentor en microfinance rurale', description: 'Savoir attendre sept récoltes avant de juger de la fécondité d\'une semence économique.' }
      ],
      duos: [
        { id: 'duo-fatou-kwame-ref', partnerName: 'Kwame', partnerRole: 'Éco-constructeur & bâtisseur de terre', partnerPhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80', duoId: 'duo-investors-builders-01', question: "« Que vaut le capital sans la sueur de celui qui bâtit ? »" }
      ],
      creations: [
        { id: 'c-fatou-1', title: 'Fonds d\'Amorçage Terres Fertiles', type: 'Dotation solidaire', description: 'Financement patient pour les chantiers de construction en terre crue et matériaux biosourcés.' }
      ],
      projects: [
        { id: 'p-fatou-1', title: 'Manufacture Sahélienne de Briques de Terre Compressée', stage: 'En chantier (68%)', description: 'Production locale de matériaux décarbonés pour l\'habitat populaire.' }
      ],
      opportunities: [
        { id: 'o-fatou-1', title: 'Appel à projets Bâtisseurs Régénératifs', description: 'Dotation d\'amorçage jusqu\'à 50 000 € pour les coopératives d\'éco-matériaux.', badge: 'Candidatures ouvertes' }
      ],
      needs: [
        { id: 'n-fatou-1', title: 'Experts en certification thermique des terres locales', urgency: 'Prioritaire', description: 'Recherche de laboratoires partenaires pour homologuer les blocs de latérite et pisé.' }
      ]
    },
    stories: [
      {
        id: 'story-fatou-01',
        title: 'Le premier chèque signé sur une table de chantier',
        questionNumber: '01',
        questionTitle: 'Le Pari Fondateur',
        duration: '08:15',
        videoDurationSeconds: 495,
        summary: 'Fatou raconte le jour où elle a décidé de risquer ses premières économies pour soutenir un atelier de menuiserie villageois.',
        videoCoverUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
        credits: [
          { role: 'story_owner', label: "Propriétaire de l'histoire", name: 'Fatou Diallo' }
        ]
      }
    ]
  },
  {
    id: 'kwame-mensah',
    slug: 'kwame-mensah',
    documentaryId: 'investors-builders',
    name: 'Kwame Mensah',
    age: 38,
    role: 'Éco-constructeur & bâtisseur de terre',
    territory: 'Cotonou & Kigali',
    country: 'Bénin',
    flag: '🇧🇯',
    bio: "Ingénieur et artisan de la terre crue, Kwame réinvente les techniques ancestrales de construction pour bâtir des cités fraîches, durables et accessibles à tous.",
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    universeTag: 'Builders',
    quote: "« La terre ne ment pas. Elle ne demande qu'un toit pour la protéger et une main pour la tasser. »",
    treeData: {
      transmissions: [
        { id: 't-kwame-1', title: "L'art du pisé sans adjuvant chimique", ancestorOrMentor: 'Maître Kofi, artisan de la terre', description: 'Savoir doser l\'argile et le sable par le toucher et le séchage au soleil levant.' }
      ],
      duos: [
        { id: 'duo-kwame-fatou-ref', partnerName: 'Fatou', partnerRole: 'Investisseuse à impact & mécène', partnerPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80', duoId: 'duo-investors-builders-01', question: "« Que vaut le capital sans la sueur de celui qui bâtit ? »" }
      ],
      creations: [
        { id: 'c-kwame-1', title: 'Briques de terre compressée stabilisée (BTC)', type: 'Matériau éco-conçu', description: 'Blocs porteurs régulateurs thermiques pour constructions bioclimatiques.' }
      ],
      projects: [
        { id: 'p-kwame-1', title: "Écocentre d'Apprentissage de Ouidah", stage: 'En cours (82%)', description: 'Complexe de formation aux métiers de la terre crue et du bambou.' }
      ],
      opportunities: [
        { id: 'o-kwame-1', title: "Chantier-école Voûtes & Pisé d'Afrique de l'Ouest", description: 'Session de formation pratique de 4 semaines ouverte à 15 apprentis maçons.', badge: 'Inscriptions ouvertes' }
      ],
      needs: [
        { id: 'n-kwame-1', title: 'Presse hydraulique manuelle pour briques de terre compressée', urgency: 'Immédiat', description: 'Acquisition d\'une seconde presse pour doubler la cadence du chantier de Ouidah.' }
      ]
    },
    stories: [
      {
        id: 'story-kwame-01',
        title: 'Quand le mur a tenu la première mousson',
        questionNumber: '01',
        questionTitle: 'Le Pari Fondateur',
        duration: '09:20',
        videoDurationSeconds: 560,
        summary: "Kwame relate l'angoisse de sa première voûte nubienne inaugurée la veille d'une tornade tropicale, et la fierté de voir la bâtisse intacte au matin.",
        videoCoverUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
        credits: [
          { role: 'story_owner', label: "Propriétaire de l'histoire", name: 'Kwame Mensah' }
        ]
      }
    ]
  },
];

// =========================================
// DONNÉES DUOS
// =========================================
const DUOS = [
  {
    id: 'duo-koffi-amara',
    slug: 'duo-koffi-amara',
    documentaryId: 'finagnon-qosqorico',
    documentaryTitle: 'Finagnon <> Qosqorico',
    episodeNumber: 'ÉPISODE 02',
    protagonistAId: 'koffi-tisserand',
    protagonistBId: 'amara-tisserande',
    questionNumber: '02',
    questionTitle: 'Le Geste Ancestral',
    centralQuestion: "« Que transmet une main qui tisse depuis toujours ? »",
    quoteA: "« Le tissage est une langue qu'on apprend sans parler. Ses étoffes racontent les marchés et les rites de la côte. »",
    quoteB: "« Chaque fil garde la mémoire de la montagne. Tisserande des hauteurs de Cusco, je travaille la laine et les teintes végétales. »",
    coverImage: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1600&q=80',
    editorialReflection: "De Porto-Novo à la Vallée Sacrée de Cusco, le métier à tisser n'est pas un outil de confection : c'est une prière muette où les mains nouent la mémoire des ancêtres pour habiller les vivants.",
    durationSeconds: 90,
  },
  {
    id: 'duo-jesus-legba-01',
    slug: 'duo-jesus-legba-01',
    documentaryId: 'jesus-legba',
    documentaryTitle: 'Jésus <> Èṣù',
    episodeNumber: 'ÉPISODE 01',
    protagonistAId: 'pere-matthieu',
    protagonistBId: 'dah-zounon',
    questionNumber: '01',
    questionTitle: 'La Rencontre',
    centralQuestion: "Racontez-nous un moment de votre vie où vous avez réellement rencontré votre foi. Que s'est-il passé ?",
    quoteA: "« Je suis entré dans la nef déserte de Ouidah pour fuir la brûlure du soleil. Ce n'est pas un miracle qui m'a retenu : c'était la certitude d'être attendu. »",
    quoteB: "« Legba ne m'a pas parlé dans un coup de tonnerre. C'était la chaleur d'une poignée de terre d'Allada, un jour où je croyais que le monde était mort. »",
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80',
    editorialReflection: "Deux traditions que l'histoire a parfois opposées se découvrent ici une racine commune : l'humilité de l'homme devant ce qui le dépasse.",
    durationSeconds: 90,
  },
  {
    id: 'duo-finagnon-qosqorico-01',
    slug: 'duo-finagnon-qosqorico-01',
    documentaryId: 'finagnon-qosqorico',
    documentaryTitle: 'Finagnon <> Qosqorico',
    episodeNumber: 'ÉPISODE 01',
    protagonistAId: 'tobi-houndegla',
    protagonistBId: 'sayri-quispe',
    questionNumber: '01',
    questionTitle: 'Chez Soi',
    centralQuestion: "Racontez-nous un moment où vous avez compris que vous étiez vraiment chez vous. Où étiez-vous et que s'est-il passé ?",
    quoteA: "« Le jour où la pirogue a glissé dans la brume sans que j'aie besoin de regarder le rivage. Ganvié n'est pas sur la terre, mais elle est dans mon sang. »",
    quoteB: "« Quand les pieds nus touchent la roche glacée de Pisac à l'aube et que la montagne souffle son premier vent. Là, tu sais que tu n'es pas un étranger. »",
    coverImage: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1600&q=80',
    editorialReflection: "Des pilotis de Ganvié aux terrasses de Pisac, le chez-soi n'est pas une propriété cadastrale : c'est une fidélité organique au rythme d'un élément.",
    durationSeconds: 90,
  },
  {
    id: 'duo-blacks-one-beyond-eve-01',
    slug: 'duo-blacks-one-beyond-eve-01',
    documentaryId: 'blacks-one-beyond-eve',
    documentaryTitle: 'Blacks One <> Beyond Eve',
    episodeNumber: 'ÉPISODE 03',
    protagonistAId: 'malik-diop',
    protagonistBId: 'eleonore-vance',
    questionNumber: '03',
    questionTitle: "Ce que l'on Porte",
    centralQuestion: "Racontez-nous quelque chose que vous avez reçu de votre histoire, de votre famille ou de ceux qui vous ont précédé et que vous portez encore aujourd'hui.",
    quoteA: "« On m'a dit à Paris que ma danse était trop lourde. J'ai compris ce jour-là que cette pesanteur, c'était le sable de mes aïeux que je refusais de secouer. »",
    quoteB: "« Dans la malle de ma mère, il n'y avait aucun bijou en or, mais trois pagnes de coton usés par le travail. C'est mon manteau de reine. »",
    coverImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80',
    editorialReflection: "Ce que l'on porte n'est pas un fardeau qui alourdit le pas : c'est le fil secret qui permet de traverser l'exil sans s'égarer.",
    durationSeconds: 90,
  },
  {
    id: 'duo-dixeat-fiat-luxe-01',
    slug: 'duo-dixeat-fiat-luxe-01',
    documentaryId: 'dixeat-fiat-luxe',
    documentaryTitle: 'Dixeat <> Fiat Luxe',
    episodeNumber: 'ÉPISODE 01',
    protagonistAId: 'chef-koffi',
    protagonistBId: 'helene-saint-amand',
    questionNumber: '01',
    questionTitle: 'Le Goût',
    centralQuestion: "Racontez-nous un moment où vous avez créé quelque chose pour quelqu'un et où vous avez compris, à sa réaction, que vous lui aviez vraiment fait plaisir.",
    quoteA: "« Quand l'homme s'est assis dans la fumée et a fermé les yeux à la première cuillerée d'igname, ses larmes m'ont dit que je n'étais pas un marchand, mais un frère. »",
    quoteB: "« Ce n'est pas la coupe de cristal qui a touché cette femme, mais le fait que quelqu'un avait remarqué son angoisse et lui offrait un refuge invisible. »",
    coverImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80',
    editorialReflection: "Entre la marmite populaire et le salon d'apparat, la grandeur de l'expérience ne réside jamais dans le prix facturé, mais dans l'intensité du soin offert à l'autre.",
    durationSeconds: 90,
  },
  {
    id: 'duo-investors-builders-01',
    slug: 'duo-investors-builders-01',
    documentaryId: 'investors-builders',
    documentaryTitle: 'Investors <> Builders',
    episodeNumber: 'ÉPISODE 01',
    protagonistAId: 'fatou-diallo',
    protagonistBId: 'kwame-mensah',
    questionNumber: '01',
    questionTitle: 'Le Pari Fondateur',
    centralQuestion: "« Racontez-nous le premier pari où vous avez engagé vos ressources ou vos mains sans certitude de réussir. »",
    quoteA: "« Le jour où j'ai signé ce premier financement pour l'atelier sans garantie bancaire, j'ai compris que ma responsabilité n'était pas de me protéger, mais de faire confiance. »",
    quoteB: "« Quand la voûte en terre crue a résisté à la première tornade, j'ai su que nos mains portaient une force que nulle machine ne peut remplacer. »",
    coverImage: '/investors-builders.png',
    editorialReflection: "Entre l'encre des contrats et la poussière des chantiers, la véritable valeur ne naît pas dans le calcul du profit, mais dans l'engagement réciproque de bâtir ce qui perdure.",
    durationSeconds: 90,
  },
];

// =========================================
// CATÉGORIES EXPLORER (8 grandes portes)
// =========================================
const EXPLORER_CATEGORIES = [
  {
    id: 'series',
    label: 'Séries',
    shortLabel: 'Séries',
    tagline: 'Filiation & Arbres de Cooptation',
    description: 'Explorez les séries documentaires fondatrices et leurs 16 pionniers.',
    badge: 'Cooptation vivante',
    iconName: 'Film',
    accentColor: '#C89B3C',
    glowColor: 'rgba(200, 155, 60, 0.65)',
    bgGradient: 'from-[#D97706] via-[#92400E] to-[#451A03]',
    coverImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'countries',
    label: 'Territoires',
    shortLabel: 'Territoires',
    tagline: '16 regards humains enracinés dans leur terre',
    description: 'Explorez un terroir du monde : 16 bâtisseurs, paysans, créateurs et pêcheurs racontent leur mémoire vivante.',
    badge: '16 terroirs du monde',
    iconName: 'Mountain',
    accentColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.65)',
    bgGradient: 'from-[#10B981] via-[#047857] to-[#064E3B]',
    coverImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'questions',
    label: 'Mémoires',
    shortLabel: 'Mémoires',
    tagline: 'Récits vrais, transmission et mémoire vive',
    description: 'Les grandes mémoires et interrogations universelles, racontées à travers des moments vécus par 16 voix de tous horizons.',
    badge: '16 mémoires universelles',
    iconName: 'Atom',
    accentColor: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.65)',
    bgGradient: 'from-[#A855F7] via-[#7E22CE] to-[#3B0764]',
    coverImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'thematics',
    label: 'Expertises',
    shortLabel: 'Expertises',
    tagline: "Maîtres d'art, savoir-faire d'exception & expertises vivantes",
    description: "Des praticiens d'exception, artisans d'art, maîtres et créateurs détenant une haute expertise prêts à collaborer ou transmettre.",
    badge: 'Expertises & Savoir-faire',
    iconName: 'GraduationCap',
    accentColor: '#0EA5E9',
    glowColor: 'rgba(14, 165, 233, 0.65)',
    bgGradient: 'from-[#0EA5E9] via-[#0369A1] to-[#082F49]',
    coverImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'personalities',
    label: 'Personnalités',
    shortLabel: 'Personnalités',
    tagline: 'Grandes figures racontées par 16 regards',
    description: 'Une grande figure racontée par 16 personnes qui ont une histoire intime liée à son parcours.',
    badge: '16 figures phares',
    iconName: 'Star',
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.65)',
    bgGradient: 'from-[#F59E0B] via-[#B45309] to-[#78350F]',
    coverImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'brands',
    label: 'Marques',
    shortLabel: 'Marques',
    tagline: "Artisans, Bâtisseurs & Maisons d'exception",
    description: "Découvrez une marque ou une maison par ceux qui la font ou la vivent.",
    badge: '16 marques iconiques',
    iconName: 'Gem',
    accentColor: '#FB923C',
    glowColor: 'rgba(251, 146, 60, 0.65)',
    bgGradient: 'from-[#FB923C] via-[#C2410C] to-[#431407]',
    coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'projects',
    label: 'Projets',
    shortLabel: 'Projets',
    tagline: 'Forêts sacrées, Écoles nomades...',
    description: 'Rencontrez 16 bâtisseurs de terrain engagés dans des causes vivantes.',
    badge: '16 chantiers vivants',
    iconName: 'Sprout',
    accentColor: '#EC4899',
    glowColor: 'rgba(236, 72, 153, 0.65)',
    bgGradient: 'from-[#EC4899] via-[#BE185D] to-[#500724]',
    coverImage: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'offers',
    label: 'Offres',
    shortLabel: 'Offres',
    tagline: 'Masterclasses, Ateliers & Transmissions concrètes',
    description: 'Accédez à des transmissions concrètes : stages de tissage royal, ateliers de respiration, compagnonnages en forge.',
    badge: '16 offres concrètes',
    iconName: 'ShoppingBag',
    accentColor: '#6366F1',
    glowColor: 'rgba(99, 102, 241, 0.65)',
    bgGradient: 'from-[#6366F1] via-[#4338CA] to-[#1E1B4B]',
    coverImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
  },
];

// =========================================
// SUJETS EXPLORER (topics par catégorie)
// Subset représentatif de explorerTopicsData.ts
// =========================================
const EXPLORER_TOPICS = [
  // --- SERIES ---
  { id: 'jesus-legba', category: 'series', title: 'Jésus <> Èṣù', subtitle: 'Deux traditions. Une même question de foi.', question: "Qu'est-ce qui dans votre foi la plus intime vous relie à ce qui vous dépasse ?", photoUrl: '/assets/posters/jesus-esu.png', badge: '16 pionniers cooptés' },
  { id: 'finagnon-qosqorico', category: 'series', title: 'Finagnon <> Qosqorico', subtitle: 'Bénin <> Pérou. Deux territoires.', question: 'Quel est ce lien invisible et indestructible qui vous unit charnellement à la terre de vos ancêtres ?', photoUrl: '/assets/posters/finagnon-qosqorico.png', badge: '16 pionniers cooptés' },
  { id: 'blacks-one-beyond-eve', category: 'series', title: 'Blacks One <> Beyond Eve', subtitle: 'La mémoire originelle, la sororité et la diaspora.', question: 'Quelle blessure ou fierté héritée de vos mères portez-vous comme un flambeau dans votre existence ?', photoUrl: '/assets/posters/blacks-one-beyond-eve.png', badge: '16 pionniers cooptés' },
  { id: 'dixeat-fiat-luxe', category: 'series', title: 'Dixeat <> Fiat Luxe', subtitle: "Quand la matière brute devient or, goût et lumière.", question: 'À quel instant précis avez-vous compris que transformer la matière brute était un acte de pure alchimie spirituelle ?', photoUrl: '/assets/posters/dixeat-fiat-luxe.png', badge: '16 pionniers cooptés' },
  { id: 'investors-builders', category: 'series', title: 'Investors <> Builders', subtitle: 'Bâtir pour mille ans sans détruire le vivant.', question: "Que bâtissez-vous aujourd'hui qui restera debout et fécondera la vie dans mille ans ?", photoUrl: '/assets/posters/investors-builders.png', badge: '16 pionniers cooptés' },
  // --- COUNTRIES ---
  { id: 'benin', category: 'countries', title: 'Bénin', subtitle: 'Berceau du Vodoun, cité lacustre & bronze royal', flag: '🇧🇯', photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80', badge: '16 voix béninoises' },
  { id: 'perou', category: 'countries', title: 'Pérou', subtitle: 'Vallée Sacrée des Incas & tissages des cimes', flag: '🇵🇪', photoUrl: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=400&q=80', badge: '16 voix péruviennes' },
  { id: 'japon', category: 'countries', title: 'Japon', subtitle: 'Maîtres du bois, temple de cyprès & thé vert', flag: '🇯🇵', photoUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80', badge: '16 voix japonaises' },
  { id: 'senegal', category: 'countries', title: 'Sénégal', subtitle: 'Teranga, estuaires de pêcheurs & parole griot', flag: '🇸🇳', photoUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80', badge: '16 voix sénégalaises' },
  { id: 'france', category: 'countries', title: 'France', subtitle: 'Compagnons de pierre, vignobles & verriers', flag: '🇫🇷', photoUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80', badge: '16 voix françaises' },
  { id: 'bresil', category: 'countries', title: 'Brésil', subtitle: "Gardiens d'Amazonie, berimbau & terre rouge", flag: '🇧🇷', photoUrl: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=400&q=80', badge: '16 voix brésiliennes' },
  { id: 'mali', category: 'countries', title: 'Mali', subtitle: 'Falaises de Bandiagara, banco & cordes de kora', flag: '🇲🇱', photoUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=400&q=80', badge: '16 voix maliennes' },
  { id: 'colombie', category: 'countries', title: 'Colombie', subtitle: 'Sierra Nevada des Kogis & café d\'altitude', flag: '🇨🇴', photoUrl: 'https://images.unsplash.com/photo-1583531352515-8884af319dc1?auto=format&fit=crop&w=400&q=80', badge: '16 voix colombiennes' },
  { id: 'maroc', category: 'countries', title: 'Maroc', subtitle: "Médinas d'argile, arganiers & zelliges bleus", flag: '🇲🇦', photoUrl: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=400&q=80', badge: '16 voix marocaines' },
  { id: 'inde', category: 'countries', title: 'Inde', subtitle: 'Ghats de Bénarès, épices & soies tissées main', flag: '🇮🇳', photoUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=400&q=80', badge: '16 voix indiennes' },
  { id: 'islande', category: 'countries', title: 'Islande', subtitle: 'Sources chaudes, lave noire & sagas nordiques', flag: '🇮🇸', photoUrl: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=400&q=80', badge: '16 voix islandaises' },
  { id: 'cuba', category: 'countries', title: 'Cuba', subtitle: 'Rumba de patio, herboristes & tabac roulé', flag: '🇨🇺', photoUrl: 'https://images.unsplash.com/photo-1500759285222-a95626b934cb?auto=format&fit=crop&w=400&q=80', badge: '16 voix cubaines' },
  { id: 'canada', category: 'countries', title: 'Canada', subtitle: "Forêts boréales, canoë d'écorce & Inuits", flag: '🇨🇦', photoUrl: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=400&q=80', badge: '16 voix canadiennes' },
  { id: 'mexique', category: 'countries', title: 'Mexique', subtitle: "Maïs sacré d'Oaxaca, copal & céramique noire", flag: '🇲🇽', photoUrl: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=400&q=80', badge: '16 voix mexicaines' },
  { id: 'cote-divoire', category: 'countries', title: "Côte d'Ivoire", subtitle: 'Masques sacrés Dan, cacao paysan & lagunes', flag: '🇨🇮', photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80', badge: '16 voix ivoiriennes' },
  { id: 'portugal', category: 'countries', title: 'Portugal', subtitle: "Chênes-lièges d'Alentejo, azulejos & pêcheurs", flag: '🇵🇹', photoUrl: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=400&q=80', badge: '16 voix portugaises' },
  // --- THEMATICS ---
  { id: 'ebenisterie-bois', category: 'thematics', title: 'Ébénisterie & Travail du Bois', subtitle: "Artisans et compagnons en quête d'ateliers ou de chantiers d'exception", photoUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=400&q=80', badge: '16 talents en recherche' },
  { id: 'agroecologie-sol', category: 'thematics', title: 'Agroécologie & Maraîchage Vivant', subtitle: 'Praticiens des sols vivants en recherche de terres ou exploitations partenaires', photoUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80', badge: '16 talents en recherche' },
  { id: 'tissage-couture', category: 'thematics', title: "Tissage d'Art & Stylisme Végétal", subtitle: 'Créatrices textiles cherchant des résidences, ateliers ou collaborations couture', photoUrl: 'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=400&q=80', badge: '16 talents en recherche' },
  { id: 'ferronnerie-forge', category: 'thematics', title: 'Ferronnerie & Forge Ancestrale', subtitle: 'Forgerons et maîtres du métal en quête de compagnonnage et grands chantiers', photoUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80', badge: '16 talents en recherche' },
  { id: 'charpente-marine', category: 'thematics', title: 'Piroguerie & Pêche Durable', subtitle: 'Marins et charpentiers navals cherchant équipages, cales et coopératives', photoUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=400&q=80', badge: '16 talents en recherche' },
  { id: 'maconnerie-terre', category: 'thematics', title: 'Éco-construction en Terre Crue', subtitle: "Bâtisseurs en terre, chaux et paille cherchant projets d'habitats écologiques", photoUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80', badge: '16 talents en recherche' },
  { id: 'audiovisuel-image', category: 'thematics', title: 'Audiovisuel & Documentaire', subtitle: 'Cadreurs, monteurs et preneurs de son cherchant productions indépendantes', photoUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=400&q=80', badge: '16 talents en recherche' },
  { id: 'cuisine-fermentation', category: 'thematics', title: 'Cuisine Sauvage & Fermentation', subtitle: "Cuisiniers du vivant cherchant tables d'hôtes, auberges ou résidences culinaires", photoUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80', badge: '16 talents en recherche' },
  { id: 'apiculture-naturelle', category: 'thematics', title: 'Apiculture Naturelle & Ruches', subtitle: 'Apiculteurs respectueux cherchant domaines mellifères et conservatoires', photoUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&q=80', badge: '16 talents en recherche' },
  { id: 'herboristerie-plantes', category: 'thematics', title: 'Plantes Médicinales & Simples', subtitle: "Cueilleurs et transformateurs cherchant coopératives et laboratoires d'herboristerie", photoUrl: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=400&q=80', badge: '16 talents en recherche' },
  { id: 'massage-somatic', category: 'thematics', title: 'Soins du Corps & Massothérapie', subtitle: 'Praticiens corporels cherchant espaces de soins partagés et centres bien-être', photoUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80', badge: '16 talents en recherche' },
  { id: 'ceramique-poterie', category: 'thematics', title: "Céramique & Tournage d'Art", subtitle: "Céramistes cherchant résidences de poterie, fours collectifs et boutiques d'art", photoUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=400&q=80', badge: '16 talents en recherche' },
  { id: 'musique-son', category: 'thematics', title: 'Musique Vivante & Sonothérapie', subtitle: 'Musiciens et concepteurs sonores en quête de collaborations et projets scéniques', photoUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80', badge: '16 talents en recherche' },
  { id: 'maroquinerie-cuir', category: 'thematics', title: "Maroquinerie & Sellerie d'Art", subtitle: "Artisans du cuir formés cherchant maisons de création et ateliers d'excellence", photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80', badge: '16 talents en recherche' },
  { id: 'calligraphie-lettre', category: 'thematics', title: 'Calligraphie & Lettres Peintes', subtitle: 'Enlumineurs et peintres en lettres cherchant commandes éditoriales et fresques', photoUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80', badge: '16 talents en recherche' },
  { id: 'education-nature', category: 'thematics', title: 'Pédagogie de la Nature & Éducation', subtitle: "Éducateurs de terrain cherchant éco-écoles, fermes pédagogiques et associations", photoUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=400&q=80', badge: '16 talents en recherche' },
  // --- PERSONALITIES ---
  { id: 'michael-jackson', category: 'personalities', title: 'Michael Jackson', subtitle: 'Le Roi de la Pop, la danse universelle & la grâce', photoUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=400&q=80', badge: '16 récits vécus' },
  { id: 'michael-jordan', category: 'personalities', title: 'Michael Jordan', subtitle: "Le vol suspendu, l'obsession de vaincre & le mental", photoUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=400&q=80', badge: '16 récits vécus' },
  { id: 'kylian-mbappe', category: 'personalities', title: 'Kylian Mbappé', subtitle: "L'accélération pure, Bondy & la nouvelle jeunesse", photoUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=400&q=80', badge: '16 récits vécus' },
  { id: 'wangari-maathai', category: 'personalities', title: 'Wangari Maathai', subtitle: "La femme qui plantait des millions d'arbres", photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80', badge: '16 récits vécus' },
  { id: 'miles-davis', category: 'personalities', title: 'Miles Davis', subtitle: 'La trompette feutrée et le refus de se répéter', photoUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=400&q=80', badge: '16 récits vécus' },
  { id: 'frida-kahlo', category: 'personalities', title: 'Frida Kahlo', subtitle: 'La douleur transcendée par les couleurs de la terre', photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80', badge: '16 récits vécus' },
  { id: 'nelson-mandela', category: 'personalities', title: 'Nelson Mandela', subtitle: '27 ans de geôle pour apprendre la réconciliation', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', badge: '16 récits vécus' },
  { id: 'bob-marley', category: 'personalities', title: 'Bob Marley', subtitle: 'One Love : la prophétie universelle du reggae', photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80', badge: '16 récits vécus' },
  { id: 'leonard-de-vinci', category: 'personalities', title: 'Léonard de Vinci', subtitle: "L'art d'observer l'eau, les oiseaux et le divin", photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80', badge: '16 récits vécus' },
  { id: 'marie-curie', category: 'personalities', title: 'Marie Curie', subtitle: 'Le rayonnement dans la nuit et la rigueur scientifique', photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80', badge: '16 récits vécus' },
  { id: 'ayrton-senna', category: 'personalities', title: 'Ayrton Senna', subtitle: 'La vitesse sous la pluie et la quête mystique', photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80', badge: '16 récits vécus' },
  { id: 'nina-simone', category: 'personalities', title: 'Nina Simone', subtitle: "La voix grave qui refusa de se taire face à l'injustice", photoUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80', badge: '16 récits vécus' },
  { id: 'steve-jobs', category: 'personalities', title: 'Steve Jobs', subtitle: 'Le minimalisme zen et la typographie dans la machine', photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80', badge: '16 récits vécus' },
  { id: 'serena-williams', category: 'personalities', title: 'Serena Williams', subtitle: 'La frappe royale et la grandeur d\'une reine du court', photoUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80', badge: '16 récits vécus' },
  { id: 'aime-cesaire', category: 'personalities', title: 'Aimé Césaire', subtitle: 'La parole volcanique pour réveiller la négritude', photoUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80', badge: '16 récits vécus' },
  { id: 'hayao-miyazaki', category: 'personalities', title: 'Hayao Miyazaki', subtitle: "L'âme des vents, des dieux-arbres et de l'enfance", photoUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=400&q=80', badge: '16 récits vécus' },
  // --- BRANDS ---
  { id: 'nike', category: 'brands', title: 'Nike', subtitle: 'De la semelle gaufrée aux terrains de bitume mondiaux', photoUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80', badge: '16 récits de terrain' },
  { id: 'louis-vuitton', category: 'brands', title: 'Louis Vuitton', subtitle: "La malle de voyage, l'atelier d'Asnières & le geste maroquinier", photoUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=400&q=80', badge: "16 récits d'artisans" },
  { id: 'patagonia', category: 'brands', title: 'Patagonia', subtitle: "Réparer au lieu de jeter : la terre est notre seule actionnaire", photoUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=400&q=80', badge: '16 récits engagés' },
  { id: 'apple', category: 'brands', title: 'Apple', subtitle: "L'outil pour les rebelles, les poètes et les artisans du code", photoUrl: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=400&q=80', badge: '16 récits créatifs' },
  { id: 'hermes', category: 'brands', title: 'Hermès', subtitle: 'Le point sellier à deux aiguilles et la noblesse du cuir', photoUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80', badge: "16 récits d'orfèvres" },
  { id: 'tesla', category: 'brands', title: 'Tesla', subtitle: "L'électron, la batterie géante et le rêve d'indépendance", photoUrl: 'https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&w=400&q=80', badge: '16 récits pionniers' },
  { id: 'moleskine', category: 'brands', title: 'Moleskine', subtitle: 'Le carnet noir des écrivains, esquisseurs et vagabonds', photoUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80', badge: '16 récits intimes' },
  { id: 'fondation-zinsou', category: 'brands', title: 'Fondation Zinsou', subtitle: "L'art africain contemporain ouvert et gratuit pour tous", photoUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80', badge: '16 voix du musée vivant' },
  { id: 'veja', category: 'brands', title: 'Veja', subtitle: "Le caoutchouc sauvage d'Acre et le coton biologique", photoUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80', badge: '16 voix de la forêt' },
  { id: 'lego', category: 'brands', title: 'LEGO', subtitle: "L'architecture modulaire de l'enfance qui réveille les créateurs", photoUrl: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=400&q=80', badge: '16 voix de bâtisseurs' },
  { id: 'polaroid', category: 'brands', title: 'Polaroid', subtitle: "L'alchimie chimique de la photo instantanée sous les yeux", photoUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=80', badge: "16 voix de l'image" },
  { id: 'spotify', category: 'brands', title: 'Spotify', subtitle: 'La bibliothèque musicale planétaire au creux de l\'oreille', photoUrl: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?auto=format&fit=crop&w=400&q=80', badge: '16 voix du son' },
  { id: 'michelin', category: 'brands', title: 'Michelin', subtitle: "La carte des terroirs, la route et l'exigence de l'artisanat", photoUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=400&q=80', badge: '16 voix de la route' },
  { id: 'yamaha', category: 'brands', title: 'Yamaha', subtitle: 'Des trois diapasons sur les pianos aux moteurs de traverse', photoUrl: 'https://images.unsplash.com/photo-1520523839898-507125cd53c1?auto=format&fit=crop&w=400&q=80', badge: "16 voix d'instruments" },
  { id: 'chanel', category: 'brands', title: 'Chanel', subtitle: 'Libérer le corps de la femme et distiller le jasmin de Grasse', photoUrl: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=400&q=80', badge: "16 voix d'ateliers" },
  { id: 'airbnb', category: 'brands', title: 'Airbnb', subtitle: "L'hospitalité partagée : ouvrir sa porte à l'inconnu du monde", photoUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=400&q=80', badge: "16 récits d'hôtes" },
  // --- PROJECTS ---
  { id: 'foret-ouidah', category: 'projects', title: 'Forêt Sacrée de Ouidah', subtitle: 'Régénération des arbres tutélaires et sanctuaire de Kpassè', flag: '🇧🇯', photoUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80', badge: '16 gardiens du bois' },
  { id: 'ecoles-andes', category: 'projects', title: 'Écoles Tissées des Andes', subtitle: 'Sauvegarder les mathématiques du métier à tisser chez les enfants', flag: '🇵🇪', photoUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80', badge: '16 enseignants & jeunes' },
  { id: 'sauvegarde-semences', category: 'projects', title: 'Banque de Semences Paysannes', subtitle: 'Conserver 800 variétés de mil, sorgho et maïs ancien', flag: '🇸🇳', photoUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=400&q=80', badge: '16 semenciers de terre' },
  { id: 'maisons-argile', category: 'projects', title: 'Maisons en Argile du Sahel', subtitle: 'Architecture de terre crue adaptée au changement climatique', flag: '🇲🇱', photoUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80', badge: '16 bâtisseurs du vivant' },
  { id: 'recifs-corail', category: 'projects', title: 'Récifs de Corail Vivants', subtitle: 'Restauration des écosystèmes marins avec les pêcheurs gardiens', flag: '🇧🇷', photoUrl: 'https://images.unsplash.com/photo-1518467166778-b88f373ffec7?auto=format&fit=crop&w=400&q=80', badge: '16 gardiens des mers' },
  { id: 'jardins-partages-dakar', category: 'projects', title: 'Jardins Partagés de Dakar', subtitle: "Reconquête des friches urbaines par l'agroécologie participative", flag: '🇸🇳', photoUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=400&q=80', badge: '16 jardiniers urbains' },
  { id: 'bibliothèques-nomades', category: 'projects', title: 'Bibliothèques Nomades du Sahara', subtitle: 'Caravanes de livres pour les communautés isolées du désert', flag: '🇲🇦', photoUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=400&q=80', badge: '16 passeurs de savoirs' },
  { id: 'sons-traditionnels', category: 'projects', title: 'Archivage des Sons Traditionnels', subtitle: 'Numérisation de 10 000 heures de musiques menacées', flag: '🇧🇯', photoUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=400&q=80', badge: '16 musiciens archiveurs' },
  { id: 'eau-vive-atlas', category: 'projects', title: "Sources Vives de l'Atlas", subtitle: 'Restauration des khettaras et canaux ancestraux berbères', flag: '🇲🇦', photoUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=400&q=80', badge: '16 gardiens de l\'eau' },
  { id: 'ecole-pirogue', category: 'projects', title: 'École de la Pirogue Traditionnelle', subtitle: 'Transmission intergénérationnelle de la charpente navale artisanale', flag: '🇧🇯', photoUrl: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=400&q=80', badge: '16 charpentiers du bois' },
  { id: 'mur-vegetal-cotonou', category: 'projects', title: 'Murs Végétaux de Cotonou', subtitle: "Fraîcheur urbaine et purification de l'air par les plantes grimpantes", flag: '🇧🇯', photoUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=400&q=80', badge: '16 artisans du vert' },
  { id: 'sel-guerande', category: 'projects', title: 'Sel de Guérande en Péril', subtitle: 'Sauvegarder les marais salants face à la montée des eaux', flag: '🇫🇷', photoUrl: 'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?auto=format&fit=crop&w=400&q=80', badge: '16 paludiers gardiens' },
  { id: 'carbone-forestier', category: 'projects', title: 'Forêts Communautaires au Cameroun', subtitle: 'Certification carbone participative avec les peuples forestiers', flag: '🇨🇲', photoUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80', badge: '16 gardiens de la forêt' },
  { id: 'radio-sahel', category: 'projects', title: 'Radios Communautaires du Sahel', subtitle: 'Paroles paysannes et information climatique locale sur les ondes', flag: '🇲🇱', photoUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=400&q=80', badge: '16 voix de l\'antenne' },
  { id: 'fromages-fermiers', category: 'projects', title: 'Fromages Fermiers des Pyrénées', subtitle: "Résurgence des Petits Beurriers d'Ossau face à l'industrie laitière", flag: '🇫🇷', photoUrl: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=400&q=80', badge: '16 éleveurs et fromagers' },
  { id: 'tatouage-polynésien', category: 'projects', title: 'Tatouage Polynésien Sacré', subtitle: 'Restauration du tā moko māori et des identités tribales', flag: '🇳🇿', photoUrl: 'https://images.unsplash.com/photo-1547190027-9156686aa2f0?auto=format&fit=crop&w=400&q=80', badge: '16 gardiens du trait' },
  // --- OFFERS ---
  { id: 'stage-tissage-royal', category: 'offers', title: 'Stage de Tissage Royal Béninois', subtitle: 'Immersion de 3 semaines dans les ateliers de Porto-Novo', photoUrl: 'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=400&q=80', badge: 'Offre certifiée Yonywood' },
  { id: 'atelier-respiration', category: 'offers', title: 'Atelier de Respiration & Présence', subtitle: 'Techniques ancestrales de centration pour créateurs et décideurs', photoUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80', badge: 'Offre certifiée Yonywood' },
  { id: 'compagnonnage-forge', category: 'offers', title: 'Compagnonnage en Forge Artisanale', subtitle: 'Un semestre aux côtés d\'un maître forgeron de Cotonou', photoUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80', badge: 'Offre certifiée Yonywood' },
  { id: 'residence-andine', category: 'offers', title: 'Résidence Andine de Teinture Végétale', subtitle: 'Deux mois dans la Vallée Sacrée avec Amara et les tisseuses de Chinchero', photoUrl: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=400&q=80', badge: 'Résidence immersive' },
  { id: 'masterclass-hospitalite', category: 'offers', title: "Masterclass d'Hospitalité d'Exception", subtitle: "Apprendre avec Hélène de Saint-Amand l'art de la table et de la mémoire olfactive", photoUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=400&q=80', badge: 'Masterclass exclusive' },
  { id: 'initiation-vodoun', category: 'offers', title: 'Initiation aux Rituels des Seuils', subtitle: 'Un séjour de trois jours à Allada avec Dah Zounon', photoUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80', badge: 'Immersion initiatique' },
  { id: 'stage-pirogue', category: 'offers', title: 'Stage de Charpenterie de Pirogues', subtitle: 'Construire une pirogue de A à Z avec Tobi à Ganvié', photoUrl: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=400&q=80', badge: 'Savoir-faire vivant' },
  { id: 'circuit-cacao', category: 'offers', title: "Circuit Cacao de Côte d'Ivoire", subtitle: 'De la fève à la tablette : un parcours de producteur engagé', photoUrl: 'https://images.unsplash.com/photo-1542736143-29a8432162bc?auto=format&fit=crop&w=400&q=80', badge: 'Circuit de production' },
  { id: 'creation-investissement', category: 'offers', title: "Atelier Création & Investissement à Impact", subtitle: 'Un week-end avec Fatou Diallo pour aligner capital et vision', photoUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=400&q=80', badge: 'Atelier de fond' },
  { id: 'chantier-terre', category: 'offers', title: 'Chantier Participatif en Terre Crue', subtitle: 'Construire avec ses mains sous la direction de Kwame à Ouidah', photoUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80', badge: 'Chantier école' },
  { id: 'stage-photographie-documentaire', category: 'offers', title: 'Stage Photographie Documentaire Terrain', subtitle: 'Photographier les mémoires vivantes avec les réalisateurs de Yonywood', photoUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=400&q=80', badge: 'Stage professionnel' },
  { id: 'immersion-griot', category: 'offers', title: "Immersion auprès d'un Griot au Mali", subtitle: 'Cinq jours de transmission orale à Mopti avec un maître du mot', photoUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=400&q=80', badge: 'Transmission orale' },
  { id: 'cuisine-vivante', category: 'offers', title: 'Atelier Cuisine Vivante & Fermentation', subtitle: 'Cuisiner les saveurs oubliées du terroir avec Chef Koffi à Dantokpa', photoUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80', badge: 'Atelier gastronomique' },
  { id: 'danse-sabar', category: 'offers', title: 'Stage de Danse Sabar & Création', subtitle: 'Intensive de 5 jours avec Malik Diop et les danseurs de Blacks One', photoUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=400&q=80', badge: 'Stage chorégraphique' },
  { id: 'retraite-philosophique', category: 'offers', title: 'Retraite Philosophique & Contemplative', subtitle: 'Cinq jours de silence, lecture et dialogue avec le Père Matthieu à Ouidah', photoUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80', badge: 'Retraite intérieure' },
  { id: 'tapisserie-memoire', category: 'offers', title: 'Atelier Tapisserie Mémoire & Textile', subtitle: "Créer une œuvre textile sur l'héritage familial avec Éléonore Vance", photoUrl: 'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=400&q=80', badge: 'Atelier artistique' },
  // --- QUESTIONS (Mémoires) ---
  { id: 'foi-tradition', category: 'questions', title: 'La Foi & La Tradition', subtitle: 'Quand la croyance intime rencontre l\'héritage ancestral', question: 'Racontez-nous le moment où vous avez réellement rencontré votre foi. Que s\'est-il passé ?', photoUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80', badge: '16 récits de foi' },
  { id: 'territoire-appartenance', category: 'questions', title: "Territoire & Appartenance", subtitle: 'Quand le sol sous vos pieds devient votre identité', question: 'Racontez-nous un moment où vous avez compris que vous étiez vraiment chez vous.', photoUrl: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=400&q=80', badge: '16 récits de territoire' },
  { id: 'identite-devenir', category: 'questions', title: 'Identité & Devenir', subtitle: 'Le moment où vous avez découvert qui vous étiez vraiment', question: 'Racontez-nous un moment de votre vie où quelque chose vous a fait comprendre qui vous étiez vraiment.', photoUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80', badge: '16 récits d\'identité' },
  { id: 'experience-sensible', category: 'questions', title: 'L\'Expérience Sensible', subtitle: 'Quand la matière brute devient goût, lumière et souvenir', question: 'Racontez-nous un moment où vous avez créé quelque chose pour quelqu\'un et lui avez vraiment fait plaisir.', photoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80', badge: '16 récits d\'expérience' },
  { id: 'alliance-pari', category: 'questions', title: 'L\'Alliance & Le Pari', subtitle: 'Quand la confiance entre deux êtres bâtit ce qui dure', question: 'Racontez-nous le premier pari décisif où vous avez engagé vos ressources ou vos mains sans certitude de réussir.', photoUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80', badge: '16 récits de pari' },
  { id: 'transmission-geste', category: 'questions', title: 'La Transmission du Geste', subtitle: 'Quand les mains transfèrent ce que les mots ne peuvent dire', question: 'Racontez-nous une fois où vous avez transmis un geste ou un savoir sans passer par les mots.', photoUrl: 'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=400&q=80', badge: '16 récits de transmission' },
  { id: 'memoire-deuil', category: 'questions', title: 'La Mémoire & Le Deuil', subtitle: 'Ce que les disparus continuent de nous enseigner', question: 'Racontez-nous une histoire d\'un être disparu qui continue de guider vos choix aujourd\'hui.', photoUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80', badge: '16 récits de mémoire' },
  { id: 'pardon-reconciliation', category: 'questions', title: 'Le Pardon & La Réconciliation', subtitle: 'Quand l\'amour se révèle plus grand que la blessure', question: 'Racontez-nous un moment où vous avez pardonné quelqu\'un qui vous avait profondément blessé.', photoUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80', badge: '16 récits de pardon' },
  { id: 'creativite-source', category: 'questions', title: 'La Créativité & Ses Sources', subtitle: 'D\'où vient l\'élan qui pousse à créer ?', question: 'Racontez-nous le moment où vous avez compris d\'où venait votre source créatrice.', photoUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80', badge: '16 récits créatifs' },
  { id: 'courage-peur', category: 'questions', title: 'Le Courage Face à la Peur', subtitle: 'Quand l\'effroi devient le chemin vers soi-même', question: 'Racontez-nous un moment où vous avez agi malgré la peur. Comment y êtes-vous parvenu ?', photoUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=400&q=80', badge: '16 récits de courage' },
  { id: 'solitude-silence', category: 'questions', title: 'La Solitude & Le Silence', subtitle: 'Quand être seul devient la plus profonde des rencontres', question: 'Racontez-nous un moment de solitude absolue qui vous a révélé quelque chose d\'essentiel sur vous-même.', photoUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80', badge: '16 récits de silence' },
  { id: 'migration-exil', category: 'questions', title: 'La Migration & L\'Exil', subtitle: 'Quand quitter sa terre devient une forme de fidélité', question: 'Racontez-nous le départ le plus décisif de votre vie. Qu\'avez-vous emporté avec vous, invisiblement ?', photoUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=400&q=80', badge: '16 récits de départ' },
  { id: 'corps-matiere', category: 'questions', title: 'Le Corps & La Matière', subtitle: 'Quand le geste physique parle plus haut que les idées', question: 'Racontez-nous un moment où votre corps vous a appris quelque chose que votre esprit ne comprenait pas encore.', photoUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=400&q=80', badge: '16 récits du corps' },
  { id: 'enfance-heritage', category: 'questions', title: 'L\'Enfance & L\'Héritage', subtitle: 'Ce que l\'enfant que vous étiez nous dit de vous aujourd\'hui', question: 'Racontez-nous une scène de votre enfance qui explique tout de qui vous êtes devenu.', photoUrl: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=400&q=80', badge: '16 récits d\'enfance' },
  { id: 'nature-vivant', category: 'questions', title: 'La Nature & Le Vivant', subtitle: 'Quand la plante, l\'animal ou la pierre devient votre maître', question: 'Racontez-nous une rencontre avec la nature qui a changé votre façon de voir le monde.', photoUrl: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=400&q=80', badge: '16 récits du vivant' },
  { id: 'partage-don', category: 'questions', title: 'Le Partage & Le Don', subtitle: 'Quand donner sans attendre révèle votre vraie nature', question: 'Racontez-nous une fois où vous avez donné quelque chose d\'essentiel à quelqu\'un qui n\'en savait rien.', photoUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=400&q=80', badge: '16 récits de don' },
];

// =========================================
// FONCTION PRINCIPALE DE SEED
// =========================================
async function seed() {
  console.log('\n🌱 ====== YONYWOOD SEED ======');
  console.log('📡 Connexion à PostgreSQL...\n');

  try {
    await prisma.$connect();
    console.log('✅ Connexion établie\n');

    // =========================================
    // 1. NETTOYAGE (ordre respectant les FK)
    // =========================================
    console.log('🗑️  Nettoyage des données existantes...');
    await prisma.message.deleteMany();
    await prisma.messageThread.deleteMany();
    await prisma.coproductionPledge.deleteMany();
    await prisma.explorerTopic.deleteMany();
    await prisma.explorerCategory.deleteMany();
    await prisma.duo.deleteMany();
    await prisma.protagonist.deleteMany();
    await prisma.documentarySeries.deleteMany();
    await prisma.user.deleteMany();
    console.log('✅ Nettoyage terminé\n');

    // =========================================
    // 2. SÉRIES DOCUMENTAIRES
    // =========================================
    console.log(`📽️  Insertion de ${DOCUMENTARIES.length} séries documentaires...`);
    for (const doc of DOCUMENTARIES) {
      await prisma.documentarySeries.create({
        data: {
          id: doc.id,
          slug: doc.slug,
          title: doc.title,
          subtitle: doc.subtitle,
          centralQuestion: doc.centralQuestion,
          shortSynopsis: doc.shortSynopsis || null,
          description: doc.description || null,
          coverImage: doc.coverImage || null,
          posterUrl: doc.posterUrl || null,
          teaserVideoUrl: doc.teaserVideoUrl || null,
          teaserDuration: doc.teaserDuration || null,
          episodeCount: doc.episodeCount,
          protagonistsCount: doc.protagonistsCount,
          targetFunding: doc.targetFunding,
          currentFunding: doc.currentFunding,
          territories: doc.territories,
          universes: doc.universes,
          questions: doc.questions,
        },
      });
    }
    console.log(`✅ ${DOCUMENTARIES.length} séries insérées\n`);

    // =========================================
    // 3. PROTAGONISTES
    // =========================================
    console.log(`👤 Insertion de ${PROTAGONISTS.length} protagonistes...`);
    for (const p of PROTAGONISTS) {
      await prisma.protagonist.create({
        data: {
          id: p.id,
          slug: p.slug,
          documentaryId: p.documentaryId,
          name: p.name,
          age: p.age || null,
          role: p.role,
          territory: p.territory,
          country: p.country,
          flag: p.flag || null,
          bio: p.bio || null,
          photoUrl: p.photoUrl,
          universeTag: p.universeTag || null,
          quote: p.quote || null,
          treeData: p.treeData as any,
          stories: p.stories as any,
        },
      });
    }
    console.log(`✅ ${PROTAGONISTS.length} protagonistes insérés\n`);

    // =========================================
    // 4. DUOS
    // =========================================
    console.log(`🎬 Insertion de ${DUOS.length} duos...`);
    for (const duo of DUOS) {
      // Récupérer les stories des protagonistes pour les stocker dans le duo
      const protA = PROTAGONISTS.find(p => p.id === duo.protagonistAId);
      const protB = PROTAGONISTS.find(p => p.id === duo.protagonistBId);

      await prisma.duo.create({
        data: {
          id: duo.id,
          slug: duo.slug,
          documentaryId: duo.documentaryId,
          documentaryTitle: duo.documentaryTitle,
          episodeNumber: duo.episodeNumber || null,
          protagonistAId: duo.protagonistAId,
          protagonistBId: duo.protagonistBId,
          questionNumber: duo.questionNumber || null,
          questionTitle: duo.questionTitle || null,
          centralQuestion: duo.centralQuestion,
          quoteA: duo.quoteA || null,
          quoteB: duo.quoteB || null,
          coverImage: duo.coverImage || null,
          editorialReflection: duo.editorialReflection || null,
          durationSeconds: duo.durationSeconds || 90,
          storyAData: (protA?.stories?.[0] as any) || null,
          storyBData: (protB?.stories?.[0] as any) || null,
        },
      });
    }
    console.log(`✅ ${DUOS.length} duos insérés\n`);

    // =========================================
    // 5. CATÉGORIES EXPLORER
    // =========================================
    console.log(`🌐 Insertion de ${EXPLORER_CATEGORIES.length} catégories Explorer...`);
    for (const cat of EXPLORER_CATEGORIES) {
      await prisma.explorerCategory.create({
        data: cat,
      });
    }
    console.log(`✅ ${EXPLORER_CATEGORIES.length} catégories Explorer insérées\n`);

    // =========================================
    // 6. TOPICS EXPLORER
    // =========================================
    console.log(`🗂️  Insertion de ${EXPLORER_TOPICS.length} topics Explorer...`);
    for (const topic of EXPLORER_TOPICS) {
      await prisma.explorerTopic.create({
        data: {
          id: topic.id,
          category: topic.category,
          title: topic.title,
          subtitle: topic.subtitle || null,
          question: topic.question || null,
          photoUrl: topic.photoUrl || null,
          flag: topic.flag || null,
          badge: topic.badge || null,
        },
      });
    }
    console.log(`✅ ${EXPLORER_TOPICS.length} topics Explorer insérés\n`);

    // =========================================
    // 7. UTILISATEUR TEST
    // =========================================
    const bcrypt = await import('bcryptjs');
    const testPasswordHash = await bcrypt.hash('yonywood2026!', 12);
    
    await prisma.user.create({
      data: {
        email: 'qoctales@gmail.com',
        passwordHash: testPasswordHash,
        firstName: 'Qoctales',
        lastName: 'Admin',
        role: 'ADMIN',
        messagePermission: 'all',
        pushNewMessage: true,
        messagePreview: true,
        language: 'fr',
      },
    });
    console.log('✅ Utilisateur de test créé: qoctales@gmail.com (mot de passe: yonywood2026!)\n');

    // =========================================
    // 8. RÉCAPITULATIF FINAL
    // =========================================
    const counts = await Promise.all([
      prisma.documentarySeries.count(),
      prisma.protagonist.count(),
      prisma.duo.count(),
      prisma.explorerCategory.count(),
      prisma.explorerTopic.count(),
      prisma.user.count(),
    ]);

    console.log('🎉 ====== SEED TERMINÉ AVEC SUCCÈS ======');
    console.log(`📊 Données en base:`);
    console.log(`   • ${counts[0]} séries documentaires`);
    console.log(`   • ${counts[1]} protagonistes`);
    console.log(`   • ${counts[2]} duos`);
    console.log(`   • ${counts[3]} catégories Explorer`);
    console.log(`   • ${counts[4]} topics Explorer`);
    console.log(`   • ${counts[5]} utilisateurs`);
    console.log('\n🚀 Le backend Yonywood est prêt !');
    console.log('   Démarrez avec: npm run dev');
    console.log('   Test auth:     POST /api/auth/login { email: "qoctales@gmail.com", password: "yonywood2026!" }');
    console.log('   Test séries:   GET /api/series');
    console.log('   Test duos:     GET /api/duos?series=finagnon-qosqorico');
    console.log('   Test explorer: GET /api/explorer/categories\n');

  } catch (error) {
    console.error('\n❌ ERREUR DE SEED:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
