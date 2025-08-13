import fs from "fs";
import seedrandom from "seedrandom";
import * as cc from "./consolecolor";
import { gzipSync } from "fflate";
// Config
import * as config from './config';
// Alle Ressourceninformationen
import * as res from './resources';
import { resMapLayout } from "./resmap";

/**
 * I DID TRANSLATE ALMOST EVERYTHING BY MY OWN,  
 * So Maybe there "could" some translation errors.
 * 
 * Okay, At Some Translations i used DeepL.
 */

/**+
 * The Sector Data that is getting put into the Files.
 */
const files: config.SectorFile[] = [];
const objects: config.ShortObjectPosition[] = [];

/**
 * Generate and Pushes The Object Data into the Sector File List thing
 */
export function galaxyObjectGenerator(): void {
    if (objects.length == 0) {
        const ObjectType:res.CelestialObjectTypes = "mainBlackHole"
        const position:config.Vector2 = {x: 0, y: 0};
        
        files.push({name: "Sector 0 0", position: {x: 0, y: 0}, objects: []})

        files[0].objects.push
    }
    else {
        const ObjectType = config.chooseTypeByChance();
        //* etc...
    }
}

/**
 * Generates a Random Position that is inside of the Radius of the config (i'am horrible at explaining stuff XD)
 */
export function getRandomPosition(): config.Vector2 {
    const a = config.rng()
    const r = getRandomDistance(config.radius)

    return polarToCartesian(r, a);
}

/**
 * Here i generate the Seedbased Distance of the Object.  
 * So "Random" is not the right thing to say, but its good enough for me.
 *
 * I Just asked ChatGPT, lol.
 */
export function getRandomDistance(max: number, min: number = 0): number {
    if (max === 0) max = config.radius;

    const exponent = config.exponent || 1;

    //// return min + (max - min) * rng();

    return min + (max - min) * Math.pow(config.rng(), exponent);
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
 */
export function polarToCartesian(r: number, angle: number): config.Vector2 {
    return {
        x: +(r * Math.cos(angle)).toFixed(3),
        y: +(r * Math.sin(angle)).toFixed(3)
    };
}

/**
 *!  =======================
 *!  === NAME GENERATION ===
 *!  =======================
 */

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
export function generateName(type: res.CelestialObjectTypes): string {
    if (type === "anomaly") { return generateAnomalyName() };

    /**Silben von ChatGPT für die Namensgenerierung */
    const syllables: string[] = [
        // Silben V1
        "ka", "lo", "ra", "ze", "tu", "mi", "xa", "vi", "no",
        "shi", "dra", "qu", "ly", "tor", "zan", "ny", "fel", "vra",
        "zur", "kre", "tho", "bal", "ix", "sy", "jen", "kul", "orn",
        "nef", "ria", "sol", "mek", "tas", "lur", "xen", "cai", "vor",
        "hel", "ume", "zan", "tha", "py", "rek", "gri", "yul", "zan",
        "eph", "ari", "zho", "the", "mur", "dax", "nix", "zor", "lim",

        // Silben V2
        "bri", "clo", "dre", "fen", "gla", "hro", "jor", "kli", "mar",
        "nel", "oph", "pra", "qua", "rin", "sha", "tre", "uln", "vex",
        "wra", "xis", "yra", "zor", "bex", "dru", "fla", "gra", "hul",
        "jum", "kor", "lek", "mip", "nox", "opl", "pru", "qui", "rax",
        "syl", "tri", "uvo", "vyn", "wex", "xil", "yan", "zep", "zor",
        "bax", "cro", "dav", "elx", "fra", "gyn", "hax", "jin", "kre",
        "lom", "myr", "nov", "oph", "plu", "qir", "rum", "syn", "tor",
        "urn", "vok", "wir", "xon", "yar", "zun"
    ];

    let name = "";
    const length = 2 + Math.floor(config.rng() * 2);
    for (let i = 0; i < length; i++) {
        name += syllables[Math.floor(config.rng() * syllables.length)];
    }
    return name.charAt(0).toUpperCase() + name.slice(1);
}

export const usedNames = new Set();

export function generateUniqueName(type: res.CelestialObjectTypes): string {
    let name;
    let tries = 0;
    do {
        name = generateName(type);
        tries++;
        if (tries > 100) {
            name += `-TAKKER${Math.floor(config.rng() * 10000)}`;
        }
    } while (usedNames.has(name));
    usedNames.add(name);
    return name;
}

/**
 * Die Funktion gibt es Extra dafür um Anomalienamen zu Generieren,
 * ich wollte nicht einfach nur Silben für die Namen verwenden also habe ich mich dafür hier entschieden.
 * 
 * Weil es sich für Anomalien besser anhört.
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