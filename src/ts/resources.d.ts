/**
 * Die Liste an Allen Ressourcen damit man sie am Ende nicht Separat nochmal erstellen muss,
 * wird sie direkt beim einspeichern der Einzelnen Elemente erstellt.
 */
export declare const allResources: resource[];
export type CelestialObjectTypes = "none" | "stellar_astroid" | "interstellar_t1_astroid" | "interstellar_t2_astroid" | "interstellar_t3_astroid" | "planet" | "moon" | "star" | "gas_planet" | "stellar_space" | "interstellar_space" | "anomaly" | "antimatter_anomaly" | "neutron_star" | "planet:noAtmosphere" | "planet:atmosphere" | "moon:noAtmosphere" | "moon:atmosphere" | "test" | "dev" | "everywhere" | "blackHole" | "mainBlackHole" | "rogue_planet";
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
}
/**
 * Gibt die Ressource Basierend auf der ID zurück
 *
 * `id` = ID der Ressource
 */
export declare function getResourceByID(id: string): resource | null;
/**Hematite that can be found on planets. */
export declare const iron_ore_0a: resource;
/**Elemental iron that can be found on planets without atmospheres. */
export declare const iron_ore_0b: resource;
/**Hematite that can be found on moons. */
export declare const iron_ore_0c: resource;
/**Elemental iron that can be found on moons without atmospheres. */
export declare const iron_ore_0d: resource;
/**Elemental iron that can be found on stellar asteroids. */
export declare const iron_ore_1: resource;
/**Elemental iron that can be found on interstellar T1 asteroids. */
export declare const iron_ore_2: resource;
/**Elemental iron that can be found on interstellar T2 asteroids. */
export declare const iron_ore_3: resource;
/**Elemental iron that can be found on interstellar T3 asteroids. */
export declare const iron_ore_4: resource;
/**Chalcocite that can be found on planets. */
export declare const copper_ore_0a: resource;
/**Elemental copper that can be found on planets without atmospheres. */
export declare const copper_ore_0b: resource;
/**Chalcocite that can be found on moons. */
export declare const copper_ore_0c: resource;
/**Elemental copper that can be found on moons without atmospheres. */
export declare const copper_ore_0d: resource;
/**Elemental copper that can be found on stellar asteroids. */
export declare const copper_ore_1: resource;
/**Elemental copper that can be found on interstellar T1 asteroids. */
export declare const copper_ore_2: resource;
/**Elemental copper that can be found on interstellar T2 asteroids. */
export declare const copper_ore_3: resource;
/**Elemental copper that can be found on interstellar T3 asteroids. */
export declare const copper_ore_4: resource;
/**Silicon dioxide that can be found on planets. */
export declare const silica_0: resource;
/**Silicon dioxide that can be found on moons. */
export declare const silica_1: resource;
/**Silicon dioxide that can be found on stellar asteroids. */
export declare const silica_2: resource;
/**Silicon dioxide that can be found on interstellar T1 asteroids. */
export declare const silica_3: resource;
/**Silicon dioxide that can be found on interstellar T2 asteroids. */
export declare const silica_4: resource;
/**Silicon dioxide that can be found on interstellar T3 asteroids. */
export declare const silica_5: resource;
/**Water ice that can be found on stellar asteroids. */
export declare const water_ice_0: resource;
/**Water ice that can be found on interstellar T1 asteroids. */
export declare const water_ice_1: resource;
/**Water ice that can be found on interstellar T2 asteroids. */
export declare const water_ice_2: resource;
/**Water ice that can be found on interstellar T3 asteroids. */
export declare const water_ice_3: resource;
/**Solid methane ice that can be found on interstellar T1 asteroids. */
export declare const methane_ice_0: resource;
/**Solid methane ice that can be found on interstellar T2 asteroids. */
export declare const methane_ice_1: resource;
/**Solid methane ice that can be found on interstellar T3 asteroids. */
export declare const methane_ice_2: resource;
/**Solid ammonia ice that can be found in the outer asteroid belts of a star system. */
export declare const ammonia_ice: resource;
/**Antimatter electrons or positrons that can be found near massive gas giants. */
export declare const positrons_0: resource;
/**Antimatter electrons or positrons that can be found in interstellar space. */
export declare const positrons_1: resource;
/**Antimatter electrons or positrons that can be found in interstellar antimatter clusters. */
export declare const positrons_2: resource;
/**Antimatter protons that can be found in interstellar space. */
export declare const anti_protons: resource;
/**Antimatter neutrons that can be found in interstellar space. */
export declare const anti_neutrons: resource;
/**Antihydrogen, an incredibly rare form of antimatter that can be found in interstellar space. */
export declare const anti_hydrogen: resource;
/**Neutronium or neutronium matter, a substance made entirely of neutrons. */
export declare const neutronium_matter: resource;
/**Nuclear pasta, extremely dense matter found in a neutron star's outer crust. */
export declare const nuclear_pasta: resource;
/**Testressource - wird für die resourcemap verwendet*/
export declare const test_0: resource;
export declare const test_1: resource;
export declare const test_2: resource;
export declare const test_3: resource;
export declare const test_4: resource;
export declare const test_5: resource;
export declare const nothing: resource;
