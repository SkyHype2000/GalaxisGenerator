import seedrandom from "seedrandom";
import * as res from "./resources";
import { Vector2 } from "./tool";
/**
 * Der Name des Schwarzen Lochs im Zentrum.
 *
 * ---
 *
 * Standard: `"Nexus"` - die verbindung zu allem 😄
 */
export declare const mainBlackHoleName: "Nexus" | string;
/**
 * Der Seed Der Galaxie.
 * Achtung! man kann kein Brot damit Backen
 *
 * ---
 *
 * Standard: `@mainBlackHoleName`
 */
export declare const seed: string | string;
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
 * Mal davon abgesehen das es immer Länger und Länger braucht die galaxie zu generieren. (Nagut Tests zeigen das es auch mit 50k Geht)
 *
 * ---
 *
 * Standard: `4500`
 */
export declare const count: 4500 | number;
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
export declare const SectorSize: Vector2;
/**
 * Returns the Sector Position
 */
export declare function getSectorPos(pos: Vector2): Vector2;
/**
 * The Minimal and Maximal Planets a Star-System will have
 *
 * ---
 *
 * Standard: `0-10`
 */
export declare const stellarPlanetCount: Vector2;
/**
 * The Radius Range of a Planet in Earth-Radius
 *
 * ---
 *
 * Standard: `0.1-3`
 */
export declare const planetRadius: Vector2;
/**
 * The minimum Starting Distance from the Planet to the Sun in AU
 *
 * Standard: `0.1`
 *
 * For Reference, The average distance between Mercury and the Sun is ~0.387 AU
 * So `.1` AU is pretty close.
 */
export declare const planetToSunStartDistance: number;
/**
 * The Minimum and Maximum Distance between Planets.
 *
 * Values in the Middle are More common than the Values on the Edges.
 *
 * Standard: `0.05-2`
 */
export declare const planetToPlanetChangeDistance: Vector2;
/**
 * The Minimal and Maximal Moons a Planet-System will have
 *
 * ---
 *
 * Standard: `0-3`
 */
export declare const planetaryMoonCount: Vector2;
/**
 * The Radius Range of a Moon in Earth-Radius
 *
 * ---
 *
 * Standard: `0.05-0.8`
 */
export declare const moonRadius: Vector2;
/**
 * The Minimum and Maximum Distance between Moons(And Main Planet).
 *
 * Values in the Middle are More common than the Values on the Edges.
 *
 * Standard: `0.05-2`
 */
export declare const moonToMoonChangeDistance: Vector2;
/**
 * The Minimal and Maximal Astroidbelt Count of a Starsystem
 *
 * This is Not Used for now, if not, i will still keep it becaus i will think that i at some point need this, lol.
 *
 * ---
 *
 * Standard: `0-3`
 */
export declare const stellarAstroidCount: Vector2;
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
export declare const exponent: 0.75 | number;
/**
 * The Gravitational Constant
 */
export declare const G: 6.67430e-11;
/**
 * Stefan Boltzmann Constant
 */
export declare const SB: 5.670373e-8;
/**
 * The Length of a Astromical Unit in meters.
 */
export declare const AU: 149597870700;
/**
 * The Length of a Light Year in meters.
 */
export declare const LJ: 9460730472580800n;
/**
 * The Length of a Light-Second in meters
 */
export declare const YEAR_IN_SEC: 31557600;
/**
 * The Mass of the Sun in KG
 */
export declare const SUN_MASS_KG: 1.9884e30;
/**
 * The Radius of the sun in KM
 */
export declare const R_SOL_KM: 695700;
/**
 * The luminosity of the sun in watts
 */
export declare const LUM_SOL_W: 3.828e26;
/**
 * The Surface Temperature of the Sun in °K
 */
export declare const T_SOL: 5778;
/**
 * The mass of the Earth in KG
 */
export declare const EARTH_MASS_KG: 5.972e24;
/**
 * Spectral Class
 */
export type SpectralClassType = {
    class: string;
    name: string;
    color: string;
    tempmin: number;
    tempmax: number;
    massmin: number;
    massmax: number;
};
/**
 * Spectral Class Data
 */
export type SpectralClassData = {
    class: string;
    subclass: string;
    name: string;
    color: string;
    temperature: number;
    mass: number;
    lum: number;
    rad: number;
};
/**
 * Final Star Object Data
 */
export type StarObjectSpectralMetadata = {
    class: string;
    subclass: string;
    name: string;
    lum: number;
};
/**
 * Alle Validen Werte für jedesSpektrum.
 *
 * Hier habe ich natürlich einige Simplifikationen durchgeführt, besonders bei der Klasse `M`, `L`, `T` und `Y`.
 * man kann ja nicht immer alles Kompliziert machen
 */
export declare const VALID_SPECTRAL_CLASS_VALUES: SpectralClassType[];
/**
 * All Valid Subspectral Class Values
 */
export declare const VALID_SUBSPECTRAL_CLASS_VALUES: SpectralClassType[];
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
export declare const STAR_GENERATION_CONSTANT: 1.0216388735543742521887522130876091683703957473078500310054178421533504358657415429775215553538366594;
/**
 * Alle Beforzugten typen (Type)
 */
export type preferredTypes = "sun_orbit" | "planet_orbit" | "nearStar-min-max" | "deepSpace-min" | "" | string;
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
export declare class ObjectType {
    type: res.CelestialObjectTypes;
    chance: number;
    preferred: "near_star" | "deep_space" | "distance" | "";
    dist: Vector2;
    constructor(type: res.CelestialObjectTypes, chance: number, preferred: "near_star" | "deep_space" | "distance" | "", dist: Vector2);
}
/**
 * All Objects that can appere in the Galaxy.
 *
 * `-1` Chance means, that this cannot naturally be generated
 */
export declare const allObjectTypes: ObjectType[];
export declare function chooseObjectTypeByChance(): ObjectType;
/**
 * Short Position Information so the Code can Corectly Position other Objects
 */
export type ShortObjectPosition = {
    type: res.CelestialObjectTypes;
    pos: Vector2;
};
/**
 * Sector File Information
 */
export type SectorFile = {
    name: string;
    position: {
        x: number;
        y: number;
    };
    objects: FilesObjectTypeInfo[];
};
/**
 * The Object Data that goes into SectorFile.object[]
 */
export type FilesObjectTypeInfo = {
    id: string;
    position: Vector2;
    metadata: ObjectMetadata;
};
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
    name: string;
    position: Vector2;
    objectType: res.CelestialObjectTypes;
    mass?: number;
    extra?: {
        star?: StarObjectMetadata;
        planet?: PlanetObjectMetadata;
        interstellarAstroidField?: InterstellarAstroidFieldObjectMetadata;
    };
};
export declare function StarSpectralClassDataToMetadata(classData: SpectralClassData): StarObjectSpectralMetadata;
/**
 * Metadata for a Star
 */
export type StarObjectMetadata = {
    name: string;
    metadata: {
        spectral: StarObjectSpectralMetadata;
        mass: number;
        temperature: number;
        radius: number;
        planets: PlanetObjectMetadata[];
    };
};
/**
 * Metadata for a Planet
 *
 * `mass`: Mass in KG
 * `radius`: Radius in meters
 * `OrbitalPeriod`: Priod in Seconds
 */
export type PlanetObjectMetadata = {
    name: string;
    type: res.CelestialObjectTypes;
    mass: number;
    radius: number;
    gravitation: number;
    resources: res.resWebJSONData[];
    moons: MoonObjectMetadata[];
    OrbitalPeriod: number;
    OrbitalHeigth: number;
};
/**
 * Metadata for a Moon
 * Like Luna :D
 */
export type MoonObjectMetadata = {
    name: string;
    type: res.CelestialObjectTypes;
    mass: number;
    radius: number;
    gravitation: number;
    resources: res.resWebJSONData[];
    OrbitalPeriod: number;
    OrbitalHeigth: number;
};
/**
 * Metadata for a InterstellarAstroidField
 *
 * Really Long Name lol
 */
export type InterstellarAstroidFieldObjectMetadata = {
    name: string;
};
export type InterstellarAstroidFieldTypes = "interstellar_t1_astroid" | "interstellar_t2_astroid" | "interstellar_t3_astroid";
/**
 * Metadata for a Anomaly
 */
export type AnomalyObjectMetadata = {
    name: string;
};
/**
 * Range Data for the Web-Oriantation File.
 */
export type range = {
    min: Vector2;
    max: Vector2;
    array: string[];
    spaceObjectTypes: {
        [k: string]: {
            objectType: res.CelestialObjectTypes;
            amount: number;
        };
    };
};
