/**
 * Die Liste an Allen Ressourcen damit man sie am Ende nicht Separat nochmal erstellen muss,
 * wird sie direkt beim einspeichern der Einzelnen Elemente erstellt.
 */
export declare const allResources: resource[];
export type CelestialObjectTypes = "none" | "stellar_astroid" | "interstellar_t1_astroid" | "interstellar_t2_astroid" | "interstellar_t3_astroid" | "planet" | "moon" | "star" | "gas_planet" | "stellar_space" | "interstellar_space" | "anomaly" | "antimatter_anomaly" | "neutron_star" | "test" | "dev" | "everywhere" | "blackHole" | "mainBlackHole" | "rogue_planet";
export declare const CelestialObjectTypesArray: CelestialObjectTypes[];
export type ResourceTypes = "solid" | "liquid" | "gas" | "antimatter" | "exotic" | "plastic_bag";
/**
 * Das ist quasi die Class wo die Struktur aller Ressourcen verbaut ist.\
 * Also nicht "quasi" sondern "ja hier sind alle Elemente verbaut"
 */
export declare class resource {
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
    constructor(name: string, id: string, group: string, short: string, description: string, density: number, chance: number, type: ResourceTypes, found: CelestialObjectTypes);
    /**
     * Gibt den WEB-INFORMATION Teil zurück der für Webseiten verwendet werden kann
     *
     * wusste nicht einmal das man `this` dabei verwenden kann XD
     *
     * `p` = Die Prozentinformation - aka. wieviel Prozent der Ressource drin Steckt (Optional, kann nachträglich Deklariert werden)
     * `n` = Der Wert wieviele Ressourcen dort drin stecken (Optional, kann nachträglich Deklariert werden)
     * `v` = Der Maximalwert von allen Ressourcen (Optional, kann nachträglich Deklariert werden)
     */
    webInformation(p?: number | null, n?: number | null, v?: number | null): webResourceInformation;
}
export declare class webResourceInformation {
    readonly name: string;
    readonly id: string;
    readonly short: string;
    readonly group: string;
    readonly density: number;
    p: number | null;
    n: number | null;
    v: number | null;
    /**
     * Eine Komprimierte Version die für webseiten verwendet werden können
     *
     * `resourceInfo` Die Ressource
     *
     * `p` = Die Prozentinformation - aka. wieviel Prozent der Ressource drin Steckt
     * `n` = Der Wert wieviele Ressourcen dort drin stecken
     * `v` = Der Maximalwert von allen Ressourcen
     */
    constructor(resourceInfo: resource, p?: number | null, n?: number | null, v?: number | null);
    /**
     * Deklariert p, n und v
     *
     * @param p Die Prozentinformation - aka. wieviel Prozent der Ressource drin Steckt
     * @param n Der Wert wieviele Ressourcen dort drin stecken
     * @param v Der Maximalwert von allen Ressourcen
     */
    pnv(p: number, n: number, v: number): void;
    /**
     * Gibt den Web-Wert mit allen Nützlichen Informationen zurück
     *
     * `p` = Die Prozentinformation - aka. wieviel Prozent der Ressource drin Steckt (Optional wenn schon vorher definiert)
     * `n` = Der Wert wieviele Ressourcen dort drin stecken (Optional wenn schon vorher definiert)
     * `v` = Der Maximalwert von allen Ressourcen (Optional wenn schon vorher definiert)
     */
    toJSON(options: {
        p?: number;
        n?: number;
        v?: number;
    }): {
        name: string;
        id: string;
        short: string;
        group: string;
        density: number;
        p: number;
        n: number;
        v: number;
    };
    toWebJSON(p?: number): resWebJSONData;
}
/**
 * Data that is getting used an the Website;
 */
export type resWebJSONData = {
    name: string;
    id: string;
    short: string;
    p: number;
};
/**
 * Gibt die Ressource Basierend auf der ID zurück
 *
 * `id` = ID der Ressource
 */
export declare function getResourceByID(id: string): resource | null;
export declare function generateResources(): {
    resource: resource;
    per: number;
    getWebJSON: () => resWebJSONData;
}[];
