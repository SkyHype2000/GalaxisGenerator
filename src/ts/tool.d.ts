/**
 * 2D Vector
 */
export declare class Vector2 {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    /**Adds a Vector2 to the Main Vector2 */
    add(other: Vector2): Vector2;
    /**Negates the Vector2 */
    negate(): Vector2;
    /**Subtracts a Vector2 value from the Main Vector2 */
    subtract(other: Vector2): Vector2;
    /**Returns a String */
    toString(small?: true | false): string;
    /**Returns a JSON */
    toJSON(): {
        x: number;
        y: number;
    };
    /**Get The Distance Between the Main Vector and another Vector */
    getDistance(other: Vector2): number;
    /**Number of digits after the decimal point */
    toFixed(fractionDigits?: number): Vector2;
    round(): Vector2;
    floor(): Vector2;
    /**
     * Compares 2 Vectors and tell you what Position is smaller, same or bigger
     * `false`: smaller
     * `null`: same
     * `true`: larger
     */
    comparePosition(other: Vector2): false | null | true;
}
/**
 * Returns a name based on the type of planet.
 *
 * It's very interesting that it's generated based on syllables; I didn't even know that was possible before.
 * Thanks, ChatGPT XD.
 *
 * But seriously, it's really interesting that something like this works.
 *
 * @param {res.CelestialObjectTypes} type The Type of the Object
 * @returns {string}
 */
export declare function generateName(): string;
