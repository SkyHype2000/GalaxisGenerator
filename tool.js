"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector2 = void 0;
exports.generateName = generateName;
const decimal_js_1 = require("decimal.js");
const config = __importStar(require("./config"));
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
    /**Number of digits after the decimal point */
    toFixed(fractionDigits = 0) {
        const x = new decimal_js_1.Decimal(this.x).toDecimalPlaces(fractionDigits).toNumber();
        const y = new decimal_js_1.Decimal(this.y).toDecimalPlaces(fractionDigits).toNumber();
        return new Vector2(x, y);
    }
    /**
     * Compares 2 Vectors and tell you what Position is smaller, same or bigger
     * `false`: smaller
     * `null`: same
     * `true`: larger
     */
    comparePosition(other) {
        if (this.x < other.x || (this.x === other.x && this.y < other.y)) {
            return false;
        }
        if (this.x > other.x || (this.x === other.x && this.y > other.y)) {
            return true;
        }
        return null;
    }
}
exports.Vector2 = Vector2;
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
function generateName() {
    /**Silben von ChatGPT für die Namensgenerierung */
    const syllables = [
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
