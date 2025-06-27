const Yellow = "\x1b[33m"
const Red = "\x1b[31m"
const Green = "\x1b[32m"
const Blue = "\x1b[34m"
const Magenta = "\x1b[35m"
const Cyan = "\x1b[36m"
const White = "\x1b[37m"
const Gray = "\x1b[90m"
const Black = "\x1b[30m"
const BgBlack = "\x1b[40m"
const BgRed = "\x1b[41m"
const BgGreen = "\x1b[42m"
const BgYellow = "\x1b[43m"
const BgBlue = "\x1b[44m"
const BgMagenta = "\x1b[45m"
const BgCyan = "\x1b[46m"
const BgWhite = "\x1b[47m"
const BgGray = "\x1b[100m"
const Reset = "\x1b[0m"

function yellow(text) { return `${Yellow}${text}${Reset}`; }
function red(text) { return `${Red}${text}${Reset}`; }
function green(text) { return `${Green}${text}${Reset}`; }
function blue(text) { return `${Blue}${text}${Reset}`; }
function magenta(text) { return `${Magenta}${text}${Reset}`; }
function cyan(text) { return `${Cyan}${text}${Reset}`; }
function white(text) { return `${White}${text}${Reset}`; }
function gray(text) { return `${Gray}${text}${Reset}`; }
function black(text) { return `${Black}${text}${Reset}`; }

function bgBlack(text) { return `${BgBlack}${text}${Reset}`; }
function bgRed(text) { return `${BgRed}${text}${Reset}`; }
function bgGreen(text) { return `${BgGreen}${text}${Reset}`; }
function bgYellow(text) { return `${BgYellow}${text}${Reset}`; }
function bgBlue(text) { return `${BgBlue}${text}${Reset}`; }
function bgMagenta(text) { return `${BgMagenta}${text}${Reset}`; }
function bgCyan(text) { return `${BgCyan}${text}${Reset}`; }
function bgWhite(text) { return `${BgWhite}${text}${Reset}`; }
function bgGray(text) { return `${BgGray}${text}${Reset}`; }

function string(text) {return `${Green}'${text}'${Reset}`}
function number(text) {return `${Yellow}${text}${Reset}`}

module.exports = {
    yellow,
    red,
    green,
    blue,
    magenta,
    cyan,
    white,
    gray,
    black,
    bgBlack,
    bgRed,
    bgGreen,
    bgYellow,
    bgBlue,
    bgMagenta,
    bgCyan,
    bgWhite,
    bgGray,
    string,
    number
};