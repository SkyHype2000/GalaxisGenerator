"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector2 = void 0;
/**
 * 2D Vector
 */
class Vector2 {
    x;
    y;
    constructor(x = 0, y = 0) { this.x = x; this.y = y; }
    /**Adds a Vector2 to the Main Vector2 */
    add(other) {
        return new Vector2(this.x + other.x, this.y + other.y);
    }
    /**Negates the Vector2 */
    negate() {
        return new Vector2(-this.x, -this.y);
    }
    /**Subtracts a Vector2 value from the Main Vector2 */
    subtract(other) {
        return new Vector2(this.x - other.x, this.y - other.y);
    }
    /**Returns a String */
    toString(small) {
        if (!small || small == undefined)
            return `Vector2(${this.x}, ${this.y})`;
        return `${this.x}_${this.y}`;
    }
    /**Returns a JSON */
    toJSON() { return { x: this.x, y: this.y }; }
    /**Get The Distance Between the Main Vector and another Vector */
    getDistance(other) {
        const x = other.x - this.x;
        const y = other.y - this.y;
        return Math.hypot(x, y);
    }
}
exports.Vector2 = Vector2;
