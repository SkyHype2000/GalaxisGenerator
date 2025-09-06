/**
 * 2D Vector
 */
export class Vector2 {
    x: number; y: number;
    constructor(x: number = 0, y: number = 0) { this.x = x; this.y = y; }

    /**Adds a Vector2 to the Main Vector2 */
    add(other: Vector2): Vector2 {
        return new Vector2(this.x + other.x, this.y + other.y);
    }

    /**Negates the Vector2 */
    negate(): Vector2 {
        return new Vector2(-this.x, -this.y);
    }

    /**Subtracts a Vector2 value from the Main Vector2 */
    subtract(other: Vector2): Vector2 {
        return new Vector2(this.x-other.x, this.y-other.y);
    }

    /**Returns a String */
    toString(small?: true|false): string {
        if(!small || small == undefined) return `Vector2(${this.x}, ${this.y})`;
        return `${this.x}_${this.y}`
    }

    /**Returns a JSON */
    toJSON(): { x: number, y: number } { return { x: this.x, y: this.y } }

    /**Get The Distance Between the Main Vector and another Vector */
    getDistance(other: Vector2): number {
        const x = other.x - this.x
        const y = other.y - this.y
        
        return Math.hypot(x, y)
    }
}