import seedrandom from "seedrandom";
import * as res from "./resources"
import { Vector2 } from "./tool";

/**
 * Der Name des Schwarzen Lochs im Zentrum.
 * 
 * ---
 * 
 * Standard: `"Nexus"` - die verbindung zu allem 😄
 */
export const mainBlackHoleName: "Nexus" | string = "Nexus";
/**
 * Der Seed Der Galaxie.  
 * Achtung! man kann kein Brot damit Backen
 * 
 * ---
 * 
 * Standard: `@mainBlackHoleName`
 */
export const seed: string | string = mainBlackHoleName;
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
export const radius: 10000 | number = 10_000;
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
export const count: 4500 | number = 4500;
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
export const SectorSize: Vector2 = new Vector2(1000, 1000)
/**
 * Returns the Sector Position
 */
export function getSectorPos(pos: Vector2) { return new Vector2(Math.floor(pos.x / SectorSize.x), Math.floor(pos.y / SectorSize.y)); }
/**
 * The Minimal and Maximal Planets a Star-System will have
 * 
 * ---
 * 
 * Standard: `0-10`
 */
export const stellarPlanetCount: Vector2 = new Vector2(0, 10);
/**
 * The Radius Range of a Planet in Earth-Radius
 * 
 * ---
 * 
 * Standard: `0.1-3`
 */
export const planetRadius: Vector2 = new Vector2(0.1, 3)
/**
 * The minimum Starting Distance from the Planet to the Sun in AU
 * 
 * Standard: `0.1`
 * 
 * For Reference, The average distance between Mercury and the Sun is ~0.387 AU  
 * So `.1` AU is pretty close.
 */
export const planetToSunStartDistance: number = 0.1
/**
 * The Minimum and Maximum Distance between Planets.
 * 
 * Values in the Middle are More common than the Values on the Edges.
 * 
 * Standard: `0.05-2`
 */
export const planetToPlanetChangeDistance: Vector2 = new Vector2(0.05, 3)
/** 
 * The Minimal and Maximal Moons a Planet-System will have
 * 
 * ---
 * 
 * Standard: `0-3`
 */
export const planetaryMoonCount: Vector2 = new Vector2(0, 3);
/**
 * The Radius Range of a Moon in Earth-Radius
 * 
 * ---
 * 
 * Standard: `0.05-0.8`
 */
export const moonRadius: Vector2 = new Vector2(0.05, 0.8)
/**
 * The Minimum and Maximum Distance between Moons(And Main Planet).
 * 
 * Values in the Middle are More common than the Values on the Edges.
 * 
 * Standard: `0.05-2`
 */
export const moonToMoonChangeDistance: Vector2 = new Vector2(75_000_000/149_597_870_700, 300_000_000/149_597_870_700)
/**
 * The Minimal and Maximal Astroidbelt Count of a Starsystem
 * 
 * This is Not Used for now, if not, i will still keep it becaus i will think that i at some point need this, lol.
 * 
 * ---
 * 
 * Standard: `0-3`
 */
export const stellarAstroidCount: Vector2 = new Vector2(0, 3);
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
export const exponent: 0.75 | number = 0.75;
/**
 * The Gravitational Constant
 */
export const G: 6.67430e-11 = 6.67430e-11;
/**
 * Stefan Boltzmann Constant
 */
export const SB: 5.670373e-8 = 5.670373e-8;
/**
 * The Length of a Astromical Unit in meters.
 */
export const AU: 149597870700 = 149_597_870_700;
/**
 * The Length of a Light Year in meters.
 */
export const LJ: 9460730472580800n = 9_460_730_472_580_800n;
/**
 * The Length of a Light-Second in meters
 */
export const YEAR_IN_SEC: 31557600 = 31_557_600;
/**
 * The Mass of the Sun in KG
 */
export const SUN_MASS_KG: 1.9884e30 = 1.9884e30;
/**
 * The Radius of the sun in KM
 */
export const R_SOL_KM: 695700 = 695700; // KM
/**
 * The luminosity of the sun in watts
 */
export const LUM_SOL_W: 3.828e26 = 3.828e26; // W
/**
 * The Surface Temperature of the Sun in °K
 */
export const T_SOL: 5778 = 5778; // °K
/**
 * The mass of the Earth in KG
 */
export const EARTH_MASS_KG: 5.972e24 = 5.972e24;

/**
 * Spectral Class
 */
export type SpectralClassType = { class: string, name: string, color: string, tempmin: number, tempmax: number, massmin: number, massmax: number }
/**
 * Spectral Class Data
 */
export type SpectralClassData = { class: string, subclass: string, name: string, color: string, temperature: number, mass: number, lum: number, rad: number }
/**
 * Final Star Object Data
 */
export type StarObjectSpectralMetadata = {class:string,subclass:string,name:string,lum:number}
/**
 * Alle Validen Werte für jedesSpektrum.
 *
 * Hier habe ich natürlich einige Simplifikationen durchgeführt, besonders bei der Klasse `M`, `L`, `T` und `Y`.  
 * man kann ja nicht immer alles Kompliziert machen
 */
export const VALID_SPECTRAL_CLASS_VALUES: SpectralClassType[] = [
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
 * All Valid Subspectral Class Values
 */
export const VALID_SUBSPECTRAL_CLASS_VALUES: SpectralClassType[] = [];
for (let i = 0; i < VALID_SPECTRAL_CLASS_VALUES.length; i++) {
    const e_i = VALID_SPECTRAL_CLASS_VALUES[i];
    for (let j = 0; j < 10; j++) {
        const tempmin = +(e_i.tempmin + ((e_i.tempmax - e_i.tempmin) / 10) * j).toFixed(2); const tempmax = +(e_i.tempmin + ((e_i.tempmax - e_i.tempmin) / 10) * (j + 1)).toFixed(2);
        const massmin = +(e_i.massmin + ((e_i.massmax - e_i.massmin) / 10) * j).toFixed(5); const massmax = +(e_i.massmin + ((e_i.massmax - e_i.massmin) / 10) * (j + 1)).toFixed(5);
        let data = { class: e_i.class + "-" + j, name: e_i.name, color: e_i.color, tempmin, tempmax, massmin, massmax }
        VALID_SUBSPECTRAL_CLASS_VALUES.push(data)
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
export const STAR_GENERATION_CONSTANT:1.0216388735543742521887522130876091683703957473078500310054178421533504358657415429775215553538366594 = 1.0216388735543742521887522130876091683703957473078500310054178421533504358657415429775215553538366594;

/**
 * Alle Beforzugten typen (Type)
 */
export type preferredTypes = "sun_orbit" | "planet_orbit" | "nearStar-min-max" | "deepSpace-min" | "" | string

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
export class ObjectType {
    type: res.CelestialObjectTypes;
    chance: number;
    preferred: "near_star" | "deep_space" | "distance" | "";
    dist: Vector2

    constructor(type: res.CelestialObjectTypes, chance: number, preferred: "near_star" | "deep_space" | "distance" | "", dist: Vector2) {
        this.type = type;
        this.chance = chance;
        this.preferred = preferred;
        this.dist = dist;
    }
}

export const allObjectTypes: ObjectType[] = [
    new ObjectType("star", 0.2, "distance", new Vector2(2, 0)),
    new ObjectType("interstellar_t1_astroid", 0.05, "near_star", new Vector2(0.1, 2)),
    new ObjectType("interstellar_t2_astroid", 0.05, "deep_space", new Vector2(500, 0)),
    new ObjectType("interstellar_t3_astroid", 0.05, "deep_space", new Vector2(1000, 0)),
    //// new ObjectType("rogue_planet", 0.01, "near_star", new Vector2(2, 15)),
    new ObjectType("anomaly", 0.01, "deep_space", new Vector2(2000, 0)),
    //// new ObjectType("antimatter_anomaly", 0.01, "deep_space", new Vector2(5000)),
    new ObjectType("mainBlackHole", -1, "deep_space", new Vector2(0, 0)),
]

export function chooseObjectTypeByChance(): ObjectType {
    let chosenType: ObjectType | null = null;
    for (let i = 0; i < allObjectTypes.length; i++) {
        if (allObjectTypes[i].type == "mainBlackHole") continue;
        if (allObjectTypes[i].chance > rng()) {
            chosenType = allObjectTypes[i];
            break;
        }
    }
    return chosenType || allObjectTypes[0];
}

/**
 * Short Position Information so the Code can Corectly Position other Objects
 */
export type ShortObjectPosition = { type: res.CelestialObjectTypes, pos: Vector2 }

/**
 * Sector File Information
 */
export type SectorFile = {
    name: string;
    position: { x: number, y: number };
    objects: FilesObjectTypeInfo[];
}

/**
 * The Object Data that goes into SectorFile.object[]
 */
export type FilesObjectTypeInfo = {
    id: string,
    position: Vector2,
    metadata: ObjectMetadata
}

/**
 * ObjectMetadata with Several Options
 * 
 * ---
 * 
 * `name`: The Name of the Object  
 * `position`: The Relative Position to the Sector  
 * `mass`: The mass of the Object in KG
 * `objectType`: Defines the Type of the Object
 * 
 * ---
 * 
 * `extra`: Optional Object Spesific Data, for Example Star Information
 * - `star?`: the Metadata for a Star
 */
export type ObjectMetadata = {
    name: string,
    position: Vector2,
    objectType: res.CelestialObjectTypes,
    mass?: number,
    extra?: {
        star?: StarObjectMetadata,
        planet?: PlanetObjectMetadata,
        interstellarAstroidField?: InterstellarAstroidFieldObjectMetadata
    }
}

export function StarSpectralClassDataToMetadata(classData:SpectralClassData):StarObjectSpectralMetadata {
    return {
        name: classData.name,
        class: classData.class,
        subclass: classData.subclass,
        lum: classData.lum,
    }
}
/**
 * Metadata for a Star
 */
export type StarObjectMetadata = {
    name: string,
    metadata: {
        spectral:StarObjectSpectralMetadata,
        mass:number,
        temperature:number,
        radius:number,
        planets:PlanetObjectMetadata[]
    },
}
/**
 * Metadata for a Planet
 * 
 * `mass`: Mass in KG
 * `radius`: Radius in meters
 * `OrbitalPeriod`: Priod in Seconds
 */
export type PlanetObjectMetadata = {
    name:string,
    type:res.CelestialObjectTypes,
    mass:number,
    radius:number,
    gravitation:number,
    resources:res.resWebJSONData[],
    moons:MoonObjectMetadata[],
    OrbitalPeriod:number,
    OrbitalHeigth:number,
}
/**
 * Metadata for a Moon  
 * Like Luna :D
 */
export type MoonObjectMetadata = {
    name:string,
    type:res.CelestialObjectTypes,
    mass:number,
    radius:number,
    gravitation:number,
    resources:res.resWebJSONData[],
    OrbitalPeriod:number,
    OrbitalHeigth:number,
}
/**
 * Metadata for a InterstellarAstroidField
 * 
 * Really Long Name lol
 */
export type InterstellarAstroidFieldObjectMetadata = {
    name:string,
}
export type InterstellarAstroidFieldTypes = "interstellar_t1_astroid"|"interstellar_t2_astroid"|"interstellar_t3_astroid"
/**
 * Metadata for a Anomaly
 */
export type AnomalyObjectMetadata = {
    name:string,
}