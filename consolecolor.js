"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reset = exports.BgGray = exports.BgWhite = exports.BgCyan = exports.BgMagenta = exports.BgBlue = exports.BgYellow = exports.BgGreen = exports.BgRed = exports.BgBlack = exports.Black = exports.Gray = exports.White = exports.Cyan = exports.Magenta = exports.Blue = exports.Green = exports.Red = exports.Yellow = void 0;
exports.yellow = yellow;
exports.red = red;
exports.green = green;
exports.blue = blue;
exports.magenta = magenta;
exports.cyan = cyan;
exports.white = white;
exports.gray = gray;
exports.black = black;
exports.bgBlack = bgBlack;
exports.bgRed = bgRed;
exports.bgGreen = bgGreen;
exports.bgYellow = bgYellow;
exports.bgBlue = bgBlue;
exports.bgMagenta = bgMagenta;
exports.bgCyan = bgCyan;
exports.bgWhite = bgWhite;
exports.bgGray = bgGray;
exports.string = string;
exports.number = number;
exports.bool = bool;
exports.Yellow = "\x1b[33m";
exports.Red = "\x1b[31m";
exports.Green = "\x1b[32m";
exports.Blue = "\x1b[34m";
exports.Magenta = "\x1b[35m";
exports.Cyan = "\x1b[36m";
exports.White = "\x1b[37m";
exports.Gray = "\x1b[90m";
exports.Black = "\x1b[30m";
exports.BgBlack = "\x1b[40m";
exports.BgRed = "\x1b[41m";
exports.BgGreen = "\x1b[42m";
exports.BgYellow = "\x1b[43m";
exports.BgBlue = "\x1b[44m";
exports.BgMagenta = "\x1b[45m";
exports.BgCyan = "\x1b[46m";
exports.BgWhite = "\x1b[47m";
exports.BgGray = "\x1b[100m";
exports.Reset = "\x1b[0m";
function yellow(text) { return `${exports.Yellow}${text}${exports.Reset}`; }
function red(text) { return `${exports.Red}${text}${exports.Reset}`; }
function green(text) { return `${exports.Green}${text}${exports.Reset}`; }
function blue(text) { return `${exports.Blue}${text}${exports.Reset}`; }
function magenta(text) { return `${exports.Magenta}${text}${exports.Reset}`; }
function cyan(text) { return `${exports.Cyan}${text}${exports.Reset}`; }
function white(text) { return `${exports.White}${text}${exports.Reset}`; }
function gray(text) { return `${exports.Gray}${text}${exports.Reset}`; }
function black(text) { return `${exports.Black}${text}${exports.Reset}`; }
function bgBlack(text) { return `${exports.BgBlack}${text}${exports.Reset}`; }
function bgRed(text) { return `${exports.BgRed}${text}${exports.Reset}`; }
function bgGreen(text) { return `${exports.BgGreen}${text}${exports.Reset}`; }
function bgYellow(text) { return `${exports.BgYellow}${text}${exports.Reset}`; }
function bgBlue(text) { return `${exports.BgBlue}${text}${exports.Reset}`; }
function bgMagenta(text) { return `${exports.BgMagenta}${text}${exports.Reset}`; }
function bgCyan(text) { return `${exports.BgCyan}${text}${exports.Reset}`; }
function bgWhite(text) { return `${exports.BgWhite}${text}${exports.Reset}`; }
function bgGray(text) { return `${exports.BgGray}${text}${exports.Reset}`; }
function string(text) { return `${exports.Green}'${text}'${exports.Reset}`; }
function number(text) { return `${exports.Yellow}${text}${exports.Reset}`; }
function bool(text) { return `${exports.Cyan}${text}${exports.Reset}`; }
