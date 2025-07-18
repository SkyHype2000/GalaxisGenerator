"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GasInformation = exports.VALID_SPECTRAL_CLASS_VALUES = exports.MAX_MOONS_PER_PLANET = exports.MAX_PLANETS_PER_SOLSYS = exports.EARTH_MASS_KG = exports.T_SOL = exports.LUM_SOL_W = exports.R_SOL_KM = exports.SUN_MASS_KG = exports.YEAR_IN_SEC = exports.LJ = exports.AE = exports.SB = exports.G = exports.types = exports.ObjectType = exports.mainBlackHoleName = exports.exponent = exports.stellarAstroidCount = exports.stellarPlanetCount = exports.count = exports.radius = exports.rng = exports.seed = void 0;
exports.chooseTypeByChance = chooseTypeByChance;
const seedrandom_1 = __importDefault(require("seedrandom"));
/**
 * Der Seed Der Galaxie.
 * Achtung! man kann kein Brot damit Backen
 *
 * ---
 *
 * Standard: `"Main"`
 */
exports.seed = "Main";
/**
 * Der seed basierend auf der config.json/seed
 */
exports.rng = (0, seedrandom_1.default)(exports.seed);
/**
 * Der Radius der Galaxie in Lichtjahren
 *
 * ---
 *
 * Standard_ `1ßßßßßß`
 */
exports.radius = 1_000_000;
/**
 * Die Anzahl der Objekte innerhalb der Galaxie
 * Beeinflusst nicht die Stellaren Objekte!
 *
 * ---
 *
 * Eine Galaxie mit maximal 10000 Objekten wird empfohlen, weil der Code Momentan sehr Ineffizient ist, lol. (Von mir auch nix anderes zu erwarten)
 * Mal davon abgesehen das es immer Länger und Länger braucht die galaxie zu generieren.
 *
 * ---
 *
 * Standard: `2500`
 */
exports.count = 2500;
/**
 * Die Minimalen und Maximalen Planeten in einem Sternensystem,
 * Beeinflusst aber nicht die Monde.
 *
 * ---
 *
 * Standard: `0-10`
 */
exports.stellarPlanetCount = { min: 0, max: 10 };
/**
 * Die Minimalen und Maximalen Asteroidengürtel in einem Sternensystem.
 *
 * ---
 *
 * Standard: `0-3`
 */
exports.stellarAstroidCount = { min: 0, max: 3 };
/**
 * Der Exponent der Festlegt wie die Sterne in der Galaxie verteilt sind.
 *
 * ---
 *
 * Alle Werte über `0.5` lässt die Sterne mehr in die Mitte Rücken.
 * Alle Werte unter `0.5` lässt die Sterne eher nach außen Rücken, was Lustig aussieht.
 *
 * Wenn man es nicht übertreiben will ist ein Wert zwischen `0.7` und `0.8` okay, gibt aber immernoch eine Harte Kante.
 * Weiß moch nicht wie ich das Verhindern kann.
 *
 * ---
 *
 * Standard: `0.75`
 */
exports.exponent = 0.75;
/**
 * Der Name des Schwarzen Lochs im Zentrum.
 *
 * ---
 *
 * Standard: `"Nexus"` - die verbindung zu allem 😄
 */
exports.mainBlackHoleName = "Nexus";
/**
 * Die Verschiedenen Objekttypen und ihre Eigenschaften.
 *
 * ---
 *
 * `chance` = Die Wahrscheinlichkeit, dass dieses Objekt Ausgewählt wird, in Relation zu den anderen, nicht in %
 * `minDistance` = Die Minimale Distanz zu **GLEICHEN** objekten, zb.: minimal 3 Lj von Stenen Entfernt.
 * `maxDistance` = Die Maximale Distanz zu **GLEICHEN** objekten, zb.: maximal 0(unendlich) von Sternen Entfernt.
 *
 * ---
 *
 * `preferred` ist der Wert der quasi die Lieblingsposition angibt... wie der name schon sagt.\
 * Es gibt:
 * - `sun_Orbit`: Das Objekt befindet sich in einer umlaufbahn eines Sterns.
 * - `planet_Orbit`: Das Objekt befindet sich in einer Umlaufbahn um einen Planeten oder Gasriesen
 * - `nearStar-min-max`: Das Objekt ist `min` Lj und `max` Lj von einem Stern entfernt.
 * - `deepSpace-min`: Das Objekt ist `min` Lj weit entfernt von Sternen.
 */
class ObjectType {
    name;
    chance;
    minDistance;
    maxDistance;
    preferred;
    constructor(name, chance, minDistance, maxDistance, preferred) {
        this.name = name;
        this.chance = chance;
        this.minDistance = minDistance;
        this.maxDistance = maxDistance;
        this.preferred = preferred;
    }
}
exports.ObjectType = ObjectType;
/**
 * Alle Objekte in einem Array
 */
exports.types = [
    new ObjectType("star", 0.2, 3, 0, ""),
    new ObjectType("planet", 0.5, 0, 0, "sun_orbit"),
    new ObjectType("moon", 0.15, 0, 0, "planet_orbit"),
    new ObjectType("stellar_astroid", 0.2, 0, 0, "sun_orbit"),
    new ObjectType("interstellar_t1_astroid", 0.05, 5, 0, "neaStar-0.1-2"),
    new ObjectType("interstellar_t2_astroid", 0.05, 8000, 0, "deepSpace-1000"),
    new ObjectType("interstellar_t3_astroid", 0.05, 15000, 0, "deepSpace-4000"),
    new ObjectType("rogue_planet", 0.01, 5, 0, "nearStar-2-15"),
    new ObjectType("anomaly", 0.01, 1000, 0, "deepSpace-2000"),
    new ObjectType("antimatter_anomaly", 0.0001, 3000, 0, "deepSpace-5000"),
    new ObjectType("mainBlackHole", 0, 0, 0, ""),
    new ObjectType("blackHole", 0.001, 50000, 0, "deepSpace-10000"),
    new ObjectType("gas_planet", 0.2, 0, 0, "sun_orbit")
];
function chooseTypeByChance() {
    let chosenType = null;
    let tries = 0;
    while (!chosenType && tries < 100) {
        for (let i = 0; i < exports.types.length; i++) {
            if (exports.types[i].name == "mainBlackHole")
                continue;
            if (exports.types[i].chance > (0, exports.rng)()) {
                chosenType = exports.types[i];
                break;
            }
        }
        tries++;
    }
    return chosenType || exports.types[0];
}
/**
 * Die Gravitationskonstante
 */
exports.G = 6.67430e-11;
/**
 * Stefan Boltzmann Konstante
 */
exports.SB = 5.670373e-8;
/**
 * Die Länge einer Astronomischen Einheit in Meter
 */
exports.AE = 149_597_870_700;
/**
 * Die Länge eines Lichtjahres in Meter
 */
exports.LJ = 9460730472580800n;
/**
 * Die Länge eines Jahres in Sekunden
 */
exports.YEAR_IN_SEC = 31_557_600;
/**
 * Masse der Sonne in KG
 */
exports.SUN_MASS_KG = 1.9884e30;
/**
 * Der Radius der Sonne in KM
 */
exports.R_SOL_KM = 695700; // KM
/**
 * Die Luminosität der Sonne in Watt
 */
exports.LUM_SOL_W = 3.828e26; // W
/**
 * Die (Oberflächen-)Temperatur der Sonne in °K
 */
exports.T_SOL = 5778; // °K
/**
 * Masse der Erde in KG
 */
exports.EARTH_MASS_KG = 5.972e24;
/**
 * Die Maximale Anzahl an Planeten die in einem Sternensystem vorhanden sein dürfen.
 * Standard: 3
 */
exports.MAX_PLANETS_PER_SOLSYS = 10;
/**
 * Die Maximale Anzahl an Monden die um einen Planeten vorhanden sein dürfen.
 * Standard: 3
 */
exports.MAX_MOONS_PER_PLANET = 3;
/**
 * Alle Validen Werte für jedesSpektrum.
 *
 * Hier habe ich natürlich einige Simplifikationen durchgeführt, besonders bei der Klasse `M`, `L`, `T` und `Y`.
 * man kann ja nicht immer alles Kompliziert machen
 */
exports.VALID_SPECTRAL_CLASS_VALUES = [
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
];
/**
 * Gasinformationen
 */
exports.GasInformation = [
    { id: "CO2", k_a: 2000, w: 0, mol: 0.04401 },
    { id: "CH4", k_a: 150, w: 0, mol: 0.01604 },
    { id: "H2O", k_a: 3000, w: 0, mol: 0.018015 },
    { id: "N2", k_a: 0.01, w: 0, mol: 0.028014 },
    { id: "O2", k_a: 0.01, w: 0, mol: 0.031999 }
];
