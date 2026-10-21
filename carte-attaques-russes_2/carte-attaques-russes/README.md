# Guerre hybride Russie–Europe — carte interactive

Carte de l'Europe (Russie comprise) qui recense **78 attaques russes documentées depuis 2014** contre des pays européens, réparties en quatre catégories :

| Type | Symbole | Exemples |
|---|---|---|
| Cyberattaques | ● bleu | NotPetya, Bundestag, TV5Monde, Viasat KA-SAT, barrage norvégien |
| Sabotages | ▲ orange | Vrbětice, Skripal, Marywilska 44, colis DHL, voie ferrée Varsovie–Lublin |
| Désinformation / ingérence | ■ violet | Affaire Lisa, Doppelgänger, présidentielle roumaine annulée, Moldavie |
| Espace aérien / drones | ◆ jaune | Su-24 abattu par la Turquie, drones abattus en Pologne, MiG-31 en Estonie |

Un bouton en haut de page permet de **basculer dans l'autre sens** : « Attaques contre la Russie », avec **24 attaques documentées depuis 2014**.

| Type | Exemples |
|---|---|
| Cyberattaques | SurkovLeaks, US Cyber Command contre la ferme à trolls (2018), IT Army of Ukraine, Aeroflot |
| Sabotages & assassinats | Pont de Crimée, général Kirillov, Daria Douguina, tunnel de Sibérie |
| Guerre de l'information | Faux discours de Poutine sur des radios piratées, images de guerre diffusées par Anonymous |
| Frappes de drones (actes de guerre) | Kremlin 2023, opération « Toile d'araignée », raffineries de Moscou et d'Omsk |

## Lancer le projet

Double-cliquer sur `index.html`. Il n'y a rien à installer ; il faut juste une connexion internet pour charger D3.js et les polices.

## Arborescence

```
projet/
├── index.html          → structure de la page (en-tête, panneau, carte)
├── css/style.css       → mise en forme (variables CSS, grille, responsive)
├── js/app.js           → toute la logique (carte, filtres, zoom, fiches)
└── data/
    ├── incidents.js              → attaques russes en Europe (à enrichir)
    ├── attaques-contre-russie.js → attaques contre la Russie
    └── pays.js         → les frontières des pays au format GeoJSON
```

## Fonctionnalités

- **Deux sens de lecture** : en mode « Attaques russes », les pays visés sont colorés en rouge et la Russie est hachurée. En mode « Attaques contre la Russie », la Russie (cible) est en rouge et les pays d'origine des attaques sont colorés en bleu. Les attaques venues de pays absents de la carte (États-Unis) ou d'origine internationale (Anonymous) sont signalées dans la légende.
- **Trajectoires animées** : chaque incident est relié à son point d'origine (Moscou, ou Kyiv / Minsk / États-Unis dans l'autre sens) par une courbe qui se dessine, puis des tirets défilent pour montrer le sens de l'attaque. Au clic sur un incident, sa ligne ressort et les autres s'estompent. Une case permet de masquer les lignes.
- **Bouton « Rejouer la chronologie »** : les attaques réapparaissent une par une dans l'ordre des dates (environ 14 secondes), avec le mois et le titre affichés en haut de la carte. Idéal pour commencer l'oral.
- **Carte choroplèthe** : chaque pays est coloré selon son nombre d'incidents.
- **Marqueurs** avec une couleur **et** une forme par type d'attaque, ce qui reste lisible pour les personnes daltoniennes.
- **Filtres combinables** : type (compteurs en haut), attribution (officielle / revendiquée / soupçonnée), année (graphique cliquable), recherche texte sans tenir compte des accents.
- **Fiche détaillée** au clic : date, lieu, description, auteur présumé et **lien vers la source**.
- **Zoom et déplacement** (molette, glisser, boutons). Les marqueurs gardent la même taille quel que soit le zoom.
- **Anti-chevauchement** : quand plusieurs incidents tombent au même endroit (comme à Paris), une simulation physique les écarte légèrement et un trait les relie à leur vrai emplacement.
- **Responsive** : sur téléphone, la carte passe au-dessus de la liste.
- **Accessibilité** : marqueurs utilisables au clavier (Tab puis Entrée), Échap ferme la fiche.

## Choix techniques à expliquer à l'oral

**Pourquoi D3.js plutôt que Leaflet ?**
Leaflet utilise la projection Mercator, qui grossit énormément le nord (la Russie et la Scandinavie paraissent gigantesques). D3 permet d'utiliser la **projection conique conforme de Lambert**, celle que l'UE utilise pour ses cartes d'Europe. Autre avantage : pas besoin de serveur de tuiles, tout est dessiné en SVG à partir d'un fichier GeoJSON.

**Pourquoi des fichiers `.js` pour les données au lieu de `.json` ?**
Un `fetch("incidents.json")` est bloqué par le navigateur quand on ouvre la page en double-cliquant (protocole `file://`, règle CORS). En déclarant les données dans une constante JavaScript (`const INCIDENTS = [...]`), le projet fonctionne sans serveur. Sur un vrai site, on passerait à un `.json` chargé avec `fetch()`, ou à une API.

**Une seule source de vérité : l'objet `etat`.**
Tous les filtres modifient l'objet `etat`, puis `toutMettreAJour()` redessine chaque partie de l'interface à partir de lui. C'est le même principe que React ou Vue, mais en JavaScript pur.

**La bascule entre les deux sens** repose sur un objet de configuration `SENS` : pour chaque sens, il indique quelles données afficher, quels titres, quelle zone cadrer et quel champ utiliser pour colorier les pays (`pays` visé, ou `origine` de l'attaque). Changer de sens revient à changer `etat.sens`, puis à tout redessiner. Le même code sert pour les deux cartes.

**Comment la ligne « se dessine »** : on mesure la longueur de la courbe avec `getTotalLength()`, on la transforme en un seul long tiret (`stroke-dasharray`) qu'on décale de toute sa longueur (`stroke-dashoffset`), puis on anime ce décalage jusqu'à 0. La courbe est une **courbe de Bézier quadratique** (commande SVG `Q`) dont le point de contrôle est décalé perpendiculairement pour bomber la ligne. Les animations sont désactivées si l'utilisateur a demandé « réduire les animations » dans son système (`prefers-reduced-motion`), par souci d'accessibilité.

**Le « data join » de D3** (`.data(...).join(...)`) associe chaque incident à un élément SVG : D3 crée les nouveaux marqueurs, met à jour ceux qui existent et supprime ceux qui disparaissent, avec une animation.

**La Crimée** est rattachée à l'Ukraine dans `pays.js`, conformément au droit international et à la position de la France. Les données brutes de Natural Earth la placent en Russie ; le script de préparation l'a corrigé.

## Méthode et limites (à mentionner, un jury apprécie)

- Trois niveaux d'**attribution**, avec la même règle dans les deux sens :
  - *officielle* : le pays visé, une justice ou un État tiers désigne officiellement l'auteur ;
  - *revendiquée* : l'auteur (un service d'État ou un groupe comme Killnet ou Anonymous) l'a lui-même revendiquée ;
  - *soupçonnée* : forte suspicion, sans attribution formelle ni revendication.
- **Les deux sens ne sont pas symétriques**, et la carte ne doit pas les présenter comme équivalents :
  - L'Ukraine est **en guerre** contre la Russie, qui l'a envahie. Ses frappes sur le territoire russe sont des opérations militaires d'un pays qui se défend. Elles portent le badge « Acte de guerre », et seules les plus marquantes sont représentées.
  - Les pays européens visés par la Russie, eux, ne sont **pas en guerre** avec elle : c'est ce qui fait de ces attaques de la guerre hybride.
  - Les opérations occidentales contre la Russie sont très rarement rendues publiques. L'opération du Cyber Command américain en 2018 est l'une des rares à avoir été confirmée.
- Quand c'est la Russie qui accuse l'Ukraine (Douguina, Tatarski, général Moskalik), l'attribution est « officielle » selon notre règle, mais la fiche précise toujours « selon la Russie ». Comme on l'a vu, la parole officielle russe est à prendre avec précaution.
- **Exclusions volontaires** :
  - Nord Stream, car l'enquête allemande vise une équipe ukrainienne.
  - Le Balticconnector (2023), endommagé par un navire chinois.
  - Le missile tombé à Przewodów (2022), qui était un missile de la défense antiaérienne ukrainienne.
- Les opérations militaires ne sont pas représentées : annexion de la Crimée (2014), guerre du Donbass, destruction du vol MH17 (2014), bombardements depuis 2022. Côté russe, seules les attaques hybrides y figurent.
- Dans l'autre sens, ne figurent pas non plus les combats sur le front, l'incursion ukrainienne dans la région de Koursk (2024), ni les actions menées dans les territoires ukrainiens occupés.
- Certains dossiers anciens ont évolué avec le temps et la carte l'indique :
  - Monténégro 2016 : les accusés, condamnés en 2019, ont été acquittés en appel. L'incident est donc classé « soupçonné ».
  - Brexit 2016 : aucune preuve d'ingérence décisive n'a été établie. Il est aussi classé « soupçonné ».
- On voit un creux entre 2019 et 2021. Il ne veut pas dire que la Russie a cessé ses activités : beaucoup d'affaires de cette période sont restées confidentielles ou ont été révélées plus tard.
- La liste n'est pas exhaustive. Les services européens recensent des centaines d'incidents, dont beaucoup restent confidentiels.

## Ajouter un incident

Dans `data/incidents.js` (ou `data/attaques-contre-russie.js`), copier un bloc et le modifier :

```js
{
  id: 79, date: "2026-10-01", type: "cyber", attribution: "soupconnee",
  pays: "FRA", lieu: "Lyon", lat: 45.76, lng: 4.84,
  titre: "…", description: "…", auteur: "…",
  source: { nom: "…", url: "https://…" }
},
```

`pays` est le code ISO à 3 lettres (FRA, DEU, POL…). Pour les attaques contre la Russie, on ajoute `origine` (le pays d'où vient l'attaque, ou `null` si international ou inconnu) et, pour une opération militaire, `acteDeGuerre: true`. Les coordonnées se trouvent facilement sur Google Maps (clic droit sur un lieu).

## Crédits

- Frontières : [Natural Earth](https://www.naturalearthdata.com/) (domaine public)
- Bibliothèque : [D3.js](https://d3js.org/) v7
- Sources des incidents : citées dans chaque fiche (gouvernements, Europol, Viginum/SGDSN, presse, Wikipédia)
