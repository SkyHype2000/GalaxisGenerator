"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const res = __importStar(require("./resources"));
const pngjs_1 = require("pngjs");
const path_1 = __importDefault(require("path"));
const allResources = res.allResources;
// z.B. "planet:atmosphere": []
const groupedByFound = {};
for (const resElement of allResources) {
    const found = resElement.found;
    if (!groupedByFound[found])
        groupedByFound[found] = [];
    const alreadyExists = groupedByFound[found].some(r => r.short === resElement.short && r.group === resElement.group);
    if (!alreadyExists) {
        groupedByFound[found].push(resElement);
    }
}
/**
 * Findet alle Ressourcen um sie in ihre Fundorte zu sortieren
 */
function mergeTypes(allResourcesByFound) {
    /**
     * Sollte es eine Ressource auf "planet" oder "moon" befinden, wird es auf seine Varianten übertragen.
     * Ein beispiel wäre Siliziumsioxid was auf beiden zu finden ist, anstatt 2 Separate resource() zu schreiben, schreibe ich einfach nur "planet" oder "moon"
    */
    const inheritMap = {
        planet: ['planet:atmosphere', 'planet:noAtmosphere'],
        moon: ['moon:atmosphere', 'moon:noAtmosphere'],
    };
    for (const baseType in inheritMap) {
        const baseResources = allResourcesByFound[baseType] || [];
        for (const target of inheritMap[baseType]) {
            const typedTarget = target;
            if (!allResourcesByFound[typedTarget])
                allResourcesByFound[typedTarget] = [];
            baseResources.forEach(resource => {
                if (!allResourcesByFound[typedTarget].some(r => r.id === resource.id)) {
                    allResourcesByFound[typedTarget].push(resource);
                }
            });
        }
    }
    return allResourcesByFound;
}
const sortedGroups = mergeTypes(groupedByFound);
/**
 * Erstellt ein Mapping von Ressourcen-ID zu Index und zurück.
 *
 * tbh kann ich mich nicht mehr daran erinnern wieso ich die Funktion geschrieben habe
 */
function createResourceIndexMap(resources) {
    const idToIndex = {};
    const indexToId = {};
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
function generateResourceMap(foundType) {
    const resources = sortedGroups[foundType];
    if (!resources || resources.length === 0)
        throw new Error("Keine Ressourcen für diesen Typ!");
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
        for (let j = 0; j < count; j++)
            flatList.push(i);
        usedPoints += count;
    }
    // Rest mit 0 (null) auffüllen
    while (flatList.length < totalPoints)
        flatList.push(0);
    //// Optional: Shuffle
    //// for (let i = flatList.length - 1; i > 0; i--) {
    ////     const j = Math.floor(Math.random() * (i + 1));
    ////     [flatList[i], flatList[j]] = [flatList[j], flatList[i]];
    //// }
    // In 2D-Array umwandeln
    const map = [];
    for (let y = 0; y < 1000; y++) {
        map[y] = [];
        for (let x = 0; x < 1000; x++) {
            map[y][x] = flatList[y * 1000 + x];
        }
    }
    return { legend, map };
}
/**
 * Exportiert eine Map als PNG.
 */
function exportMapToPNG(map, legend, filename) {
    // Vor jedem Schreiben:
    if (!path_1.default.extname(filename)) {
        console.warn('WARNUNG: Datei ohne Endung:', filename);
    }
    const width = map[0].length;
    const height = map.length;
    const png = new pngjs_1.PNG({ width, height });
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
    png.pack().pipe(fs_1.default.createWriteStream(filename));
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
            fs_1.default.writeFileSync(`./src/resmap/resourceMap_${type.replaceAll(":", "_")}.json`, resultString);
            console.log(`resourceMap für ${type} generiert und gespeichert. ${resultString.length} ${result.map.length}-${result.map[result.map.length - 1].length}`);
            exportMapToPNG(result.map, result.legend, `./src/resmap/resourceMap_${type.replaceAll(":", "_")}.png`);
            console.log(`PNG für ${type} exportiert.`);
        }
    }
    catch (error) {
        console.warn(`resourceMap für ${type} konnte nicht generiert werden: ${error.message}`);
    }
}
