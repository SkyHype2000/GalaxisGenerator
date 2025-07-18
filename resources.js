"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nothing = exports.test_5 = exports.test_4 = exports.test_3 = exports.test_2 = exports.test_1 = exports.test_0 = exports.nuclear_pasta = exports.neutronium_matter = exports.anti_hydrogen = exports.anti_neutrons = exports.anti_protons = exports.positrons_2 = exports.positrons_1 = exports.positrons_0 = exports.ammonia_ice = exports.methane_ice_2 = exports.methane_ice_1 = exports.methane_ice_0 = exports.water_ice_3 = exports.water_ice_2 = exports.water_ice_1 = exports.water_ice_0 = exports.silica_5 = exports.silica_4 = exports.silica_3 = exports.silica_2 = exports.silica_1 = exports.silica_0 = exports.copper_ore_4 = exports.copper_ore_3 = exports.copper_ore_2 = exports.copper_ore_1 = exports.copper_ore_0d = exports.copper_ore_0c = exports.copper_ore_0b = exports.copper_ore_0a = exports.iron_ore_4 = exports.iron_ore_3 = exports.iron_ore_2 = exports.iron_ore_1 = exports.iron_ore_0d = exports.iron_ore_0c = exports.iron_ore_0b = exports.iron_ore_0a = exports.webResourceInformation = exports.resource = exports.CelestialObjectTypesArray = exports.allResources = void 0;
exports.getResourceByID = getResourceByID;
/**
 * Die Liste an Allen Ressourcen damit man sie am Ende nicht Separat nochmal erstellen muss,
 * wird sie direkt beim einspeichern der Einzelnen Elemente erstellt.
 */
exports.allResources = [];
exports.CelestialObjectTypesArray = [
    "none", "stellar_astroid", "interstellar_t1_astroid", "interstellar_t2_astroid", "interstellar_t3_astroid", "planet", "moon", "star", "gas_planet",
    "stellar_space", "interstellar_space", "anomaly", "antimatter_anomaly", "neutron_star", "planet:noAtmosphere", "planet:atmosphere", "moon:noAtmosphere",
    "moon:atmosphere", "test", "dev", "everywhere", "blackHole", "mainBlackHole", "rogue_planet"
];
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
    constructor(name, id, group, short, description, density, chance, type, found) {
        if (!name)
            throw new Error("resource: 'name' darf nicht leer sein!");
        if (!id)
            throw new Error("resource: 'id' darf nicht leer sein!");
        if (!group)
            throw new Error("resource: 'group' darf nicht leer sein!");
        if (!short)
            throw new Error("resource: 'short' darf nicht leer sein!");
        if (!description)
            throw new Error("resource: 'description' darf nicht leer sein!");
        if (density === undefined || density === null || isNaN(density))
            throw new Error("resource: 'density' muss eine Zahl sein!");
        if (chance === undefined || chance === null || isNaN(chance))
            throw new Error("resource: 'chance' muss eine Zahl sein!");
        if (!type)
            throw new Error("resource: 'type' darf nicht leer sein!");
        if (!found)
            throw new Error("resource: 'found' darf nicht leer sein!");
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
//* IRON ORE
/**Hematite that can be found on planets. */
exports.iron_ore_0a = new resource("Hematite", "iron_ore_0a", "iron_ore", "Fe2O3", "Hematite (iron ore) that can be found on planets.", 4800, 0.01, "solid", "planet:atmosphere");
/**Elemental iron that can be found on planets without atmospheres. */
exports.iron_ore_0b = new resource("Iron", "iron_ore_0b", "iron_ore", "Fe", "Elemental iron that can be found on planets without atmospheres.", 4800, 0.01, "solid", "planet:noAtmosphere");
/**Hematite that can be found on moons. */
exports.iron_ore_0c = new resource("Hematite", "iron_ore_0c", "iron_ore", "Fe2O3", "Hematite (iron ore) that can be found on moons.", 4800, 0.01, "solid", "moon:atmosphere");
/**Elemental iron that can be found on moons without atmospheres. */
exports.iron_ore_0d = new resource("Iron", "iron_ore_0d", "iron_ore", "Fe", "Elemental iron that can be found on moons without atmospheres.", 4800, 0.01, "solid", "moon:noAtmosphere");
/**Elemental iron that can be found on stellar asteroids. */
exports.iron_ore_1 = new resource("Iron", "iron_ore_1", "iron_ore", "Fe", "Elemental iron that can be found on stellar asteroids.", 4800, 0.03, "solid", "stellar_astroid");
/**Elemental iron that can be found on interstellar T1 asteroids. */
exports.iron_ore_2 = new resource("Iron", "iron_ore_2", "iron_ore", "Fe", "Elemental iron that can be found on interstellar T1 asteroids.", 4800, 0.08, "solid", "interstellar_t1_astroid");
/**Elemental iron that can be found on interstellar T2 asteroids. */
exports.iron_ore_3 = new resource("Iron", "iron_ore_3", "iron_ore", "Fe", "Elemental iron that can be found on interstellar T2 asteroids.", 4800, 0.1, "solid", "interstellar_t2_astroid");
/**Elemental iron that can be found on interstellar T3 asteroids. */
exports.iron_ore_4 = new resource("Iron", "iron_ore_4", "iron_ore", "Fe", "Elemental iron that can be found on interstellar T3 asteroids.", 4800, 0.2, "solid", "interstellar_t3_astroid");
//* COPPER ORE
/**Chalcocite that can be found on planets. */
exports.copper_ore_0a = new resource("Chalcocite", "copper_ore_0a", "copper_ore", "Cu2S", "Chalcocite that can be found on planets.", 5600, 0.01, "solid", "planet:atmosphere");
/**Elemental copper that can be found on planets without atmospheres. */
exports.copper_ore_0b = new resource("Copper", "copper_ore_0b", "copper_ore", "Cu", "Elemental copper that can be found on planets without atmospheres.", 5600, 0.01, "solid", "planet:noAtmosphere");
/**Chalcocite that can be found on moons. */
exports.copper_ore_0c = new resource("Chalcocite", "copper_ore_0c", "copper_ore", "Cu2S", "Chalcocite that can be found on moons.", 5600, 0.01, "solid", "moon:atmosphere");
/**Elemental copper that can be found on moons without atmospheres. */
exports.copper_ore_0d = new resource("Copper", "copper_ore_0d", "copper_ore", "Cu", "Elemental copper that can be found on moons without atmospheres.", 5600, 0.01, "solid", "moon:noAtmosphere");
/**Elemental copper that can be found on stellar asteroids. */
exports.copper_ore_1 = new resource("Copper", "copper_ore_1", "copper_ore", "Cu", "Elemental copper that can be found on stellar asteroids.", 5600, 0.08, "solid", "stellar_astroid");
/**Elemental copper that can be found on interstellar T1 asteroids. */
exports.copper_ore_2 = new resource("Copper", "copper_ore_2", "copper_ore", "Cu", "Elemental copper that can be found on interstellar T1 asteroids.", 5600, 0.09, "solid", "interstellar_t1_astroid");
/**Elemental copper that can be found on interstellar T2 asteroids. */
exports.copper_ore_3 = new resource("Copper", "copper_ore_3", "copper_ore", "Cu", "Elemental copper that can be found on interstellar T2 asteroids.", 5600, 0.09, "solid", "interstellar_t2_astroid");
/**Elemental copper that can be found on interstellar T3 asteroids. */
exports.copper_ore_4 = new resource("Copper", "copper_ore_4", "copper_ore", "Cu", "Elemental copper that can be found on interstellar T3 asteroids.", 5600, 0.09, "solid", "interstellar_t3_astroid");
//* SILICON DIOXIDE
/**Silicon dioxide that can be found on planets. */
exports.silica_0 = new resource("Silicon Dioxide", "silica_0", "silica", "SiO2", "Silicon dioxide that can be found on planets.", 2650, 0.5, "solid", "planet");
/**Silicon dioxide that can be found on moons. */
exports.silica_1 = new resource("Silicon Dioxide", "silica_1", "silica", "SiO2", "Silicon dioxide that can be found on moons.", 2650, 0.5, "solid", "moon");
/**Silicon dioxide that can be found on stellar asteroids. */
exports.silica_2 = new resource("Silicon Dioxide", "silica_2", "silica", "SiO2", "Silicon dioxide that can be found on stellar asteroids.", 2650, 0.5, "solid", "stellar_astroid");
/**Silicon dioxide that can be found on interstellar T1 asteroids. */
exports.silica_3 = new resource("Silicon Dioxide", "silica_3", "silica", "SiO2", "Silicon dioxide that can be found on interstellar T1 asteroids.", 2650, 0.5, "solid", "interstellar_t1_astroid");
/**Silicon dioxide that can be found on interstellar T2 asteroids. */
exports.silica_4 = new resource("Silicon Dioxide", "silica_4", "silica", "SiO2", "Silicon dioxide that can be found on interstellar T2 asteroids.", 2650, 0.5, "solid", "interstellar_t2_astroid");
/**Silicon dioxide that can be found on interstellar T3 asteroids. */
exports.silica_5 = new resource("Silicon Dioxide", "silica_5", "silica", "SiO2", "Silicon dioxide that can be found on interstellar T3 asteroids.", 2650, 0.5, "solid", "interstellar_t3_astroid");
//* WATER
/**Water ice that can be found on stellar asteroids. */
exports.water_ice_0 = new resource("Water Ice", "water_ice_0", "water_ice", "water_ice", "Water ice that can be found on stellar asteroids.", 997, 0.25, "solid", "stellar_astroid");
/**Water ice that can be found on interstellar T1 asteroids. */
exports.water_ice_1 = new resource("Water Ice", "water_ice_1", "water_ice", "water_ice", "Water ice that can be found on interstellar T1 asteroids.", 997, 0.25, "solid", "interstellar_t1_astroid");
/**Water ice that can be found on interstellar T2 asteroids. */
exports.water_ice_2 = new resource("Water Ice", "water_ice_2", "water_ice", "water_ice", "Water ice that can be found on interstellar T2 asteroids.", 997, 0.25, "solid", "interstellar_t2_astroid");
/**Water ice that can be found on interstellar T3 asteroids. */
exports.water_ice_3 = new resource("Water Ice", "water_ice_3", "water_ice", "water_ice", "Water ice that can be found on interstellar T3 asteroids.", 997, 0.25, "solid", "interstellar_t3_astroid");
//* METHANE
/**Solid methane ice that can be found on interstellar T1 asteroids. */
exports.methane_ice_0 = new resource("Methane Ice", "solid_methane_0", "solid_methane", "methane_ice", "Solid methane ice that can be found on interstellar T1 asteroids.", 900, 0.05, "solid", "interstellar_t1_astroid");
/**Solid methane ice that can be found on interstellar T2 asteroids. */
exports.methane_ice_1 = new resource("Methane Ice", "solid_methane_1", "solid_methane", "methane_ice", "Solid methane ice that can be found on interstellar T2 asteroids.", 900, 0.06, "solid", "interstellar_t2_astroid");
/**Solid methane ice that can be found on interstellar T3 asteroids. */
exports.methane_ice_2 = new resource("Methane Ice", "solid_methane_2", "solid_methane", "methane_ice", "Solid methane ice that can be found on interstellar T3 asteroids.", 900, 0.08, "solid", "interstellar_t3_astroid");
//* AMMONIA
/**Solid ammonia ice that can be found in the outer asteroid belts of a star system. */
exports.ammonia_ice = new resource("Ammonia Ice", "solid_ammonia", "ammonia", "ammonia_ice", "Solid ammonia ice that can be found in the outer asteroid belts of a star system.", 817, 0.002, "solid", "stellar_astroid");
//* ANTIMATTER
/**Antimatter electrons or positrons that can be found near massive gas giants. */
exports.positrons_0 = new resource("Positrons", "positrons_0", "positrons", "e+", "Antimatter electrons or positrons that can be found near massive gas giants.", 0e-1000, 0.001, "antimatter", "gas_planet");
/**Antimatter electrons or positrons that can be found in interstellar space. */
exports.positrons_1 = new resource("Positrons", "positrons_1", "positrons", "e+", "Antimatter electrons or positrons that can be found in interstellar space.", 0e-1000, 0.00001, "antimatter", "interstellar_space");
/**Antimatter electrons or positrons that can be found in interstellar antimatter clusters. */
exports.positrons_2 = new resource("Positrons", "positrons_2", "positrons", "e+", "Antimatter electrons or positrons that can be found in interstellar antimatter clusters.", 0e-1000, 0.001, "antimatter", "antimatter_anomaly");
/**Antimatter protons that can be found in interstellar space. */
exports.anti_protons = new resource("Anti-Protons", "anti_protons", "anti_protons", "p-", "Antimatter protons that can be found in interstellar space.", 2.3e14, 0, "antimatter", "interstellar_space");
/**Antimatter neutrons that can be found in interstellar space. */
exports.anti_neutrons = new resource("Anti-Neutrons", "anti_neutrons", "anti_neutrons", "nn'", "Antimatter neutrons that can be found in interstellar space.", 2.2e14, 0, "antimatter", "interstellar_space");
/**Antihydrogen, an incredibly rare form of antimatter that can be found in interstellar space. */
exports.anti_hydrogen = new resource("Antihydrogen", "anti_hydrogen", "anti_hydrogen", "H'", "Antihydrogen, an incredibly rare form of antimatter that can be found in interstellar space.", 0.08988, 0, "antimatter", "interstellar_space");
//* EXOTIC
/**Neutronium or neutronium matter, a substance made entirely of neutrons. */
exports.neutronium_matter = new resource("Neutronium Matter", "neutronium", "neutronium", "nn", "Neutronium or neutronium matter, a substance made entirely of neutrons.", 2.2e14, 0.25, "exotic", "neutron_star");
/**Nuclear pasta, extremely dense matter found in a neutron star's outer crust. */
exports.nuclear_pasta = new resource("Nuclear Pasta", "nuclear_pasta", "nuclear_pasta", "nnn", "Nuclear pasta, extremely dense matter found in the outer crust of a neutron star.", 2.3e17, 0.75, "exotic", "neutron_star");
/**Testressource - wird für die resourcemap verwendet*/
exports.test_0 = new resource("Test1", "test0", "test0", "test0", "Testressource 1 - für die resMap", 1, 0.10, "solid", "test");
exports.test_1 = new resource("Test2", "test1", "test1", "test1", "Testressource 2 - für die resMap", 1, 0.05, "solid", "test");
exports.test_2 = new resource("Test3", "test2", "test2", "test2", "Testressource 3 - für die resMap", 1, 0.01, "solid", "test");
exports.test_3 = new resource("Test4", "test3", "test3", "test3", "Testressource 4 - für die resMap", 1, 0.005, "solid", "test");
exports.test_4 = new resource("Test5", "test4", "test4", "test4", "Testressource 5 - für die resMap", 1, 0.001, "solid", "test");
exports.test_5 = new resource("Test6", "test5", "test5", "test5", "Testressource 6 - für die resMap", 1, 0.0005, "solid", "test");
exports.nothing = new resource("Nothing", "nothing", "dev", "nothing", "Indikator für ein Hauch von Garnix", 1, 1, "exotic", "everywhere");
