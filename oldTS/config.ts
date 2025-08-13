import seedrandom from "seedrandom";
import * as res from "../script/ts/resources"

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
 * Der seed basierend auf der config.json/seed
 */
export const rng = seedrandom(seed);
/**
 * Der Radius der Galaxie in Lichtjahren  
 * 
 * ---
 * 
 * Standard_ `1ßßßß`
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
/**
 * Die Größe eines Sektors  
 * 
 * ---
 * 
 * Um Die Dateien zu Verkleinern und Das Rendern zu "Optimieren"(Wenn ich es überhaupt jemals Tun werde lol)
 * 
 * ---
 * 
 * Standard: `x=1000`, `x=1000`;
 * 
 * Die Größe ist in Lichtjahren
 */
export const sectorSize: {x:number, y:number} = {x: 1000, y: 1000}
/**
 * Die Minimalen und Maximalen Planeten in einem Sternensystem,  
 * Beeinflusst aber nicht die Monde.
 * 
 * ---
 * 
 * Standard: `0-10`
 */
export const stellarPlanetCount: { min: 0 | number, max: 10 | number } = { min: 0, max: 10 };
/**
 * Die Minimalen und Maximalen Asteroidengürtel in einem Sternensystem.
 * 
 * ---
 * 
 * Standard: `0-3`
 */
export const stellarAstroidCount: { min: 0 | number, max: 3 | number } = { min: 0, max: 3 };
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
export const exponent: 0.75 | number = 0.75;
/**
 * Der Name des Schwarzen Lochs im Zentrum.
 * 
 * ---
 * 
 * Standard: `"Nexus"` - die verbindung zu allem 😄
 */
export const mainBlackHoleName: "Nexus" | string = "Nexus";

/**
 * Alle Beforzugten typen (Type)
 */
export type preferredTypes = "sun_orbit" | "planet_orbit" | "nearStar-min-max" | "deepSpace-min" | "" | string

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
export class ObjectType {
    name: res.CelestialObjectTypes;
    chance: number;
    minDistance: number;
    maxDistance: number;
    preferred: preferredTypes;

    constructor(name: res.CelestialObjectTypes, chance: number, minDistance: number, maxDistance: number, preferred: preferredTypes) {
        this.name = name;
        this.chance = chance;
        this.minDistance = minDistance;
        this.maxDistance = maxDistance;
        this.preferred = preferred;
    }
}

/**
 * Alle Objekte in einem Array
 */
export const types: ObjectType[] = [
    new ObjectType("star", 0.2, 3, 0, ""),
    new ObjectType("planet", 0.5, 0, 0, "sun_orbit"),
    new ObjectType("moon", 0.15, 0, 0, "planet_orbit"),
    new ObjectType("stellar_astroid", 0.2, 0, 0, "sun_orbit"),
    new ObjectType("interstellar_t1_astroid", 0.05, 5, 0, "neaStar-0.1-2"),
    new ObjectType("interstellar_t2_astroid", 0.05, 1000, 0, "deepSpace-500"),
    new ObjectType("interstellar_t3_astroid", 0.05, 2000, 0, "deepSpace-1000"),
    new ObjectType("rogue_planet", 0.01, 5, 0, "nearStar-2-15"),
    new ObjectType("anomaly", 0.01, 1000, 0, "deepSpace-2000"),
    new ObjectType("antimatter_anomaly", 0.0001, 3000, 0, "deepSpace-5000"),
    new ObjectType("mainBlackHole", 0, 0, 0, ""),
    new ObjectType("blackHole", 0.001, 2000, 0, "deepSpace-1000"),
    new ObjectType("gas_planet", 0.2, 0, 0, "sun_orbit")
]

export function chooseTypeByChance(): ObjectType {
    let chosenType: ObjectType | null = null;
    let tries = 0;
    while (!chosenType && tries < 100) {
        for (let i = 0; i < types.length; i++) {
            if (types[i].name == "mainBlackHole") continue;
            if (types[i].chance > rng()) {
                chosenType = types[i];
                break;
            }
        }
        tries++;
    }
    return chosenType || types[0];
}

/**
 * Die Gravitationskonstante
 */
export const G: 6.67430e-11 = 6.67430e-11;
/**
 * Stefan Boltzmann Konstante
 */
export const SB: 5.670373e-8 = 5.670373e-8;
/**
 * Die Länge einer Astronomischen Einheit in Meter
 */
export const AE: 149597870700 = 149_597_870_700;
/**
 * Die Länge eines Lichtjahres in Meter
 */
export const LJ: 9460730472580800n = 9_460_730_472_580_800n;
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
 * Die Maximale Anzahl an Planeten die in einem Sternensystem vorhanden sein dürfen.  
 * Standard: 3
 */
export const MAX_PLANETS_PER_SOLSYS: number = 10;
/**
 * Die Maximale Anzahl an Monden die um einen Planeten vorhanden sein dürfen.  
 * Standard: 3
 */
export const MAX_MOONS_PER_PLANET: number = 3;
/**
 * Alle Validen Werte für jedesSpektrum.
 *
 * Hier habe ich natürlich einige Simplifikationen durchgeführt, besonders bei der Klasse `M`, `L`, `T` und `Y`.  
 * man kann ja nicht immer alles Kompliziert machen
 */
export const VALID_SPECTRAL_CLASS_VALUES: { class: string, name: string, color: string, tempmin: number, tempmax: number, massmin: number, massmax: number }[] = [
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
 * Die Grund-Informationen für den Stern (Type)
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
 */
export type starInformationTypeDef = {
    starTemperature: number,
    starMass: number,
    starMassKG: number,
    starRad: number,
    starLum: number,
    starSpectral: {
        h: "Y" | "T" | "L" | "M" | "K" | "G" | "F" | "A" | "B" | "O" | string,
        s: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | string,
        name: string, color: string
    },
    planetSystem: planetSystemDataDef[]
}

/**
 * Die Infos zu einem Planetensystems (Type)
 */
export type planetSystemDataDef = {
    name: string,
    parent: string,
    temperature: number,
    albedo: number,
    height: number,
    massEM: number,
    massKG: number,
    g: number,
    r: number,
    d: number,
    OrbitalSpeed: number,
    OrbitalTimeInSec: number,
    OrbitalTimeInYears: number,
    orbitPosDegree: number,
    orbitPosNorm: number,
    resources: res.webResourceInformation[],
    moons: moonSystemDataDef[],
    attributes: CelestialAttributeData,
    special: {atm?:AtmosphericInformation},
}

/**
 * Die Infos zu einem Einzelgängerplaneten (Type)
 */
export type roguePlanetDataDef = {
    name: string,
    temperature: number,
    massEM: number,
    massKG: number,
    g: number,
    r: number,
    d: number,
    moons: moonSystemDataDef[],
    resources: res.webResourceInformation[],
    attributes: CelestialAttributeData,
    special: {atm?:AtmosphericInformation},
}

/**
 * Die Infos zu einem Mondsystems (Type)
 */
export type moonSystemDataDef = {
    name: string,
    parent: string,
    height: number,
    massEM: number,
    massKG: number,
    g: number,
    r: number,
    d: number,
    OrbitalSpeed: number,
    OrbitalTimeInSec: number,
    OrbitalTimeInYears: number,
    orbitPosDegree: number,
    orbitPosNorm: number,
    resources: res.webResourceInformation[],
    attributes: CelestialAttributeData,
    special: CelestialSpecialData,
}

/**
 * Damit es Überall ein Typ gibt :D  
 * Ich mab das Type-System einfach, nagut ich bin ja auch ein fan von C#
 */
export type ObjectInformationType = null|"star"|"rogue_planet"

/**
 * Atmosphereninformationen (Type)
 */
export type AtmosphericInformation = {
    temperature: number,
    gases: GasInformationType[],
    atmPressure: number,
    scaleHeight: number,
    referenceDensity: number,
    greenhouseEffect: number
}|null

export type CelestialAttributeData = {
    atm?: "atmosphere" | "noAtmosphere"
}

export type CelestialSpecialData = {
    atm?:AtmosphericInformation
}

/**
 * Gasinformationen (Type)
 */
export type GasInformationType = { id: string, k_a: number, w: number, mol: number };

/**
 * Gasinformationen
 */
export const GasInformation: GasInformationType[] = [
    { id: "CO2", k_a: 2000, w: 0, mol: 0.04401 },
    { id: "CH4", k_a: 150, w: 0, mol: 0.01604 },
    { id: "H2O", k_a: 3000, w: 0, mol: 0.018015 },
    { id: "N2", k_a: 0.01, w: 0, mol: 0.028014 },
    { id: "O2", k_a: 0.01, w: 0, mol: 0.031999 }
];

export type SectorFile = {
    name: string,
    position: {x: number, y: number},
    objects: any,
}