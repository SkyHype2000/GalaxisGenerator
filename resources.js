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
Object.defineProperty(exports, "__esModule", { value: true });
exports.webResourceInformation = exports.resource = exports.CelestialObjectTypesArray = exports.allResources = void 0;
exports.getResourceByID = getResourceByID;
exports.generateResources = generateResources;
const config = __importStar(require("./config"));
/**
 * Die Liste an Allen Ressourcen damit man sie am Ende nicht Separat nochmal erstellen muss,
 * wird sie direkt beim einspeichern der Einzelnen Elemente erstellt.
 */
exports.allResources = [];
exports.CelestialObjectTypesArray = [];
/**
 * Das ist quasi die Class wo die Struktur aller Ressourcen verbaut ist.\
 * Also nicht "quasi" sondern "ja hier sind alle Elemente verbaut"
 */
class resource {
    name;
    id;
    group;
    short;
    description;
    density;
    chance;
    type;
    found;
    /**
     * Informationen über eine Ressource, ich finde es einfacher und Übersichtlicher als eine JSON zu machen
     *
     * `name` Name of the Resource
     * `id` ID of the Resource
     * `group` Group of the Resource
     * `short` The Short for a Resource, for Example "Fe" for "Iron"
     * `description` Description of the Resource
     * `density` The Density of the Resource in kg/m^3
     * `chance` The Chance of the Resource
     * `type` Type of the Resource
     * `found` Where it can be found
     */
    constructor(name, id, group, short, description, density, chance, type, found) {
        this.name = name;
        this.id = id;
        this.group = group;
        this.short = short;
        this.description = description;
        this.density = density;
        this.chance = chance;
        this.type = type;
        this.found = found;
        exports.allResources.push(this);
    }
    /**
     * Gibt den WEB-INFORMATION Teil zurück der für Webseiten verwendet werden kann
     *
     * wusste nicht einmal das man `this` dabei verwenden kann XD
     *
     * `p` = Die Prozentinformation - aka. wieviel Prozent der Ressource drin Steckt (Optional, kann nachträglich Deklariert werden)
     * `n` = Der Wert wieviele Ressourcen dort drin stecken (Optional, kann nachträglich Deklariert werden)
     * `v` = Der Maximalwert von allen Ressourcen (Optional, kann nachträglich Deklariert werden)
     */
    webInformation(p = null, n = null, v = null) {
        return new webResourceInformation(this, p, n, v);
    }
}
exports.resource = resource;
class webResourceInformation {
    name;
    id;
    short;
    group;
    density;
    p;
    n;
    v;
    /**
     * Eine Komprimierte Version die für webseiten verwendet werden können
     *
     * `resourceInfo` Die Ressource
     *
     * `p` = Die Prozentinformation - aka. wieviel Prozent der Ressource drin Steckt
     * `n` = Der Wert wieviele Ressourcen dort drin stecken
     * `v` = Der Maximalwert von allen Ressourcen
     */
    constructor(resourceInfo, p = null, n = null, v = null) {
        this.name = resourceInfo.name;
        this.id = resourceInfo.id;
        this.short = resourceInfo.short;
        this.group = resourceInfo.group;
        this.density = resourceInfo.density;
        this.p = p;
        this.n = n;
        this.v = v;
    }
    /**
     * Deklariert p, n und v
     *
     * @param p Die Prozentinformation - aka. wieviel Prozent der Ressource drin Steckt
     * @param n Der Wert wieviele Ressourcen dort drin stecken
     * @param v Der Maximalwert von allen Ressourcen
     */
    pnv(p, n, v) {
        this.p = p;
        this.n = n;
        this.v = v;
    }
    /**Creates a Very Useful Error for no Reason™. */
    error() { throw new Error("Why are you Using this Function?"); }
    /**
     * Gibt den Web-Wert mit allen Nützlichen Informationen zurück
     *
     * `p` = Die Prozentinformation - aka. wieviel Prozent der Ressource drin Steckt (Optional wenn schon vorher definiert)
     * `n` = Der Wert wieviele Ressourcen dort drin stecken (Optional wenn schon vorher definiert)
     * `v` = Der Maximalwert von allen Ressourcen (Optional wenn schon vorher definiert)
     */
    toJSON(options) {
        if ((options.p != null || options.p != undefined) && typeof options.p == "number")
            this.p = options.p;
        if ((options.n != null || options.n != undefined) && typeof options.n == "number")
            this.n = options.n;
        if ((options.v != null || options.v != undefined) && typeof options.v == "number")
            this.v = options.v;
        if (this.p == null || this.p == undefined ||
            this.n == null || this.n == undefined ||
            this.v == null || this.v == undefined) {
            throw new Error("p, n or v was null, maybe it wasn't defined before use?");
        }
        else {
            return {
                name: this.name.replaceAll(":", "_"), id: this.id, short: this.short, group: this.group, density: this.density, p: this.p, n: this.n, v: this.v
            };
        }
    }
    toWebJSON(p) {
        if ((p != null || p != undefined) && typeof p == "number")
            this.p = p;
        if (this.p == null)
            throw new Error("p was null, maybe it wasn't defined before use?");
        return { name: this.name, id: this.id, short: this.short, p: this.p };
    }
}
exports.webResourceInformation = webResourceInformation;
/**
 * Gibt die Ressource Basierend auf der ID zurück
 *
 * `id` = ID der Ressource
 */
function getResourceByID(id) {
    for (let i = 0; i < exports.allResources.length; i++) {
        const e = exports.allResources[i];
        if (e.id === id)
            return e;
    }
    return null;
}
function generateResources() {
    const tries = 1000;
    const res = new Map();
    for (let i = 0; i < tries; i++) {
        const x = config.rng();
        const candidates = exports.allResources.filter(e => x < e.chance);
        if (candidates.length === 0)
            continue;
        const minChance = Math.min(...candidates.map(e => e.chance));
        const rarestCandidates = candidates.filter(e => e.chance === minChance);
        const chosen = rarestCandidates[Math.floor(config.rng() * rarestCandidates.length)];
        if (res.has(chosen.name)) {
            res.get(chosen.name).n++;
        }
        else {
            res.set(chosen.name, { resource: chosen, n: 1 });
        }
    }
    return Array.from(res.values()).map(e => ({
        resource: e.resource,
        per: e.n / tries,
        getWebJSON() {
            return e.resource.webInformation().toWebJSON();
        },
    }));
}
//* IRON
//* COPPER
//* ALUMINIUM
//* WATER / WATER ICE
//* EXOTIC
