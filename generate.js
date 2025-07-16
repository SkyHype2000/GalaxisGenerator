"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usedNames = exports.VALID_SUBSPECTRAL_CLASS_VALUES = exports.galaxy = void 0;
exports.polarToCartesian = polarToCartesian;
exports.getRandomDistance = getRandomDistance;
exports.generateAnomalyName = generateAnomalyName;
exports.generateSolarMass = generateSolarMass;
exports.initSubspectralClassValues = initSubspectralClassValues;
exports.getSolarSpectralClassData = getSolarSpectralClassData;
exports.generateName = generateName;
exports.generateUniqueName = generateUniqueName;
exports.GenerateResources = GenerateResources;
exports.calculatePlanetRadius = calculatePlanetRadius;
exports.validateDistance = validateDistance;
exports.getObjectType = getObjectType;
exports.getRandomObjectType = getRandomObjectType;
exports.galaxyPush = galaxyPush;
exports.calculatePlanetTemperature = calculatePlanetTemperature;
exports.generatePlanetSystemData = generatePlanetSystemData;
exports.generateRoguePlanetData = generateRoguePlanetData;
exports.generateMoonSystemData = generateMoonSystemData;
exports.generateAtmosphericInformation = generateAtmosphericInformation;
const fs_1 = __importDefault(require("fs"));
const cc = __importStar(require("./consolecolor"));
//// throw new Error("test")
// Config
const config = __importStar(require("./config"));
// Alle Ressourceninformationen
const res = __importStar(require("./resources"));
/**
 * Alle Objekte in der Galaxie die bisher Generiert wurden
 */
exports.galaxy = [];
/**
 * ähm... ja, danke ChatGPT. XD
 *
 * Ich glaube das generiert die `x` und `y` koordinaten die nicht
 * weiter als der Radius der Galaxie entfernt sein dürfen
 */
function polarToCartesian(r, angle) {
    return {
        x: r * Math.cos(angle),
        y: r * Math.sin(angle)
    };
}
/**
 * Hier wird eine Seedbasierte Distanz generiert.
 * hab einfach ChatGPT Gefragt lol.
 */
function getRandomDistance(min, max) {
    if (max === 0)
        max = config.radius;
    const exponent = config.exponent || 1;
    //// return min + (max - min) * rng();
    return min + (max - min) * Math.pow(config.rng(), exponent);
}
/**
 * Die Funktion gibt es Extra dafür um Anomalienamen zu Generieren,
 * ich wollte nicht einfach nur Silben für die Namen verwenden also habe ich mich dafür hier entschieden.
 *
 * Weil es sich für Anomalien besser anhört.
 */
function generateAnomalyName() {
    /**
     * Die Prefixe, quasi die ersten Zeichen die Verwendet werden.
     */
    const prefix = ["RX", "ZB", "QK", "VR", "IA", "OR", "PA", "TR"];
    /**
     * Das sind die Suffixe die nach den Prefixen kommen,
     * sie bestehen aus nur eine Zahl oder MK + Zahl.
     */
    const suffix = [];
    for (let i = 0; i < 99; i++) {
        if (i < 10)
            suffix.push("-0" + i);
        else
            suffix.push("-" + i);
    }
    for (let i = 0; i < 99; i++) {
        if (i < 10)
            suffix.push("-0" + i);
        else
            suffix.push("-MK" + i);
    }
    return prefix[Math.floor(config.rng() * prefix.length)] + suffix[Math.floor(config.rng() * suffix.length)];
}
/**
 * Gibt den Sonnenmassenwert basierend auf x zurück.
 * Hier wird dafür gesorgt, dass... ja genau das.
 * Das die Sterne hauptsächlich im Rote-Zwerge Bereich Liegen, bin sehr stolz darauf
 *
 * @param x wert zwischen `0.0000000000000001` - `1.0000000000000000`
 * @returns wert zwischen `0.0086` - `100+`
 */
function generateSolarMass(x) {
    // Der Minimalwert Basierend auf dem Minimalen wert über 0 vom Seed
    if (x <= 0)
        x = 0.0000000000000001;
    // Naja einfach den Wert auf 1 Setzen wenn es über 1 Geht, eigentlich unwahrscheinlich wenn man nur den seed selbst verwendet
    if (x > 1)
        x = 1.0000000000000000;
    // Diese 1.021639 war anstrengend zu bekommen... habe einfach nur Geraten lol, in Desmos einfach immer Genauere Kommerstellen eingeben, irgendwann findet man es schon XD
    // Jetzt haben wir wenigstens auch L, T und Y Sterne das mit dem 1.2 nicht möglich gewesen wäre
    return -(1 - Math.pow(x / 1.021639, -0.4));
}
/**
 * Alle Validen Werte für jedes Sub-Spektrum.
 */
exports.VALID_SUBSPECTRAL_CLASS_VALUES = [];
/**
 * Generiert alle Sipspektralwerte
 */
function initSubspectralClassValues() {
    for (let i = 0; i < config.VALID_SPECTRAL_CLASS_VALUES.length; i++) {
        const e_i = config.VALID_SPECTRAL_CLASS_VALUES[i];
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
            };
            exports.VALID_SUBSPECTRAL_CLASS_VALUES.push(data);
            console.log(JSON.stringify(data));
        }
    }
    fs_1.default.writeFileSync("./src/VALID_SUBSPECTRAL_CLASS_VALUES.json", JSON.stringify(exports.VALID_SUBSPECTRAL_CLASS_VALUES, null, 4));
}
initSubspectralClassValues();
/**
 * Hier wird die Spektralklasse des Sterns einfach basierend auf der Masse ausgegeben.
 * Sehr Simpel Gehalten, ich meine wir brauchen hier keine Wissenschaftliche Simulation.
 * Oder?
 *
 * @param mass Die Masse des STerns
 */
function getSolarSpectralClassData(mass) {
    /**@type {} */
    let returnData = { class: "string", subclass: "string", name: "string", color: "string", temp: 0, mass_sol: 0, lum_sol: 0, lum: 0, r_sol: 0 };
    returnData.mass_sol = mass;
    /**@type {{class: string, name: string, color: string, tempmin:number, tempmax: number, massmin: number, massmax: number}} */
    let currentClass = { class: "string", name: "string", color: "string", tempmin: 0, tempmax: 0, massmin: 0, massmax: 0 };
    for (let i = 0; i < exports.VALID_SUBSPECTRAL_CLASS_VALUES.length; i++) {
        const e = exports.VALID_SUBSPECTRAL_CLASS_VALUES[i];
        if (mass >= e.massmin && mass < e.massmax) {
            currentClass = e;
            returnData.class = e.class;
            returnData.name = e.name;
            returnData.color = e.color;
            break;
        }
    }
    try {
        const temp = Math.round((config.rng() * (currentClass.tempmax - currentClass.tempmin)) + currentClass.tempmin);
        returnData.temp = temp;
    }
    catch (error) {
        console.log(cc.yellow(mass.toString()));
        console.log(cc.yellow(JSON.stringify(returnData)));
        console.log(cc.yellow(JSON.stringify(currentClass)));
        throw new Error(error.message);
    }
    returnData.r_sol = Math.pow(returnData.mass_sol, 0.8);
    returnData.lum_sol = Math.pow((returnData.r_sol * config.R_SOL_KM) / config.R_SOL_KM, 2) * Math.pow(returnData.temp / config.T_SOL, 4);
    returnData.lum = returnData.lum_sol * config.LUM_SOL_W;
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
 * @param type typ des Objektes
 */
function generateName(type) {
    if (type === "anomaly") {
        return generateAnomalyName();
    }
    ;
    /**Silben von ChatGPT für die Namensgenerierung */
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
    const length = 2 + Math.floor(config.rng() * 2);
    for (let i = 0; i < length; i++) {
        name += syllables[Math.floor(config.rng() * syllables.length)];
    }
    return name.charAt(0).toUpperCase() + name.slice(1);
}
exports.usedNames = new Set();
function generateUniqueName(type) {
    let name;
    let tries = 0;
    do {
        name = generateName(type);
        tries++;
        if (tries > 100) {
            name += `-ZU${Math.floor(config.rng() * 1000)}`;
        }
    } while (exports.usedNames.has(name));
    exports.usedNames.add(name);
    return name;
}
/**
 * Generiert die Ressourcen eines Bestimmten Typs
 * Offensichtlich noch nicht fertig
 *
 * @param type Der Planetentyp für den die Ressourcen generiert werden sollen
 * @param tries Die anzahl der Versuche die es durchführt
 */
function GenerateResources(type, tries = 1000) {
    /**@type {{legend: string[], map: number[][]}} */
    const typeData = require(`./src/resmap/resourceMap_${type.replaceAll(":", "_")}.json`);
    let values = {
        values: {},
        total: 0,
        resources: []
    };
    for (let i = 0; i < tries; i++) {
        const pos_x = Math.floor(config.rng() * (1000 - 1));
        const pos_y = Math.floor(config.rng() * (1000 - 1));
        const c = typeData.map[pos_x][pos_y];
        // Ich habe mich dazu entschieden "nothing" komplett aus der Berechnung zu ziehen
        // Das gibt nur Probleme und eigentlich ist es auch unnötig
        if (c == 0)
            continue;
        if (values.values[typeData.legend[c]] == null)
            values.values[typeData.legend[c]] = 0;
        values.values[typeData.legend[c]]++;
    }
    Object.entries(values.values).forEach((e, i) => {
        values.total += e[1];
    });
    Object.entries(values.values).forEach((e, i) => {
        const r = res.getResourceByID(e[0]);
        const p = +(e[1] / values.total).toFixed(5);
        if (r !== null) {
            values.resources.push(r.webInformation(p, e[1], values.total));
        }
        else {
            console.log(cc.yellow(`Value ${r} on ${e} is null`));
        }
    });
    return values.resources;
}
/**
 * Berechnet den Radius
 * wirklich Primitiv
 *
 * @param resources
 * @param mass Masse In KG
 */
function calculatePlanetRadius(resources, mass) {
    let totalDensity = 0;
    for (let i = 0; i < resources.length; i++) {
        if (resources[i].p != null) {
            totalDensity += (resources[i].p * resources[i].density);
        }
    }
    const r = Math.pow((3 * mass) / (4 * Math.PI * totalDensity), 1 / 3);
    const d = +totalDensity.toFixed(2);
    return { d, r };
}
/**
 * Validiert die Distanz zwischen Objekten, sodass Objekte nicht zu nah und auch nicht zu weit voneinander sind, basierend auf der config.
 *
 * @param {number} distance
 * @param {number} angle
 * @param {number} chosenType
 */
function validateDistance(distance, angle, chosenType) {
    const { x, y } = polarToCartesian(distance, angle);
    const stars = getObjectType("star");
    let dx = 0;
    let dy = 0;
    let tooClose = false;
    if (exports.galaxy.length === 0) {
        return { tooClose, x, y, dx, dy };
    }
    if (chosenType.preferred.startsWith("nearStar")) {
        const parts = chosenType.preferred.split("-");
        if (parts.length === 3) {
            const nearMin = parseFloat(parts[1]);
            const nearMax = parseFloat(parts[2]);
            const target = stars[Math.floor(config.rng() * stars.length)];
            const dist = nearMin + config.rng() * (nearMax - nearMin);
            dx = target.x + Math.cos(angle) * dist;
            dy = target.y + Math.sin(angle) * dist;
        }
    }
    if (chosenType.preferred?.startsWith("deepSpace")) {
        const parts = chosenType.preferred.split("-");
        if (parts.length === 2) {
            const min = parseFloat(parts[1]);
            for (const obj of exports.galaxy) {
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
    for (const obj of exports.galaxy) {
        if (obj.type === chosenType.name) {
            const dx = obj.x - x;
            const dy = obj.y - y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < chosenType.minDistance) {
                tooClose = true;
                break;
            }
        }
    }
    return { tooClose, x, y, dx, dy };
}
/**
 * Gibt alle Objekte eines Typs das momentan im galaxy-Array gespeichert sind zurück.
 */
function getObjectType(objectType) {
    const all = [];
    for (const obj of exports.galaxy) {
        if (obj.type == objectType) {
            all.push(obj);
        }
    }
    return all;
}
/**
 * Gibt dir ein Semi-Zufälliges Objekt Des Galaxy-Arrays eines typs zurück
 */
function getRandomObjectType(objectType) {
    const all = getObjectType(objectType);
    return all[(config.rng() * (all.length - 1))];
}
/**
 * Diese Informationen werden Automatisch Via Seed "Erfunden"
 * star:
 * Spektralklasse via Seed + Tabelle
 * Masse via Spektralklasse + Tabelle
 * Subspektralklasse via Seed + Masse
 * Temperatur via Seed + Subspektralklasse
 *
 * `gas_planet` | `moon` | `planet` | `stellar_astroid` sind zwar Valide objekte sind\
 * aber deaktiviert für die Galaxiegenerierung, weil sie nix in der Galaxie zu suchen haben,\
 * sie werden separat in den Sternensystemen Generiert.\
 * Die Gesammtmenge der Objekte in der Galaxie wird dennoch `config.amount` erreichen.
 */
function galaxyPush(type, x, y, name) {
    if (type.name == "planet")
        return;
    if (type.name == "gas_planet")
        return;
    if (type.name == "moon")
        return;
    if (type.name == "stellar_astroid")
        return;
    let metadata = { informationType: null, informationBase: null };
    if (type.name != "mainBlackHole") {
        if (type.name == "star") {
            metadata.informationType = "star";
            metadata.informationBase = "star";
        }
        if (type.name == "star") {
            const sunMass = generateSolarMass(config.rng());
            let minPlanets = Math.round(config.rng() * config.MAX_PLANETS_PER_SOLSYS);
            let maxPlanets = Math.round(config.rng() * (config.MAX_PLANETS_PER_SOLSYS - minPlanets)) + minPlanets;
            let specs = getSolarSpectralClassData(sunMass);
            let info = {
                starLum: specs.lum_sol,
                starMass: specs.mass_sol,
                starMassKG: specs.mass_sol * config.SUN_MASS_KG,
                starRad: specs.r_sol,
                starSpectral: { h: specs.class.split("-")[0], s: specs.class.split("-")[1], name: specs.name, color: specs.color },
                starTemperature: specs.temp,
                planetSystem: generatePlanetSystemData(name, specs.mass_sol * config.SUN_MASS_KG, specs.lum, minPlanets, maxPlanets)
            };
            metadata.informationType = "star";
            metadata.informationBase = info;
        }
        if (type.name == "rogue_planet") {
            const mass = +(0.1 + config.rng() * 10).toFixed(3);
            const moons = generateMoonSystemData(name, mass * config.EARTH_MASS_KG, Math.round(config.rng() * config.MAX_MOONS_PER_PLANET));
            let info = {};
            info.massEM = mass;
            info.massKG = mass * config.EARTH_MASS_KG;
            info.moons = moons;
            metadata.informationType = "rogue_planet";
            metadata.informationBase = info;
        }
    }
    else {
        x = 0;
        y = 0;
        name = config.mainBlackHoleName;
    }
    const distanceToCenter = Math.hypot(x, y);
    const d = {
        type: type.name,
        x,
        y,
        name,
        distanceToCenter,
        metadata: metadata.informationBase
    };
    console.log(JSON.stringify(d));
    //// console.log(d.chosenType);
    exports.galaxy.push(d);
}
config.types.forEach((e) => { if (e.name == "mainBlackHole")
    galaxyPush(e, 0, 0, config.mainBlackHoleName); });
function calculatePlanetTemperature(StarLum, albedo, distance) {
    return +((Math.pow((StarLum * (1 - albedo)) / (16 * Math.PI * Math.pow(distance, 2) * config.O), 0.25))).toFixed(5);
}
/**
 * Generiert ein Planetensystem .
 * Jeder Planet hat: höhe (Abstand), masse, rotation (in Grad), und (wemm überhaupt) Monde.
 * Und neuerdings Ressourcen.
 *
 * @param parentStarMass In KG
 * @param parentStarLum In W
 */
function generatePlanetSystemData(parentStarName, parentStarMass, parentStarLum, minPlanets = 1, maxPlanets = 10) {
    const planets = [];
    const planetCount = minPlanets + Math.floor(config.rng() * (maxPlanets - minPlanets + 1));
    let lastDistance = 0.1 + config.rng() * 0.5;
    for (let i = 0; i < planetCount; i++) {
        lastDistance += config.rng() * 1.5;
        const rotation = +(config.rng() * 360).toFixed(2);
        const planetType = !!Math.round(config.rng());
        const mass = +((0.0025 + (config.rng() ** 4.5)) * 10).toFixed(3);
        const name = generateUniqueName("planet");
        const albedo = +(0.05 + (config.rng() * (0.3 - 0.05))).toFixed(5);
        const temperature = calculatePlanetTemperature(parentStarLum, albedo, lastDistance * config.AE);
        const maxMoons = Math.round(config.rng() * config.MAX_MOONS_PER_PLANET);
        let moons = [];
        if (maxMoons > 0) {
            moons = generateMoonSystemData(name, mass * config.EARTH_MASS_KG, maxMoons);
        }
        const OrbitalSpeed = Math.sqrt((config.G * parentStarMass) / (lastDistance * config.AE));
        const OrbitalTimeInSec = 2 * Math.PI * Math.sqrt(Math.pow(lastDistance * config.AE, 3) / (config.G * parentStarMass));
        // Ressourcen für diesen Planeten generieren
        let resources = GenerateResources(planetType ? "planet:atmosphere" : "planet:noAtmosphere", 1000);
        let { d, r } = calculatePlanetRadius(resources, mass * config.EARTH_MASS_KG);
        let special = {};
        if (planetType) {
            special.atmosphere = generateAtmosphericInformation(parentStarLum, lastDistance, albedo);
        }
        planets.push({
            name,
            parent: parentStarName,
            temperature,
            albedo,
            height: lastDistance,
            massEM: mass,
            massKG: mass * config.EARTH_MASS_KG,
            r, // Radius
            d, // Dichte
            OrbitalSpeed,
            OrbitalTimeInSec,
            OrbitalTimeInYears: +(OrbitalTimeInSec / config.YEAR_IN_SEC).toFixed(3),
            orbitPosDegree: rotation, // in Grad
            orbitPosNorm: +(rotation / 360).toFixed(5), // Normalisiert
            moons,
            resources,
            attributes: [(planetType ? "atmosphere" : "noAtmosphere")],
            special,
        });
    }
    return planets;
}
/**
 * Generiert ein Planetensystem .
 * Jeder Planet hat: höhe (Abstand), masse, rotation (in Grad), und (wemm überhaupt) Monde.
 * Und neuerdings Ressourcen.
 *
 * @param parentStarMass In KG
 * @param parentStarLum In W
 */
function generateRoguePlanetData() {
    const planetType = !!Math.round(config.rng());
    const mass = +((0.0025 + (config.rng() ** 4.5)) * 10).toFixed(3);
    const name = generateUniqueName("planet");
    const albedo = +(0.05 + (config.rng() * (0.3 - 0.05))).toFixed(5);
    let temperature = 0;
    const maxMoons = Math.round(config.rng() * config.MAX_MOONS_PER_PLANET);
    let moons = [];
    if (maxMoons > 0) {
        moons = generateMoonSystemData(name, mass * config.EARTH_MASS_KG, maxMoons);
    }
    // Ressourcen für diesen Planeten generieren
    let resources = GenerateResources(planetType ? "planet:atmosphere" : "planet:noAtmosphere", 1000);
    let { d, r } = calculatePlanetRadius(resources, mass * config.EARTH_MASS_KG);
    let special = {};
    if (planetType) {
        special.atmosphere = generateAtmosphericInformation(0, 0, 0);
        temperature = special.atmosphere.temperature;
    }
    return {
        name,
        temperature,
        massEM: mass,
        massKG: mass * config.EARTH_MASS_KG,
        r, // Radius
        d, // Dichte
        moons,
        resources,
        attributes: [(planetType ? "atmosphere" : "noAtmosphere")],
        special
    };
}
/**
 * Generiert ein Mondsystem für einen Planeten.
 *
 * @param parentPlanetName
 * @param parentPlanetMass in KG
 * @param maxMoons
 */
function generateMoonSystemData(parentPlanetName, parentPlanetMass, maxMoons = 5) {
    const moons = [];
    const moonCount = Math.floor(config.rng() * (maxMoons + 1));
    let lastDistance = 50000 + config.rng() * 100000; // Startabstand in KM
    for (let i = 0; i < moonCount; i++) {
        /**
         * Ob der Mond eine Atmosphäre hat oder nicht. 0 = Nein, 1 = Ja
         */
        const moonType = !!Math.round(config.rng());
        const rotation = Math.round(config.rng() * 360);
        const mass = +((0.0025 + (config.rng() ** 4.5)) * 0.05).toFixed(10);
        const name = generateUniqueName("moon");
        const OrbitalSpeed = Math.sqrt((config.G * parentPlanetMass) / (lastDistance * 1000));
        const OrbitalTimeInSec = 2 * Math.PI * Math.sqrt(Math.pow((lastDistance * 1000), 3) / (config.G * parentPlanetMass));
        let resources = GenerateResources(moonType ? "moon:atmosphere" : "moon:noAtmosphere", 1000);
        let { d, r } = calculatePlanetRadius(resources, mass * config.EARTH_MASS_KG);
        //// console.log(resources);
        moons.push({
            name,
            parent: parentPlanetName,
            height: lastDistance,
            massEM: mass,
            massKG: mass * config.EARTH_MASS_KG,
            r, // Radius
            d, // Dichte
            OrbitalSpeed,
            OrbitalTimeInSec,
            OrbitalTimeInYears: +(OrbitalTimeInSec / config.YEAR_IN_SEC).toFixed(3),
            orbitPosDegree: rotation, // in Grad
            orbitPosNorm: +(rotation / 360).toFixed(3), // Normalisiert
            resources,
            attributes: [(moonType ? "atmosphere" : "noAtmosphere")],
            special: {},
        });
        lastDistance += config.rng() * 100000;
    }
    return moons;
}
function generateGasMix() {
    let gases = config.GasInformation.map(g => ({ ...g }));
    // ppm Werte random, keine Max-Vorgaben
    for (const gas of gases) {
        // ppm Bereich 0 bis 1.000.000 (100%)
        gas.w = Math.floor(config.rng() * 1_000_000);
    }
    // Jetzt die w in Mischung (Bruchteil) umrechnen: w = ppm / 1.000.000
    for (const gas of gases) {
        gas.w = gas.w / 1_000_000;
    }
    return gases;
}
function generateAtmosphericInformation(StarLum, StarDistance, albedo, minDensity = 0.01, maxDensity = 10) {
    const gasInfo = generateGasMix();
    const referenceDensity = Math.max(Math.min((Math.pow(config.rng(), 3.95) * maxDensity), maxDensity), minDensity);
    const scaleHeight = 8000 + 2000 * (config.rng() - 0.5);
    let tau = 0;
    for (const gas of gasInfo) {
        tau += gas.k_a * gas.w * referenceDensity * scaleHeight;
    }
    const d_m = StarDistance * config.AE;
    const F = StarLum / (4 * Math.PI * d_m ** 2);
    const sigma = config.O;
    const T = Math.pow(((F * (1 - albedo)) / (4 * sigma)) * (1 + (3 / 4) * tau), 0.25);
    return {
        tau,
        temperature: +T.toFixed(2),
        scaleHeight,
        referenceDensity,
    };
}
/**
 * Hier werden per Seed alle Objekte Ausgewählt, deren Positionen Generiert & Validiert und dann Abgespeichert.
 */
while (exports.galaxy.length < config.count) {
    const angle = config.rng() * Math.PI * 2;
    const typeKeys = Object.keys(config.types);
    const chosenType = config.chooseTypeByChance();
    let distance = getRandomDistance(chosenType.minDistance || 0, chosenType.maxDistance || 0);
    const stars = getObjectType("star");
    // === nearStar ===
    if (chosenType.preferred?.startsWith("nearStar")) {
        if (stars.length === 0) {
            // Kein Stern = Kein nearStar.
            // macht sinn oder?
            // würde ich so mal behaupten.
            // denke ich zumindest.
            continue;
        }
        const parts = chosenType.preferred.split("-");
        if (parts.length === 3 && stars.length > 0) {
            const nearMin = parseFloat(parts[1]);
            const nearMax = parseFloat(parts[2]);
            const target = stars[Math.floor(config.rng() * stars.length)];
            const angleTo = config.rng() * Math.PI * 2;
            const dist = nearMin + config.rng() * (nearMax - nearMin);
            const x = target.x + Math.cos(angleTo) * dist;
            const y = target.y + Math.sin(angleTo) * dist;
            const { tooClose } = validateDistance(0, 0, chosenType);
            if (!tooClose) {
                galaxyPush(chosenType, x, y, generateUniqueName(chosenType.name));
            }
            continue;
        }
    }
    const { tooClose, x, y } = validateDistance(distance, angle, chosenType);
    if (!tooClose) {
        galaxyPush(chosenType, x, y, generateUniqueName(chosenType.name));
    }
}
//// GenerateResources("planet_atmosphere")
//// console.log(GenerateResources("interstellar_t2_astroid"));
//// console.log(GenerateResources("interstellar_t2_astroid"));
//// console.log(GenerateResources("interstellar_t2_astroid"));
fs_1.default.writeFileSync("./web/galaxy.json", JSON.stringify(exports.galaxy));
console.log("Galaxie generiert mit", exports.galaxy.length, "Objekten.");
console.log("Seed:", cc.string(config.seed));
