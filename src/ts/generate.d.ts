import * as config from './config';
import { Vector2 } from './tool';
import * as res from './resources';
/**
 * Generate and Pushes The Object Data into the Sector File List thing
 */
export declare function galaxyObjectGenerator(): void;
/**
 * Returns the position if valid, otherwise null.
 *
 * @param {config.ObjectType} objectType Type of the Object
 * @param {Vector2} pos Position of the Object
 * @returns {Vector2|null}
 */
export declare function validateDistance(objectType: config.ObjectType, pos: Vector2): Vector2 | null;
/**
 * Generates a Random Position that is inside of the Radius of the config.
 * (i'am horrible at explaining stuff XD)
 *
 * @returns {Vector2}
 */
export declare function getRandomPosition(): Vector2;
/**
 * Here i generate the Seedbased Distance of the Object.
 * So "Random" is not the right thing to say, but its good enough for me.
 *
 * I Just asked ChatGPT, lol.
 *
 * @param {number} max Maximalabstand
 * @param {number} min Mindistabstand
 */
export declare function getRandomDistance(max: number, min?: number): number;
/**
 * uhm... thanks ChatGPT. XD
 *
 * I think this generates the `x` and `y` coordinates,
 * which cannot be further away than the radius of the galaxy.
 *
 * After ~ 1 Week i figured it out lol.
 * it uses the distence generated with the `getRandomDistance()` and Converts it with help of the
 * angle to the `x` and `y` position.
 * this is simple 5th Grade math lol, how i couldnt understand it...
 * [Polar Coordinate System (Wikipedia)](https://en.wikipedia.org/wiki/Polar_coordinate_system)
 *
 * @param {number} r Distance From the Center
 * @param {number} angle Rotation of the Position
 * @returns {Vector2}
 */
export declare function polarToCartesian(r: number, angle: number): Vector2;
/**Just stores All Used Names so there are no Doppelgänger when Generating a new Name */
export declare const usedNames: Set<string>;
/**
 * generates a unique Name for a Object
 *
 * @param {res.CelestialObjectTypes} type The type of Object
 * @returns {string}
 */
export declare function generateUniqueName(): string;
/**
 * There is a special function for generating anomaly names.
 * I didn't want to just use syllables for the names, so I decided to use this one.
 *
 * Because it sounds better for anomalies. Idk why.
 */
export declare function generateAnomalyName(): string;
export declare function generateStarSystem(): config.StarObjectMetadata;
export declare function generateInterstellarAstroidField(): config.InterstellarAstroidFieldObjectMetadata;
export declare function generateAnomaly(): config.AnomalyObjectMetadata;
export declare function getSolarSpectralClassData(mass: number): config.SpectralClassData;
export declare function generatePlanetSystemData(planetCount: number | undefined, StarMass: number): config.PlanetObjectMetadata[];
export declare function generatePlanetData(MoonCount: number, OrbitalHeight: number, StarMass: number): config.PlanetObjectMetadata;
export declare function generateMoonSystemData(PlanetMass: number, moonCount?: number): config.MoonObjectMetadata[];
export declare function generateMoonData(OrbitalHeight: number, PlanetMass: number): config.MoonObjectMetadata;
/**
 * Very Effective at premitivly calculating the Mass of a Planet
 *
 * @param radius Radius in meters
 * @param resources Array of resources
 */
export declare function calculateObjectMass(radius: number, resources: {
    resource: res.resource;
    per: number;
}[]): number;
/**
console.log("Sector object count grid:");
// console.log(sectorGrid);
for (let i = 0; i < sectorGrid.length; i++) {
    console.log(JSON.stringify(sectorGrid[i]));
}
*/ 
