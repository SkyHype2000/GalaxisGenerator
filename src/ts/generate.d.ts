import * as config from './config';
import * as res from './resources';
/**
 * Alle Objekte in der Galaxie die bisher Generiert wurden
 */
export declare const galaxy: {
    type: string;
    x: number;
    y: number;
    name: string;
    metadata: any;
}[];
/**
 * ähm... ja, danke ChatGPT. XD
 *
 * Ich glaube das generiert die `x` und `y` koordinaten die nicht
 * weiter als der Radius der Galaxie entfernt sein dürfen
 */
export declare function polarToCartesian(r: number, angle: number): {
    x: number;
    y: number;
};
/**
 * Hier wird eine Seedbasierte Distanz generiert.
 * hab einfach ChatGPT Gefragt lol.
 */
export declare function getRandomDistance(min: number, max: number): number;
/**
 * Die Funktion gibt es Extra dafür um Anomalienamen zu Generieren,
 * ich wollte nicht einfach nur Silben für die Namen verwenden also habe ich mich dafür hier entschieden.
 *
 * Weil es sich für Anomalien besser anhört.
 */
export declare function generateAnomalyName(): string;
/**
 * Gibt den Sonnenmassenwert basierend auf x zurück.
 * Hier wird dafür gesorgt, dass... ja genau das.
 * Das die Sterne hauptsächlich im Rote-Zwerge Bereich Liegen, bin sehr stolz darauf
 *
 * @param x wert zwischen `0.0000000000000001` - `1.0000000000000000`
 * @returns wert zwischen `0.0086` - `100+`
 */
export declare function generateSolarMass(x: number): number;
/**
 * Alle Validen Werte für jedes Sub-Spektrum.
 */
export declare const VALID_SUBSPECTRAL_CLASS_VALUES: {
    class: string;
    name: string;
    color: string;
    tempmin: number;
    tempmax: number;
    massmin: number;
    massmax: number;
}[];
/**
 * Generiert alle Sipspektralwerte
 */
export declare function initSubspectralClassValues(): void;
/**
 * Hier wird die Spektralklasse des Sterns einfach basierend auf der Masse ausgegeben.
 * Sehr Simpel Gehalten, ich meine wir brauchen hier keine Wissenschaftliche Simulation.
 * Oder?
 *
 * @param mass Die Masse des STerns
 */
export declare function getSolarSpectralClassData(mass: number): {
    class: string;
    subclass: string;
    name: string;
    color: string;
    temp: number;
    mass_sol: number;
    lum_sol: number;
    lum: number;
    r_sol: number;
};
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
export declare function generateName(type: res.CelestialObjectTypes): string;
export declare const usedNames: Set<unknown>;
export declare function generateUniqueName(type: res.CelestialObjectTypes): string;
/**
 * Generiert die Ressourcen eines Bestimmten Typs
 * Offensichtlich noch nicht fertig
 *
 * @param type Der Planetentyp für den die Ressourcen generiert werden sollen
 * @param tries Die anzahl der Versuche die es durchführt
 */
export declare function GenerateResources(type: res.CelestialObjectTypes, tries?: 1000 | number): res.webResourceInformation[];
/**
 * Berechnet den Radius
 * wirklich Primitiv
 *
 * @param resources
 * @param mass Masse In KG
 */
export declare function calculatePlanetRadius(resources: res.webResourceInformation[], mass: number): {
    d: number;
    r: number;
};
/**
 * Validiert die Distanz zwischen Objekten, sodass Objekte nicht zu nah und auch nicht zu weit voneinander sind, basierend auf der config.
 *
 * @param {number} distance
 * @param {number} angle
 * @param {number} chosenType
 */
export declare function validateDistance(distance: number, angle: number, chosenType: config.ObjectType): {
    tooClose: boolean;
    x: number;
    y: number;
    dx: number;
    dy: number;
};
/**
 * Gibt alle Objekte eines Typs das momentan im galaxy-Array gespeichert sind zurück.
 */
export declare function getObjectType(objectType: string): {
    type: string;
    x: number;
    y: number;
    name: string;
    metadata: any;
}[];
/**
 * Gibt dir ein Semi-Zufälliges Objekt Des Galaxy-Arrays eines typs zurück
 */
export declare function getRandomObjectType(objectType: string): {
    type: string;
    x: number;
    y: number;
    name: string;
    metadata: any;
};
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
export declare function galaxyPush(type: config.ObjectType, x: number, y: number, name: string): void;
export declare function calculatePlanetTemperature(StarLum: number, albedo: number, distance: number): number;
/**
 * Generiert ein Planetensystem .
 * Jeder Planet hat: höhe (Abstand), masse, rotation (in Grad), und (wemm überhaupt) Monde.
 * Und neuerdings Ressourcen.
 *
 * @param parentStarMass In KG
 * @param parentStarLum In W
 */
export declare function generatePlanetSystemData(parentStarName: string, parentStarMass: number, parentStarLum: number, minPlanets?: number, maxPlanets?: number): config.planetSystemDataDef[];
/**
 * Generiert ein Planetensystem .
 * Jeder Planet hat: höhe (Abstand), masse, rotation (in Grad), und (wemm überhaupt) Monde.
 * Und neuerdings Ressourcen.
 *
 * @param parentStarMass In KG
 * @param parentStarLum In W
 */
export declare function generateRoguePlanetData(): config.roguePlanetDataDef;
/**
 * Generiert ein Mondsystem für einen Planeten.
 *
 * @param parentPlanetName
 * @param parentPlanetMass in KG
 * @param maxMoons
 */
export declare function generateMoonSystemData(parentPlanetName: string, parentPlanetMass: number, maxMoons?: number): config.moonSystemDataDef[];
/**
 * Hier berechne ich die Atmosphäreninformationen
 *
 * @param StarLum
 * @param StarDistance
 * @param albedo
 * @param minDensity
 * @param maxDensity
 * @returns
 */
export declare function generateAtmosphericInformation(StarLum: number, StarDistance: number, albedo: number, minDensity?: number, maxDensity?: number): config.AtmosphericInformation;
