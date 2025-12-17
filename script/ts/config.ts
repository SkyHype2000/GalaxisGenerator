import seedrandom from "seedrandom";
import { Vector2 } from "./tool";
import { readFileSync } from "fs";

/**
 * Der Seed Der Galaxie.  
 * Achtung! man kann kein Brot damit Backen
 * 
 * ---
 * 
 * Standard: `"Main"`
 */
export const seed: "Main" | string = "Main";
/**
 * Der seedrandom für die Generation
 */
export const rng = seedrandom(seed);

/**
 * Der Radius der Galaxie in Lichtjahren  
 * 
 * ---
 * 
 * Standard_ `10000`
 */
export const radius: 10000 | number = 1_000;

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
export const count: 4500 | number = 5000;

//! / KONSTANTEN ////////////////////////////////////////////////////////////////////

/**
 * Die Gravitationskonstante
 */
export const G: 6.67430e-11 = 6.67430e-11;
/**
 * Stefan Boltzmann Konstante
 */
export const SB: 5.670373e-8 = 5.670373e-8;
/**
 * Die Länge der Distanz zwischen Erde und Mond in Meter
 */
export const Moon: 384400000 = 384_400_000;
/**
 * Die Länge einer Astronomischen Einheit in Meter
 */
export const AE: 149597870700 = 149_597_870_700;
/**
 * Die Länge eines Lichtjahres in Meter
 */
export const LJ: 9460730472580800 = 9_460_730_472_580_800;
/**
 * Die Länge eines Parsec in Meter
 */
export const PC: 30856775814913670 = 30_856_775_814_913_670;
/**
 * Die Länge eines Jahres in Sekunden
 */
export const YEAR_IN_SEC: 31557600 = 31_557_600;
/**
 * Masse der Sonne in KG
 */
export const SUN_MASS_KG: 1.9884e30 = 1.9884e30;
/**
 * Der Radius der Sonne in KM
 */
export const R_SOL_KM: 695700 = 695700; // KM
/**
 * Die Luminosität der Sonne in Watt
 */
export const LUM_SOL_W: 3.828e26 = 3.828e26; // W
/**
 * Die (Oberflächen-)Temperatur der Sonne in °K
 */
export const T_SOL: 5778 = 5778; // °K
/**
 * Masse der Erde in KG
 */
export const EARTH_MASS_KG: 5.972e24 = 5.972e24;
/**
 * Radius der Erde in Meter
 */
export const EARTH_RADIUS: 6_371_008.7714 = 6_371_008.7714;
/**
 * Die Generationskonstante für die Sternspektralklassen
 */
export const STAR_GENERATION_CONSTANT: 1.02163887355437425 = 1.02163887355437425;

//! / STERNSYSTEM INFORMATIONEN /////////////////////////////////////////////////////

/**
 * Wieviele Planeten Minimum und Maximum pro Sternensystem Existieren dürfen
 * 
 * ---
 * 
 * Standard: `0` bis `10`
 */
export const planetRange: Vector2 = new Vector2(0, 10);

/**
 * Wie viele Asteroidengürtel Minimum und Maximum pro Sternsystem Existieren dürfen
 * 
 * ---
 * 
 * Standard: `0` bis `3`
 */
export const astroidBelts: Vector2 = new Vector2(0, 3);

export type objectEnabledType = {
    stars: boolean,
    planets: boolean,
    moons: boolean,
    astroidBelts: boolean,
    interstellarAstroidFields: boolean,
    rougePlanet: boolean,
    blackHole: boolean,
}
/**
 * Welche Objekte für die Generation Aktiviert sind
 */
export const objectEnabled: objectEnabledType = {
    stars: true,
    planets: true,
    moons: false,
    astroidBelts: false,
    interstellarAstroidFields: false,
    rougePlanet: false,
    blackHole: false
}

export type distanceTypes = "KM" | "Moon" | "AE" | "Lj" | "kLj" | "MLj" | "pc" | "kpc" | "Mpc"
export class DistanceConfigClass {
    type: distanceTypes; min: number; max: number | undefined;
    constructor(type: distanceTypes, min: number, max: number | undefined) { this.type = type; this.min = min; this.max = max }
}
export type distanceConfigType = {
    stars: DistanceConfigClass | null,
    planets: DistanceConfigClass | null,
    moons: DistanceConfigClass | null,
    astroidBelts: DistanceConfigClass | null,
    interstellarAstroidFieldT1: DistanceConfigClass | null,
    interstellarAstroidFieldT2: DistanceConfigClass | null,
    interstellarAstroidFieldT3: DistanceConfigClass | null,
    rougePlanet: DistanceConfigClass | null,
    blackHole: DistanceConfigClass | null,
}
/**
 * Die minimalen und Maximalen Abstände zwischen den Objekten
 */
export const distanceConfigList: distanceConfigType = {
    stars: new DistanceConfigClass("Lj", 2, undefined),
    planets: new DistanceConfigClass("AE", 0.1, 2),
    moons: null,
    astroidBelts: null,
    interstellarAstroidFieldT1: null,
    interstellarAstroidFieldT2: null,
    interstellarAstroidFieldT3: null,
    rougePlanet: null,
    blackHole: null,
}
export function distanceToMeters(type: distanceTypes, value: number): number {
    switch (type) {
        case "KM": return value * 1000; break;
        case "Moon": return value * Moon; break;
        case "AE": return value * AE; break;
        case "Lj": return value * LJ; break;
        case "kLj": return value * (LJ * 1000); break;
        case "MLj": return value * (LJ * 1000000); break;
        case "pc": return value * PC; break;
        case "kpc": return value * (PC * 1000); break;
        case "Mpc": return value * (PC * 1000000); break;
        default: return 0; break;
    }
}

export type SpectralClassType = { class: string, name: string, color: string, tempmin: number, tempmax: number, massmin: number, massmax: number }
export const SpectralClassList: SpectralClassType[] = JSON.parse(readFileSync("./src/validSubspectralClasses.json", "utf-8"))!;
export function getSpectralClass(mass:number):SpectralClassType {
    for (let i = 0; i < SpectralClassList.length; i++) {
        const e = SpectralClassList[i];
        if (mass >= e.massmin && mass < e.massmax) {
            return e;
        }
    }
    return SpectralClassList[0];
}