/**
 * Der Seed Der Galaxie.\
 * Achtung! man kann kein Brot damit Backen
 * @type {"Main"|string}
 */
const seed = "Main";
/**
 * Der Radius der Galaxie in Lichtjahren
 * @type {number}
 */
const radius = 100000;
/**
 * Die Anzahl der Objekte innerhalb der Galaxie\
 * Beeinflusst nicht die Stellaren Objekte!
 * 
 * Eine Galaxie mit maximal 10000 Objekten wird empfohlen, weil der Code Momentan sehr Ineffizient ist, lol.\
 * Mal davon abgesehen das es immer Länger und Länger braucht die galaxie zu generieren.
 * @type {number}
 */
const count = 2500;
/**
 * Die Minimalen und Maximalen Planeten in einem Sternensystem,\
 * Beeinflusst aber nicht die Monde.
 * @type {min: number, max: number}
 */
const stellarPlanetCount = {min: 0, max: 10};
/**
 * Die Minimalen und Maximalen Asteroidengürtel in einem Sternensystem.
 * @type {min: number, max: number}
 */
const stellarAstroidCount = {min: 0, max: 3};
/**
 * Der Exponent der Festlegt wie die Sterne in der Galaxie verteilt sind.
 * 
 * Alle Werte über 0.5 lässt die Sterne mehr in die Mitte Rücken.\
 * Alle Werte unter 0.5 lässt die Sterne eher nach innen Rücken, was Lustig aussieht.\
 * Wenn man es nicht übertreiben will ist ein Wert zwischen 0.7 und 0.8 okay, gibt aber immernoch eine Harte Kante.
 * @type {number}
 */
const exponent = 0.75;
/**
 * Der Name des Schwarzen Lochs im Zentrum.
 * Nexus... die verbindung zu allem 😸.
 * @type {"Nexus"|string}
 */
const mainBlackHoleName = "Nexus";
/**
 * Die Verschiedenen Objekttypen und ihre Eigenschaften.
 * 
 * `preferred` ist der Wert der quasi die Lieblingsposition angibt... wie der name schon sagt.\
 * Es gibt:
 * - `sun_Orbit`: Das Objekt befindet sich in einer umlaufbahn eines Sterns.
 * - `planet_Orbit`: Das Objekt befindet sich in einer Umlaufbahn um einen Planeten oder Gasriesen
 * - `nearStar-min-max`: Das Objekt ist `min` Lj und `max` Lj von einem Stern entfernt.
 * - `deepSpace-min`: Das Objekt ist `min` Lj weit entfernt von Sternen.
 */
const types = {
    star: {
        chance: 0.2,
        minDistance: 3,
        maxDistance: 0,
        preferred: "",
    },
    planet: {
        chance: 0.5,
        minDistance: 0,
        maxDistance: 0,
        preferred: "sun_Orbit",
    },
    moon: {
        chance: 0.15,
        minDistance: 0,
        maxDistance: 0,
        preferred: "planet_Orbit",
    },
    stellar_astroid_field: {
        chance: 0.2,
        minDistance: 0,
        maxDistance: 0,
        preferred: "sun_Orbit",
    },
    t1_astroid: {
        chance: 0.05,
        minDistance: 5,
        maxDistance: 0,
        preferred: "nearStar-0.1-2",
    },
    t2_astroid: {
        chance: 0.05,
        minDistance: 8000,
        maxDistance: 0,
        preferred: "deepSpace-1000",
    },
    t3_astroid: {
        chance: 0.05,
        minDistance: 15000,
        maxDistance: 0,
        preferred: "deepSpace-4000",
    },
    rogue_planet: {
        chance: 0.01,
        minDistance: 5,
        maxDistance: 0,
        preferred: "nearStar-2-15",
    },
    anomaly: {
        chance: 0.01,
        minDistance: 1000,
        maxDistance: 0,
        preferred: "deepSpace-2000",
    },
    blackHole: {
        chance: 0.001,
        minDistance: 50000,
        maxDistance: 0,
        preferred: "deepSpace-10000",
    },
    gasGiant: {
        chance: 0.2,
        minDistance: 0,
        maxDistance: 0,
        preferred: "sun_Orbit",
    }
}

module.exports = {
    seed,
    radius,
    count,
    stellarPlanetCount,
    stellarAstroidCount,
    exponent,
    mainBlackHoleName,
    types
}