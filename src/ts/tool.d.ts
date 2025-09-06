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
}
