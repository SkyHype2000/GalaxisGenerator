import fs from "fs";
import * as res from "./resources";
import { PNG } from "pngjs";
import path from "path";

const allResources = res.allResources;

export type resMapLayout = {legend:string[],map:number[][]}

// z.B. "planet:atmosphere": []
const groupedByFound:{[key: string]: res.resource[]} = {};

for (const resElement of allResources) {
    const found = resElement.found;
    if (!groupedByFound[found]) groupedByFound[found] = [];

    const alreadyExists = groupedByFound[found].some(
        r => r.short === resElement.short && r.group === resElement.group
    );

    if (!alreadyExists) {
        groupedByFound[found].push(resElement);
    }
}

export type resourceFound = { "planet:atmosphere": res.resource[], "planet:noAtmosphere": res.resource[], planet: res.resource[], "moon:atmosphere": res.resource[], "moon:noAtmosphere": res.resource[], stellar_astroid: res.resource[], interstellar_t1_astroid: res.resource[], interstellar_t2_astroid: res.resource[], interstellar_t3_astroid: res.resource[], gas_planet: res.resource[], interstellar_space: res.resource[], neutron_star: res.resource[], none: res.resource[] }

/**
 * Findet alle Ressourcen um sie in ihre Fundorte zu sortieren
 */
function mergeTypes(
    allResourcesByFound: Partial<Record<res.CelestialObjectTypes, res.resource[]>>
): Partial<Record<res.CelestialObjectTypes, res.resource[]>> {
    /**
     * Sollte es eine Ressource auf "planet" oder "moon" befinden, wird es auf seine Varianten übertragen.  
     * Ein beispiel wäre Siliziumsioxid was auf beiden zu finden ist, anstatt 2 Separate resource() zu schreiben, schreibe ich einfach nur "planet" oder "moon"
    */
    const inheritMap:{[key:string]: string[]} = {
        planet: ['planet:atmosphere', 'planet:noAtmosphere'],
        moon: ['moon:atmosphere', 'moon:noAtmosphere'],
    };

    for (const baseType in inheritMap) {
        const baseResources = allResourcesByFound[baseType as res.CelestialObjectTypes] || [];

        for (const target of inheritMap[baseType]) {
            const typedTarget = target as res.CelestialObjectTypes;

            if (!allResourcesByFound[typedTarget]) allResourcesByFound[typedTarget] = [];

            baseResources.forEach(resource => {
                if (!allResourcesByFound[typedTarget]!.some(r => r.id === resource.id)) {
                    allResourcesByFound[typedTarget]!.push(resource);
                }
            });
        }
    }

    return allResourcesByFound;
}


const sortedGroups:{[key:string]: res.resource[]} = mergeTypes(groupedByFound);

/**
 * Erstellt ein Mapping von Ressourcen-ID zu Index und zurück.
 * 
 * tbh kann ich mich nicht mehr daran erinnern wieso ich die Funktion geschrieben habe
 */
function createResourceIndexMap(resources:res.resource[]) {
    const idToIndex:{[key: string]: number} = {};
    const indexToId:{[key: string]: string} = {};
    resources.forEach((r, i) => {
        idToIndex[r.id] = i;
        indexToId[i] = r.id;
    });
    return { idToIndex, indexToId };
}

/**
 * Generiert eine resourceMap für einen bestimmten Typ.
 * @param {string} foundType
 * @param {number} size
 * @returns {{legend: string[], map: number[][]}}
 */
function generateResourceMap(foundType:string) {
    const resources = sortedGroups[foundType];
    if (!resources || resources.length === 0) throw new Error("Keine Ressourcen für diesen Typ!");

    // Legend: "null" immer an erster Stelle
    const legend = ["nothing", ...resources.map(r => r.id)];

    // Wie oft kommt jede Ressource vor?
    const totalPoints = 1000 * 1000;
    let flatList = [];

    // Index 0 = null, alle anderen wie in legend
    let usedPoints = 0;
    for (let i = 1; i < legend.length; i++) {
        const res = resources[i - 1];
        const count = Math.floor(totalPoints * res.chance);
        for (let j = 0; j < count; j++) flatList.push(i);
        usedPoints += count;
    }

    // Rest mit 0 (null) auffüllen
    while (flatList.length < totalPoints) flatList.push(0);

    //// Optional: Shuffle
    //// for (let i = flatList.length - 1; i > 0; i--) {
    ////     const j = Math.floor(Math.random() * (i + 1));
    ////     [flatList[i], flatList[j]] = [flatList[j], flatList[i]];
    //// }

    // In 2D-Array umwandeln
    const map: number[][] = [];
    for (let y:number = 0; y < 1000; y++) {
        map[y] = [];
        for (let x:number = 0; x < 1000; x++) {
            map[y][x] = flatList[y * 1000 + x];
        }
    }

    return { legend, map };
}

/**
 * Exportiert eine Map als PNG.
 */
function exportMapToPNG(map:number[][], legend:string[], filename:string) {
    // Vor jedem Schreiben:
    if (!path.extname(filename)) {
        console.warn('WARNUNG: Datei ohne Endung:', filename);
    }

    const width = map[0].length;
    const height = map.length;
    const png = new PNG({ width, height });

    // Farbpalette wie gehabt
    const palette = [
        [0, 0, 0], [255, 255, 255], [255, 0, 0], [0, 255, 0], [0, 0, 255],
        [255, 255, 0], [0, 255, 255], [255, 0, 255], [128, 128, 128], [255, 128, 0],
    ];

    // Map zeichnen
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const idx = (width * y + x) << 2;
            const val = map[y][x];
            const color = palette[val % palette.length];
            png.data[idx] = color[0];
            png.data[idx + 1] = color[1];
            png.data[idx + 2] = color[2];
            png.data[idx + 3] = 255;
        }
    }

    png.pack().pipe(fs.createWriteStream(filename));
}

for (let i = 0; i < res.CelestialObjectTypesArray.length; i++) {
    const type = res.CelestialObjectTypesArray[i];
    try {
        const resources = sortedGroups[type];
        if (!resources || resources.length === 0) {
            console.warn(`Kein Export für ${type}, da keine Ressourcen vorhanden.`);
            continue;
        }

        const result = generateResourceMap(type);
        const resultString = JSON.stringify(result);

        if (resultString.length > 0 && resultString != "") {
            fs.writeFileSync(`./src/resmap/resourceMap_${type.replaceAll(":", "_")}.json`, resultString);
            console.log(`resourceMap für ${type} generiert und gespeichert. ${resultString.length} ${result.map.length}-${result.map[result.map.length - 1].length}`);
            exportMapToPNG(result.map, result.legend, `./src/resmap/resourceMap_${type.replaceAll(":", "_")}.png`);
            console.log(`PNG für ${type} exportiert.`);
        }
    } catch (error:any) {
        console.warn(`resourceMap für ${type} konnte nicht generiert werden: ${error.message}`);
    }
}