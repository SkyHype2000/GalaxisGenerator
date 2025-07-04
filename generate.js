const fs = require("fs");
const seedrandom = require("seedrandom");
const cc = require("./consolecolor.jsdb.js")

//// throw new Error("test")

/**
 * Die Config wo alle Informationen aufgeschrieben sind.\
 * Ohne sie würde alles den Bach Runter gehen XD.
 * 
 * Sie beinhaltet nur die Basic Informationen, die Ressourcen werden in ./resource_config.json gespeichert
 * 
 * Ich sollte mal schlafen gehen, wir haben es am 19.06.2025 um 02:02 Uhr Morgens XD.
 */
const config = require('./config.jsdb.js');

/**Alle Ressourceninformationen */
const res = require('./resources.jsdb.js');

/**Der seed basierend auf der config.json/seed */
const rng = seedrandom(config.seed);



/**Die Gravitationskonstante @type {6.67430e-11}*/
const G = 6.67430e-11;
/**Stefan Boltzmann Konstante @type {5.670373e-8}*/
const O = 5.670373e-8;
/**Die Länge einer Astronomischen Einheit in Meter @type {149597870700} */
const AE = 149_597_870_700;
/**Die Länge eines Lichtjahres in Meter @type {9460730472580800n} */
const LJ = 9_460_730_472_580_800n;
/**Die Länge eines Jahres in Sekunden @type {31557600} */
const YEAR_IN_SEC = 31_557_600;
/**Masse der Sonne in KG @type {1.9884e30} */
const SUN_MASS_KG = 1.9884e30;
/**Masse der Erde in KG @type {5.972e24} */
const EARTH_MASS_KG = 5.972e24;
/**Die Maximale Anzahl an Planeten die in einem Sternensystem vorhanden sein dürfen @type {number} */
const MAX_PLANETS_PER_SOLSYS = 10;
/**Die Maximale Anzahl an Monden die um einen Planeten vorhanden sein dürfen @type {number} */
const MAX_MOONS_PER_PLANET = 3;

/**
 * Alle Objekte in der Galaxie die bisher Generiert wurden
 * 
 * @type {{type: string, x: number, y: number, name: string, metadata: []}[]} */
const galaxy = [];

/**
 * ähm... ja, danke ChatGPT. XD
 * 
 * Ich glaube das generiert die `x` und `y` koordinaten die nicht
 * weiter als der Radius der Galaxie entfernt sein dürfen
 * 
 * @param r 
 * @param angle 
 * @returns 
 */
function polarToCartesian(r, angle) {
    return {
        x: r * Math.cos(angle),
        y: r * Math.sin(angle)
    };
}

/**
 * Hier wird eine Seedbasierte Distanz generiert.\
 * hab einfach ChatGPT Gefragt lol.
 * 
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function getRandomDistance(min, max) {
    if (max === 0) max = config.radius;

    const exponent = config.exponent || 1; // 1 = linear, >1 = mehr im Zentrum

    //// return min + (max - min) * rng();

    return min + (max - min) * Math.pow(rng(), exponent);
}

/**
 * Die Funktion gibt es Extra dafür um Anomalienamen zu Generieren,
 * ich wollte nicht einfach nur Silben für die Namen verwenden also habe ich mich dafür hier entschieden.
 * 
 * Weil es sich für Anomalien besser anhört
 * 
 * @returns {string}
 */
function generateAnomalyName() {
    /**
     * Die Prefixe, quasi die ersten Zeichen die Verwendet werden.
     * @type {string[]}
     */
    const prefix = ["RX", "ZB", "QK", "VR", "IA", "OR", "PA", "TR"];
    /**
     * Das sind die Suffixe die nach den Prefixen kommen,
     * sie bestehen aus nur eine Zahl oder MK + Zahl.
     * @type {string[]}
     */
    const suffix = [];
    for (let i = 0; i < 99; i++) {
        if (i < 10) suffix.push("-0" + i);
        else suffix.push("-" + i)
    }
    for (let i = 0; i < 99; i++) {
        if (i < 10) suffix.push("-0" + i);
        else suffix.push("-MK" + i)
    }

    return prefix[Math.floor(rng() * prefix.length)] + suffix[Math.floor(rng() * suffix.length)];
}

/**
 * Gibt den Sonnenmassenwert basierend auf x zurück.  
 * Hier wird dafür gesorgt, dass... ja genau das.  
 * Das die Sterne hauptsächlich im Rote-Zwerge Bereich Liegen, bin sehr stolz darauf
 * 
 * @param {number} x wert zwischen `0.0000000000000001` - `1.0000000000000000`
 * @returns {number} wert zwischen `0.0086` - `100+`
 */
function generateSolarMass(x) {
    // Der Minimalwert Basierend auf dem Minimalen wert über 0 vom Seed
    if (x <= 0) x = 0.0000000000000001;

    // Naja einfach den Wert auf 1 Setzen wenn es über 1 Geht, eigentlich unwahrscheinlich wenn man nur den seed selbst verwendet
    if (x > 1) x = 1.0000000000000000;

    return -(1 - Math.pow(x / 1.2, -0.4));
}

/**
 * Alle Validen Werte für jedesSpektrum.
 *
 * Hier habe ich natürlich einige Simplifikationen durchgeführt, besonders bei der Klasse `M`, `L`, `T` und `Y`.  
 * man kann ja nicht immer alles Kompliziert machen
 * 
 * @type {{class: string, name: string, color: string, tempmin:number, tempmax: number, massmin: number, massmax: number}[]}
 */
const VALID_SPECTRAL_CLASS_VALUES = [
    { class: "O", name: "Blau-Weißer Riese", color: "lightblue", tempmin: 30000, tempmax: 60000, massmin: 16, massmax: 9999 },
    { class: "B", name: "Blauer Unterriese", color: "cyan", tempmin: 10000, tempmax: 30000, massmin: 2.1, massmax: 16 },
    { class: "A", name: "Blau-Weißer HRS", color: "lightblue", tempmin: 7500, tempmax: 10000, massmin: 1.7, massmax: 2.1 },
    { class: "F", name: "Weißer HRS", color: "white", tempmin: 6000, tempmax: 7500, massmin: 1.1, massmax: 1.7 },
    { class: "G", name: "Gelber Zwergstern", color: "yellow", tempmin: 5300, tempmax: 6000, massmin: 0.8, massmax: 1.1 },
    { class: "K", name: "Orangener Zwergstern", color: "orange", tempmin: 3500, tempmax: 5300, massmin: 0.5, massmax: 0.8 },
    { class: "M", name: "Roter Zwergstern", color: "red", tempmin: 2500, tempmax: 3500, massmin: 0.05, massmax: 0.5 },
    { class: "L", name: "Brauner Zwergstern", color: "darkred", tempmin: 1300, tempmax: 2500, massmin: 0.03, massmax: 0.05 },
    { class: "T", name: "Kalter Brauner Zwergstern", color: "darkpurple", tempmin: 800, tempmax: 1300, massmin: 0.01, massmax: 0.03 },
    { class: "Y", name: "Extrem Kalter Brauner Zwergstern/Gasriese", color: "darkslategray", tempmin: 0, tempmax: 800, massmin: 0.0083, massmax: 0.01 },
]

/**
 * Alle Validen Werte für jedes Sub-Spektrum.
 * 
 * @type {{class: string, name: string, color: string, tempmin:number, tempmax: number, massmin: number, massmax: number}[]}
 */
const VALID_SUBSPECTRAL_CLASS_VALUES = []

function initSubspectralClassValues() {
    for (let i = 0; i < VALID_SPECTRAL_CLASS_VALUES.length; i++) {
        const e_i = VALID_SPECTRAL_CLASS_VALUES[i];
        for (let j = 0; j < 10; j++) {

            const tempmin = +(e_i.tempmin + ((e_i.tempmax - e_i.tempmin) / 10) * j).toFixed(2);
            const tempmax = +(e_i.tempmin + ((e_i.tempmax - e_i.tempmin) / 10) * (j + 1)).toFixed(2);

            const massmin = +(e_i.massmin + ((e_i.massmax - e_i.massmin) / 10) * j).toFixed(5);
            const massmax = +(e_i.massmin + ((e_i.massmax - e_i.massmin) / 10) * (j + 1)).toFixed(5);

            let data = {
                class: e_i.class + "-" + j,
                name: e_i.name,
                color: e_i.color,
                tempmin,
                tempmax,
                massmin,
                massmax,
            }
            VALID_SUBSPECTRAL_CLASS_VALUES.push(data)
            console.log(JSON.stringify(data));
        }
    }
    fs.writeFileSync("./src/VALID_SUBSPECTRAL_CLASS_VALUES.json", JSON.stringify(VALID_SUBSPECTRAL_CLASS_VALUES, "", 4))
}
initSubspectralClassValues();

/**
 * Die Luminosität der Sonne in Watt
 * @type {number}
 */
const LUM_SOL = 3.828 * Math.pow(10, 26); // W
/**
 * Der Radius der Sonne in KM
 * @type {number}
 */
const R_SOL = 695700; // KM
/**
 * Die (Oberflächen-)Temperatur der Sonne in °K
 * @type {number}
 */
const T_SOL = 5778; // °K
/**
 * Die Masser der Sonne in KG
 * @type {number}
 */
const M_SOL = 1.989 * Math.pow(10, 30); // KG

/**
 * Hier wird die Spektralklasse des Sterns einfach basierend auf der Masse ausgegeben.  
 * Sehr Simpel Gehalten, ich meine wir brauchen hier keine Wissenschaftliche Simulation.  
 * Oder?
 * 
 * @param mass Die Masse des STerns
 * @returns {{class: string, subclass: string, name: string, color: string, temp: number, mass_sol: number, lum_sol: number, lum: number, r_sol: number}}
 */
function getSolarSpectralClassData(mass) {
    /**@type {{class: string, subclass: string, name: string, color: string, temp: number, mass_sol: number, lum_sol: number, lum: number, r_sol: number}} */
    let returnData = {};

    returnData.mass_sol = mass;

    /**@type {{class: string, name: string, color: string, tempmin:number, tempmax: number, massmin: number, massmax: number}} */
    let currentClass = null

    for (let i = 0; i < VALID_SUBSPECTRAL_CLASS_VALUES.length; i++) {
        const e = VALID_SUBSPECTRAL_CLASS_VALUES[i];
        if (mass >= e.massmin && mass < e.massmax) {
            currentClass = e
            returnData.class = e.class
            returnData.name = e.name
            returnData.color = e.color
            break;
        }
    }

    try {
        const temp = Math.round((rng() * (currentClass.tempmax - currentClass.tempmin)) + currentClass.tempmin);
        returnData.temp = temp;
    } catch (error) {
        console.log(cc.yellow(mass));
        console.log(cc.yellow(JSON.stringify(returnData)));
        console.log(cc.yellow(currentClass));

        throw new Error(error)
    }

    returnData.r_sol = Math.pow(returnData.mass_sol, 0.8);

    returnData.lum_sol = Math.pow((returnData.r_sol * R_SOL) / R_SOL, 2) * Math.pow(returnData.temp / T_SOL, 4);
    returnData.lum = returnData.lum_sol * LUM_SOL;

    return returnData;
}

/**
 * Gibt Einen Namen basierend auf den Typ des Planeten zurück.
 * 
 * Sehr Interessant ist das er Basierend auf Silben Generiert wird, ich wusste davor nicht einmal, dass das geht.  
 * Danke ChatGPT XD.  
 * Aber mal im ernst, das ist echt interessant dass sowas funktioniert.
 * 
 * Wer das liest ist Dumm.
 * 
 * @param {"anomaly"|string} type typ des Objektes
 * @returns 
 */
function generateName(type) {
    if (type === "anomaly") { return generateAnomalyName() };

    /**@type {string[]} Silben von ChatGPT für die Namensgenerierung */
    const syllables = [
        // Silben V1
        "ka", "lo", "ra", "ze", "tu", "mi", "xa", "vi", "no",
        "shi", "dra", "qu", "ly", "tor", "zan", "ny", "fel", "vra",
        "zur", "kre", "tho", "bal", "ix", "sy", "jen", "kul", "orn",
        "nef", "ria", "sol", "mek", "tas", "lur", "xen", "cai", "vor",
        "hel", "ume", "zan", "tha", "py", "rek", "gri", "yul", "zan",
        "eph", "ari", "zho", "the", "mur", "dax", "nix", "zor", "lim",

        // Silben V2
        "bri", "clo", "dre", "fen", "gla", "hro", "jor", "kli", "mar",
        "nel", "oph", "pra", "qua", "rin", "sha", "tre", "uln", "vex",
        "wra", "xis", "yra", "zor", "bex", "dru", "fla", "gra", "hul",
        "jum", "kor", "lek", "mip", "nox", "opl", "pru", "qui", "rax",
        "syl", "tri", "uvo", "vyn", "wex", "xil", "yan", "zep", "zor",
        "bax", "cro", "dav", "elx", "fra", "gyn", "hax", "jin", "kre",
        "lom", "myr", "nov", "oph", "plu", "qir", "rum", "syn", "tor",
        "urn", "vok", "wir", "xon", "yar", "zun"
    ];

    let name = "";
    const length = 2 + Math.floor(rng() * 2);
    for (let i = 0; i < length; i++) {
        name += syllables[Math.floor(rng() * syllables.length)];
    }
    return name.charAt(0).toUpperCase() + name.slice(1);
}

const usedNames = new Set();

function generateUniqueName(type) {
    let name;
    let tries = 0;
    do {
        name = generateName(type);
        tries++;
        if (tries > 100) {
            name += `-ZU${Math.floor(rng() * 1000)}`;
        }
    } while (usedNames.has(name));
    usedNames.add(name);
    return name;
}



/**
 * Generiert die Ressourcen eines Bestimmten Typs  
 * Offensichtlich noch nicht fertig
 *
 * @param {"gas_planet"|"interstellar_space"|"interstellar_t1_astroid"|"interstellar_t2_astroid"|"interstellar_t3_astroid"|"moon_atmosphere"|"moon_noAdmosphere"|"neutron_star"|
 * "none"|"planet_atmosphere"|"planet_noAtmosphere"|"stellar_astroid"|"test"} type Der Planetentyp für den die Ressourcen generiert werden sollen
 * @param {1000|number} tries Die anzahl der Versuche die es durchführt
 * @returns {{name:string, id:string, short:string, group:string, density:number, p:number, n:number, v:number}[]}
 */
function GenerateResources(type, tries = 1000) {
    /**@type {{legend: string[], map: number[][]}} */
    const typeData = require(`./src/resmap/resourceMap_${type}.json`)

    let values = {
        values: {},
        total: 0,
        resources: []
    }

    for (let i = 0; i < tries; i++) {

        const pos_x = Math.floor(rng() * (1000 - 1))
        const pos_y = Math.floor(rng() * (1000 - 1))

        const c = typeData.map[pos_x][pos_y];

        // Ich habe mich dazu entschieden "nothing" komplett aus der Berechnung zu ziehen
        // Das gibt nur Probleme und eigentlich ist es auch unnötig
        if (c == 0) continue;

        if (values.values[typeData.legend[c]] == null) values.values[typeData.legend[c]] = 0;

        values.values[typeData.legend[c]]++;
    }

    Object.entries(values.values).forEach((e, i) => {
        values.total += e[1]
    })

    Object.entries(values.values).forEach((e, i) => {
        const r = res.getResourceByID(e[0]);
        const p = +(e[1] / values.total).toFixed(5);
        values.resources.push(r.webInformation().toJSON(p, e[1], values.total));
    })

    return values.resources;
}

/**
 * Berechnet den Radius  
 * wirklich Primitiv
 * 
 * @param {{name: string;id: string;short: string;group: string;density: number;p: number;n: number;v: number;}[]} resources 
 * @param {number} mass Masse In KG
 * @retunrs {{d:number, r:number}}
 */
function calculatePlanetRadius(resources, mass) {
    let totalDensity = 0;
    for (let i = 0; i < resources.length; i++) {
        totalDensity += (resources[i].p * resources[i].density)
    }
    const r = Math.pow((3 * mass) / (4 * Math.PI * totalDensity), 1 / 3);
    const d = +totalDensity.toFixed(2)
    return {d, r};
}

/**
 * Validiert die Distanz zwischen Objekten, sodass Objekte nicht zu nah und auch nicht zu weit voneinander sind, basierend auf der config.
 * 
 * @param {number} distance 
 * @param {number} angle 
 * @param {number} chosenType 
 * @returns {{ tooClose:boolean, x:number, y:number, dx:number, dy:number }}
 */
function validateDistance(distance, angle, chosenType) {
    const { x, y } = polarToCartesian(distance, angle)

    const stars = getObjectType("star");

    const typeConfig = config.types[chosenType]

    let dx = 0;
    let dy = 0;
    let tooClose = false

    if (galaxy.length === 0) {
        return { tooClose, x, y, dx, dy }
    }

    if (typeConfig.preferred.startsWith("nearStar")) {
        const parts = typeConfig.preferred.split("-");
        if (parts.length === 3) {
            const nearMin = parseFloat(parts[1]);
            const nearMax = parseFloat(parts[2]);

            const target = stars[Math.floor(rng() * stars.length)];
            const dist = nearMin + rng() * (nearMax - nearMin);
            dx = target.x + Math.cos(angle) * dist;
            dy = target.y + Math.sin(angle) * dist;
        }
    }

    if (typeConfig.preferred?.startsWith("deepSpace")) {
        const parts = typeConfig.preferred.split("-");
        if (parts.length === 2) {
            const min = parseFloat(parts[1]);
            for (const obj of galaxy) {
                if (obj.type === "star") {
                    const dx = obj.x - x;
                    const dy = obj.y - y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < min) {
                        tooClose = true;
                        break;
                    }
                }
            }
        }
    }

    for (const obj of galaxy) {
        if (obj.type === chosenType) {
            const dx = obj.x - x;
            const dy = obj.y - y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < typeConfig.minDistance) {
                tooClose = true;
                break;
            }
        }
    }

    return { tooClose, x, y, dx, dy }
}

/**
 * Gibt alle Objekte eines Typs das momentan im galaxy-Array gespeichert sind zurück.
 * 
 * @param {string} objectType
 * @returns {{}[]}}
 */
function getObjectType(objectType) {
    const all = []
    for (const obj of galaxy) {
        if (obj.type == objectType) {
            all.push(obj)
        }
    }
    return all;
}

/**
 * Gibt dir ein Semi-Zufälliges Objekt Des Galaxy-Arrays eines typs zurück
 * 
 * @param {string} objectType 
 * @returns {{}[]}
 */
function getRandomObjectType(objectType) {
    const all = getObjectType(objectType)

    return all[(rng() * (all.length - 1))];
}

/**  * 
 * Diese Informationen werden Automatisch Via Seed "Erfunden"  
 * star:  
 * Spektralklasse via Seed + Tabelle  
 * Masse via Spektralklasse + Tabelle  
 * Subspektralklasse via Seed + Masse  
 * Temperatur via Seed + Subspektralklasse
 * 
 * `gasGiant` | `moon` | `planet` | `stellar_astroid_field` sind zwar Valide objekte sind\
 * aber deaktiviert für die Galaxiegenerierung, weil sie nix in der Galaxie zu suchen haben,\
 * sie werden separat in den Sternensystemen Generiert.\
 * Die Gesammtmenge der Objekte in der Galaxie wird dennoch `config.amount` erreichen.
 * 
 * @param {string|"mainBlackHole"|"star"|"gasGiant"|"moon"|"planet"|"astroidfieldt1_astroid"|"astroidfieldt2_astroid"|"astroidfieldt3_astroid"|"rogue_planet"|"anomaly"|"blackHole"} type
 * @param {number} x
 * @param {number} y
 * @param {string} name
 */
function galaxyPush(type, x, y, name) {
    if (type == "planet") return;
    if (type == "gasGiant") return;
    if (type == "moon") return;
    if (type == "stellar_astroid_field") return;

    const metadata = {};
    /**@type {{informationType: "star"|"planet"|"astroidField", informationBase: {}|null}} */
    const metadata_edit1 = { features: [], informationType: null, informationsBase: null };
    const metadata_edit2 = {};

    if (type != "mainBlackHole") {
        /**
         * Die Grund-Informationen für den Stern
         * 
         * starTemperature: Sternentemparatur in °K  
         * starMass: Sternenmasse in Sonnenmassen  
         * starLum: Sternenleuchtstärke in Sonnenleuchtstärken  
         * starSpectral: Spektrum des Sterns:
         *  - h=Hauptsprektrum
         *  - s=Subspektrum
         * 
         * Hauptspektrum: Y, T, L, M, K, G (zb. wie unsere Sonne), F, A, B, O\
         * Subspektrum: Y0-Y9, T0-T9, L0-L9, M0-M9, K0-K9, G0-G9 (unsere Sonne zb. ist G-2), F0-F9, A0-A9, B0-B9, O0-O9
         * 
         * @type {{starTemperature: number, starMass: number, starMassKG: number, starRad: number, starLum: number, starSpectral: {h:"Y"|"T"|"L"|"M"|"K"|"G"|"F"|"A"|"B"|"O"|string, s:"0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|string}, planetSystem: []}}
         */
        const informationStar = {
            starTemperature: null,
            starMass: null,
            starMassKG: null,
            starLum: null,
            starRad: null,
            starSpectral: { h: null, s: null },
            planetSystem: null
        }

        /**
         * 
         * 
         * @type {{massEM: number, massKG: number}}
         */
        const infoRoguePlanet = {
            massEM: null,
            massKG: null,
            height: null,
            orbitPosDegree: null,
            orbitPosNorm: null,
            moons: null
        };

        if (type == "star") { metadata_edit1.informationType = "star"; metadata_edit1.informationBase = informationStar }

        if (type == "star") {
            const sunMass = generateSolarMass(rng());

            let info = informationStar;

            let minPlanets = Math.round(rng() * MAX_PLANETS_PER_SOLSYS);
            let maxPlanets = Math.round(rng() * (MAX_PLANETS_PER_SOLSYS - minPlanets)) + minPlanets;

            let specs = getSolarSpectralClassData(sunMass);

            info.starLum = specs.lum_sol;
            info.starMass = specs.mass_sol;
            info.starMassKG = specs.mass_sol * SUN_MASS_KG;
            info.starRad = specs.r_sol
            info.starSpectral = { h: specs.class.split("-")[0], s: specs.class.split("-")[1], name: specs.name, color: specs.color };
            info.starTemperature = specs.temp;
            info.planetSystem = generatePlanetSystemData(name, info.starMassKG, specs.lum, minPlanets, maxPlanets)

            metadata_edit1.informationType = "star";
            metadata_edit1.informationBase = info;
        }

        if (type == "rogue_planet") {
            const mass = +(0.1 + rng() * 10).toFixed(3);
            const rotation = Math.round(rng() * 360);
            const moons = generateMoonSystemData(name, mass * EARTH_MASS_KG, Math.round(rng() * MAX_MOONS_PER_PLANET));

            let info = infoRoguePlanet

            info.massEM = mass
            info.massKG = mass * EARTH_MASS_KG
            info.orbitPosDegree = rotation
            info.orbitPosNorm = +(rotation / 360).toFixed(3)
            info.moons = moons

            metadata_edit1.informationType = "rogue_planet";
            metadata_edit1.informationBase = info;
        }

    } else {
        x = 0;
        y = 0;
        name = config.mainBlackHoleName;
    }

    if (metadata_edit1.informationType != null && metadata_edit1.informationBase != null) { metadata.informationType = metadata_edit1.informationType; metadata_edit2.informationBase = metadata_edit1.informationBase }

    const distanceToCenter = Math.hypot(x, y);

    const d = {
        type,
        x,
        y,
        name,
        distanceToCenter,
        metadata: metadata_edit2
    }
    console.log(JSON.stringify(d));

    //// console.log(d.chosenType);

    galaxy.push(d)
}
galaxyPush("mainBlackHole")

/**
 * Generiert ein Planetensystem .  
 * Jeder Planet hat: höhe (Abstand), masse, rotation (in Grad), und (wemm überhaupt) Monde.  
 * Und neuerdings Ressourcen.
 * 
 * @param {string} parentStarName
 * @param {number} parentStarMass In KG
 * @param {number} parentStarLum In W
 * @param {number} minPlanets
 * @param {number} maxPlanets
 * @returns {{name:string,temperature:number,albedo:number,height:number,massEM:number,massKG:number,OrbitalSpeed:number,OrbitalTimeInSec:number,OrbitalTimeInYears:number,orbitPosDegree:number,orbitPosNorm:number,resources:any,moons:any[]}[]} Array mit Planeten-Objekten
 */
function generatePlanetSystemData(parentStarName, parentStarMass, parentStarLum, minPlanets = 1, maxPlanets = 10) {
    const planets = [];
    const planetCount = minPlanets + Math.floor(rng() * (maxPlanets - minPlanets + 1));
    let lastDistance = 0.1 + rng() * 0.5;

    for (let i = 0; i < planetCount; i++) {
        lastDistance += rng() * 1.5;
        const rotation = +(rng() * 360).toFixed(2);
        const planetType = !!Math.round(rng());
        const mass = +((0.0025 + (rng() ** 4.5)) * 10).toFixed(3);
        const name = generateUniqueName("planet");
        const albedo = +(0.05 + (rng() * (0.3 - 0.05))).toFixed(5)

        const temperature = +((Math.pow((parentStarLum * (1 - albedo)) / (16 * Math.PI * Math.pow(lastDistance * AE, 2) * O), 0.25))).toFixed(5)

        const maxMoons = Math.round(rng() * MAX_MOONS_PER_PLANET);
        let moons = [];
        if (maxMoons > 0) {
            moons = generateMoonSystemData(name, mass * EARTH_MASS_KG, maxMoons);
        }

        const OrbitalSpeed = Math.sqrt((G * parentStarMass) / (lastDistance * AE))
        const OrbitalTimeInSec = 2 * Math.PI * Math.sqrt(Math.pow(lastDistance * AE, 3) / (G * parentStarMass));

        // Ressourcen für diesen Planeten generieren
        let resources = GenerateResources(planetType ? "planet_noAtmosphere" : "planet_atmosphere", 1000);
        let {d, r} = calculatePlanetRadius(resources, mass * EARTH_MASS_KG);

        planets.push({
            name,
            temperature,
            albedo,
            height: lastDistance,
            massEM: mass,
            massKG: mass * EARTH_MASS_KG,
            r, // Radius
            d, // Dichte
            OrbitalSpeed,
            OrbitalTimeInSec,
            OrbitalTimeInYears: +(OrbitalTimeInSec / YEAR_IN_SEC).toFixed(3),
            orbitPosDegree: rotation,   // in Grad
            orbitPosNorm: +(rotation / 360).toFixed(5),  // Normalisiert
            moons,
            resources
        });
    }
    return planets;
}

/**
 * Generiert ein Mondsystem für einen Planeten.
 * 
 * @param {string} parentPlanetName
 * @param {number} parentPlanetMass in KG
 * @param {number} maxMoons
 * @returns {{name:string,height:number,massEM:number,massKG:number,OrbitalSpeed:number,OrbitalTimeInSec:number,OrbitalTimeInYears:number,orbitPosDegree:number,orbitPosNorm:number,resources:res.webResourceInformation.json}[]} Array mit Mond-Objekten
 */
function generateMoonSystemData(parentPlanetName, parentPlanetMass, maxMoons = 5) {
    const moons = [];
    const moonCount = Math.floor(rng() * (maxMoons + 1));
    let lastDistance = 50000 + rng() * 100000; // Startabstand in KM

    for (let i = 0; i < moonCount; i++) {
        /**
         * Ob der Mond eine Atmosphäre hat oder nicht. 0 = Nein, 1 = Ja
         */
        const moonType = !!Math.round(rng());
        const rotation = Math.round(rng() * 360);
        const mass = +((0.0025 + (rng() ** 4.5)) * 0.05).toFixed(10);
        const name = generateUniqueName("moon");

        const OrbitalSpeed = Math.sqrt((G * parentPlanetMass) / (lastDistance * 1000))
        const OrbitalTimeInSec = 2 * Math.PI * Math.sqrt(Math.pow((lastDistance * 1000), 3) / (G * parentPlanetMass));

        let resources = GenerateResources(moonType ? "moon_noAtmosphere" : "moon_atmosphere", 1000);
        let {d, r} = calculatePlanetRadius(resources, mass * EARTH_MASS_KG);
        //// console.log(resources);


        moons.push({
            name,
            parent: parentPlanetName,
            height: lastDistance,
            massEM: mass,
            massKG: mass * EARTH_MASS_KG,
            r, // Radius
            d, // Dichte
            OrbitalSpeed,
            OrbitalTimeInSec,
            OrbitalTimeInYears: +(OrbitalTimeInSec / YEAR_IN_SEC).toFixed(3),
            orbitPosDegree: rotation,   // in Grad
            orbitPosNorm: +(rotation / 360).toFixed(3),  // Normalisiert
            resources
        });

        lastDistance += rng() * 100000
    }
    return moons;
}

/**
 * Hier werden per Seed alle Objekte Ausgewählt, deren Positionen Generiert & Validiert und dann Abgespeichert.
 */
while (galaxy.length < config.count) {
    const angle = rng() * Math.PI * 2;
    const typeKeys = Object.keys(config.types);
    const chosenType = typeKeys.find(key => rng() < config.types[key].chance);

    if (!chosenType) continue;

    const typeConfig = config.types[chosenType];
    let distance = getRandomDistance(typeConfig.minDistance || 0, typeConfig.maxDistance || 0);

    const stars = getObjectType("star");

    // === nearStar ===
    if (typeConfig.preferred?.startsWith("nearStar")) {

        if (stars.length === 0) {
            // Kein Stern = Kein nearStar.
            // macht sinn oder?
            // würde ich so mal behaupten.
            // denke ich zumindest.
            continue;
        }

        const parts = typeConfig.preferred.split("-");
        if (parts.length === 3 && stars.length > 0) {
            const nearMin = parseFloat(parts[1]);
            const nearMax = parseFloat(parts[2]);
            const target = stars[Math.floor(rng() * stars.length)];

            const angleTo = rng() * Math.PI * 2;
            const dist = nearMin + rng() * (nearMax - nearMin);

            const x = target.x + Math.cos(angleTo) * dist;
            const y = target.y + Math.sin(angleTo) * dist;

            const { tooClose } = validateDistance(0, 0, chosenType);
            if (!tooClose) {
                galaxyPush(chosenType, x, y, generateUniqueName(chosenType));
            }
            continue;
        }
    }

    const { tooClose, x, y } = validateDistance(distance, angle, chosenType);
    if (!tooClose) {
        galaxyPush(chosenType, x, y, generateUniqueName(chosenType));
    }
}

//// GenerateResources("planet_atmosphere")

//// console.log(GenerateResources("interstellar_t2_astroid"));
//// console.log(GenerateResources("interstellar_t2_astroid"));
//// console.log(GenerateResources("interstellar_t2_astroid"));


fs.writeFileSync("./web/galaxy.json", JSON.stringify(galaxy));

console.log("Galaxie generiert mit", galaxy.length, "Objekten.");
console.log("Seed:", cc.string(config.seed));