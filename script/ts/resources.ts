import * as config from "./config";

/**
 * Die Liste an Allen Ressourcen damit man sie am Ende nicht Separat nochmal erstellen muss,  
 * wird sie direkt beim einspeichern der Einzelnen Elemente erstellt.
 */
export const allResources: resource[] = [];

export type CelestialObjectTypes =
    "none" | "stellar_astroid" | "interstellar_t1_astroid" | "interstellar_t2_astroid" | "interstellar_t3_astroid" | "planet" | "moon" | "star" | "gas_planet" |
    "stellar_space" | "interstellar_space" | "anomaly" | "antimatter_anomaly" | "neutron_star" | "test" | "dev" | "everywhere" | "blackHole" | "mainBlackHole" |
    "rogue_planet"
export const CelestialObjectTypesArray:CelestialObjectTypes[] = []
export type ResourceTypes = "solid" | "liquid" | "gas" | "antimatter" | "exotic" | "plastic_bag"

/**
 * Das ist quasi die Class wo die Struktur aller Ressourcen verbaut ist.\
 * Also nicht "quasi" sondern "ja hier sind alle Elemente verbaut"
 */
export class resource {
    readonly name: string;
    readonly id: string;
    readonly group: string;
    readonly short: string;
    readonly description: string;
    readonly density: number;
    readonly chance: number;
    readonly type: string;
    readonly found: CelestialObjectTypes;
    /**
     * Informationen über eine Ressource, ich finde es einfacher und Übersichtlicher als eine JSON zu machen
     * 
     * `name` Name der Ressource  
     * `id` ID der Ressource  
     * `group` Gruppe der Ressource  
     * `short` Die Abkürzung, zb für Eisenerz: Fe2O3, Eisen oder nur Fe  
     * `description` Beschreibung der Ressource  
     * `density` Die Dichte der Ressource in kg/m^3  
     *  `chance` Die Wahrscheinlichkeit der Ressource  
     * `type` Typ der Ressource  
     * `found` Wo es gefunden werden kann, bei mehreren Punkten müssen mehrere Objekte erstellt werden.
     */
    constructor(name: string, id: string, group: string, short: string, description: string, density: number, chance: number, type: ResourceTypes, found: CelestialObjectTypes) {
        if (!name) throw new Error("resource: 'name' darf nicht leer sein!");
        if (!id) throw new Error("resource: 'id' darf nicht leer sein!");
        if (!group) throw new Error("resource: 'group' darf nicht leer sein!");
        if (!short) throw new Error("resource: 'short' darf nicht leer sein!");
        if (!description) throw new Error("resource: 'description' darf nicht leer sein!");
        if (density === undefined || density === null || isNaN(density)) throw new Error("resource: 'density' muss eine Zahl sein!");
        if (chance === undefined || chance === null || isNaN(chance)) throw new Error("resource: 'chance' muss eine Zahl sein!");
        if (!type) throw new Error("resource: 'type' darf nicht leer sein!");
        if (!found) throw new Error("resource: 'found' darf nicht leer sein!");

        this.name = name;
        this.id = id;
        this.group = group;
        this.short = short;
        this.description = description;
        this.density = density;
        this.chance = chance;
        this.type = type;
        this.found = found;

        allResources.push(this);
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
    webInformation(p:number|null = null, n:number|null = null, v:number|null = null): webResourceInformation {
        return new webResourceInformation(this, p, n, v)
    }
}

export class webResourceInformation {
    readonly name: string;
    readonly id: string;
    readonly short: string;
    readonly group: string;
    readonly density: number;
    p: number | null; n: number | null; v: number | null;
    /**
     * Eine Komprimierte Version die für webseiten verwendet werden können
     * 
     * `resourceInfo` Die Ressource
     * 
     * `p` = Die Prozentinformation - aka. wieviel Prozent der Ressource drin Steckt
     * `n` = Der Wert wieviele Ressourcen dort drin stecken
     * `v` = Der Maximalwert von allen Ressourcen
     */
    constructor(resourceInfo: resource, p: number | null = null, n: number | null = null, v: number | null = null) {
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
    pnv(p: number, n: number, v: number): void {
        this.p = p;
        this.n = n;
        this.v = v;
    }

    /**
     * Gibt den Web-Wert mit allen Nützlichen Informationen zurück
     * 
     * `p` = Die Prozentinformation - aka. wieviel Prozent der Ressource drin Steckt (Optional wenn schon vorher definiert)  
     * `n` = Der Wert wieviele Ressourcen dort drin stecken (Optional wenn schon vorher definiert)  
     * `v` = Der Maximalwert von allen Ressourcen (Optional wenn schon vorher definiert)
     */
    toJSON(options: { p?: number, n?: number, v?: number }): { name: string, id: string, short: string, group: string, density: number, p: number, n: number, v: number } {
        if ((options.p != null || options.p != undefined) && typeof options.p == "number") this.p = options.p;
        if ((options.n != null || options.n != undefined) && typeof options.n == "number") this.n = options.n;
        if ((options.v != null || options.v != undefined) && typeof options.v == "number") this.v = options.v;

        if (
            this.p == null || this.p == undefined ||
            this.n == null || this.n == undefined ||
            this.v == null || this.v == undefined
        ) {
            throw new Error("p, n or v was null, maybe it wasn't defined before use?");
        } else {
            return {
                name: this.name.replaceAll(":", "_"), id: this.id, short: this.short, group: this.group, density: this.density, p: this.p, n: this.n, v: this.v
            }
        }
    }

    toWebJSON(p?: number): resWebJSONData {
        if ((p != null || p != undefined) && typeof p == "number") this.p = p;
        if (this.p == null) throw new Error("p was null, maybe it wasn't defined before use?");
        return {name:this.name, id:this.id, short:this.short, p:this.p}
    }
}

/**
 * Data that is getting used an the Website;
 */
export type resWebJSONData = {name:string, id:string, short:string, p:number};

/**
 * Gibt die Ressource Basierend auf der ID zurück
 * 
 * `id` = ID der Ressource
 */
export function getResourceByID(id: string): resource | null {
    for (let i = 0; i < allResources.length; i++) {
        const e = allResources[i];
        if (e.id === id) return e;
    }
    return null;
}

export function generateResources(): {resource: resource, per: number, getWebJSON:() => resWebJSONData}[] {
    const tries = 1000;
    const res: Map<string, {resource: resource, n: number}> = new Map();

    for (let i = 0; i < tries; i++) {
        const x = config.rng();

        const candidates = allResources.filter(e => x < e.chance);
        if (candidates.length === 0) continue;

        const minChance = Math.min(...candidates.map(e => e.chance));
        const rarestCandidates = candidates.filter(e => e.chance === minChance);

        const chosen = rarestCandidates[Math.floor(config.rng() * rarestCandidates.length)];

        if (res.has(chosen.name)) {
            res.get(chosen.name)!.n++;
        } else {
            res.set(chosen.name, {resource: chosen, n: 1});
        }
    }

    return Array.from(res.values()).map(e => ({
        resource: e.resource,
        per: e.n / tries,
        getWebJSON(): resWebJSONData {
            return e.resource.webInformation().toWebJSON()
        },
    }));
}

//* IRON

//* COPPER

//* ALUMINIUM

//* For No Reason at all: PLASTIC BAG

//* SILICON DIOXIDE

//* WATER / WATER ICE

//* EXOTIC