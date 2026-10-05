// =====================================================================
//  BASE DE DONNÉES DES INCIDENTS
//  Chaque objet = un incident placé sur la carte.
//
//  type         : "cyber" | "sabotage" | "desinformation" | "aerien"
//  attribution  : "officielle"  -> un État, une justice ou l'UE a désigné la Russie
//                 "revendiquee" -> le groupe auteur l'a revendiquée (ex. Killnet)
//                 "soupconnee"  -> forte suspicion, sans attribution formelle
//  pays         : code ISO-3 du pays visé (sert à colorier la carte)
//  lat / lng    : coordonnées du lieu (degrés décimaux)
//
//  Pour ajouter un incident : copier un bloc { ... }, changer les valeurs.
// =====================================================================

const INCIDENTS = [

  // ----------------------------- CYBER ------------------------------
  {
    id: 1, date: "2022-02-24", type: "cyber", attribution: "officielle",
    pays: "DEU", lieu: "Aurich (Enercon)", lat: 53.47, lng: 7.48,
    titre: "Attaque du réseau satellite KA-SAT (Viasat)",
    description: "Une heure avant l'invasion de l'Ukraine, le malware AcidRain met hors service des milliers de modems satellites en Europe. En Allemagne, 5 800 éoliennes Enercon perdent leur télésurveillance. L'UE, le Royaume-Uni et les États-Unis attribuent l'attaque à la Russie en mai 2022.",
    auteur: "GRU (renseignement militaire russe)",
    source: { nom: "Wikipédia – Viasat hack", url: "https://en.wikipedia.org/wiki/Viasat_hack" }
  },
  {
    id: 2, date: "2022-04-08", type: "cyber", attribution: "officielle",
    pays: "UKR", lieu: "Kyiv", lat: 50.45, lng: 30.52,
    titre: "Industroyer2 : tentative de coupure du réseau électrique",
    description: "Le groupe Sandworm tente de couper des sous-stations électriques ukrainiennes avec le malware Industroyer2. L'attaque est déjouée par le CERT ukrainien avec l'aide d'ESET.",
    auteur: "Sandworm (GRU, unité 74455)",
    source: { nom: "Wikipédia – Industroyer", url: "https://en.wikipedia.org/wiki/Industroyer" }
  },
  {
    id: 3, date: "2022-06-27", type: "cyber", attribution: "revendiquee",
    pays: "LTU", lieu: "Vilnius", lat: 54.69, lng: 25.28,
    titre: "Vague de DDoS après les restrictions de transit vers Kaliningrad",
    description: "Le groupe pro-russe Killnet revendique des attaques par déni de service contre des sites gouvernementaux et privés lituaniens, en représailles aux restrictions de transit de marchandises vers Kaliningrad.",
    auteur: "Killnet (hacktivistes pro-russes)",
    source: { nom: "Wikipédia – Killnet", url: "https://en.wikipedia.org/wiki/Killnet" }
  },
  {
    id: 4, date: "2022-08-17", type: "cyber", attribution: "revendiquee",
    pays: "EST", lieu: "Tallinn", lat: 59.44, lng: 24.75,
    titre: "Plus grosse attaque DDoS en Estonie depuis 2007",
    description: "Après le retrait d'un char soviétique à Narva, Killnet lance une attaque DDoS massive contre des services publics et privés estoniens. Elle est largement contenue.",
    auteur: "Killnet (hacktivistes pro-russes)",
    source: { nom: "Wikipédia – Killnet", url: "https://en.wikipedia.org/wiki/Killnet" }
  },
  {
    id: 5, date: "2022-11-23", type: "cyber", attribution: "revendiquee",
    pays: "FRA", lieu: "Strasbourg (Parlement européen)", lat: 48.60, lng: 7.77,
    titre: "DDoS contre le Parlement européen",
    description: "Le jour où le Parlement européen désigne la Russie comme « État promoteur du terrorisme », son site est rendu inaccessible par une attaque revendiquée par Killnet.",
    auteur: "Killnet (hacktivistes pro-russes)",
    source: { nom: "Wikipédia – Killnet", url: "https://en.wikipedia.org/wiki/Killnet" }
  },
  {
    id: 6, date: "2023-12-07", type: "cyber", attribution: "officielle",
    pays: "GBR", lieu: "Londres", lat: 51.50, lng: -0.13,
    titre: "Star Blizzard : piratage de parlementaires britanniques",
    description: "Le Royaume-Uni accuse l'unité « Centre 18 » du FSB d'avoir mené pendant des années des campagnes de hameçonnage contre des parlementaires, fonctionnaires et journalistes, puis d'avoir divulgué des documents.",
    auteur: "Star Blizzard / Callisto (FSB)",
    source: { nom: "Gouvernement britannique", url: "https://www.gov.uk/government/news/uk-exposes-attempted-russian-cyber-interference-in-politics-and-democratic-processes" }
  },
  {
    id: 7, date: "2023-12-12", type: "cyber", attribution: "officielle",
    pays: "UKR", lieu: "Kyiv (Kyivstar)", lat: 50.40, lng: 30.40,
    titre: "Destruction du réseau de l'opérateur Kyivstar",
    description: "La plus grande cyberattaque contre un opérateur télécom : Kyivstar (24 millions d'abonnés) est paralysé pendant plusieurs jours. Les services ukrainiens l'attribuent à Sandworm.",
    auteur: "Sandworm (GRU)",
    source: { nom: "Wikipédia – Sandworm", url: "https://en.wikipedia.org/wiki/Sandworm_(hacker_group)" }
  },
  {
    id: 8, date: "2024-05-03", type: "cyber", attribution: "officielle",
    pays: "DEU", lieu: "Berlin (SPD)", lat: 52.52, lng: 13.40,
    titre: "APT28 pirate la messagerie du SPD",
    description: "L'Allemagne attribue officiellement à APT28 le piratage de comptes e-mail de la direction du parti social-démocrate (SPD) via une faille d'Outlook. L'ambassadeur russe est convoqué.",
    auteur: "APT28 / Fancy Bear (GRU, unité 26165)",
    source: { nom: "Wikipédia – Fancy Bear", url: "https://en.wikipedia.org/wiki/Fancy_Bear" }
  },
  {
    id: 9, date: "2024-05-03", type: "cyber", attribution: "officielle",
    pays: "CZE", lieu: "Prague", lat: 50.08, lng: 14.44,
    titre: "APT28 vise des institutions tchèques",
    description: "La Tchéquie annonce que des institutions de l'État ont été visées par la même campagne APT28 exploitant la faille Outlook. L'UE condamne ces attaques.",
    auteur: "APT28 / Fancy Bear (GRU)",
    source: { nom: "Wikipédia – Fancy Bear", url: "https://en.wikipedia.org/wiki/Fancy_Bear" }
  },
  {
    id: 10, date: "2024-05-31", type: "cyber", attribution: "officielle",
    pays: "POL", lieu: "Varsovie (agence PAP)", lat: 52.23, lng: 21.01,
    titre: "Fausse dépêche de mobilisation sur l'agence PAP",
    description: "Des pirates publient sur le fil de l'agence de presse polonaise une fausse annonce de mobilisation de 200 000 Polonais pour l'Ukraine. Le gouvernement polonais accuse la Russie.",
    auteur: "Acteur étatique russe",
    source: { nom: "Wikipédia – Polish Press Agency", url: "https://en.wikipedia.org/wiki/Polish_Press_Agency" }
  },
  {
    id: 11, date: "2024-12-28", type: "cyber", attribution: "revendiquee",
    pays: "ITA", lieu: "Milan (aéroports)", lat: 45.46, lng: 9.19,
    titre: "DDoS contre ministères et aéroports italiens",
    description: "NoName057(16) revendique des attaques par déni de service contre le site du ministère des Affaires étrangères et ceux des aéroports de Milan (Linate, Malpensa). Le groupe vise l'Italie à de nombreuses reprises en 2024-2025.",
    auteur: "NoName057(16) (hacktivistes pro-russes)",
    source: { nom: "ICT Security Magazine", url: "https://www.ictsecuritymagazine.com/notizie/noname05716-attacchi/" }
  },
  {
    id: 12, date: "2025-04-07", type: "cyber", attribution: "officielle",
    pays: "NOR", lieu: "Barrage de Bremanger", lat: 61.85, lng: 5.00,
    titre: "Des pirates ouvrent une vanne de barrage",
    description: "Des pirates prennent le contrôle d'un barrage et ouvrent une vanne pendant quatre heures. En août 2025, la cheffe du renseignement intérieur norvégien (PST) attribue l'attaque à des pirates pro-russes.",
    auteur: "Pirates pro-russes",
    source: { nom: "Wikipédia – Bremanger dam sabotage", url: "https://en.wikipedia.org/wiki/Bremanger_dam_sabotage" }
  },
  {
    id: 13, date: "2025-04-29", type: "cyber", attribution: "officielle",
    pays: "FRA", lieu: "Paris", lat: 48.86, lng: 2.35,
    titre: "La France attribue une dizaine d'attaques à APT28",
    description: "Pour la première fois, la France attribue publiquement au GRU (APT28) des cyberattaques contre une douzaine d'entités françaises depuis 2021 : ministères, défense, recherche, et la préparation des JO de Paris 2024.",
    auteur: "APT28 / Fancy Bear (GRU)",
    source: { nom: "Ministère de l'Europe et des Affaires étrangères", url: "https://www.diplomatie.gouv.fr/fr/presse-et-ressources/decouvrir-et-informer/actualites/russie-attribution-de-cyberattaques-contre-la-france-au-service-de-renseignement-militaire-russe" }
  },
  {
    id: 14, date: "2025-05-27", type: "cyber", attribution: "officielle",
    pays: "NLD", lieu: "La Haye", lat: 52.08, lng: 4.30,
    titre: "Laundry Bear vole des données de la police néerlandaise",
    description: "Les renseignements néerlandais révèlent un nouveau groupe étatique russe, « Laundry Bear », responsable du vol des coordonnées professionnelles de policiers en 2024 et d'espionnage visant l'OTAN et l'UE.",
    auteur: "Laundry Bear / Void Blizzard",
    source: { nom: "Security Affairs", url: "https://securityaffairs.com/178338/apt/russia-linked-apt-laundry-bear-linked-to-2024-dutch-police-attack.html" }
  },
  {
    id: 15, date: "2025-06-24", type: "cyber", attribution: "revendiquee",
    pays: "NLD", lieu: "La Haye (sommet de l'OTAN)", lat: 52.10, lng: 4.27,
    titre: "DDoS pendant le sommet de l'OTAN",
    description: "NoName057(16) attaque des sites néerlandais pendant le sommet de l'OTAN. En juillet 2025, Europol démantèle une grande partie de son infrastructure (opération Eastwood).",
    auteur: "NoName057(16)",
    source: { nom: "Europol – Operation Eastwood", url: "https://www.europol.europa.eu/media-press/newsroom/news/global-operation-targets-noname05716-pro-russian-cybercrime-network" }
  },

  // ---------------------------- SABOTAGE ----------------------------
  {
    id: 16, date: "2023-12-05", type: "sabotage", attribution: "officielle",
    pays: "EST", lieu: "Tallinn", lat: 59.42, lng: 24.80,
    titre: "Voiture du ministre de l'Intérieur vandalisée",
    description: "Les vitres de la voiture du ministre de l'Intérieur Lauri Läänemets et celle d'un journaliste sont brisées. En février 2024, le renseignement estonien (KAPO) révèle que dix suspects agissaient sur instruction des services russes pour « semer la peur ».",
    auteur: "Recrues des services russes",
    source: { nom: "ERR News", url: "https://news.err.ee/1609258853/iss-russian-special-services-behind-attack-on-estonian-minister-s-car" }
  },
  {
    id: 17, date: "2024-02-28", type: "sabotage", attribution: "soupconnee",
    pays: "LVA", lieu: "Riga (musée de l'Occupation)", lat: 56.95, lng: 24.11,
    titre: "Tentative d'incendie du musée de l'Occupation",
    description: "Un cocktail Molotov est lancé dans le bureau de la directrice du musée de l'Occupation de la Lettonie. Trois suspects sont arrêtés ; le service de sécurité letton enquête sur un lien avec des services étrangers (russes).",
    auteur: "Services russes (soupçonnés)",
    source: { nom: "LSM (Lettonie)", url: "https://eng.lsm.lv/article/society/defense/14.03.2024-security-service-looks-at-possible-link-of-museum-arson-to-foreign-services.a546659/" }
  },
  {
    id: 18, date: "2024-02-13", type: "sabotage", attribution: "soupconnee",
    pays: "ESP", lieu: "Villajoyosa", lat: 38.51, lng: -0.23,
    titre: "Assassinat du pilote transfuge Maxim Kouzminov",
    description: "Le pilote russe qui avait fait défection vers l'Ukraine avec son hélicoptère est retrouvé abattu dans un parking. Les autorités espagnoles soupçonnent une opération des services russes.",
    auteur: "Services russes (soupçonnés)",
    source: { nom: "The Local (Espagne)", url: "https://www.thelocal.es/20240221/mystery-surrounds-death-of-russian-helicopter-deserter-in-spain" }
  },
  {
    id: 19, date: "2024-03-12", type: "sabotage", attribution: "soupconnee",
    pays: "LTU", lieu: "Vilnius", lat: 54.72, lng: 25.25,
    titre: "Agression au marteau de Leonid Volkov",
    description: "Leonid Volkov, proche d'Alexeï Navalny, est attaqué au marteau devant son domicile. Le renseignement lituanien évoque une opération organisée par la Russie avec des exécutants polonais ; une autre piste (un commanditaire privé) a été avancée ensuite.",
    auteur: "Services russes (soupçonnés)",
    source: { nom: "Wikipédia – Leonid Volkov", url: "https://en.wikipedia.org/wiki/Leonid_Volkov_(politician)" }
  },
  {
    id: 20, date: "2024-03-20", type: "sabotage", attribution: "officielle",
    pays: "GBR", lieu: "Leyton, Londres", lat: 51.56, lng: -0.01,
    titre: "Incendie d'un entrepôt lié à l'Ukraine",
    description: "Un entrepôt stockant du matériel (dont Starlink) destiné à l'Ukraine est incendié. En 2025, un tribunal britannique condamne les auteurs, recrutés par le groupe Wagner.",
    auteur: "Recrues du groupe Wagner",
    source: { nom: "Wikipédia – 2024 incendiary incidents", url: "https://en.wikipedia.org/wiki/2024_incendiary_incidents_in_Europe" }
  },
  {
    id: 21, date: "2024-04-18", type: "sabotage", attribution: "officielle",
    pays: "DEU", lieu: "Bayreuth", lat: 49.95, lng: 11.58,
    titre: "Projet de sabotage d'installations militaires déjoué",
    description: "Deux Germano-Russes sont arrêtés : ils repéraient des sites militaires, dont la base américaine de Grafenwöhr, pour des attentats à l'explosif pour le compte des services russes.",
    auteur: "Agents des services russes",
    source: { nom: "Wikipédia – Russian sabotage operations", url: "https://en.wikipedia.org/wiki/Russian_sabotage_operations_in_Europe" }
  },
  {
    id: 22, date: "2024-05-09", type: "sabotage", attribution: "officielle",
    pays: "LTU", lieu: "Vilnius (IKEA)", lat: 54.66, lng: 25.23,
    titre: "Incendie criminel d'un magasin IKEA",
    description: "Un magasin IKEA est incendié. Le parquet lituanien établit que l'auteur, un Ukrainien, était commandité par le GRU. Le même réseau visait un IKEA en Pologne.",
    auteur: "GRU",
    source: { nom: "Wikipédia – 2024 incendiary incidents", url: "https://en.wikipedia.org/wiki/2024_incendiary_incidents_in_Europe" }
  },
  {
    id: 23, date: "2024-05-12", type: "sabotage", attribution: "officielle",
    pays: "POL", lieu: "Varsovie (Marywilska 44)", lat: 52.31, lng: 20.98,
    titre: "Incendie du centre commercial Marywilska 44",
    description: "Un immense centre commercial de 1 400 boutiques est détruit par le feu. En mai 2025, Donald Tusk annonce que l'incendie a été commandité par les services russes ; la Pologne ferme le consulat russe de Cracovie.",
    auteur: "Services russes",
    source: { nom: "Wikipédia – 2024 incendiary incidents", url: "https://en.wikipedia.org/wiki/2024_incendiary_incidents_in_Europe" }
  },
  {
    id: 24, date: "2024-06-01", type: "sabotage", attribution: "officielle",
    pays: "CZE", lieu: "Prague (dépôt de bus)", lat: 50.10, lng: 14.50,
    titre: "Tentative d'incendie de bus à Prague",
    description: "Un Colombien tente d'incendier des bus d'un dépôt praguois. Le Premier ministre tchèque indique qu'il agissait très probablement pour le compte de la Russie.",
    auteur: "Recrue des services russes",
    source: { nom: "Wikipédia – 2024 incendiary incidents", url: "https://en.wikipedia.org/wiki/2024_incendiary_incidents_in_Europe" }
  },
  {
    id: 25, date: "2024-07-22", type: "sabotage", attribution: "officielle",
    pays: "DEU", lieu: "Leipzig (hub DHL)", lat: 51.43, lng: 12.24,
    titre: "Colis incendiaires dans le réseau DHL",
    description: "Un colis prend feu au centre DHL de Leipzig ; un autre à Birmingham. Les enquêtes polonaise et allemande concluent à un « test » du GRU visant à provoquer des incendies à bord d'avions cargo.",
    auteur: "GRU",
    source: { nom: "Wikipédia – 2024 incendiary incidents", url: "https://en.wikipedia.org/wiki/2024_incendiary_incidents_in_Europe" }
  },
  {
    id: 26, date: "2024-07-22", type: "sabotage", attribution: "officielle",
    pays: "GBR", lieu: "Birmingham (DHL)", lat: 52.45, lng: -1.73,
    titre: "Colis incendiaire à Birmingham",
    description: "Un colis s'enflamme dans un entrepôt DHL près de l'aéroport de Birmingham. Il fait partie de la même opération que celui de Leipzig.",
    auteur: "GRU",
    source: { nom: "Wikipédia – 2024 incendiary incidents", url: "https://en.wikipedia.org/wiki/2024_incendiary_incidents_in_Europe" }
  },
  {
    id: 27, date: "2024-11-18", type: "sabotage", attribution: "soupconnee",
    pays: "SWE", lieu: "Mer Baltique (Gotland)", lat: 56.90, lng: 19.50,
    titre: "Deux câbles sous-marins sectionnés en mer Baltique",
    description: "Les câbles de télécommunication Lituanie–Suède et Finlande–Allemagne sont coupés à quelques heures d'intervalle. Un vraquier chinois est soupçonné d'avoir traîné son ancre ; le ministre allemand de la Défense parle de sabotage.",
    auteur: "Indéterminé (Russie soupçonnée)",
    source: { nom: "Wikipédia – 2024 Baltic Sea cable damage", url: "https://en.wikipedia.org/wiki/2024_Baltic_Sea_submarine_cable_disruptions" }
  },
  {
    id: 28, date: "2024-12-25", type: "sabotage", attribution: "soupconnee",
    pays: "FIN", lieu: "Golfe de Finlande (Estlink 2)", lat: 59.90, lng: 25.20,
    titre: "Câble électrique Estlink 2 endommagé",
    description: "Le câble électrique entre la Finlande et l'Estonie et plusieurs câbles télécoms sont endommagés. La Finlande saisit le pétrolier Eagle S, lié à la « flotte fantôme » russe. L'OTAN lance la mission Baltic Sentry.",
    auteur: "Flotte fantôme russe (soupçonnée)",
    source: { nom: "Wikipédia – Estlink", url: "https://en.wikipedia.org/wiki/Estlink" }
  },
  {
    id: 29, date: "2025-11-16", type: "sabotage", attribution: "officielle",
    pays: "POL", lieu: "Mika (ligne Varsovie–Lublin)", lat: 51.86, lng: 21.79,
    titre: "Explosion sur la ligne ferroviaire Varsovie–Lublin",
    description: "Une charge explosive détruit un tronçon de la ligne utilisée pour acheminer l'aide à l'Ukraine. Donald Tusk attribue l'attentat aux services russes ; les deux suspects s'enfuient en Biélorussie.",
    auteur: "Services russes",
    source: { nom: "Wikipédia – Russian sabotage operations", url: "https://en.wikipedia.org/wiki/Russian_sabotage_operations_in_Europe" }
  },
  {
    id: 30, date: "2026-08-25", type: "sabotage", attribution: "officielle",
    pays: "SVK", lieu: "Haniska (près de Prešov)", lat: 48.97, lng: 21.26,
    titre: "Projet d'incendie d'une usine de drones déjoué",
    description: "Un Letton et un Ukrainien sont arrêtés alors qu'ils préparaient l'incendie d'une usine de drones travaillant pour l'Ukraine. Les enquêteurs les relient au GRU.",
    auteur: "GRU",
    source: { nom: "Around Prague", url: "https://aroundprague.cz/en/news/gru-saboteurs-were-plotting-to-set-fire-to-factories-in-germany-and-slovakia" }
  },
  {
    id: 31, date: "2026-09-03", type: "sabotage", attribution: "officielle",
    pays: "DEU", lieu: "Munich", lat: 48.14, lng: 11.58,
    titre: "Engins incendiaires lancés sur un chantier",
    description: "Deux Bulgares lancent des engins incendiaires depuis une voiture sur un chantier. Arrêtés, ils sont reliés au même réseau du GRU que le complot slovaque.",
    auteur: "GRU",
    source: { nom: "Around Prague", url: "https://aroundprague.cz/en/news/gru-saboteurs-were-plotting-to-set-fire-to-factories-in-germany-and-slovakia" }
  },

  // ------------------------- DÉSINFORMATION -------------------------
  {
    id: 32, date: "2023-06-13", type: "desinformation", attribution: "officielle",
    pays: "FRA", lieu: "Paris (Viginum)", lat: 48.85, lng: 2.30,
    titre: "Campagne « Doppelgänger » : faux sites de médias",
    description: "Viginum révèle une campagne russe usurpant les sites du Monde, du Figaro, de 20 Minutes et du ministère des Affaires étrangères pour diffuser de faux articles anti-Ukraine.",
    auteur: "Social Design Agency / Structura (liées au Kremlin)",
    source: { nom: "SGDSN – Viginum", url: "https://www.sgdsn.gouv.fr/publications/rrn-une-campagne-numerique-de-manipulation-de-linformation-complexe-et-persistante" }
  },
  {
    id: 33, date: "2023-09-28", type: "desinformation", attribution: "soupconnee",
    pays: "SVK", lieu: "Bratislava", lat: 48.15, lng: 17.11,
    titre: "Deepfake audio avant les législatives slovaques",
    description: "Deux jours avant le scrutin, un faux enregistrement audio du chef de l'opposition pro-européenne évoquant une fraude électorale circule massivement. La Russie est soupçonnée d'avoir contribué à sa diffusion.",
    auteur: "Indéterminé (réseaux pro-russes)",
    source: { nom: "Wikipédia – 2023 Slovak election", url: "https://en.wikipedia.org/wiki/2023_Slovak_parliamentary_election" }
  },
  {
    id: 34, date: "2023-10-31", type: "desinformation", attribution: "officielle",
    pays: "FRA", lieu: "Paris (10e arr.)", lat: 48.87, lng: 2.36,
    titre: "Étoiles de David taguées à Paris",
    description: "Des dizaines d'étoiles de David sont peintes sur des murs parisiens par un couple moldave. La France dénonce l'amplification de l'affaire sur les réseaux sociaux par le réseau russe RRN/Doppelgänger.",
    auteur: "Réseau RRN (Doppelgänger)",
    source: { nom: "Next", url: "https://next.ink/184196/etoiles-bleues-de-david-cette-operation-dingerence-russe-qui-a-vraiment-marche/" }
  },
  {
    id: 35, date: "2024-02-12", type: "desinformation", attribution: "officielle",
    pays: "FRA", lieu: "Paris", lat: 48.83, lng: 2.37,
    titre: "Réseau « Portal Kombat » (réseau Pravda)",
    description: "Viginum dévoile un réseau de près de 200 sites relayant la propagande russe en plusieurs langues, visant la France, l'Allemagne, la Pologne et d'autres pays européens.",
    auteur: "Réseau Pravda / Portal Kombat",
    source: { nom: "SGDSN – Viginum", url: "https://www.sgdsn.gouv.fr/publications/portal-kombat-un-reseau-structure-et-coordonne-de-propagande-prorusse" }
  },
  {
    id: 36, date: "2024-03-27", type: "desinformation", attribution: "officielle",
    pays: "CZE", lieu: "Prague", lat: 50.06, lng: 14.42,
    titre: "« Voice of Europe » : eurodéputés payés par Moscou",
    description: "Le renseignement tchèque démantèle le site Voice of Europe, financé par un proche de Viktor Medvedtchouk, qui payait des responsables politiques européens pour diffuser des messages pro-russes.",
    auteur: "Réseau Medvedtchouk (pro-Kremlin)",
    source: { nom: "Wikipédia – Voice of Europe", url: "https://en.wikipedia.org/wiki/Voice_of_Europe" }
  },
  {
    id: 37, date: "2024-05-14", type: "desinformation", attribution: "officielle",
    pays: "FRA", lieu: "Paris (Mémorial de la Shoah)", lat: 48.855, lng: 2.356,
    titre: "Mains rouges sur le Mémorial de la Shoah",
    description: "Des mains rouges sont peintes sur le Mur des Justes. Les suspects, bulgares, sont liés selon l'enquête à une opération de déstabilisation pilotée depuis la Russie.",
    auteur: "Services russes (selon l'enquête)",
    source: { nom: "Wikipédia – Russian sabotage operations", url: "https://en.wikipedia.org/wiki/Russian_sabotage_operations_in_Europe" }
  },
  {
    id: 38, date: "2024-06-01", type: "desinformation", attribution: "soupconnee",
    pays: "FRA", lieu: "Paris (tour Eiffel)", lat: 48.858, lng: 2.294,
    titre: "Cercueils déposés au pied de la tour Eiffel",
    description: "Cinq cercueils recouverts du drapeau français et marqués « Soldats français de l'Ukraine » sont déposés. Les suspects arrêtés sont soupçonnés d'agir pour le compte de la Russie.",
    auteur: "Services russes (soupçonnés)",
    source: { nom: "Wikipédia – Russian sabotage operations", url: "https://en.wikipedia.org/wiki/Russian_sabotage_operations_in_Europe" }
  },
  {
    id: 39, date: "2024-10-20", type: "desinformation", attribution: "officielle",
    pays: "MDA", lieu: "Chișinău", lat: 47.01, lng: 28.86,
    titre: "Ingérence dans le référendum européen moldave",
    description: "La police moldave révèle un vaste réseau d'achat de votes financé depuis la Russie par l'oligarque en fuite Ilan Shor. Le « oui » à l'UE l'emporte de justesse (50,4 %).",
    auteur: "Réseau Ilan Shor (financé depuis la Russie)",
    source: { nom: "Wikipédia – 2024 Moldovan referendum", url: "https://en.wikipedia.org/wiki/2024_Moldovan_European_Union_membership_constitutional_referendum" }
  },
  {
    id: 40, date: "2024-12-06", type: "desinformation", attribution: "officielle",
    pays: "ROU", lieu: "Bucarest", lat: 44.43, lng: 26.10,
    titre: "Présidentielle roumaine annulée",
    description: "La Cour constitutionnelle annule le premier tour après la déclassification de rapports décrivant une campagne massive sur TikTok en faveur de Călin Georgescu, attribuée à un « acteur étatique » (la Russie).",
    auteur: "Acteur étatique russe (selon les services roumains)",
    source: { nom: "Wikipédia – 2024 Romanian election", url: "https://en.wikipedia.org/wiki/2024_Romanian_presidential_election" }
  },
  {
    id: 41, date: "2025-02-23", type: "desinformation", attribution: "officielle",
    pays: "DEU", lieu: "Berlin", lat: 52.50, lng: 13.35,
    titre: "Storm-1516 cible les législatives allemandes",
    description: "Le gouvernement allemand dénonce de fausses vidéos et faux sites diffusés par le réseau russe Storm-1516 pour favoriser l'extrême droite et discréditer les partis pro-Ukraine avant le scrutin.",
    auteur: "Storm-1516",
    source: { nom: "Wikipédia – Storm-1516", url: "https://en.wikipedia.org/wiki/Storm-1516" }
  },
  {
    id: 42, date: "2025-09-28", type: "desinformation", attribution: "officielle",
    pays: "MDA", lieu: "Chișinău", lat: 46.99, lng: 28.84,
    titre: "Ingérence dans les législatives moldaves",
    description: "Les autorités dénoncent une ingérence russe « sans précédent » (achat de votes, désinformation, cyberattaques). Le parti pro-européen PAS conserve sa majorité.",
    auteur: "Réseaux financés depuis la Russie",
    source: { nom: "Wikipédia – 2025 Moldovan election", url: "https://en.wikipedia.org/wiki/2025_Moldovan_parliamentary_election" }
  },

  // ----------------------- ESPACE AÉRIEN / DRONES -------------------
  {
    id: 43, date: "2023-09-06", type: "aerien", attribution: "officielle",
    pays: "ROU", lieu: "Plauru (delta du Danube)", lat: 45.35, lng: 28.73,
    titre: "Débris de drones russes en Roumanie",
    description: "Des fragments de drones Shahed utilisés par la Russie contre les ports ukrainiens du Danube sont retrouvés sur le sol roumain. Les incidents se répètent jusqu'en 2025.",
    auteur: "Forces armées russes",
    source: { nom: "Romania Insider", url: "https://romania-insider.com/more-drone-fragments-romanian-soil-sept-2023" }
  },
  {
    id: 44, date: "2024-03-24", type: "aerien", attribution: "officielle",
    pays: "POL", lieu: "Oserdów (Lublin)", lat: 50.49, lng: 23.86,
    titre: "Un missile de croisière russe traverse la Pologne",
    description: "Pendant une frappe massive sur l'Ukraine, un missile de croisière russe pénètre dans l'espace aérien polonais pendant 39 secondes.",
    auteur: "Forces armées russes",
    source: { nom: "Wikipédia – Russian sabotage operations", url: "https://en.wikipedia.org/wiki/Russian_sabotage_operations_in_Europe" }
  },
  {
    id: 45, date: "2024-04-29", type: "aerien", attribution: "officielle",
    pays: "EST", lieu: "Tartu", lat: 58.38, lng: 26.72,
    titre: "Brouillage GPS : Finnair suspend ses vols vers Tartu",
    description: "Des avions doivent faire demi-tour à cause du brouillage GPS. L'Estonie accuse la Russie, dont le brouillage depuis Kaliningrad et Saint-Pétersbourg perturbe des milliers de vols en Baltique.",
    auteur: "Guerre électronique russe",
    source: { nom: "ERR News", url: "https://news.err.ee/1609328058/finnair-suspends-flights-to-tartu-for-1-month-to-seek-gps-jamming-solution" }
  },
  {
    id: 46, date: "2025-05-13", type: "aerien", attribution: "officielle",
    pays: "EST", lieu: "Île de Vaindloo", lat: 59.82, lng: 26.36,
    titre: "Un chasseur russe viole l'espace aérien estonien",
    description: "Un Su-35 russe pénètre brièvement dans l'espace aérien estonien alors que l'Estonie tente d'inspecter un pétrolier de la flotte fantôme.",
    auteur: "Forces aérospatiales russes",
    source: { nom: "ERR News", url: "https://news.err.ee/1609694862/fm-russian-fighter-jet-violated-estonia-s-airspace-to-protect-shadow-fleet-vessel" }
  },
  {
    id: 47, date: "2025-09-01", type: "aerien", attribution: "soupconnee",
    pays: "BGR", lieu: "Plovdiv", lat: 42.14, lng: 24.75,
    titre: "Brouillage GPS de l'avion d'Ursula von der Leyen",
    description: "L'avion de la présidente de la Commission européenne perd son GPS à l'approche de Plovdiv. La Commission soupçonne la Russie ; la Bulgarie relativise ensuite l'incident.",
    auteur: "Guerre électronique russe (soupçonnée)",
    source: { nom: "Wikipédia – Russian sabotage operations", url: "https://en.wikipedia.org/wiki/Russian_sabotage_operations_in_Europe" }
  },
  {
    id: 48, date: "2025-09-10", type: "aerien", attribution: "officielle",
    pays: "POL", lieu: "Wyryki (Lublin)", lat: 51.55, lng: 23.40,
    titre: "Une vingtaine de drones russes abattus au-dessus de la Pologne",
    description: "Pour la première fois, des avions de l'OTAN abattent des drones russes au-dessus d'un pays membre. Une maison est endommagée à Wyryki. L'OTAN lance l'opération Eastern Sentry.",
    auteur: "Forces armées russes",
    source: { nom: "Wikipédia – 2025 drone incursion into Poland", url: "https://en.wikipedia.org/wiki/2025_Russian_drone_incursion_into_Poland" }
  },
  {
    id: 49, date: "2025-09-13", type: "aerien", attribution: "officielle",
    pays: "ROU", lieu: "Tulcea", lat: 45.18, lng: 28.80,
    titre: "Drone russe dans l'espace aérien roumain",
    description: "Des F-16 roumains suivent un drone russe pendant près de 50 minutes au-dessus du territoire roumain avant qu'il ne reparte vers l'Ukraine.",
    auteur: "Forces armées russes",
    source: { nom: "Ukrainska Pravda", url: "https://www.pravda.com.ua/eng/news/2025/09/14/7530806" }
  },
  {
    id: 50, date: "2025-09-19", type: "aerien", attribution: "officielle",
    pays: "EST", lieu: "Golfe de Finlande (Vaindloo)", lat: 59.75, lng: 25.90,
    titre: "Trois MiG-31 violent l'espace aérien estonien pendant 12 minutes",
    description: "Trois chasseurs MiG-31 russes pénètrent l'espace aérien estonien sans plan de vol. L'Estonie invoque l'article 4 de l'OTAN ; Moscou dément.",
    auteur: "Forces aérospatiales russes",
    source: { nom: "Al Jazeera", url: "https://www.aljazeera.com/news/2025/9/19/estonia-says-russian-fighter-jets-entered-airspace-in-brazen-intrusion" }
  },
  {
    id: 51, date: "2025-09-22", type: "aerien", attribution: "soupconnee",
    pays: "DNK", lieu: "Aéroport de Copenhague", lat: 55.62, lng: 12.65,
    titre: "Drones : l'aéroport de Copenhague fermé",
    description: "Des drones de grande taille forcent la fermeture de l'aéroport pendant près de quatre heures, puis d'autres aéroports danois (Aalborg, Billund) les jours suivants. Le gouvernement parle d'« attaque hybride ».",
    auteur: "Indéterminé (Russie soupçonnée)",
    source: { nom: "Al Jazeera", url: "https://www.aljazeera.com/news/2025/9/25/denmark-shuts-second-airport-in-a-week-more-unidentified-drones-spotted" }
  },
  {
    id: 52, date: "2025-09-24", type: "aerien", attribution: "soupconnee",
    pays: "DNK", lieu: "Aalborg (aéroport et base militaire)", lat: 57.09, lng: 9.85,
    titre: "Drones au-dessus de l'aéroport d'Aalborg",
    description: "L'aéroport d'Aalborg, qui sert aussi de base militaire, est fermé plusieurs heures à cause de drones. La Première ministre danoise n'exclut pas la Russie.",
    auteur: "Indéterminé (Russie soupçonnée)",
    source: { nom: "Euronews", url: "https://www.euronews.com/2025/09/26/denmarks-aalborg-airport-closes-again-over-suspected-drone-hybrid-attack" }
  },
  {
    id: 53, date: "2025-10-02", type: "aerien", attribution: "soupconnee",
    pays: "DEU", lieu: "Aéroport de Munich", lat: 48.35, lng: 11.79,
    titre: "Drones : l'aéroport de Munich fermé deux soirs",
    description: "Des survols de drones entraînent la suspension des vols et touchent des milliers de passagers. Berlin évoque une menace hybride russe et renforce la lutte anti-drones.",
    auteur: "Indéterminé (Russie soupçonnée)",
    source: { nom: "Wikipédia – Russian sabotage operations", url: "https://en.wikipedia.org/wiki/Russian_sabotage_operations_in_Europe" }
  },
  {
    id: 54, date: "2025-11-04", type: "aerien", attribution: "soupconnee",
    pays: "BEL", lieu: "Aéroports de Bruxelles et Liège", lat: 50.90, lng: 4.48,
    titre: "Drones au-dessus des aéroports belges",
    description: "Les aéroports de Bruxelles et de Liège sont fermés après des survols de drones, déjà observés au-dessus de bases militaires. Le ministre de la Défense parle d'opération coordonnée.",
    auteur: "Indéterminé (Russie soupçonnée)",
    source: { nom: "Wikipédia – Russian sabotage operations", url: "https://en.wikipedia.org/wiki/Russian_sabotage_operations_in_Europe" }
  },
  // =================================================================
  //  2014 – 2021 : AVANT L'INVASION À GRANDE ÉCHELLE DE L'UKRAINE
  // =================================================================

  // ----------------------------- CYBER ------------------------------
  {
    id: 55, date: "2014-05-25", type: "cyber", attribution: "soupconnee",
    pays: "UKR", lieu: "Kyiv (Commission électorale)", lat: 50.47, lng: 30.49,
    titre: "Piratage de la commission électorale ukrainienne",
    description: "Le jour de la présidentielle, le groupe pro-russe CyberBerkut pirate la commission électorale centrale et tente d'afficher de faux résultats. La télévision russe diffuse brièvement le faux résultat.",
    auteur: "CyberBerkut (lié au renseignement russe selon plusieurs analyses)",
    source: { nom: "Wikipédia – CyberBerkut", url: "https://en.wikipedia.org/wiki/CyberBerkut" }
  },
  {
    id: 56, date: "2015-04-08", type: "cyber", attribution: "soupconnee",
    pays: "FRA", lieu: "Paris (TV5Monde)", lat: 48.84, lng: 2.27,
    titre: "TV5Monde : la chaîne coupée par des pirates",
    description: "Les 12 chaînes de TV5Monde sont coupées et ses réseaux sociaux piratés au nom d'un « Cybercalifat ». L'enquête française s'oriente ensuite vers le groupe russe APT28, qui se serait fait passer pour des djihadistes.",
    auteur: "APT28 / Fancy Bear (GRU), selon l'enquête",
    source: { nom: "Ozap", url: "https://www.ozap.com/actu/piratage-de-tv5-monde-sur-la-piste-de-hackers-russes/469666" }
  },
  {
    id: 57, date: "2015-05-01", type: "cyber", attribution: "officielle",
    pays: "DEU", lieu: "Berlin (Bundestag)", lat: 52.52, lng: 13.38,
    titre: "Piratage du Bundestag",
    description: "Des pirates infiltrent le réseau du Parlement allemand et volent au moins 16 Go de données, dont des e-mails du bureau d'Angela Merkel. L'Allemagne l'attribue au GRU et l'UE sanctionne les responsables en 2020.",
    auteur: "APT28 / Fancy Bear (GRU, unité 26165)",
    source: { nom: "Wikipédia – Fancy Bear", url: "https://en.wikipedia.org/wiki/Fancy_Bear" }
  },
  {
    id: 58, date: "2015-12-23", type: "cyber", attribution: "officielle",
    pays: "UKR", lieu: "Ivano-Frankivsk", lat: 48.92, lng: 24.71,
    titre: "Première coupure de courant causée par des pirates",
    description: "Pour la première fois au monde, une cyberattaque plonge dans le noir environ 230 000 personnes dans l'ouest de l'Ukraine. Le Royaume-Uni et les États-Unis l'attribuent au GRU.",
    auteur: "Sandworm (GRU, unité 74455)",
    source: { nom: "Wikipédia – 2015 Ukraine power grid hack", url: "https://en.wikipedia.org/wiki/2015_Ukraine_power_grid_hack" }
  },
  {
    id: 59, date: "2016-12-17", type: "cyber", attribution: "officielle",
    pays: "UKR", lieu: "Kyiv (sous-station Pivnichna)", lat: 50.42, lng: 30.56,
    titre: "Industroyer plonge une partie de Kyiv dans le noir",
    description: "Un malware conçu spécialement pour les réseaux électriques coupe le courant dans une partie de Kyiv pendant environ une heure.",
    auteur: "Sandworm (GRU)",
    source: { nom: "Wikipédia – Industroyer", url: "https://en.wikipedia.org/wiki/Industroyer" }
  },
  {
    id: 60, date: "2017-05-05", type: "cyber", attribution: "soupconnee",
    pays: "FRA", lieu: "Paris (campagne d'Emmanuel Macron)", lat: 48.87, lng: 2.32,
    titre: "MacronLeaks : fuite de mails à la veille du second tour",
    description: "Des milliers de mails de l'équipe d'En Marche !, mélangés à de faux documents, sont publiés quelques heures avant la fin de la campagne. APT28 est fortement soupçonné, sans attribution officielle de la France.",
    auteur: "APT28 (soupçonné)",
    source: { nom: "Wikipédia – 2017 Macron e-mail leaks", url: "https://en.wikipedia.org/wiki/2017_Macron_e-mail_leaks" }
  },
  {
    id: 61, date: "2017-06-27", type: "cyber", attribution: "officielle",
    pays: "UKR", lieu: "Kyiv", lat: 50.48, lng: 30.45,
    titre: "NotPetya : la cyberattaque la plus coûteuse de l'histoire",
    description: "Caché dans un logiciel comptable ukrainien, ce faux rançongiciel détruit les données de milliers d'ordinateurs et se propage dans le monde entier (Maersk, Saint-Gobain, Renault…). Les dégâts sont estimés à 10 milliards de dollars. L'UE sanctionne le GRU en 2020.",
    auteur: "Sandworm (GRU)",
    source: { nom: "Wikipédia – 2017 Ukraine ransomware attacks", url: "https://en.wikipedia.org/wiki/2017_Ukraine_ransomware_attacks" }
  },
  {
    id: 62, date: "2018-04-13", type: "cyber", attribution: "officielle",
    pays: "NLD", lieu: "La Haye (OIAC)", lat: 52.09, lng: 4.28,
    titre: "Des agents du GRU pris en flagrant délit devant l'OIAC",
    description: "Quatre agents russes sont arrêtés dans une voiture bourrée d'antennes, garée devant l'Organisation pour l'interdiction des armes chimiques, qui enquêtait sur l'affaire Skripal. Ils tentaient de pirater son réseau Wi-Fi.",
    auteur: "GRU (unité 26165)",
    source: { nom: "Al Jazeera", url: "https://www.aljazeera.com/news/2018/10/4/netherlands-disrupted-russian-hacking-attack-against-opcw" }
  },
  {
    id: 63, date: "2020-08-24", type: "cyber", attribution: "officielle",
    pays: "NOR", lieu: "Oslo (Storting)", lat: 59.91, lng: 10.74,
    titre: "Piratage des mails du Parlement norvégien",
    description: "Des pirates accèdent aux boîtes mail de plusieurs députés et employés. La Norvège désigne la Russie, puis la police identifie APT28.",
    auteur: "APT28 / Fancy Bear (GRU)",
    source: { nom: "Infosecurity Magazine", url: "https://www.infosecurity-magazine.com/news/norwegian-parliament-attack-fancy" }
  },
  {
    id: 64, date: "2021-09-06", type: "cyber", attribution: "officielle",
    pays: "DEU", lieu: "Berlin", lat: 52.53, lng: 13.42,
    titre: "Ghostwriter vise des députés avant les élections",
    description: "Avant les législatives, l'Allemagne proteste officiellement contre des campagnes d'hameçonnage visant des députés, qu'elle attribue au GRU.",
    auteur: "Ghostwriter (attribué au GRU par l'Allemagne)",
    source: { nom: "Security Affairs", url: "https://securityaffairs.com/121958/intelligence/germany-protests-to-russia-attacks.html" }
  },

  // ---------------------------- SABOTAGE ----------------------------
  {
    id: 65, date: "2014-09-05", type: "sabotage", attribution: "officielle",
    pays: "EST", lieu: "Luhamaa (frontière russe)", lat: 57.63, lng: 27.43,
    titre: "Un policier estonien enlevé par le FSB",
    description: "L'agent du renseignement estonien Eston Kohver est enlevé sur le sol estonien par le FSB, puis condamné à 15 ans de prison en Russie. Il est libéré un an plus tard lors d'un échange de prisonniers.",
    auteur: "FSB",
    source: { nom: "Wikipédia – Eston Kohver", url: "https://en.wikipedia.org/wiki/Eston_Kohver" }
  },
  {
    id: 66, date: "2014-10-16", type: "sabotage", attribution: "officielle",
    pays: "CZE", lieu: "Vrbětice", lat: 49.08, lng: 17.93,
    titre: "Explosions des dépôts de munitions de Vrbětice",
    description: "Deux explosions détruisent des dépôts contenant des munitions destinées à un marchand d'armes bulgare. Deux employés sont tués. En 2021, la Tchéquie les attribue à l'unité 29155 du GRU et expulse 18 diplomates russes.",
    auteur: "GRU (unité 29155)",
    source: { nom: "Wikipédia – Unit 29155", url: "https://en.wikipedia.org/wiki/Unit_29155" }
  },
  {
    id: 67, date: "2015-04-28", type: "sabotage", attribution: "officielle",
    pays: "BGR", lieu: "Sofia", lat: 42.70, lng: 23.32,
    titre: "Empoisonnement du marchand d'armes Emilian Gebrev",
    description: "Le propriétaire d'une usine d'armes qui fournissait l'Ukraine est empoisonné avec son fils et un cadre, et survit. En 2020, la justice bulgare inculpe trois agents russes, de la même unité que dans l'affaire Skripal.",
    auteur: "GRU (unité 29155)",
    source: { nom: "Wikipédia – Unit 29155", url: "https://en.wikipedia.org/wiki/Unit_29155" }
  },
  {
    id: 68, date: "2018-03-04", type: "sabotage", attribution: "officielle",
    pays: "GBR", lieu: "Salisbury", lat: 51.07, lng: -1.79,
    titre: "Empoisonnement de Sergueï Skripal au Novitchok",
    description: "L'ancien agent double et sa fille sont empoisonnés avec un agent neurotoxique militaire. Une habitante, Dawn Sturgess, meurt plus tard après avoir touché le flacon abandonné. Le Royaume-Uni inculpe des officiers du GRU ; plus de 150 diplomates russes sont expulsés dans le monde.",
    auteur: "GRU (unité 29155)",
    source: { nom: "Wikipédia – Poisoning of the Skripals", url: "https://en.wikipedia.org/wiki/Poisoning_of_Sergei_and_Yulia_Skripal" }
  },
  {
    id: 69, date: "2019-08-23", type: "sabotage", attribution: "officielle",
    pays: "DEU", lieu: "Berlin (parc du Tiergarten)", lat: 52.51, lng: 13.35,
    titre: "Assassinat du Tiergarten",
    description: "Un ancien commandant tchétchène, Zelimkhan Khangoshvili, est abattu en plein jour dans un parc de Berlin. En 2021, la justice allemande condamne Vadim Krassikov et conclut à un meurtre commandité par l'État russe. Krassikov est libéré lors d'un échange de prisonniers en 2024.",
    auteur: "FSB",
    source: { nom: "Bellingcat", url: "https://bellingcat.com/bellingcat-statement-on-verdict-of-berlin-kammergericht-tiergarten-murder" }
  },

  // ------------------------- DÉSINFORMATION -------------------------
  {
    id: 70, date: "2016-01-16", type: "desinformation", attribution: "officielle",
    pays: "DEU", lieu: "Berlin (Marzahn)", lat: 52.54, lng: 13.56,
    titre: "« Affaire Lisa » : un faux viol monté en épingle",
    description: "Les médias russes affirment qu'une adolescente germano-russe a été enlevée et violée par des migrants. La police prouve que c'est faux, mais l'affaire provoque des manifestations et Sergueï Lavrov lui-même la relaie. Berlin dénonce une propagande d'État.",
    auteur: "Médias d'État russes",
    source: { nom: "Wikipédia – Affaire Lisa F.", url: "https://en.wikipedia.org/wiki/Criminal_case_of_Lisa_F." }
  },
  {
    id: 71, date: "2016-06-23", type: "desinformation", attribution: "soupconnee",
    pays: "GBR", lieu: "Londres", lat: 51.52, lng: -0.10,
    titre: "Soupçons d'ingérence dans le référendum sur le Brexit",
    description: "Médias d'État russes et comptes automatisés sont actifs pendant la campagne. En 2020, une commission parlementaire reproche au gouvernement de ne jamais avoir enquêté ; aucune preuve d'une ingérence décisive n'a été établie.",
    auteur: "Médias d'État et réseaux russes (soupçonnés)",
    source: { nom: "Wikipédia – Ingérence et Brexit", url: "https://en.wikipedia.org/wiki/Russian_interference_in_the_2016_Brexit_referendum" }
  },
  {
    id: 72, date: "2016-10-16", type: "desinformation", attribution: "soupconnee",
    pays: "MNE", lieu: "Podgorica", lat: 42.44, lng: 19.26,
    titre: "Tentative de coup d'État présumée au Monténégro",
    description: "Le jour des législatives, les autorités affirment avoir déjoué un complot visant à renverser le gouvernement pour empêcher l'adhésion à l'OTAN, avec deux officiers russes. Condamnés en 2019, tous les accusés sont finalement acquittés en appel.",
    auteur: "Agents russes présumés (acquittés)",
    source: { nom: "Wikipédia – 2016 Montenegrin coup plot", url: "https://en.wikipedia.org/wiki/2016_Montenegrin_coup_plot" }
  },
  {
    id: 73, date: "2017-10-01", type: "desinformation", attribution: "soupconnee",
    pays: "ESP", lieu: "Barcelone", lat: 41.39, lng: 2.17,
    titre: "Désinformation autour du référendum catalan",
    description: "Le gouvernement espagnol informe l'UE que de nombreux messages et faux comptes amplifiant le conflit sont venus de Russie, notamment via RT et Sputnik.",
    auteur: "Médias d'État et comptes liés à la Russie (soupçonnés)",
    source: { nom: "The Local (Espagne)", url: "https://www.thelocal.es/20171114/spain-tells-eu-it-suspects-russian-meddling-in-catalonia" }
  },
  {
    id: 74, date: "2018-09-30", type: "desinformation", attribution: "soupconnee",
    pays: "MKD", lieu: "Skopje", lat: 42.00, lng: 21.43,
    titre: "Campagne contre le référendum macédonien",
    description: "Avant le référendum sur le changement de nom du pays (condition pour entrer dans l'OTAN), les États-Unis accusent la Russie de financer et d'amplifier les appels au boycott en ligne.",
    auteur: "Réseaux liés à la Russie (soupçonnés)",
    source: { nom: "Wikipédia – 2018 Macedonian referendum", url: "https://en.wikipedia.org/wiki/2018_Macedonian_referendum" }
  },

  // ----------------------- ESPACE AÉRIEN / DRONES -------------------
  {
    id: 75, date: "2014-09-17", type: "aerien", attribution: "officielle",
    pays: "SWE", lieu: "Au large d'Öland", lat: 56.60, lng: 17.20,
    titre: "Deux bombardiers russes violent l'espace aérien suédois",
    description: "Deux Su-24 pénètrent dans l'espace aérien suédois. Le ministre des Affaires étrangères, Carl Bildt, parle de la violation « la plus grave » depuis des années.",
    auteur: "Forces aériennes russes",
    source: { nom: "The Aviationist", url: "https://theaviationist.com/2014/09/19/su-24-violated-swedish-airspace/" }
  },
  {
    id: 76, date: "2014-12-12", type: "aerien", attribution: "officielle",
    pays: "SWE", lieu: "Au sud de Malmö", lat: 55.35, lng: 12.95,
    titre: "Un avion espion russe frôle un avion de ligne",
    description: "Un avion militaire russe volant transpondeur éteint passe près d'un avion de passagers au décollage de Copenhague. La Suède confirme qu'il s'agissait d'un appareil russe.",
    auteur: "Forces aériennes russes",
    source: { nom: "The Aviationist", url: "https://theaviationist.com/2014/12/14/near-collision-off-sweden" }
  },
  {
    id: 77, date: "2015-11-24", type: "aerien", attribution: "officielle",
    pays: "TUR", lieu: "Yayladağı (frontière syrienne)", lat: 35.90, lng: 36.06,
    titre: "La Turquie abat un bombardier russe",
    description: "Après une violation de son espace aérien et des avertissements, la Turquie, membre de l'OTAN, abat un Su-24 russe. C'est la première fois depuis les années 1950 qu'un pays de l'OTAN abat un avion russe ou soviétique.",
    auteur: "Forces aériennes russes",
    source: { nom: "Wikipédia – Su-24 shootdown", url: "https://en.wikipedia.org/wiki/2015_Russian_Sukhoi_Su-24_shootdown" }
  },
  {
    id: 78, date: "2018-11-01", type: "aerien", attribution: "officielle",
    pays: "NOR", lieu: "Finnmark", lat: 69.70, lng: 25.00,
    titre: "Brouillage GPS pendant l'exercice Trident Juncture",
    description: "Pendant le plus grand exercice de l'OTAN depuis la guerre froide, le signal GPS est brouillé dans le nord de la Norvège et de la Finlande, perturbant l'aviation civile. Oslo désigne des forces russes basées dans la péninsule de Kola.",
    auteur: "Guerre électronique russe",
    source: { nom: "Military Times", url: "https://www.militarytimes.com/electronic-warfare/2018/11/13/norway-says-russia-jammed-gps-signal-during-nato-drill/" }
  }
];
