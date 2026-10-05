/* =====================================================================
   CARTE DES ATTAQUES RUSSES EN EUROPE — application principale
   ---------------------------------------------------------------------
   Données utilisées (chargées avant ce fichier dans index.html) :
     - PAYS_GEOJSON            : les frontières des pays (data/pays.js)
     - INCIDENTS               : attaques russes en Europe (data/incidents.js)
     - INCIDENTS_CONTRE_RUSSIE : attaques contre la Russie (data/attaques-contre-russie.js)
   Un bouton en haut de page bascule entre ces deux « sens » de lecture.
   Bibliothèque : D3.js (projection géographique, zoom, dessin SVG)

   Plan du fichier :
     1. Configuration
     2. État de l'application (les filtres choisis)
     3. Filtrage des données
     4. Dessin de la carte (pays + marqueurs)
     5. Zoom et déplacement
     6. Panneau latéral (compteurs, années, liste)
     7. Fiche détaillée et infobulle
     8. Démarrage
   ===================================================================== */


/* ---------------------------------------------------------------------
   1. CONFIGURATION
   --------------------------------------------------------------------- */

// Chaque type d'attaque : un libellé, une couleur et une forme de marqueur.
// Forme + couleur = lisible même pour les personnes daltoniennes.
// Les libellés changent selon le sens de lecture (ex. « Espace aérien »
// côté russe devient « Frappes de drones » côté attaques contre la Russie).
const TYPES = {
  cyber:          { couleur: "#3b9eff", forme: d3.symbolCircle,
                    russe:  { libelle: "Cyberattaques",  court: "Cyber" },
                    contre: { libelle: "Cyberattaques",  court: "Cyber" } },
  sabotage:       { couleur: "#ff7a3d", forme: d3.symbolTriangle,
                    russe:  { libelle: "Sabotages",      court: "Sabotage" },
                    contre: { libelle: "Sabotages & assassinats", court: "Sabotage / assassinat" } },
  desinformation: { couleur: "#b57bff", forme: d3.symbolSquare,
                    russe:  { libelle: "Désinformation", court: "Désinformation" },
                    contre: { libelle: "Guerre de l'info", court: "Guerre de l'information" } },
  aerien:         { couleur: "#f5c542", forme: d3.symbolDiamond,
                    russe:  { libelle: "Espace aérien",  court: "Aérien / drones" },
                    contre: { libelle: "Frappes de drones", court: "Frappe de drones" } }
};

// Libellé d'un type dans le sens de lecture actuel
function libelleType(type, court = false) {
  const l = TYPES[type][etat.sens];
  return court ? l.court : l.libelle;
}

const ATTRIBUTIONS = {
  officielle:  "Attribution officielle",
  revendiquee: "Revendiquée par ses auteurs",
  soupconnee:  "Attribution soupçonnée"
};

// Pays d'origine qui ne sont pas dessinés sur la carte
const NOMS_HORS_CARTE = { USA: "États-Unis" };

const TAILLE_MARQUEUR = 110;      // surface des symboles (px²)
const ESPACE_MARQUEURS = 7.5;     // rayon anti-chevauchement (px)
const ZOOM_MIN = 0.3; // assez bas pour voir la Sibérie
const ZOOM_MAX = 14;


/* ---------------------------------------------------------------------
   2. ÉTAT DE L'APPLICATION
   Toute l'interface est redessinée à partir de cet objet.
   --------------------------------------------------------------------- */
const etat = {
  sens: "russe",                      // "russe" = attaques russes | "contre" = attaques contre la Russie
  types: new Set(Object.keys(TYPES)), // types affichés
  attribution: "toutes",              // "toutes" | "officielle" | "soupconnee"
  annee: null,                        // null = toutes les années
  recherche: "",
  selection: null                     // incident actuellement ouvert
};


/* ---------------------------------------------------------------------
   3. FILTRAGE
   --------------------------------------------------------------------- */

// Enlève les accents et met en minuscules, pour une recherche tolérante.
function normaliser(texte) {
  return texte.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

// Nom français d'un pays à partir de son code ISO (ex. "FRA" -> "France")
const nomsPays = new Map(PAYS_GEOJSON.features.map(f => [f.properties.iso, f.properties.name]));

// Filtre complet. `ignorer` permet d'ignorer un critère
// (utile pour le graphique par année, qui ne doit pas se filtrer lui-même).
function nomPays(iso) {
  if (!iso) return "International / inconnu";
  return nomsPays.get(iso) || NOMS_HORS_CARTE[iso] || iso;
}

function incidentsFiltres(ignorer = null) {
  const q = normaliser(etat.recherche.trim());
  return SENS[etat.sens].donnees.filter(inc => {
    if (ignorer !== "type" && !etat.types.has(inc.type)) return false;
    if (etat.attribution !== "toutes" && inc.attribution !== etat.attribution) return false;
    if (ignorer !== "annee" && etat.annee && !inc.date.startsWith(etat.annee)) return false;
    if (q) {
      const texte = normaliser([inc.titre, inc.lieu, inc.auteur, inc.description, nomPays(inc.pays), inc.origine ? nomPays(inc.origine) : ""].join(" "));
      if (!texte.includes(q)) return false;
    }
    return true;
  }).sort((a, b) => b.date.localeCompare(a.date)); // du plus récent au plus ancien
}


/* ---------------------------------------------------------------------
   4. DESSIN DE LA CARTE
   --------------------------------------------------------------------- */
const conteneur = document.getElementById("carte");
const svg = d3.select("#svg-carte");

// Projection conique conforme de Lambert : la projection officielle
// de l'UE pour les cartes d'Europe (moins de déformation que Mercator).
const projection = d3.geoConicConformal()
  .rotate([-20, 0])
  .parallels([40, 65]);
const chemin = d3.geoPath(projection);

// Zone affichée au démarrage : de l'Atlantique à l'Oural.
const ZONE_INITIALE = {
  type: "MultiPoint",
  coordinates: [[-10, 35], [-10, 60], [30, 71], [55, 66], [52, 40], [25, 34]]
};
// Sur téléphone, on cadre plus serré (sinon l'Europe est minuscule)
const ZONE_MOBILE = {
  type: "MultiPoint",
  coordinates: [[-8, 37], [-4, 58], [26, 68], [38, 55], [30, 40], [15, 37]]
};

// Dans le sens « contre la Russie », on cadre sur la Russie d'Europe
const ZONE_CONTRE = {
  type: "MultiPoint",
  coordinates: [[19, 44], [19, 66], [40, 70], [62, 64], [60, 46], [38, 43]]
};

// Tout ce qui change entre les deux sens de lecture
const SENS = {
  russe: {
    donnees: INCIDENTS,
    titre: "Guerre hybride russe en Europe",
    sousTitre: n => `${n} incidents documentés depuis 2014 · cyberattaques, sabotages, désinformation, violations de l'espace aérien`,
    legende: "Incidents par pays visé",
    legendeRussie: "Russie (agresseur)",
    pied: "La guerre conventionnelle en Ukraine n'est pas représentée.",
    zone: ZONE_INITIALE, zoneMobile: ZONE_MOBILE,
    clePays: inc => inc.pays          // on colorie les pays visés
  },
  contre: {
    donnees: INCIDENTS_CONTRE_RUSSIE,
    titre: "Attaques contre la Russie",
    sousTitre: n => `${n} attaques documentées depuis 2014 · cyber, sabotages et assassinats, guerre de l'information, frappes de drones marquantes`,
    legende: "Attaques par pays d'origine",
    legendeRussie: "Russie (cible)",
    pied: "Les frappes ukrainiennes sont des actes de guerre : l'Ukraine se défend contre l'invasion russe. Les combats sur le front ne sont pas représentés.",
    zone: ZONE_CONTRE, zoneMobile: ZONE_CONTRE,
    clePays: inc => inc.origine       // on colorie les pays d'origine
  }
};

// Couches SVG (l'ordre = l'ordre d'empilement)
const defs = svg.append("defs");
const coucheCarte = svg.append("g").attr("class", "couche-carte");     // zoomée
const coucheMarqueurs = svg.append("g").attr("class", "couche-marqueurs"); // position recalculée

// Motif hachuré pour la Russie
defs.append("pattern")
  .attr("id", "hachures").attr("patternUnits", "userSpaceOnUse")
  .attr("width", 6).attr("height", 6).attr("patternTransform", "rotate(45)")
  .call(p => {
    p.append("rect").attr("width", 6).attr("height", 6).attr("fill", "#3a1418");
    p.append("rect").attr("width", 2).attr("height", 6).attr("fill", "#7a2029");
  });

// Échelle de couleur : nombre d'incidents -> couleur du pays
const echelleCouleur = d3.scaleSequentialSqrt(d3.interpolateRgb("#2a2f47", "#8f2f3a"));
const COULEUR_ZERO = "#1c2436";

let largeur = 0, hauteur = 0;
let transformActuel = d3.zoomIdentity;

// Pour les pays en plusieurs morceaux (France + Guyane…), on place
// l'étiquette sur le plus grand morceau.
function centrePrincipal(feature) {
  if (feature.geometry.type !== "MultiPolygon") return chemin.centroid(feature);
  const morceaux = feature.geometry.coordinates.map(c => ({ type: "Polygon", coordinates: c }));
  const plusGrand = d3.greatest(morceaux, m => chemin.area(m));
  return chemin.centroid(plusGrand);
}

function dessinerCarte() {
  largeur = conteneur.clientWidth;
  hauteur = conteneur.clientHeight;
  svg.attr("viewBox", [0, 0, largeur, hauteur]);
  const config = SENS[etat.sens];
  projection.fitExtent([[30, 30], [largeur - 30, hauteur - 30]], largeur < 600 ? config.zoneMobile : config.zone);

  coucheCarte.selectAll("*").remove();

  // Quadrillage (méridiens et parallèles)
  coucheCarte.append("path")
    .datum(d3.geoGraticule10())
    .attr("d", chemin)
    .attr("fill", "none").attr("stroke", "#18213a").attr("stroke-width", .5)
    .attr("vector-effect", "non-scaling-stroke");

  // Pays
  coucheCarte.append("g").selectAll("path")
    .data(PAYS_GEOJSON.features)
    .join("path")
      .attr("d", chemin)
      .attr("class", d => {
        if (d.properties.iso === "RUS") return etat.sens === "contre" ? "pays pays--russie pays--cible" : "pays pays--russie";
        return d.properties.europe ? "pays pays--europe" : "pays pays--hors";
      })
      .on("mousemove", (event, d) => afficherInfobullePays(event, d))
      .on("mouseleave", cacherInfobulle);

  // Étiquettes des pays concernés (visés, ou d'origine selon le sens)
  const paysVises = new Set(config.donnees.map(config.clePays).filter(iso => iso && iso !== "RUS"));
  coucheCarte.append("g").selectAll("text")
    .data(PAYS_GEOJSON.features.filter(f => paysVises.has(f.properties.iso)))
    .join("text")
      .attr("class", "etiquette-pays")
      .attr("transform", d => `translate(${centrePrincipal(d)})`)
      .attr("dy", 18)
      .text(d => d.properties.name);

  // Étiquette « Russie »
  coucheCarte.append("text")
    .attr("class", "etiquette-pays etiquette-russie")
    .attr("transform", `translate(${projection([45, 58])})`)
    .text("Russie");

  mettreAJourPays();
  appliquerZoom(transformActuel);
}

// Colorie chaque pays selon le nombre d'incidents filtrés
function mettreAJourPays() {
  const config = SENS[etat.sens];
  const donnees = incidentsFiltres();
  const compte = d3.rollup(donnees, v => v.length, config.clePays);
  compte.delete("RUS");
  const max = Math.max(1, d3.max([...compte].filter(([iso]) => nomsPays.has(iso)), ([, n]) => n) || 1);
  // Rouge = pays visés ; bleu = pays d'origine (pour ne pas confondre avec la Russie, cible en rouge)
  echelleCouleur
    .interpolator(etat.sens === "contre" ? d3.interpolateRgb("#2a2f47", "#2f6fb5") : d3.interpolateRgb("#2a2f47", "#8f2f3a"))
    .domain([0, max]);

  coucheCarte.selectAll(".pays").attr("fill", d => {
    if (d.properties.iso === "RUS") return etat.sens === "contre" ? "#5a2530" : "url(#hachures)";
    if (!d.properties.europe) return null; // couleur gérée par le CSS
    const n = compte.get(d.properties.iso) || 0;
    return n ? echelleCouleur(n) : COULEUR_ZERO;
  });

  // Légende
  document.getElementById("legende-titre").textContent = config.legende;
  document.getElementById("legende-russie").textContent = config.legendeRussie;
  document.getElementById("legende-symbole-russie").classList.toggle("hachure--cible", etat.sens === "contre");
  // Attaques venant de pays absents de la carte (États-Unis) ou d'origine internationale
  const horsCarte = [...compte].filter(([iso]) => !nomsPays.has(iso))
    .map(([iso, n]) => `${nomPays(iso)} : ${n}`);
  document.getElementById("legende-note").textContent = horsCarte.length ? `Hors carte · ${horsCarte.join(" · ")}` : "";
  document.getElementById("legende-max").textContent = max;
  document.querySelector(".legende__degrade").style.background =
    `linear-gradient(90deg, ${COULEUR_ZERO}, ${echelleCouleur(max / 4)}, ${echelleCouleur(max)})`;
}

// Petite icône SVG d'un type (réutilisée dans la liste, la fiche, etc.)
function iconeType(type, taille = 14) {
  const d = d3.symbol(TYPES[type].forme, taille * taille * 0.55)();
  return `<svg width="${taille}" height="${taille}" viewBox="${-taille / 2} ${-taille / 2} ${taille} ${taille}" aria-hidden="true">
            <path d="${d}" fill="${TYPES[type].couleur}"/></svg>`;
}

/* ---- Marqueurs ------------------------------------------------------
   Les marqueurs ne sont PAS agrandis par le zoom (ils garderaient sinon
   une taille énorme). On recalcule leur position à l'écran à chaque zoom.
   Quand plusieurs incidents sont au même endroit (Paris…), une petite
   simulation physique (d3.forceCollide) les écarte pour qu'on puisse
   tous les cliquer ; un trait les relie à leur vrai emplacement.
   --------------------------------------------------------------------- */
let noeuds = []; // { inc, x0, y0, x, y }

function positionEcran(inc) {
  return transformActuel.apply(projection([inc.lng, inc.lat]));
}

function calculerEcartements() {
  noeuds.forEach(n => { [n.x0, n.y0] = positionEcran(n.inc); n.x = n.x0; n.y = n.y0; });
  const simulation = d3.forceSimulation(noeuds)
    .force("x", d3.forceX(d => d.x0).strength(0.35))
    .force("y", d3.forceY(d => d.y0).strength(0.35))
    .force("collision", d3.forceCollide(ESPACE_MARQUEURS))
    .stop();
  for (let i = 0; i < 90; i++) simulation.tick();
  noeuds.forEach(n => { n.dx = n.x - n.x0; n.dy = n.y - n.y0; });
}

function mettreAJourMarqueurs() {
  const donnees = incidentsFiltres();
  const anciens = new Map(noeuds.map(n => [n.inc.id, n]));
  noeuds = donnees.slice().reverse().map(inc => anciens.get(inc.id) || { inc, dx: 0, dy: 0 }); // récents dessinés au-dessus
  calculerEcartements();

  // Traits de rappel (seulement si le marqueur a été écarté)
  coucheMarqueurs.selectAll("line.lien-decalage")
    .data(noeuds.filter(n => Math.hypot(n.dx, n.dy) > 3), n => n.inc.id)
    .join("line").attr("class", "lien-decalage");

  const groupes = coucheMarqueurs.selectAll("g.marqueur")
    .data(noeuds, n => n.inc.id)
    .join(
      entree => {
        const g = entree.append("g")
          .attr("class", "marqueur")
          .attr("tabindex", 0)
          .attr("role", "button")
          .attr("aria-label", n => `${n.inc.titre}, ${n.inc.lieu}`)
          .on("click", (event, n) => { event.stopPropagation(); selectionner(n.inc); })
          .on("keydown", (event, n) => { if (event.key === "Enter") selectionner(n.inc); })
          .on("mousemove", (event, n) => afficherInfobulleIncident(event, n.inc))
          .on("mouseleave", cacherInfobulle);
        g.append("circle").attr("class", "halo").attr("r", 8).attr("stroke", n => TYPES[n.inc.type].couleur);
        g.append("path")
          .attr("d", n => d3.symbol(TYPES[n.inc.type].forme, TAILLE_MARQUEUR)())
          .attr("fill", n => TYPES[n.inc.type].couleur);
        g.attr("opacity", 0).transition("apparition").duration(300).attr("opacity", 1);
        return g;
      },
      maj => maj,
      sortie => sortie.attr("class", "marqueur-sortant").style("pointer-events", "none")
        .transition("disparition").duration(200).attr("opacity", 0).remove()
    );
  groupes.raise();
  groupes.classed("actif", n => etat.selection && n.inc.id === etat.selection.id);
  placerMarqueurs(true);
}

// Place les marqueurs (avec ou sans animation)
function placerMarqueurs(anime = false) {
  noeuds.forEach(n => { [n.x0, n.y0] = positionEcran(n.inc); });
  const g = coucheMarqueurs.selectAll("g.marqueur");
  const l = coucheMarqueurs.selectAll("line.lien-decalage");
  const cible = anime ? g.transition("position").duration(250) : g.interrupt("position");
  const cibleL = anime ? l.transition("position").duration(250) : l.interrupt("position");
  cible.attr("transform", n => `translate(${n.x0 + n.dx},${n.y0 + n.dy})`);
  cibleL.attr("x1", n => n.x0).attr("y1", n => n.y0)
        .attr("x2", n => n.x0 + n.dx).attr("y2", n => n.y0 + n.dy);
}


/* ---------------------------------------------------------------------
   5. ZOOM ET DÉPLACEMENT
   --------------------------------------------------------------------- */
const zoom = d3.zoom()
  .scaleExtent([ZOOM_MIN, ZOOM_MAX])
  .on("zoom", event => appliquerZoom(event.transform))
  .on("end", () => { calculerEcartements(); placerMarqueurs(true); });

function appliquerZoom(t) {
  transformActuel = t;
  coucheCarte.attr("transform", t);
  // Les étiquettes gardent une taille lisible quel que soit le zoom
  // (on divise par t.k car le groupe entier est agrandi par le zoom)
  const GRANDS_PAYS = ["FRA", "DEU", "POL", "GBR", "ESP", "ITA", "ROU", "UKR", "NOR", "SWE", "FIN"];
  const seuil = largeur < 600 ? 2.2 : 1.3; // en dessous : seulement les grands pays
  coucheCarte.selectAll(".etiquette-pays")
    .style("font-size", d => `${(d ? 11 : 13) / t.k}px`)
    .style("stroke-width", `${3 / t.k}px`)
    .attr("dy", d => d ? 16 / t.k : 0)
    .style("opacity", d => {
      if (!d) return 1;                                   // « Russie » toujours visible
      if (t.k >= seuil) return 1;
      if (largeur < 600) return 0;
      return GRANDS_PAYS.includes(d.properties.iso) ? 1 : 0;
    });
  placerMarqueurs(false);
}

svg.call(zoom).on("dblclick.zoom", null);
svg.on("click", () => fermerFiche()); // clic dans le vide = fermer la fiche

document.getElementById("zoom-plus").onclick  = () => svg.transition().duration(300).call(zoom.scaleBy, 1.6);
document.getElementById("zoom-moins").onclick = () => svg.transition().duration(300).call(zoom.scaleBy, 1 / 1.6);
document.getElementById("zoom-reset").onclick = () => svg.transition().duration(500).call(zoom.transform, d3.zoomIdentity);

// Centre la carte sur un incident
function zoomerSur(inc) {
  const [x, y] = projection([inc.lng, inc.lat]);
  const k = Math.max(transformActuel.k, 3);
  const decalageX = largeur > 860 ? -120 : 0; // laisse de la place à la fiche
  const t = d3.zoomIdentity.translate(largeur / 2 + decalageX, hauteur / 2).scale(k).translate(-x, -y);
  svg.transition().duration(700).call(zoom.transform, t);
}


/* ---------------------------------------------------------------------
   6. PANNEAU LATÉRAL
   --------------------------------------------------------------------- */
function formaterDate(iso, format = "long") {
  const options = format === "long"
    ? { day: "numeric", month: "long", year: "numeric" }
    : { day: "2-digit", month: "short", year: "numeric" };
  return new Date(iso + "T12:00:00").toLocaleDateString("fr-FR", options);
}

// Compteurs par type (en haut), qui servent aussi de boutons de filtre
function mettreAJourStats() {
  const sansFiltreType = incidentsFiltres("type");
  const compte = d3.rollup(sansFiltreType, v => v.length, d => d.type);

  d3.select("#stats").selectAll("button.stat")
    .data(Object.entries(TYPES), ([cle]) => cle)
    .join(entree => {
      const b = entree.append("button").attr("type", "button").attr("class", "stat")
        .on("click", (event, [cle]) => {
          etat.types.has(cle) ? etat.types.delete(cle) : etat.types.add(cle);
          if (etat.types.size === 0) Object.keys(TYPES).forEach(t => etat.types.add(t)); // jamais tout vide
          toutMettreAJour();
        });
      b.html(([cle]) => `${iconeType(cle, 16)}<span class="stat__nombre"></span><span class="stat__libelle"></span>`);
      return b;
    })
    .attr("aria-pressed", ([cle]) => etat.types.has(cle))
    .call(b => b.select(".stat__nombre").text(([cle]) => compte.get(cle) || 0))
    .call(b => b.select(".stat__libelle").text(([cle]) => libelleType(cle)));
}

// Titre, sous-titre et note de bas de page selon le sens de lecture
function mettreAJourEntete() {
  const config = SENS[etat.sens];
  document.getElementById("titre-principal").textContent = config.titre;
  document.getElementById("sous-titre").textContent = config.sousTitre(config.donnees.length);
  document.getElementById("pied-note").textContent = config.pied;
}

// Mini-graphique empilé par année
function mettreAJourAnnees() {
  const donnees = incidentsFiltres("annee");
  const annees = d3.range(2014, new Date().getFullYear() + 1).map(String);
  const parAnnee = annees.map(a => {
    const liste = donnees.filter(i => i.date.startsWith(a));
    return { annee: a, total: liste.length, parType: Object.keys(TYPES).map(t => [t, liste.filter(i => i.type === t).length]) };
  });
  const max = d3.max(parAnnee, d => d.total) || 1;
  const hauteurMax = 60;

  d3.select("#annees").selectAll("button.annee")
    .data(parAnnee, d => d.annee)
    .join(entree => {
      const b = entree.append("button").attr("type", "button").attr("class", "annee")
        .on("click", (event, d) => { etat.annee = etat.annee === d.annee ? null : d.annee; toutMettreAJour(); });
      b.append("span").attr("class", "annee__nombre");
      b.append("span").attr("class", "annee__barre");
      b.append("span").attr("class", "annee__libelle").text(d => "’" + d.annee.slice(2)); // ’14, ’15…
      return b;
    })
    .attr("aria-pressed", d => !etat.annee || etat.annee === d.annee)
    .attr("aria-label", d => `${d.annee} : ${d.total} incidents`)
    .attr("title", d => `${d.annee} : ${d.total} incident${d.total > 1 ? "s" : ""}`)
    .call(b => b.select(".annee__nombre").text(d => d.total))
    .call(b => b.select(".annee__barre").html(d => d.parType
      .filter(([, n]) => n > 0)
      .map(([t, n]) => `<span style="height:${(n / max) * hauteurMax}px;background:${TYPES[t].couleur}"></span>`)
      .join("")));
}

// Liste des incidents
function mettreAJourListe() {
  const donnees = incidentsFiltres();
  document.getElementById("compteur-liste").textContent = `${donnees.length} affiché${donnees.length > 1 ? "s" : ""}`;

  const liste = d3.select("#liste");
  liste.selectAll(".liste__vide").remove();
  if (donnees.length === 0) {
    liste.selectAll("li").remove();
    liste.append("li").attr("class", "liste__vide").text("Aucun incident ne correspond à ces filtres.");
    return;
  }

  liste.selectAll("li")
    .data(donnees, d => d.id)
    .join(entree => {
      const li = entree.append("li");
      li.append("button").attr("type", "button")
        .on("click", (event, d) => selectionner(d))
        .html(d => `${iconeType(d.type)}
          <span>
            <div class="liste__titre">${d.titre}</div>
            <div class="liste__meta">${formaterDate(d.date, "court")} · ${etat.sens === "contre" ? d.lieu : nomPays(d.pays)}</div>
          </span>`);
      return li;
    })
    .order()
    .select("button").classed("actif", d => etat.selection && d.id === etat.selection.id);
}

// Écouteurs des filtres
document.getElementById("recherche").addEventListener("input", e => {
  etat.recherche = e.target.value;
  toutMettreAJour();
});

document.querySelectorAll("#filtre-attribution button").forEach(bouton => {
  bouton.addEventListener("click", () => {
    etat.attribution = bouton.dataset.valeur;
    document.querySelectorAll("#filtre-attribution button")
      .forEach(b => b.classList.toggle("actif", b === bouton));
    toutMettreAJour();
  });
});


/* ---------------------------------------------------------------------
   7. FICHE DÉTAILLÉE ET INFOBULLE
   --------------------------------------------------------------------- */
const fiche = document.getElementById("fiche");
const infobulle = document.getElementById("infobulle");

function selectionner(inc) {
  etat.selection = inc;
  const t = TYPES[inc.type];
  document.getElementById("fiche-contenu").innerHTML = `
    <div class="badges">
      <span class="badge" style="color:${t.couleur}">${iconeType(inc.type, 12)} ${libelleType(inc.type, true)}</span>
      <span class="badge badge--${inc.attribution}">${ATTRIBUTIONS[inc.attribution]}</span>
      ${inc.acteDeGuerre ? `<span class="badge badge--guerre" title="Opération militaire d'un pays en guerre, pas de la guerre hybride">Acte de guerre</span>` : ""}
    </div>
    <h3>${inc.titre}</h3>
    <p class="fiche__lieu">${inc.lieu} · ${nomPays(inc.pays)}</p>
    <p>${inc.description}</p>
    <dl>
      <dt>Date</dt><dd>${formaterDate(inc.date)}</dd>
      <dt>Auteur présumé</dt><dd>${inc.auteur}</dd>
      ${etat.sens === "contre" ? `<dt>Origine</dt><dd>${nomPays(inc.origine)}</dd>` : ""}
      <dt>Source</dt><dd><a href="${inc.source.url}" target="_blank" rel="noopener">${inc.source.nom} ↗</a></dd>
    </dl>`;
  fiche.hidden = false;
  cacherInfobulle();

  coucheMarqueurs.selectAll("g.marqueur").classed("actif", n => n.inc.id === inc.id);
  d3.selectAll("#liste button").classed("actif", d => d.id === inc.id);
  const bouton = d3.selectAll("#liste button").filter(d => d.id === inc.id).node();
  if (bouton) bouton.scrollIntoView({ block: "nearest", behavior: "smooth" });

  zoomerSur(inc);
}

function fermerFiche() {
  etat.selection = null;
  fiche.hidden = true;
  coucheMarqueurs.selectAll("g.marqueur").classed("actif", false);
  d3.selectAll("#liste button").classed("actif", false);
}
document.getElementById("fiche-fermer").onclick = fermerFiche;
document.addEventListener("keydown", e => { if (e.key === "Escape") fermerFiche(); });

function positionnerInfobulle(event) {
  const [x, y] = d3.pointer(event, conteneur);
  const gauche = Math.min(x + 14, largeur - infobulle.offsetWidth - 8);
  infobulle.style.left = `${gauche}px`;
  infobulle.style.top = `${y + 14}px`;
}

function afficherInfobulleIncident(event, inc) {
  infobulle.innerHTML = `<strong>${inc.titre}</strong><span>${formaterDate(inc.date, "court")} · ${inc.lieu}</span>`;
  infobulle.hidden = false;
  positionnerInfobulle(event);
}

function afficherInfobullePays(event, feature) {
  const iso = feature.properties.iso;
  if (!feature.properties.europe && iso !== "RUS") return cacherInfobulle();
  const config = SENS[etat.sens];
  if (iso === "RUS") {
    const n = incidentsFiltres().length;
    infobulle.innerHTML = etat.sens === "contre"
      ? `<strong>Russie</strong><span>Pays visé · ${n} attaque${n > 1 ? "s" : ""} avec ces filtres</span>`
      : `<strong>Russie</strong><span>Pays à l'origine des attaques</span>`;
  } else {
    const liste = incidentsFiltres().filter(i => config.clePays(i) === iso);
    const detail = Object.keys(TYPES)
      .map(t => [t, liste.filter(i => i.type === t).length])
      .filter(([, n]) => n)
      .map(([t, n]) => `${n} ${libelleType(t, true).toLowerCase()}`)
      .join(" · ");
    infobulle.innerHTML = `<strong>${feature.properties.name}</strong>
      <span>${liste.length
        ? `${liste.length} ${etat.sens === "contre" ? "attaque" : "incident"}${liste.length > 1 ? "s" : ""}${etat.sens === "contre" ? " depuis ce pays" : ""} — ${detail}`
        : "Aucun incident avec ces filtres"}</span>`;
  }
  infobulle.hidden = false;
  positionnerInfobulle(event);
}

function cacherInfobulle() { infobulle.hidden = true; }


/* ---------------------------------------------------------------------
   8. DÉMARRAGE
   --------------------------------------------------------------------- */
function toutMettreAJour() {
  // Si l'incident ouvert disparaît des filtres, on ferme sa fiche
  if (etat.selection && !incidentsFiltres().some(i => i.id === etat.selection.id)) fermerFiche();
  mettreAJourEntete();
  mettreAJourStats();
  mettreAJourAnnees();
  mettreAJourListe();
  mettreAJourPays();
  mettreAJourMarqueurs();
}

// Bascule entre « Attaques russes » et « Attaques contre la Russie »
document.querySelectorAll("#filtre-sens button").forEach(bouton => {
  bouton.addEventListener("click", () => {
    if (etat.sens === bouton.dataset.valeur) return;
    etat.sens = bouton.dataset.valeur;
    document.querySelectorAll("#filtre-sens button").forEach(b => {
      b.classList.toggle("actif", b === bouton);
      b.setAttribute("aria-checked", b === bouton);
    });
    fermerFiche();
    etat.annee = null;
    transformActuel = d3.zoomIdentity;
    svg.call(zoom.transform, d3.zoomIdentity);
    dessinerCarte();   // recadre la carte et recalcule les étiquettes
    toutMettreAJour();
  });
});

dessinerCarte();
toutMettreAJour();

// Redessine la carte quand la fenêtre change de taille
let minuterie;
window.addEventListener("resize", () => {
  clearTimeout(minuterie);
  minuterie = setTimeout(() => {
    transformActuel = d3.zoomIdentity;
    svg.call(zoom.transform, d3.zoomIdentity);
    dessinerCarte();
    mettreAJourMarqueurs();
  }, 150);
});
