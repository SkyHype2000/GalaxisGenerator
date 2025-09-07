import fs from "fs";
import seedrandom from "seedrandom";
// Config
import * as config from './config';
import { Vector2, generateName } from './tool';
// Alle Ressourceninformationen
import * as res from './resources';
import { relative } from "path";
import * as zlib from 'zlib';
import * as path from 'path';
import { zipSync, strToU8 } from 'fflate';

/**  
 * I did translate almost everything by my own,
 * So "Maybe" there "could" "some" translation errors.
 * 
 * Okay, At Some Translations i used DeepL.
*/

/**
 * The Starting Time of the Script
 */
const time = Date.now();
fs.mkdirSync(`./galaxyLists/${time}`, { recursive: true })

/**
 * The Sector Data that is getting put into the Files.
 * 
 * Suprisenly, this was my Idea, someone told me a while back that this is more efficient
*/
const files: Map<string, config.SectorFile> = new Map();

/**
 * Short Object Information File for the Positions of the Current Objects.
*/
const objects: config.ShortObjectPosition[] = [];
const objectTypesPresent: Set<res.CelestialObjectTypes> = new Set();

//// console.log(objects.length);
//// console.log(objectTypesPresent.has("star"));

/**
 * Generate and Pushes The Object Data into the Sector File List thing
 */
export function galaxyObjectGenerator(): void {
    if (objects.length == 0) {
        // const ObjectType: res.CelestialObjectTypes = "mainBlackHole"
        const position: Vector2 = new Vector2(0, 0);
        const sector: Vector2 = config.getSectorPos(position)
        const relativePosition: Vector2 = getLocalSectorPos(position)

        const data: config.SectorFile = { name: "Sector " + sector.toString(true), position: { x: 0, y: 0 }, objects: [] }

        data.objects.push({ id: "mainBlackHole", position: position, metadata: { name: config.mainBlackHoleName, position: relativePosition, objectType: "mainBlackHole" } })

        objects.push({ pos: position, type: "mainBlackHole" })

        if (!objectTypesPresent.has("mainBlackHole")) objectTypesPresent.add("mainBlackHole");

        files.set("0_0", data)
        console.log(JSON.stringify(data));
        return;
    }
    else {
        let data: config.SectorFile;

        let ObjectType = config.chooseObjectTypeByChance();

        let valPosition = null;

        let nulls = 0;

        //// console.log(objects.length);
        //// console.log(objectTypesPresent.has("star"));

        while (valPosition == null) {
            const randomPosition = getRandomPosition().toFixed(3);
            // console.log(randomPosition);

            valPosition = validateDistance(ObjectType, randomPosition);

            if (valPosition == null) {
                nulls++
                if ((nulls % 10000) == 0) {
                    // console.log(`${nulls} Nulls`);
                }
                if (nulls > 25000) {
                    ObjectType = config.chooseObjectTypeByChance();
                }
            }
        }

        const sector = config.getSectorPos(valPosition)
        const sectorRelativePos = new Vector2(valPosition.x - (sector.x * config.SectorSize.x), valPosition.y - (sector.y * config.SectorSize.y));
        if (files.has(sector.toString(true))) { data = files.get(sector.toString(true))! }
        else {
            const temp: config.SectorFile = { name: "Sector " + sector.toString(true), position: sector, objects: [] }
            files.set(sector.toString(true), temp)
            data = files.get(sector.toString(true))!
        }
        // let GeneratedObject;
        let objectInfo = { id: Date.now().toString(), position: sectorRelativePos, metadata: {} } as config.FilesObjectTypeInfo;

        if (ObjectType.type == "star") {
            if (!objectTypesPresent.has("star")) objectTypesPresent.add("star");

            let GeneratedObject: config.StarObjectMetadata = generateStarSystem();
            objectInfo.metadata.name = GeneratedObject.name;
            objectInfo.metadata.objectType = "star";
            objectInfo.metadata.mass = GeneratedObject.metadata.mass;
            objectInfo.metadata.extra = { star: { name: GeneratedObject.name, metadata: GeneratedObject.metadata } };

            objects.push({ pos: valPosition, type: "star" })
        }

        if (ObjectType.type == "interstellar_t1_astroid") {
            if (!objectTypesPresent.has("interstellar_t1_astroid")) objectTypesPresent.add("interstellar_t1_astroid");

            let GeneratedObject: config.InterstellarAstroidFieldObjectMetadata = generateInterstellarAstroidField();
            objectInfo.metadata.name = GeneratedObject.name;

            objects.push({ pos: valPosition, type: "interstellar_t1_astroid" })
        }

        if (ObjectType.type == "interstellar_t2_astroid") {
            if (!objectTypesPresent.has("interstellar_t2_astroid")) objectTypesPresent.add("interstellar_t2_astroid");

            let GeneratedObject: config.InterstellarAstroidFieldObjectMetadata = generateInterstellarAstroidField();
            objectInfo.metadata.name = GeneratedObject.name;

            objects.push({ pos: valPosition, type: "interstellar_t2_astroid" })
        }

        if (ObjectType.type == "interstellar_t3_astroid") {
            if (!objectTypesPresent.has("interstellar_t3_astroid")) objectTypesPresent.add("interstellar_t3_astroid");

            let GeneratedObject: config.InterstellarAstroidFieldObjectMetadata = generateInterstellarAstroidField();
            objectInfo.metadata.name = GeneratedObject.name;

            objects.push({ pos: valPosition, type: "interstellar_t3_astroid" })
        }

        if (ObjectType.type == "anomaly") {
            if (!objectTypesPresent.has("anomaly")) objectTypesPresent.add("anomaly");

            let GeneratedObject: config.AnomalyObjectMetadata = generateAnomaly();
            objectInfo.metadata.name = GeneratedObject.name;

            objects.push({ pos: valPosition, type: "anomaly" })
        }

        data.objects.push(objectInfo);
        files.set(sector.toString(true), data)
        //// console.log(JSON.stringify(objectInfo));

        // console.log(JSON.stringify(objectInfo));

        return;
    }
}

/**
 * Converts the Global Position into the Local Sector Position
 * 
 * @param pos Global Position
 * @returns {Vector2}
 */
function getLocalSectorPos(pos: Vector2): Vector2 {
    const mod = (a: number, n: number) => {
        return ((a % n) + n) % n;
    }
    return new Vector2(
        mod(pos.x, config.SectorSize.x),
        mod(pos.y, config.SectorSize.y)
    );
}

/**
 * Returns the position if valid, otherwise null.
 * 
 * @param {config.ObjectType} objectType Type of the Object
 * @param {Vector2} pos Position of the Object
 * @returns {Vector2|null}
 */
export function validateDistance(objectType: config.ObjectType, pos: Vector2): Vector2 | null {
    if (files.size === 0) return null;

    // Determine the sector of the given position
    const sector = config.getSectorPos(pos);

    // Iterate over the 3x3 neighboring sectors
    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            const neighborSectorKey = `${sector.x + dx}_${sector.y + dy}`;
            const neighborSector = files.get(neighborSectorKey);

            if (!neighborSector) continue; // Skip if the sector doesn't exist

            // Check each object in the neighboring sector
            for (const obj of neighborSector.objects) {
                // Convert relative position to global position
                const globalPos = new Vector2(
                    obj.position.x + neighborSector.position.x * config.SectorSize.x,
                    obj.position.y + neighborSector.position.y * config.SectorSize.y
                );

                const distance = pos.getDistance(globalPos);

                // Validate distance based on objectType preferences
                if (objectType.preferred === "near_star" && obj.metadata.objectType === "star") {
                    if (distance >= objectType.dist.x && (distance <= objectType.dist.y || objectType.dist.y === 0)) {
                        return pos;
                    }
                } else if (objectType.preferred === "distance" || objectType.preferred === "deep_space") {
                    if (distance < objectType.dist.x || (objectType.dist.y !== 0 && distance > objectType.dist.y)) {
                        return null;
                    }
                }
            }
        }
    }

    return pos;
}

/**
 * Generates a Random Position that is inside of the Radius of the config.  
 * (i'am horrible at explaining stuff XD)
 * 
 * @returns {Vector2}
 */
export function getRandomPosition(): Vector2 {
    const a = config.rng() * Math.PI * 2
    const r = getRandomDistance(config.radius)

    const pos = polarToCartesian(r, a)
    // console.log(pos);

    return pos;
}

/**
 * Here i generate the Seedbased Distance of the Object.  
 * So "Random" is not the right thing to say, but its good enough for me.
 *
 * I Just asked ChatGPT, lol.
 * 
 * @param {number} max Maximalabstand
 * @param {number} min Mindistabstand
 */
export function getRandomDistance(max: number, min: number = 0): number {
    if (max === 0) max = config.radius;

    const exponent = config.exponent || 1;

    //// return min + (max - min) * rng();

    return min + (max - min) * Math.pow(config.rng(), exponent); // This is what we call "Mathematik" in Germany
}

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
export function polarToCartesian(r: number, angle: number): Vector2 {
    return new Vector2(
        r * Math.cos(angle),
        r * Math.sin(angle)
    );
}

/**Just stores All Used Names so there are no Doppelgänger when Generating a new Name */
export const usedNames: Set<string> = new Set();

/**
 * generates a unique Name for a Object
 * 
 * @param {res.CelestialObjectTypes} type The type of Object
 * @returns {string}
 */
export function generateUniqueName(): string {
    let name;
    let tries = 0;
    do {
        name = generateName();
        tries++;
        if (tries > 100) {
            name += `-TAKKER${Math.floor(config.rng() * 100000)}`;
        }
    } while (usedNames.has(name));
    usedNames.add(name);
    return name;
}

/**
 * There is a special function for generating anomaly names.
 * I didn't want to just use syllables for the names, so I decided to use this one.
 * 
 * Because it sounds better for anomalies. Idk why.
 */
export function generateAnomalyName(): string {
    /**
     * Die Prefixe, quasi die ersten Zeichen die Verwendet werden.
     */
    const prefix: string[] = ["RX", "ZB", "QK", "VR", "IA", "OR", "PA", "TR"];
    /**
     * Das sind die Suffixe die nach den Prefixen kommen,
     * sie bestehen aus nur eine Zahl oder MK + Zahl.
     */
    const suffix: string[] = [];
    for (let i = 0; i < 99; i++) {
        if (i < 10) suffix.push("-0" + i);
        else suffix.push("-" + i)
    }
    for (let i = 0; i < 99; i++) {
        if (i < 10) suffix.push("-0" + i);
        else suffix.push("-MK" + i)
    }

    return prefix[Math.floor(config.rng() * prefix.length)] + suffix[Math.floor(config.rng() * suffix.length)];
}

export function generateStarSystem(): config.StarObjectMetadata {
    let returnData = { name: "", metadata: {} } as config.StarObjectMetadata;

    const mass = -(1 - Math.pow(config.rng() / config.STAR_GENERATION_CONSTANT, -0.4) * config.SUN_MASS_KG);
    const spectralData = getSolarSpectralClassData(returnData.metadata.mass);

    let planets: config.PlanetObjectMetadata[] = [];
    const PlanetCount = Math.round(config.rng() * (config.stellarPlanetCount.y - config.stellarPlanetCount.x)) + config.stellarPlanetCount.x;
    if (PlanetCount > 0) planets = generatePlanetSystemData(PlanetCount, returnData.metadata.mass);

    return {
        name: generateName(),
        metadata: {
            mass,
            spectral: config.StarSpectralClassDataToMetadata(spectralData),
            planets,
            radius: spectralData.rad,
            temperature: spectralData.temperature
        }
    };
}

export function generateInterstellarAstroidField(): config.InterstellarAstroidFieldObjectMetadata {
    let returnData = {} as config.InterstellarAstroidFieldObjectMetadata;

    returnData.name = generateName();

    return returnData;
}

export function generateAnomaly(): config.AnomalyObjectMetadata {
    let returnData = {} as config.AnomalyObjectMetadata;

    returnData.name = generateAnomalyName();

    return returnData;
}

export function getSolarSpectralClassData(mass: number): config.SpectralClassData {
    let returnData = {} as config.SpectralClassData;

    let currentClass = {} as config.SpectralClassType;
    for (let i = 0; i < config.VALID_SUBSPECTRAL_CLASS_VALUES.length; i++) {
        const e = config.VALID_SUBSPECTRAL_CLASS_VALUES[i];
        if (mass >= e.massmin && mass < e.massmax) {
            currentClass = e;
            returnData.class = e.class;
            returnData.subclass = e.class + i
            returnData.name = e.name;
            returnData.color = e.color;
            break;
        }
    }

    const temperature = Math.round((config.rng() * (currentClass.tempmax - currentClass.tempmin)) + currentClass.tempmin);
    returnData.temperature = temperature;
    returnData.rad = Math.pow(returnData.mass, 0.8);
    // lum (Watt) = 4 * PI * r^2 * sigma * T^4
    returnData.lum = 4 * Math.PI * Math.pow(returnData.rad, 2) * config.SB * Math.pow(temperature, 4)

    return returnData;
}

export function generatePlanetSystemData(planetCount: number = 0, StarMass: number): config.PlanetObjectMetadata[] {
    let returnData = [] as config.PlanetObjectMetadata[];
    if (planetCount == 0) planetCount = Math.round(config.rng() * (config.stellarPlanetCount.y - config.stellarPlanetCount.x)) + config.stellarPlanetCount.x;

    let lastDistance = config.planetToSunStartDistance;

    for (let i = 0; i < planetCount; i++) {
        lastDistance += config.planetToPlanetChangeDistance.x + (1 - Math.pow(2 * config.rng() - 1, 2.8)) * (config.planetToPlanetChangeDistance.y - config.planetToPlanetChangeDistance.x)
        const MoonCount = Math.round(config.rng() * (config.planetaryMoonCount.y - config.planetaryMoonCount.x)) + config.planetaryMoonCount.x
        returnData.push(generatePlanetData(MoonCount, lastDistance, StarMass));
    }

    return returnData;
}
export function generatePlanetData(MoonCount: number, OrbitalHeight: number, StarMass: number): config.PlanetObjectMetadata {
    let returnData = {} as config.PlanetObjectMetadata;

    returnData.name = generateName();
    const generatedResources = res.generateResources()
    returnData.resources = generatedResources.map((e: { resource: res.resource, per: number }) => ({ name: e.resource.name, id: e.resource.id, short: e.resource.short, p: e.per }));
    returnData.radius = (config.rng() * (config.planetRadius.y - config.planetRadius.x)) + config.planetRadius.x;
    returnData.mass = calculateObjectMass(returnData.radius, generatedResources);
    returnData.gravitation = (config.G * returnData.mass) / Math.pow(returnData.radius, 2);

    returnData.OrbitalPeriod = 2 * Math.PI * Math.sqrt(Math.pow(OrbitalHeight, 3) / (config.G * returnData.mass))

    returnData.moons = generateMoonSystemData(returnData.mass, MoonCount)
    returnData.OrbitalHeigth = OrbitalHeight;

    return returnData;
}

export function generateMoonSystemData(PlanetMass: number, moonCount: number = 0): config.MoonObjectMetadata[] {
    let returnData = [] as config.MoonObjectMetadata[];
    if (moonCount == 0) moonCount = Math.round(config.rng() * (config.planetaryMoonCount.y - config.planetaryMoonCount.x)) + config.planetaryMoonCount.x;

    let lastDistance = config.planetToSunStartDistance;
    for (let i = 0; i < moonCount; i++) {
        lastDistance += config.planetToPlanetChangeDistance.x + (1 - Math.pow(2 * config.rng() - 1, 2.8)) * (config.planetToPlanetChangeDistance.y - config.planetToPlanetChangeDistance.x)
        returnData.push(generateMoonData(lastDistance, PlanetMass));
    }

    return returnData;
}

export function generateMoonData(OrbitalHeight: number, PlanetMass: number): config.MoonObjectMetadata {
    let returnData = {} as config.MoonObjectMetadata;

    returnData.name = generateName();
    const generatedResources = res.generateResources()
    returnData.resources = generatedResources.map((e: { resource: res.resource, per: number }) => ({ name: e.resource.name, id: e.resource.id, short: e.resource.short, p: e.per }));
    returnData.radius = (config.rng() * (config.moonRadius.y - config.moonRadius.x)) + config.moonRadius.x;
    returnData.mass = calculateObjectMass(returnData.radius, generatedResources);
    returnData.gravitation = (config.G * returnData.mass) / Math.pow(returnData.radius, 2);

    returnData.OrbitalPeriod = 2 * Math.PI * Math.sqrt(Math.pow(OrbitalHeight, 3) / (config.G * returnData.mass));
    returnData.OrbitalHeigth = OrbitalHeight;

    return returnData;
}

/**
 * Very Effective at premitivly calculating the Mass of a Planet
 * 
 * @param radius Radius in meters
 * @param resources Array of resources
 */
export function calculateObjectMass(radius: number, resources: { resource: res.resource, per: number }[]): number {
    if (radius === 0 || resources.length === 0) return 0;
    const totalPer = resources.reduce((sum, r) => sum + r.per, 0);
    const avgDensity = resources.reduce((sum, r) => sum + r.resource.density * (r.per / totalPer), 0);
    const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);
    return volume * avgDensity;
}

galaxyObjectGenerator();
console.log();
const generateStartTime = Date.now();
let lastTime = Date.now();
while (objects.length < config.count) {
    galaxyObjectGenerator();

    if (objects.length % 25 == 0) {
        const timeNow = Date.now();
        const deltaTime = timeNow - lastTime
        console.log('\u001b[1A\u001b[2K' + `Object ${objects.length}/${config.count} completed. (+${deltaTime}ms = ${Date.now() - generateStartTime}ms)`);
        lastTime = timeNow;
    }
}
console.log(`\u001b[1A\u001b[2K` + `Objekte generiert in ${Date.now() - generateStartTime}ms`)

let range: { min: Vector2, max: Vector2, array: string[] } = { min: new Vector2(), max: new Vector2(), array: [] }

console.log("Speichere Dateien...");

const saveStartTime = Date.now();
files.forEach((e, i) => {
    const file = files.get(i);
    // console.log(file?.name + " Wird Gespeichert");
    // fs.writeFileSync(`./galaxyLists/${time}/${i}.json`, JSON.stringify(file), "utf-8")

    range.array.push(i);

    const filePositionVector = new Vector2(file?.position.x, file?.position.y);
    if (filePositionVector.comparePosition(range.min) == false) {
        range.min = filePositionVector;
    }
    if (filePositionVector.comparePosition(range.max) == true) {
        range.max = filePositionVector;
    }

    console.log(`\u001b[1A\u001b[2K${file?.name} Gespeichert`);
})
console.log('\u001b[1A\u001b[2K' + "Dateien Gespeichert in " + (Date.now() - saveStartTime) + "ms");
console.log(range);
fs.writeFileSync(`./galaxyLists/${time}/range.json`, JSON.stringify(range), "utf-8")

console.log("Erstelle .gz-Archiv mit fflate...");

const archiveStartTime = Date.now();
const outputFilePath = `./galaxyLists/${time}/galaxyData.gz`;
const directoryPath = `./galaxyLists/${time}`;

// Collect all files except range.json
const filesToArchive: { [filename: string]: Uint8Array } = {};
fs.readdirSync(directoryPath).forEach(file => {
    if (file !== 'range.json') {
        const filePath = path.join(directoryPath, file);
        const fileContent = fs.readFileSync(filePath);
        filesToArchive[file] = new Uint8Array(fileContent);
    }
});

// Create a gzipped archive
const compressedData = zipSync(filesToArchive, { level: 9 }); // Maximum compression
fs.writeFileSync(outputFilePath, compressedData);

fs.readdirSync(directoryPath).forEach(file => {
    if (file !== "range.json" && file !== "galaxyData.gz") {
        fs.unlinkSync(path.join(directoryPath, file))
    }
})

console.log(`.gz-Archiv erstellt in ${Date.now() - archiveStartTime}ms: ${outputFilePath}`);

console.log(`Galaxie Generiert in ${Date.now() - time}ms`);