// =====================================================================
//  ATTAQUES CONTRE LA RUSSIE (2014 – 2026)
//  Même format que data/incidents.js, avec deux champs en plus :
//
//  origine      : code ISO-3 du pays d'où vient l'attaque (sert à colorier
//                 la carte dans ce mode). null = international ou inconnu.
//  acteDeGuerre : true pour les frappes menées par l'Ukraine, qui est en
//                 guerre contre la Russie depuis l'invasion de 2022.
//                 Ce sont des opérations militaires, pas de la guerre hybride.
//
//  Attribution (même règle que pour l'autre sens) :
//    "revendiquee" -> l'auteur (service d'État ou groupe) l'a revendiquée
//    "officielle"  -> le pays visé ou un État tiers désigne officiellement l'auteur
//    "soupconnee"  -> ni revendication ni attribution formelle
//
//  Volontairement exclus : les combats sur le front, l'incursion
//  ukrainienne dans la région de Koursk (2024) et les actions menées dans
//  les territoires ukrainiens occupés.
// =====================================================================

const INCIDENTS_CONTRE_RUSSIE = [

  // ----------------------------- CYBER ------------------------------
  {
    id: 101, date: "2016-10-25", type: "cyber", attribution: "revendiquee",
    pays: "RUS", origine: "UKR", lieu: "Moscou (administration présidentielle)", lat: 55.75, lng: 37.62,
    titre: "« SurkovLeaks » : les mails du conseiller de Poutine publiés",
    description: "Des hackers ukrainiens de la « Cyber Alliance » publient environ 2 300 mails liés au bureau de Vladislav Sourkov, conseiller de Poutine. Ils montrent comment le Kremlin pilotait et finançait les séparatistes du Donbass.",
    auteur: "Ukrainian Cyber Alliance (hacktivistes ukrainiens)",
    source: { nom: "Wikipédia – Surkov leaks", url: "https://en.wikipedia.org/wiki/Surkov_leaks" }
  },
  {
    id: 102, date: "2018-11-06", type: "cyber", attribution: "officielle",
    pays: "RUS", origine: "USA", lieu: "Saint-Pétersbourg (Internet Research Agency)", lat: 59.99, lng: 30.28,
    titre: "Les États-Unis coupent internet à la ferme à trolls russe",
    description: "Le jour des élections de mi-mandat, le Cyber Command américain coupe l'accès à internet de l'Internet Research Agency pour l'empêcher de mener des campagnes de désinformation. Donald Trump confirme l'opération en 2020.",
    auteur: "US Cyber Command (armée américaine)",
    source: { nom: "NBC News", url: "https://www.nbcnews.com/politics/national-security/trump-approved-operation-disabled-russian-troll-farm-during-2018-midterms-n976381" }
  },
  {
    id: 103, date: "2022-02-28", type: "cyber", attribution: "revendiquee",
    pays: "RUS", origine: "UKR", lieu: "Moscou (Bourse, Sberbank)", lat: 55.76, lng: 37.63,
    titre: "L'« IT Army of Ukraine » lance ses attaques",
    description: "Deux jours après l'appel du ministre ukrainien du Numérique, des centaines de milliers de volontaires du monde entier rejoignent une « armée informatique » sur Telegram. Les sites de la Bourse de Moscou, de Sberbank et de nombreuses administrations tombent sous les attaques DDoS.",
    auteur: "IT Army of Ukraine (volontaires coordonnés par le gouvernement ukrainien)",
    source: { nom: "Wikipédia – IT Army of Ukraine", url: "https://en.wikipedia.org/wiki/IT_Army_of_Ukraine" }
  },
  {
    id: 104, date: "2022-03-10", type: "cyber", attribution: "revendiquee",
    pays: "RUS", origine: null, lieu: "Moscou (Roskomnadzor)", lat: 55.79, lng: 37.56,
    titre: "Anonymous pirate l'agence de censure russe",
    description: "Des hackers liés au collectif Anonymous publient plus de 360 000 fichiers volés à Roskomnadzor, l'agence qui contrôle et censure internet en Russie.",
    auteur: "Anonymous (collectif international)",
    source: { nom: "Ukrainska Pravda", url: "https://www.pravda.com.ua/eng/news/2022/03/10/7330149/" }
  },
  {
    id: 105, date: "2023-12-12", type: "cyber", attribution: "revendiquee",
    pays: "RUS", origine: "UKR", lieu: "Moscou (service fiscal fédéral)", lat: 55.73, lng: 37.60,
    titre: "Le renseignement ukrainien efface des données du fisc russe",
    description: "Le HUR, renseignement militaire ukrainien, affirme avoir paralysé le service fiscal fédéral russe et détruit une partie de ses bases de données. Les autorités russes ne confirment pas l'ampleur des dégâts.",
    auteur: "HUR (renseignement militaire ukrainien)",
    source: { nom: "Meduza", url: "https://meduza.io/en/news/2023/12/12/ukrainian-intelligence-reports-hacking-russia-s-federal-tax-service" }
  },
  {
    id: 106, date: "2024-07-23", type: "cyber", attribution: "revendiquee",
    pays: "RUS", origine: "UKR", lieu: "Moscou (grandes banques)", lat: 55.74, lng: 37.66,
    titre: "Banques russes paralysées par une attaque massive",
    description: "Pendant plusieurs jours, des attaques DDoS revendiquées par le HUR perturbent les applications et les paiements des grandes banques russes (Sberbank, VTB, Alfa-Bank…), ainsi que des opérateurs télécoms.",
    auteur: "HUR (renseignement militaire ukrainien)",
    source: { nom: "Wikipédia – 2024 Ukrainian cyberattacks", url: "https://en.wikipedia.org/wiki/2024_Ukrainian_cyberattacks_against_Russia" }
  },
  {
    id: 107, date: "2025-06-04", type: "cyber", attribution: "revendiquee",
    pays: "RUS", origine: "UKR", lieu: "Moscou (Tupolev)", lat: 55.77, lng: 37.68,
    titre: "Le HUR revendique le piratage de Tupolev",
    description: "Le renseignement militaire ukrainien affirme avoir volé 4,4 Go de données internes au constructeur des bombardiers stratégiques russes. L'information n'a pas pu être vérifiée de façon indépendante.",
    auteur: "HUR (renseignement militaire ukrainien)",
    source: { nom: "The Record", url: "https://therecord.media/ukraine-military-russia-strategic-bomber" }
  },
  {
    id: 108, date: "2025-07-28", type: "cyber", attribution: "revendiquee",
    pays: "RUS", origine: "BLR", lieu: "Aéroport de Moscou-Cheremetievo (Aeroflot)", lat: 55.97, lng: 37.41,
    titre: "Cyberattaque contre Aeroflot : plus de 100 vols annulés",
    description: "Les groupes pro-ukrainiens Silent Crow et Cyber Partisans de Biélorussie (des opposants biélorusses à Loukachenko) revendiquent la destruction d'une partie du système informatique d'Aeroflot. La compagnie annule plus d'une centaine de vols.",
    auteur: "Silent Crow et Cyber Partisans de Biélorussie",
    source: { nom: "Security Affairs", url: "https://securityaffairs.com/180521/hacktivism/pro-ukraine-hacktivists-claim-cyberattack-on-russian-airline-aeroflot-that-caused-the-cancellation-of-100-flights.html" }
  },

  // ---------------------- GUERRE DE L'INFORMATION -------------------
  {
    id: 109, date: "2022-03-06", type: "desinformation", attribution: "revendiquee",
    pays: "RUS", origine: null, lieu: "Moscou (plateformes de streaming)", lat: 55.77, lng: 37.58,
    titre: "Des images de la guerre diffusées sur des plateformes russes piratées",
    description: "Anonymous revendique le piratage de services de streaming russes pour y diffuser des images de la guerre en Ukraine, censurées par les médias d'État, avec un message contre l'invasion.",
    auteur: "Anonymous (collectif international)",
    source: { nom: "Fortune", url: "https://fortune.com/2022/03/07/anonymous-claims-hack-of-russian-tvs-showing-putins-ukraine-invasion" }
  },
  {
    id: 110, date: "2023-06-05", type: "desinformation", attribution: "soupconnee",
    pays: "RUS", origine: null, lieu: "Voronej (radios régionales)", lat: 51.67, lng: 39.18,
    titre: "Un faux discours de Poutine sur des radios piratées",
    description: "Dans plusieurs régions frontalières, des radios piratées diffusent un faux discours de Poutine, probablement généré par IA, annonçant la loi martiale et une mobilisation générale. Le Kremlin dénonce un piratage sans désigner d'auteur.",
    auteur: "Inconnu (pro-ukrainien présumé)",
    source: { nom: "Meduza", url: "https://meduza.io/en/news/2023/06/05/putin-s-martial-law-address-broadcast-in-3-russian-regions-the-kremlin-says-radio-stations-were-hacked-denies-authenticity-of-recording" }
  },

  // --------------------- SABOTAGES ET ASSASSINATS -------------------
  {
    id: 111, date: "2022-08-20", type: "sabotage", attribution: "officielle",
    pays: "RUS", origine: "UKR", lieu: "Bolchie Viaziomy (près de Moscou)", lat: 55.63, lng: 36.98,
    titre: "Daria Douguina tuée dans l'explosion de sa voiture",
    description: "La fille de l'idéologue nationaliste Alexandre Douguine est tuée par une bombe placée sous sa voiture. Moscou accuse l'Ukraine, qui dément. Selon le New York Times, le renseignement américain pense que des éléments du gouvernement ukrainien ont autorisé l'opération.",
    auteur: "Services ukrainiens (selon la Russie et le renseignement américain)",
    source: { nom: "Al Jazeera", url: "https://www.aljazeera.com/news/2022/10/6/us-intelligence-says-ukrainians-behind-dugina-killing-report" }
  },
  {
    id: 112, date: "2022-10-08", type: "sabotage", attribution: "revendiquee",
    pays: "RUS", origine: "UKR", lieu: "Pont de Crimée (détroit de Kertch)", lat: 45.30, lng: 36.51,
    titre: "Explosion sur le pont de Crimée",
    description: "Un camion piégé explose sur le pont qui relie la Russie à la Crimée annexée, coupant en partie cette voie de ravitaillement essentielle pour l'armée russe. En 2023, le chef du SBU reconnaît que son service en est l'auteur.",
    auteur: "SBU (service de sécurité ukrainien)",
    acteDeGuerre: true,
    source: { nom: "Meduza", url: "https://meduza.io/en/news/2023/07/26/ukrainian-security-service-head-acknowledges-involvement-in-october-2022-crimean-bridge-explosion" }
  },
  {
    id: 113, date: "2023-04-02", type: "sabotage", attribution: "officielle",
    pays: "RUS", origine: "UKR", lieu: "Saint-Pétersbourg (café)", lat: 59.94, lng: 30.31,
    titre: "Le blogueur militaire Vladlen Tatarski tué dans un café",
    description: "Une statuette piégée explose pendant une rencontre publique et tue ce blogueur pro-guerre très suivi. La Russie accuse l'Ukraine ; Kyiv parle d'un règlement de comptes interne. Une jeune femme qui affirme avoir été manipulée est condamnée à 27 ans de prison.",
    auteur: "Services ukrainiens (selon la Russie)",
    source: { nom: "Wikipédia – Assassination of Vladlen Tatarsky", url: "https://en.wikipedia.org/wiki/Assassination_of_Vladlen_Tatarsky" }
  },
  {
    id: 114, date: "2023-11-29", type: "sabotage", attribution: "revendiquee",
    pays: "RUS", origine: "UKR", lieu: "Tunnel de Severomouïsk (Bouriatie)", lat: 56.15, lng: 113.55,
    titre: "Des trains de marchandises sabotés en Sibérie",
    description: "Des explosions frappent des trains dans le plus long tunnel ferroviaire de Russie, sur la ligne Baïkal-Amour qui relie la Russie à la Chine, à plus de 5 000 km de l'Ukraine. Des sources du renseignement ukrainien revendiquent l'opération.",
    auteur: "SBU / HUR (selon des sources ukrainiennes)",
    source: { nom: "Meduza", url: "https://meduza.io/en/news/2023/12/03/traffic-fully-restored-on-railway-in-russia-s-far-east-after-explosion-reportedly-organized-by-ukrainian-intelligence" }
  },
  {
    id: 115, date: "2024-12-17", type: "sabotage", attribution: "revendiquee",
    pays: "RUS", origine: "UKR", lieu: "Moscou (avenue Riazanski)", lat: 55.71, lng: 37.76,
    titre: "Le général Kirillov tué par une trottinette piégée",
    description: "Le chef des troupes de défense nucléaire, biologique et chimique russes est tué devant son immeuble. La veille, l'Ukraine l'avait inculpé pour l'usage d'armes chimiques sur le front. Une source du SBU revendique l'opération.",
    auteur: "SBU (service de sécurité ukrainien)",
    source: { nom: "Al Jazeera", url: "https://www.aljazeera.com/news/2024/12/17/who-was-russian-lieutenant-general-igor-kirillov-killed-in-bomb-blast" }
  },
  {
    id: 116, date: "2025-04-25", type: "sabotage", attribution: "officielle",
    pays: "RUS", origine: "UKR", lieu: "Balachikha (près de Moscou)", lat: 55.80, lng: 37.96,
    titre: "Un général de l'état-major tué par une voiture piégée",
    description: "Le général Iaroslav Moskalik, haut responsable de l'état-major russe, est tué par l'explosion d'une voiture garée près de son domicile. Moscou accuse l'Ukraine, qui ne revendique pas.",
    auteur: "Services ukrainiens (selon la Russie)",
    source: { nom: "CBC News", url: "https://www.cbc.ca/news/world/russia-moscow-car-bomb-moskalik-1.7518405" }
  },
  {
    id: 117, date: "2025-06-14", type: "sabotage", attribution: "revendiquee",
    pays: "RUS", origine: "UKR", lieu: "Kaliningrad (sous-station électrique)", lat: 54.71, lng: 20.51,
    titre: "Une sous-station électrique incendiée à Kaliningrad",
    description: "Selon une source du renseignement militaire ukrainien, des agents ont vidé le liquide de refroidissement d'un transformateur puis l'ont incendié, coupant l'électricité de sites de production militaire.",
    auteur: "HUR (selon une source ukrainienne)",
    source: { nom: "Kyiv Independent", url: "https://kyivindependent.com/hur-agents-ignite-substation-in-russias-kaliningrad-in-sabotage-operation/" }
  },

  // ------------------- FRAPPES DE DRONES (actes de guerre) ----------
  {
    id: 118, date: "2022-12-05", type: "aerien", attribution: "revendiquee",
    pays: "RUS", origine: "UKR", lieu: "Base aérienne d'Engels", lat: 51.48, lng: 46.21,
    titre: "Premières frappes sur les bases de bombardiers russes",
    description: "De vieux drones soviétiques modifiés frappent les bases d'Engels et de Diaguilevo, d'où partent les bombardiers qui tirent des missiles sur l'Ukraine, à plus de 500 km de la frontière. Le HUR le reconnaît plus tard.",
    auteur: "Forces armées / HUR ukrainiens",
    acteDeGuerre: true,
    source: { nom: "Wikipédia – Dyagilevo and Engels attacks", url: "https://en.wikipedia.org/wiki/Dyagilevo_and_Engels_air_bases_attacks" }
  },
  {
    id: 119, date: "2023-05-03", type: "aerien", attribution: "officielle",
    pays: "RUS", origine: "UKR", lieu: "Moscou (Kremlin)", lat: 55.752, lng: 37.617,
    titre: "Deux drones explosent au-dessus du Kremlin",
    description: "Deux drones sont abattus au-dessus du Kremlin. Moscou parle d'une tentative d'assassinat de Poutine organisée par Kyiv et Washington. L'Ukraine dément ; selon des responsables américains, une unité spéciale ukrainienne serait probablement en cause.",
    auteur: "Unité ukrainienne (selon la Russie et des responsables américains)",
    acteDeGuerre: true,
    source: { nom: "CNN (via KTVZ)", url: "https://ktvz.com/politics/cnn-us-politics/2023/05/24/us-intelligence-indicates-ukrainians-may-have-launched-drone-attack-on-kremlin/" }
  },
  {
    id: 120, date: "2024-04-02", type: "aerien", attribution: "revendiquee",
    pays: "RUS", origine: "UKR", lieu: "Ielabouga (Tatarstan)", lat: 55.76, lng: 52.06,
    titre: "Frappe sur l'usine de drones Shahed à 1 200 km",
    description: "Pour la première fois, des drones ukrainiens frappent le Tatarstan, à environ 1 200 km de la frontière. La cible : la zone industrielle d'Alabouga, où la Russie fabrique ses drones d'attaque de conception iranienne.",
    auteur: "HUR (selon des sources ukrainiennes)",
    acteDeGuerre: true,
    source: { nom: "Rubryka", url: "https://rubryka.com/en/2024/04/02/za-1200-km-vid-kordonu-ukrayiny-vpershe-drony-atakuvaly-pidpryyemstva-u-tatarstani" }
  },
  {
    id: 121, date: "2025-06-01", type: "aerien", attribution: "revendiquee",
    pays: "RUS", origine: "UKR", lieu: "Base aérienne d'Olenia (Mourmansk)", lat: 68.15, lng: 33.46,
    titre: "Opération « Toile d'araignée » contre les bombardiers stratégiques",
    description: "Des drones cachés dans des camions entrés en Russie décollent près de quatre bases aériennes, de Mourmansk jusqu'à la Sibérie (Belaïa, à 4 000 km de l'Ukraine). Selon le SBU, environ un tiers de la flotte de bombardiers stratégiques est touché.",
    auteur: "SBU (service de sécurité ukrainien)",
    acteDeGuerre: true,
    source: { nom: "Kyiv Post", url: "https://www.kyivpost.com/post/53749" }
  },
  {
    id: 122, date: "2026-06-18", type: "aerien", attribution: "revendiquee",
    pays: "RUS", origine: "UKR", lieu: "Moscou (raffinerie de Kapotnia)", lat: 55.64, lng: 37.80,
    titre: "La plus grande attaque de drones sur Moscou",
    description: "Près de 200 drones sont interceptés au-dessus de Moscou et la raffinerie de la capitale doit s'arrêter après plusieurs incendies. Zelensky présente la frappe comme une réponse aux bombardements russes sur l'Ukraine.",
    auteur: "Forces armées ukrainiennes",
    acteDeGuerre: true,
    source: { nom: "Kyiv Independent", url: "https://kyivindependent.com/russian-oil-depot-in-rostov-oblast-hit-by-drones-locals-say/" }
  },
  {
    id: 123, date: "2026-07-07", type: "aerien", attribution: "revendiquee",
    pays: "RUS", origine: "UKR", lieu: "Omsk (plus grande raffinerie de Russie)", lat: 54.98, lng: 73.23,
    titre: "La raffinerie d'Omsk frappée à 2 500 km",
    description: "Dans le cadre de sa campagne de frappes contre l'industrie pétrolière russe, l'Ukraine touche la plus grande raffinerie du pays, à environ 2 500 km. Selon les estimations, 20 à 40 % de la capacité de raffinage russe est alors hors service.",
    auteur: "Forces armées ukrainiennes",
    acteDeGuerre: true,
    source: { nom: "Wikipédia – Deep strike campaign", url: "https://en.wikipedia.org/wiki/Deep_strike_campaign" }
  },
  {
    id: 124, date: "2026-09-25", type: "aerien", attribution: "officielle",
    pays: "RUS", origine: "UKR", lieu: "Novochakhtinsk (raffinerie)", lat: 47.76, lng: 39.93,
    titre: "Raffineries frappées de Perm à Rostov",
    description: "En une nuit, la Russie dit avoir intercepté près de 600 drones ukrainiens. Des raffineries sont touchées à Perm et à Novochakhtinsk, qui suspend sa production ; au moins deux personnes sont tuées en Russie.",
    auteur: "Forces armées ukrainiennes (selon la Russie)",
    acteDeGuerre: true,
    source: { nom: "The Moscow Times", url: "https://themoscowtimes.com/2026/09/25/at-least-2-killed-as-ukraine-strikes-industrial-sites-across-russia-a93790" }
  }
];
