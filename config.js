"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allObjectTypes = exports.ObjectType = exports.STAR_GENERATION_CONSTANT = exports.VALID_SUBSPECTRAL_CLASS_VALUES = exports.VALID_SPECTRAL_CLASS_VALUES = exports.EARTH_MASS_KG = exports.T_SOL = exports.LUM_SOL_W = exports.R_SOL_KM = exports.SUN_MASS_KG = exports.YEAR_IN_SEC = exports.LJ = exports.AU = exports.SB = exports.G = exports.exponent = exports.stellarAstroidCount = exports.moonToMoonChangeDistance = exports.moonRadius = exports.planetaryMoonCount = exports.planetToPlanetChangeDistance = exports.planetToSunStartDistance = exports.planetRadius = exports.stellarPlanetCount = exports.SectorSize = exports.count = exports.radius = exports.rng = exports.seed = exports.mainBlackHoleName = void 0;
exports.getSectorPos = getSectorPos;
exports.chooseObjectTypeByChance = chooseObjectTypeByChance;
exports.StarSpectralClassDataToMetadata = StarSpectralClassDataToMetadata;
const seedrandom_1 = __importDefault(require("seedrandom"));
const tool_1 = require("./tool");
/**
 * Der Name des Schwarzen Lochs im Zentrum.
 *
 * ---
 *
 * Standard: `"Nexus"` - die verbindung zu allem 😄
 */
exports.mainBlackHoleName = "Nexus";
/**
 * Der Seed Der Galaxie.
 * Achtung! man kann kein Brot damit Backen
 *
 * ---
 *
 * Standard: `@mainBlackHoleName`
 */
exports.seed = exports.mainBlackHoleName;
/**
 * Der seed basierend auf der config.json/seed
 */
exports.rng = (0, seedrandom_1.default)(exports.seed);
/**
 * Der Radius der Galaxie in Lichtjahren
 *
 * ---
 *
 * Standard_ `1ßßßß`
 */
exports.radius = 25_000;
/**
 * Die Anzahl der Objekte innerhalb der Galaxie
 * Beeinflusst nicht die Stellaren Objekte!
 *
 * ---
 *
 * Eine Galaxie mit maximal 10000 Objekten wird empfohlen, weil der Code Momentan sehr Ineffizient ist, lol. (Von mir auch nix anderes zu erwarten)
 * Mal davon abgesehen das es immer Länger und Länger braucht die galaxie zu generieren. (Nagut Tests zeigen das es auch mit 50k Geht)
 *
 * ---
 *
 * Standard: `4500`
 */
exports.count = 10_000;
/**
 * The Size of a File-Sector
 *
 * ---
 *
 * This is to Make the File Size smaaler for Larger Galaxys.
 * At Some Point i will Use this to Opimize the Website (Probably not lol)
 *
 * ---
 *
 * Standard: `x=1000`, `y=1000`;
 *
 * The Size is in Light Years, i could go with pc, but almost nobody knows what parsec is.
 */
exports.SectorSize = new tool_1.Vector2(1000, 1000);
/**
 * Returns the Sector Position
 */
function getSectorPos(pos) { return new tool_1.Vector2(Math.floor(pos.x / exports.SectorSize.x), Math.floor(pos.y / exports.SectorSize.y)); }
/**
 * The Minimal and Maximal Planets a Star-System will have
 *
 * ---
 *
 * Standard: `0-10`
 */
exports.stellarPlanetCount = new tool_1.Vector2(0, 10);
/**
 * The Radius Range of a Planet in Earth-Radius
 *
 * ---
 *
 * Standard: `0.1-3`
 */
exports.planetRadius = new tool_1.Vector2(0.1, 3);
/**
 * The minimum Starting Distance from the Planet to the Sun in AU
 *
 * Standard: `0.1`
 *
 * For Reference, The average distance between Mercury and the Sun is ~0.387 AU
 * So `.1` AU is pretty close.
 */
exports.planetToSunStartDistance = 0.1;
/**
 * The Minimum and Maximum Distance between Planets.
 *
 * Values in the Middle are More common than the Values on the Edges.
 *
 * Standard: `0.05-2`
 */
exports.planetToPlanetChangeDistance = new tool_1.Vector2(0.05, 3);
/**
 * The Minimal and Maximal Moons a Planet-System will have
 *
 * ---
 *
 * Standard: `0-3`
 */
exports.planetaryMoonCount = new tool_1.Vector2(0, 3);
/**
 * The Radius Range of a Moon in Earth-Radius
 *
 * ---
 *
 * Standard: `0.05-0.8`
 */
exports.moonRadius = new tool_1.Vector2(0.05, 0.8);
/**
 * The Minimum and Maximum Distance between Moons(And Main Planet).
 *
 * Values in the Middle are More common than the Values on the Edges.
 *
 * Standard: `0.05-2`
 */
exports.moonToMoonChangeDistance = new tool_1.Vector2(75_000_000 / 149_597_870_700, 300_000_000 / 149_597_870_700);
/**
 * The Minimal and Maximal Astroidbelt Count of a Starsystem
 *
 * This is Not Used for now, if not, i will still keep it becaus i will think that i at some point need this, lol.
 *
 * ---
 *
 * Standard: `0-3`
 */
exports.stellarAstroidCount = new tool_1.Vector2(0, 3);
/**
 * THis is the Exponent that defines how Stars are Distrubet inside of the Galaxy.
 *
 * ---
 *
 * All Values Above `0.5` will Move the Stars more towards the Center of the Galaxy.
 * All Values Above `0.5` will Move the Stars more towards the Edge of the Galaxy, witch looks Funny.
 *
 * If you don't want to make it look bad, i can recomment a value between `0.7` and `0.8`.
 * But there is Still a Hard Edge and i Dont know how to Get rid of it.
 *
 * ---
 *
 * Standard: `0.75`
 */
exports.exponent = 0.75;
/**
 * The Gravitational Constant
 */
exports.G = 6.67430e-11;
/**
 * Stefan Boltzmann Constant
 */
exports.SB = 5.670373e-8;
/**
 * The Length of a Astromical Unit in meters.
 */
exports.AU = 149_597_870_700;
/**
 * The Length of a Light Year in meters.
 */
exports.LJ = 9460730472580800n;
/**
 * The Length of a Light-Second in meters
 */
exports.YEAR_IN_SEC = 31_557_600;
/**
 * The Mass of the Sun in KG
 */
exports.SUN_MASS_KG = 1.9884e30;
/**
 * The Radius of the sun in KM
 */
exports.R_SOL_KM = 695700; // KM
/**
 * The luminosity of the sun in watts
 */
exports.LUM_SOL_W = 3.828e26; // W
/**
 * The Surface Temperature of the Sun in °K
 */
exports.T_SOL = 5778; // °K
/**
 * The mass of the Earth in KG
 */
exports.EARTH_MASS_KG = 5.972e24;
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
 * All Valid Subspectral Class Values
 */
exports.VALID_SUBSPECTRAL_CLASS_VALUES = [];
for (let i = 0; i < exports.VALID_SPECTRAL_CLASS_VALUES.length; i++) {
    const e_i = exports.VALID_SPECTRAL_CLASS_VALUES[i];
    for (let j = 0; j < 10; j++) {
        const tempmin = +(e_i.tempmin + ((e_i.tempmax - e_i.tempmin) / 10) * j).toFixed(2);
        const tempmax = +(e_i.tempmin + ((e_i.tempmax - e_i.tempmin) / 10) * (j + 1)).toFixed(2);
        const massmin = +(e_i.massmin + ((e_i.massmax - e_i.massmin) / 10) * j).toFixed(5);
        const massmax = +(e_i.massmin + ((e_i.massmax - e_i.massmin) / 10) * (j + 1)).toFixed(5);
        let data = { class: e_i.class + "-" + j, name: e_i.name, color: e_i.color, tempmin, tempmax, massmin, massmax };
        exports.VALID_SUBSPECTRAL_CLASS_VALUES.push(data);
    }
}
/**
 * This 1.021639 was "really hard"™ to get...
 * I just guessed lol, just keep entering more and more accurate decimal places in Desmos, you'll find it eventually XD
 *
 * ---
 *
 * It was Like this:
 * - Too High: `1.2`
 * - Too High: `1.1 (-1)`
 * - Too Low : `1.0 (-1)`
 * - Too High: `1.05 (+.5)`
 * - Too High: `1.04 (-.1)`
 * - Too High: `1.03 (-.1)`
 * - Too Low : `1.02 (-.1)`
 * - Too High: `1.025 (+.05)`
 * - Too High: `1.024 (-.01)`
 * - Too High: `1.023 (-.01)`
 * - Too High: `1.022 (-.01)`
 * - Too Low : `1.021 (-.01)`
 * - etc.
 * - To Low: `1.021635`
 * - To Low: `1.021636 (+.00001)`
 * - To Low: `1.021637 (+.00001)`
 * - To Low: `1.021638 (+.00001)`
 * - Perfect: `1.021639 (+.00001)`
 *
 * If you Asking "why did you do that?"
 * Answer: "I Have no life and I'am pretty sure that the Gravitational Constant was Determinated the same way XD"
 *
 * This is what ChatGPT said to my constant: "Historisch wurden viele Konstanten tatsächlich erst mal so rumgestochert, bis man halbwegs konsistente Ergebnisse hatte."
 * = "Historically, many constants were actually fiddled around with until reasonably consistent results were achieved."
 *
 * But after writing some code, this would be the most precise Number:
 * 1.0216388735543742521887522130876091683703957473078500310054178421533504358657415429775215553538366594
 * So i will take that
 *
 * ---
 *
 * Now at least we also have L, T, and Y stars, which wouldn't have been possible with just 1.2.
 */
exports.STAR_GENERATION_CONSTANT = 1.0216388735543742521887522130876091683703957473078500310054178421533504358657415429775215553538366594;
/**
 * Die Verschiedenen Objekttypen und ihre Eigenschaften.
 *
 * ---
 *
 * `tyoe` = "The Probability of a Object appering"
 * `chance` = The probability that this object will be selected in relation to the others, not in %
 * `minDistance (dist.x)` = The minimum distance to **SIMILAR** objects, e.g.: minimum 3 light years away from stars.
 * `maxDistance (dist.y)` = The maximum distance to **SIMILAR** objects, e.g.: maximum 0 (infinity) away from stars.
 *
 * ---
 *
 * `preferred` is the value that indicates the preferred position... as the name suggests.
 * There are:
 * - `nearStar-min-max`: The object is `min` light-years and `max` light-years away from a star.
 * - `deepSpace-min`: The object is `min` light years away from stars.
 */
class ObjectType {
    type;
    chance;
    preferred;
    dist;
    constructor(type, chance, preferred, dist) {
        this.type = type;
        this.chance = chance;
        this.preferred = preferred;
        this.dist = dist;
    }
}
exports.ObjectType = ObjectType;
exports.allObjectTypes = [
    new ObjectType("star", 0.2, "distance", new tool_1.Vector2(2, 0)),
    new ObjectType("interstellar_t1_astroid", 0.05, "near_star", new tool_1.Vector2(0.1, 2)),
    new ObjectType("interstellar_t2_astroid", 0.05, "deep_space", new tool_1.Vector2(500, 0)),
    new ObjectType("interstellar_t3_astroid", 0.05, "deep_space", new tool_1.Vector2(1000, 0)),
    //// new ObjectType("rogue_planet", 0.01, "near_star", new Vector2(2, 15)),
    new ObjectType("anomaly", 0.01, "deep_space", new tool_1.Vector2(2000, 0)),
    //// new ObjectType("antimatter_anomaly", 0.01, "deep_space", new Vector2(5000)),
    new ObjectType("mainBlackHole", -1, "deep_space", new tool_1.Vector2(0, 0)),
];
function chooseObjectTypeByChance() {
    let chosenType = null;
    for (let i = 0; i < exports.allObjectTypes.length; i++) {
        if (exports.allObjectTypes[i].type == "mainBlackHole")
            continue;
        if (exports.allObjectTypes[i].chance > (0, exports.rng)()) {
            chosenType = exports.allObjectTypes[i];
            break;
        }
    }
    return chosenType || exports.allObjectTypes[0];
}
function StarSpectralClassDataToMetadata(classData) {
    return {
        name: classData.name,
        class: classData.class,
        subclass: classData.subclass,
        lum: classData.lum,
    };
}
