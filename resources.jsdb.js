const { number } = require("./consolecolor.jsdb");

/**
 * Die Liste an Allen Ressourcen damit man sie am Ende nicht Separat nochmal erstellen muss,\
 * wird sie direkt beim einspeichern der Einzelnen Elemente erstellt.
 * 
 * @type {resource[]}
 */
const allResources = [];

/**
 * Das ist quasi die Class wo die Struktur aller Ressourcen verbaut ist.\
 * Also nicht "quasi" sondern "ja hier sind alle Elemente verbaut"
 */
class resource {
    /**
     * Informationen über eine Ressource, ich finde es einfacher und Übersichtlicher als eine JSON zu machen
     * 
     * @param {string} name Name der Ressource
     * @param {string} id ID der Ressource
     * @param {string} group Gruppe der Ressource
     * @param {string} short Die Abkürzung, zb für Eisenerz: Fe2O3, Eisen oder nur Fe
     * @param {string} description Beschreibung der Ressource
     * @param {number} density Die Dichte der Ressource in kg/m^3
     * @param {number} chance Die Wahrscheinlichkeit der Ressource
     * @param {"solid"|"liquid"|"gas"|"antimatter"|"exotic"|"plastic_bag"} type Typ der Ressource
     * @param {"none"|"stellar_astroid"|"interstellar_t1_astroid"|"interstellar_t2_astroid"|"interstellar_t3_astroid"|"planet"|"moon"|"star"|"gas_planet"|"stellar_space"|"interstellar_space"|"antimatter_anomaly"|
     * "neutron_star"|"planet:noAtmosphere"|"planet:atmosphere"|"moon:noAtmosphere"|"moon:atmosphere"} found Wo es gefunden werden kann, bei mehreren Punkten müssen mehrere Objekte erstellt werden.
     */
    constructor(name, id, group, short, description, density, chance, type, found) {
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
     */
    webInformation() {
        return new webResourceInformation(this)
    }
}

class webResourceInformation {
    /**
     * Eine Komprimierte Version die für webseiten verwendet werden können
     * 
     * @param {resource} resourceInfo Die Ressource
     */
    constructor(resourceInfo) {
        this.name = resourceInfo.name;
        this.id = resourceInfo.id;
        this.short = resourceInfo.short;
        this.group = resourceInfo.group;
        this.density = resourceInfo.density;
    }

    /**
     * Gibt den Web-Wert mit allen Nützlichen Informationen zurück
     * 
     * @param {number} p Die Prozentinformation - aka. wieviel Prozent der Ressource drin Steckt
     * @param {number} n Der Wert wieviele Ressourcen dort drin stecken
     * @param {number} v Der Maximalwert von allen Ressourcen
     * @returns {{name:string, id:string, short:string, group:string, density:number, p:number, n:number, v:number}}
     */
    toJSON(p, n, v) {
        return {
            name: this.name, id: this.id, short: this.short, group: this.group, density: this.density, p, n, v
        }
    }
}

/**
 * Gibt die Ressource Basierend auf der ID zurück
 * 
 * @param {string} id 
 * @returns {resource|null}
 */
function getResourceByID(id) {
    for (let i = 0; i < allResources.length; i++) {
        const e = allResources[i];
        if (e.id === id) return e;
    }
    return null;
}

//* EISENERZ
/**Hämatit das auf Planeten gefunden werden kann. */
const iron_ore_0a = new resource("Hämatit", "iron_ore_0a", "iron_ore", "Fe2O3", "Hämatit(Eisenerz) das auf Planeten gefunden werden kann.", 4800, 0.01, "solid", "planet:atmosphere");
/**Elementares Eisen das auf Atmosphärenlosen Planeten gefunden werden kann. */
const iron_ore_0b = new resource("Eisen", "iron_ore_0b", "iron_ore", "Fe", "Elementares Eisen das auf Atmosphärenlosen Planeten gefunden werden kann.", 4800, 0.01, "solid", "planet:noAtmosphere");
/**Hämatit das auf Monden gefunden werden kann. */
const iron_ore_0c = new resource("Hämatit", "iron_ore_0c", "iron_ore", "Fe2O3", "Hämatit(Eisenerz) das auf Monden gefunden werden kann.", 4800, 0.01, "solid", "moon:atmosphere");
/**Elementares Eisen das auf Atmosphärenlosen Monden gefunden werden kann. */
const iron_ore_0d = new resource("Eisen", "iron_ore_0d", "iron_ore", "Fe", "Elementares Eisen das auf Atmosphärenlosen Monden gefunden werden kann.", 4800, 0.01, "solid", "moon:noAtmosphere");
/**Elementares Eisen das auf Stellaren Asteroiden gefunden werden kann. */
const iron_ore_1 = new resource("Eisen", "iron_ore_1", "iron_ore", "Fe", "Elementares Eisen das auf Stellaren Asteroiden gefunden werden kann.", 4800, 0.03, "solid", "stellar_astroid");
/**Elementares Eisen das auf Interstellaren T1 Asteroiden gefunden werden kann. */
const iron_ore_2 = new resource("Eisen", "iron_ore_2", "iron_ore", "Fe", "Elementares Eisen das auf Interstellaren T1 Asteroiden gefunden werden kann.", 4800, 0.08, "solid", "interstellar_t1_astroid");
/**Elementares Eisen das auf Interstellaren T2 Asteroiden gefunden werden kann. */
const iron_ore_3 = new resource("Eisen", "iron_ore_3", "iron_ore", "Fe", "Elementares Eisen das auf Interstellaren T2 Asteroiden gefunden werden kann.", 4800, 0.1, "solid", "interstellar_t2_astroid");
/**Elementares Eisen das auf Interstellaren T3 Asteroiden gefunden werden kann. */
const iron_ore_4 = new resource("Eisen", "iron_ore_4", "iron_ore", "Fe", "Elementares Eisen das auf Interstellaren T3 Asteroiden gefunden werden kann.", 4800, 0.2, "solid", "interstellar_t3_astroid");

//* KUPFERERZ
/**Chalkosin das auf Planeten Gefunden werden kann. */
const copper_ore_0a = new resource("Kupfersulfid (Chalkosin)", "copper_ore_0a", "copper_ore", "Cu2S", "Chalkosin das auf Planeten Gefunden werden kann.", 5600, 0.01, "solid", "planet:atmosphere");
/**Chalkosin das auf Atmosphärenlosen Planeten Gefunden werden kann. */
const copper_ore_0b = new resource("Kupfer", "copper_ore_0b", "copper_ore", "Cu", "Elementares Kupfer das auf Atmosphärenlosen Planeten Gefunden werden kann.", 5600, 0.01, "solid", "planet:noAtmosphere");
/**Chalkosin das auf Monden Gefunden werden kann. */
const copper_ore_0c = new resource("Kupfersulfid (Chalkosin)", "copper_ore_0c", "copper_ore", "Cu2S", "Chalkosin das auf Monden Gefunden werden kann.", 5600, 0.01, "solid", "moon:atmosphere");
/**Chalkosin das auf Atmosphärenlosen Monden Gefunden werden kann. */
const copper_ore_0d = new resource("Kupfer", "copper_ore_0d", "copper_ore", "Cu", "Elementares Kupfer das auf Atmosphärenlosen Monden Gefunden werden kann.", 5600, 0.01, "solid", "moon:noAtmosphere");
/**Chalkosin das auf Stellaren Asteroiden Gefunden werden kann. */
const copper_ore_1 = new resource("Kupfer", "copper_ore_1", "copper_ore", "Cu", "Elementares Kupfer das auf Stellaren Asteroiden Gefunden werden kann.", 5600, 0.08, "solid", "stellar_astroid");
/**Chalkosin das auf Interstellaren T1 Asteroiden Gefunden werden kann. */
const copper_ore_2 = new resource("Kupfer", "copper_ore_2", "copper_ore", "Cu", "Elementares Kupfer das auf Interstellaren T1 Asteroiden Gefunden werden kann.", 5600, 0.09, "solid", "interstellar_t1_astroid");
/**Chalkosin das auf Interstellaren T2 Asteroiden Gefunden werden kann. */
const copper_ore_3 = new resource("Kupfer", "copper_ore_3", "copper_ore", "Cu", "Elementares Kupfer das auf Interstellaren T2 Asteroiden Gefunden werden kann.", 5600, 0.09, "solid", "interstellar_t2_astroid");
/**Chalkosin das auf Interstellaren T3 Asteroiden Gefunden werden kann. */
const copper_ore_4 = new resource("Kupfer", "copper_ore_4", "copper_ore", "Cu", "Elementares Kupfer das auf Interstellaren T3 Asteroiden Gefunden werden kann.", 5600, 0.09, "solid", "interstellar_t3_astroid");

//* SILIZIUMDIOXID
/**Siliziumdioxid das auf Planeten Gefunden werden kann. */
const silica_0 = new resource("Siliziumdioxid", "silica_0", "silica", "SiO2", "Siliziumdioxid das auf Planeten Gefunden werden kann.", 2320, 0.8, "solid", "planet");
/**Siliziumdioxid das auf Planeten Gefunden werden kann. */
const silica_1 = new resource("Siliziumdioxid", "silica_1", "silica", "SiO2", "Siliziumdioxid das auf Monden Gefunden werden kann.", 2320, 0.8, "solid", "moon");
/**Siliziumdioxid das auf Stellaren Asteroiden Gefunden werden kann. */
const silica_2 = new resource("Siliziumdioxid", "silica_2", "silica", "SiO2", "Siliziumdioxid das auf Stellaren Asteroiden Gefunden werden kann.", 2320, 0.8, "solid", "stellar_astroid");
/**Siliziumdioxid das auf Interstellaren T1 Asteroiden Gefunden werden kann. */
const silica_3 = new resource("Siliziumdioxid", "silica_3", "silica", "SiO2", "Siliziumdioxid das auf Interstellaren T1 Asteroiden Gefunden werden kann.", 2320, 0.8, "solid", "interstellar_t1_astroid");
/**Siliziumdioxid das auf Interstellaren T2 Asteroiden Gefunden werden kann. */
const silica_4 = new resource("Siliziumdioxid", "silica_4", "silica", "SiO2", "Siliziumdioxid das auf Interstellaren T2 Asteroiden Gefunden werden kann.", 2320, 0.8, "solid", "interstellar_t2_astroid");
/**Siliziumdioxid das auf Interstellaren T3 Asteroiden Gefunden werden kann. */
const silica_5 = new resource("Siliziumdioxid", "silica_5", "silica", "SiO2", "Siliziumdioxid das auf Interstellaren T3 Asteroiden Gefunden werden kann.", 2320, 0.8, "solid", "interstellar_t3_astroid");

//* WASSER
/**Wassereis das auf Stellaren Asteroiden Gefunden werden kann. */
const water_ice_0 = new resource("Wassereis", "water_ice_0", "water_ice", "water_ice", "Wassereis das auf Stellaren Asteroiden Gefunden werden kann.", 997, 0.25, "solid", "stellar_astroid");
/**Wassereis das auf Interstellaren T1 Asteroiden Gefunden werden kann. */
const water_ice_1 = new resource("Wassereis", "water_ice_1", "water_ice", "water_ice", "Wassereis das auf Interstellaren T1 Asteroiden Gefunden werden kann.", 997, 0.25, "solid", "interstellar_t1_astroid");
/**Wassereis das auf Interstellaren T2 Asteroiden Gefunden werden kann. */
const water_ice_2 = new resource("Wassereis", "water_ice_2", "water_ice", "water_ice", "Wassereis das auf Interstellaren T2 Asteroiden Gefunden werden kann.", 997, 0.25, "solid", "interstellar_t2_astroid");
/**Wassereis das auf Interstellaren T3 Asteroiden Gefunden werden kann. */
const water_ice_3 = new resource("Wassereis", "water_ice_3", "water_ice", "water_ice", "Wassereis das auf Interstellaren T3 Asteroiden Gefunden werden kann.", 997, 0.25, "solid", "interstellar_t3_astroid");

//* METHAN
/**Festes Methaneis das in Interstellaren T1 Asteroiden Gefunden werden kann. */
const methane_ice_0 = new resource("Methaneis", "solid_methane_0", "solid_methane", "methane_ice", "Festes Methaneis das in Interstellaren T1 Asteroiden Gefunden werden kann.", 900, 0.05, "solid", "interstellar_t1_astroid");
/**Festes Methaneis das in Interstellaren T2 Asteroiden Gefunden werden kann. */
const methane_ice_1 = new resource("Methaneis", "solid_methane_1", "solid_methane", "methane_ice", "Festes Methaneis das in Interstellaren T2 Asteroiden Gefunden werden kann.", 900, 0.06, "solid", "interstellar_t2_astroid");
/**Festes Methaneis das in Interstellaren T3 Asteroiden Gefunden werden kann. */
const methane_ice_2 = new resource("Methaneis", "solid_methane_2", "solid_methane", "methane_ice", "Festes Methaneis das in Interstellaren T3 Asteroiden Gefunden werden kann.", 900, 0.08, "solid", "interstellar_t3_astroid");

//* AMMONIAK
/**Festes Ammoniumeis das in den Äußeren Asteroiden-Gürteln eines Sternsystems Gefunden werden kann. */
const ammonia_ice = new resource("Ammoniumeis", "solid_ammonia", "ammonia", "ammonia_ice", "Festes Ammoniumeis das in den Äußeren Asteroiden-Gürteln eines Sternsystems Gefunden werden kann.", 817, 0.002, "solid", "stellar_astroid");

//* ANTIMATERIE
/**Antimaterie-Elektronen oder Positronen, die in der Nähe von Gasriesen gefunden werden können. */
const positrons_0 = new resource("Positronen", "positrons_0", "positrons", "e+", "Antimaterie-Elektronen oder Positronen, die in der Nähe von Massiven Gasriesen gefunden werden können.", 0e-1000, 0.001, "antimatter", "gas_planet");
/**Antimaterie-Elektronen oder Positronen, die im Interstellaren Raum gefunden werden können. */
const positrons_1 = new resource("Positronen", "positrons_1", "positrons", "e+", "Antimaterie-Elektronen oder Positronen, die im Interstellaren Raum gefunden werden können.", 0e-1000, 0.00001, "antimatter", "interstellar_space");
/**Antimaterie-Elektronen oder Positronen, die in Interstelarren Anti-Materie Clustern gefunden werden können. */
const positrons_2 = new resource("Positronen", "positrons_2", "positrons", "e+", "Antimaterie-Elektronen oder Positronen, die in Interstelarren Anti-Materie Clustern gefunden werden können.", 0e-1000, 0.001, "antimatter", "antimatter_anomaly");
/**Antimaterie-Protonen, die im Interstellaren Raum gefunden werden können. */
const anti_protons = new resource("Anti-Protonen", "anti_protons", "anti_protons", "p-", "Antimaterie-Protonen, die im Interstellaren Raum gefunden werden können.", 2.3e14, 0, "antimatter", "interstellar_space");
/**Antimaterie-Neutronen, die im Interstellaren Raum gefunden werden können. */
const anti_neutrons = new resource("Anti-Neutronen", "anti_neutrons", "anti_neutrons", "nn'", "Antimaterie-Neutronen, die im Interstellaren Raum gefunden werden können.", 2.2e14, 0, "antimatter", "interstellar_space");
/**Antimaterie-Wasserstof, eine unglaublich Seltene form von Anti-Materie, die im Interstellaren Raum gefunden werden können. */
const anti_hydrogen = new resource("Anti-Wasserstoff", "anti_hydrogen", "anti_hydrogen", "H'", "Antimaterie-Wasserstof, eine unglaublich Seltene form von Anti-Materie, die im Interstellaren Raum gefunden werden können.", 0.08988, 0, "antimatter", "interstellar_space");

//* EXOTISCH
/**Neutronium oder Neutroniummaterie, eine Materie die aus reinen Neutronen besteht. */
const neutronium_matter = new resource("Neutronium-Materie", "neutronium", "neutronium", "nn", "Neutronium oder Neutroniummaterie, eine Materie die aus reinen Neutronen besteht.", 2.2e14, 0.25, "exotic", "neutron_star");
/**Nukleare Pasta, Extrem dichte Materie die in einem Neutronenstern vorkommt. */
const nuclear_pasta = new resource("Nukleare Pasta", "nuclear_pasta", "nuclear_pasta", "nnn", "Nukleare Pasta, Extrem dichte Materie die in der Äußeren Kruste eines Neutronensterns vorkommt.", 2.3e17, 0.75, "exotic", "neutron_star");

/**Testressource - wird für die resourcemap verwendet*/
const test_0 = new resource("Test1", "test0", "test0", "test0", "Testressource 1 - für die resMap", 1, 0.10, "solid", "test");
const test_1 = new resource("Test2", "test1", "test1", "test1", "Testressource 2 - für die resMap", 1, 0.05, "solid", "test");
const test_2 = new resource("Test3", "test2", "test2", "test2", "Testressource 3 - für die resMap", 1, 0.01, "solid", "test");
const test_3 = new resource("Test4", "test3", "test3", "test3", "Testressource 4 - für die resMap", 1, 0.005, "solid", "test");
const test_4 = new resource("Test5", "test4", "test4", "test4", "Testressource 5 - für die resMap", 1, 0.001, "solid", "test");
const test_5 = new resource("Test6", "test5", "test5", "test5", "Testressource 6 - für die resMap", 1, 0.0005, "solid", "test");
const nothing = new resource("Nothing", "nothing", "dev", "nothing", "Indikator für ein Hauch von Garnix", 0, 0, "exotic", "everywhere")

module.exports = {
    resource,
    webResourceInformation,

    getResourceByID,
    allResources,

    iron_ore_0a,
    iron_ore_0b,
    iron_ore_0c,
    iron_ore_0d,
    iron_ore_1,
    iron_ore_2,
    iron_ore_3,
    iron_ore_4,
    
    copper_ore_0a,
    copper_ore_0b,
    copper_ore_0c,
    copper_ore_0d,
    copper_ore_1,
    copper_ore_2,
    copper_ore_3,
    copper_ore_4,

    silica_0,
    silica_1,
    silica_2,
    silica_3,
    silica_4,
    silica_5,

    water_ice_0,
    water_ice_1,
    water_ice_2,
    water_ice_3,

    methane_ice_0,
    methane_ice_1,
    methane_ice_2,
    
    ammonia_ice,

    positrons_0,
    positrons_1,
    anti_protons,
    anti_neutrons,
    anti_hydrogen,

    neutronium_matter,
    nuclear_pasta
}