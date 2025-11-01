import {Decimal} from 'decimal.js'
import * as config from './config'

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

    /**Number of digits after the decimal point */
    toFixed(fractionDigits:number = 0):Vector2 {
        const x = new Decimal(this.x).toDecimalPlaces(fractionDigits).toNumber();
        const y = new Decimal(this.y).toDecimalPlaces(fractionDigits).toNumber();
        return new Vector2(x, y)
    }

    round():Vector2 {
        return new Vector2(Math.round(this.x), Math.round(this.y))
    }

    floor():Vector2 {
        return new Vector2(Math.floor(this.x), Math.floor(this.y))
    }

    /**
     * Compares 2 Vectors and tell you what Position is smaller, same or bigger
     * `false`: smaller
     * `null`: same
     * `true`: larger
     */
    comparePosition(other: Vector2):false|null|true {
        if (this.x < other.x || (this.x === other.x && this.y < other.y)) {
            return false;
        }
        if (this.x > other.x || (this.x === other.x && this.y > other.y)) {
            return true;
        }
        return null;
    }
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
export function generateName(): string {
    /**Silben von ChatGPT für die Namensgenerierung */
    const syllables: string[] = [
        // Silben V1
        "ka", "lo", "ra", "ze", "tu", "mi", "xa", "vi", "no",
        "shi", "dra", "qu", "ly", "tor", "zan", "ny", "fel", "vra",
        "zur", "kre", "tho", "bal", "ix", "sy", "jen", "kul", "orn",
        "nef", "ria", "sol", "mek", "tas", "lur", "xen", "cai", "vor",
        "hel", "ume", "zan", "tha", "py", "rek", "gri", "yul", "zan",
        "eph", "ari", "zho", "the", "mur", "dax", "nix", "zor", "lim",

        // Silben V2
        "bri", "clo", "dre", "fen", "gla", "hro", "jor", "kli", "mar",
        "nel", "oph", "pra", "qua", "rin", "sha", "tre", "uln", "vex",
        "wra", "xis", "yra", "zor", "bex", "dru", "fla", "gra", "hul",
        "jum", "kor", "lek", "mip", "nox", "opl", "pru", "qui", "rax",
        "syl", "tri", "uvo", "vyn", "wex", "xil", "yan", "zep", "zor",
        "bax", "cro", "dav", "elx", "fra", "gyn", "hax", "jin", "kre",
        "lom", "myr", "nov", "oph", "plu", "qir", "rum", "syn", "tor",
        "urn", "vok", "wir", "xon", "yar", "zun"
    ];

    let name = "";
    const length = 2 + Math.floor(config.rng() * 2);
    for (let i = 0; i < length; i++) {
        name += syllables[Math.floor(config.rng() * syllables.length)];
    }
    return name.charAt(0).toUpperCase() + name.slice(1);
}