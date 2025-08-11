import seedrandom from "seedrandom";
import * as res from "./resources";
/**
 * Der Seed Der Galaxie.
 * Achtung! man kann kein Brot damit Backen
 *
 * ---
 *
 * Standard: `"Main"`
 */
export declare const seed: "Main" | string;
/**
 * Der seed basierend auf der config.json/seed
 */
export declare const rng: seedrandom.PRNG;
/**
 * Der Radius der Galaxie in Lichtjahren
 *
 * ---
 *
 * Standard_ `1ßßßß`
 */
export declare const radius: 10000 | number;
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
 * Standard: `4500`
 */
export declare const count: 4500 | number;
/**
 * Die Minimalen und Maximalen Planeten in einem Sternensystem,
 * Beeinflusst aber nicht die Monde.
 *
 * ---
 *
 * Standard: `0-10`
 */
export declare const stellarPlanetCount: {
    min: 0 | number;
    max: 10 | number;
};
/**
 * Die Minimalen und Maximalen Asteroidengürtel in einem Sternensystem.
 *
 * ---
 *
 * Standard: `0-3`
 */
export declare const stellarAstroidCount: {
    min: 0 | number;
    max: 3 | number;
};
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
export declare const exponent: 0.75 | number;
/**
 * Der Name des Schwarzen Lochs im Zentrum.
 *
 * ---
 *
 * Standard: `"Nexus"` - die verbindung zu allem 😄
 */
export declare const mainBlackHoleName: "Nexus" | string;
/**
 * Alle Beforzugten typen (Type)
 */
export type preferredTypes = "sun_orbit" | "planet_orbit" | "nearStar-min-max" | "deepSpace-min" | "" | string;
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
export declare class ObjectType {
    name: res.CelestialObjectTypes;
    chance: number;
    minDistance: number;
    maxDistance: number;
    preferred: preferredTypes;
    constructor(name: res.CelestialObjectTypes, chance: number, minDistance: number, maxDistance: number, preferred: preferredTypes);
}
/**
 * Alle Objekte in einem Array
 */
export declare const types: ObjectType[];
export declare function chooseTypeByChance(): ObjectType;
/**
 * Die Gravitationskonstante
 */
export declare const G: 6.67430e-11;
/**
 * Stefan Boltzmann Konstante
 */
export declare const SB: 5.670373e-8;
/**
 * Die Länge einer Astronomischen Einheit in Meter
 */
export declare const AE: 149597870700;
/**
 * Die Länge eines Lichtjahres in Meter
 */
export declare const LJ: 9460730472580800n;
/**
 * Die Länge eines Jahres in Sekunden
 */
export declare const YEAR_IN_SEC: 31557600;
/**
 * Masse der Sonne in KG
 */
export declare const SUN_MASS_KG: 1.9884e30;
/**
 * Der Radius der Sonne in KM
 */
export declare const R_SOL_KM: 695700;
/**
 * Die Luminosität der Sonne in Watt
 */
export declare const LUM_SOL_W: 3.828e26;
/**
 * Die (Oberflächen-)Temperatur der Sonne in °K
 */
export declare const T_SOL: 5778;
/**
 * Masse der Erde in KG
 */
export declare const EARTH_MASS_KG: 5.972e24;
/**
 * Die Maximale Anzahl an Planeten die in einem Sternensystem vorhanden sein dürfen.
 * Standard: 3
 */
export declare const MAX_PLANETS_PER_SOLSYS: number;
/**
 * Die Maximale Anzahl an Monden die um einen Planeten vorhanden sein dürfen.
 * Standard: 3
 */
export declare const MAX_MOONS_PER_PLANET: number;
/**
 * Alle Validen Werte für jedesSpektrum.
 *
 * Hier habe ich natürlich einige Simplifikationen durchgeführt, besonders bei der Klasse `M`, `L`, `T` und `Y`.
 * man kann ja nicht immer alles Kompliziert machen
 */
export declare const VALID_SPECTRAL_CLASS_VALUES: {
    class: string;
    name: string;
    color: string;
    tempmin: number;
    tempmax: number;
    massmin: number;
    massmax: number;
}[];
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
    starTemperature: number;
    starMass: number;
    starMassKG: number;
    starRad: number;
    starLum: number;
    starSpectral: {
        h: "Y" | "T" | "L" | "M" | "K" | "G" | "F" | "A" | "B" | "O" | string;
        s: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | string;
        name: string;
        color: string;
    };
    planetSystem: planetSystemDataDef[];
};
/**
 * Die Infos zu einem Planetensystems (Type)
 */
export type planetSystemDataDef = {
    name: string;
    parent: string;
    temperature: number;
    albedo: number;
    height: number;
    massEM: number;
    massKG: number;
    g: number;
    r: number;
    d: number;
    OrbitalSpeed: number;
    OrbitalTimeInSec: number;
    OrbitalTimeInYears: number;
    orbitPosDegree: number;
    orbitPosNorm: number;
    resources: res.webResourceInformation[];
    moons: moonSystemDataDef[];
    attributes: CelestialAttributeData;
    special: {
        atm?: AtmosphericInformation;
    };
};
/**
 * Die Infos zu einem Einzelgängerplaneten (Type)
 */
export type roguePlanetDataDef = {
    name: string;
    temperature: number;
    massEM: number;
    massKG: number;
    g: number;
    r: number;
    d: number;
    moons: moonSystemDataDef[];
    resources: res.webResourceInformation[];
    attributes: CelestialAttributeData;
    special: {
        atm?: AtmosphericInformation;
    };
};
/**
 * Die Infos zu einem Mondsystems (Type)
 */
export type moonSystemDataDef = {
    name: string;
    parent: string;
    height: number;
    massEM: number;
    massKG: number;
    g: number;
    r: number;
    d: number;
    OrbitalSpeed: number;
    OrbitalTimeInSec: number;
    OrbitalTimeInYears: number;
    orbitPosDegree: number;
    orbitPosNorm: number;
    resources: res.webResourceInformation[];
    attributes: CelestialAttributeData;
    special: CelestialSpecialData;
};
/**
 * Damit es Überall ein Typ gibt :D
 * Ich mab das Type-System einfach, nagut ich bin ja auch ein fan von C#
 */
export type ObjectInformationType = null | "star" | "rogue_planet";
/**
 * Atmosphereninformationen (Type)
 */
export type AtmosphericInformation = {
    temperature: number;
    gases: GasInformationType[];
    atmPressure: number;
    scaleHeight: number;
    referenceDensity: number;
    greenhouseEffect: number;
} | null;
export type CelestialAttributeData = {
    atm?: "atmosphere" | "noAtmosphere";
};
export type CelestialSpecialData = {
    atm?: AtmosphericInformation;
};
/**
 * Gasinformationen (Type)
 */
export type GasInformationType = {
    id: string;
    k_a: number;
    w: number;
    mol: number;
};
/**
 * Gasinformationen
 */
export declare const GasInformation: GasInformationType[];
