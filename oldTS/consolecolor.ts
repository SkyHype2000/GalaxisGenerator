export const Yellow = "\x1b[33m"
export const Red = "\x1b[31m"
export const Green = "\x1b[32m"
export const Blue = "\x1b[34m"
export const Magenta = "\x1b[35m"
export const Cyan = "\x1b[36m"
export const White = "\x1b[37m"
export const Gray = "\x1b[90m"
export const Black = "\x1b[30m"
export const BgBlack = "\x1b[40m"
export const BgRed = "\x1b[41m"
export const BgGreen = "\x1b[42m"
export const BgYellow = "\x1b[43m"
export const BgBlue = "\x1b[44m"
export const BgMagenta = "\x1b[45m"
export const BgCyan = "\x1b[46m"
export const BgWhite = "\x1b[47m"
export const BgGray = "\x1b[100m"
export const Reset = "\x1b[0m"

export function yellow(text:string):string { return `${Yellow}${text}${Reset}`; }
export function red(text:string):string { return `${Red}${text}${Reset}`; }
export function green(text:string):string { return `${Green}${text}${Reset}`; }
export function blue(text:string):string { return `${Blue}${text}${Reset}`; }
export function magenta(text:string):string { return `${Magenta}${text}${Reset}`; }
export function cyan(text:string):string { return `${Cyan}${text}${Reset}`; }
export function white(text:string):string { return `${White}${text}${Reset}`; }
export function gray(text:string):string { return `${Gray}${text}${Reset}`; }
export function black(text:string):string { return `${Black}${text}${Reset}`; }

export function bgBlack(text:string):string { return `${BgBlack}${text}${Reset}`; }
export function bgRed(text:string):string { return `${BgRed}${text}${Reset}`; }
export function bgGreen(text:string):string { return `${BgGreen}${text}${Reset}`; }
export function bgYellow(text:string):string { return `${BgYellow}${text}${Reset}`; }
export function bgBlue(text:string):string { return `${BgBlue}${text}${Reset}`; }
export function bgMagenta(text:string):string { return `${BgMagenta}${text}${Reset}`; }
export function bgCyan(text:string):string { return `${BgCyan}${text}${Reset}`; }
export function bgWhite(text:string):string { return `${BgWhite}${text}${Reset}`; }
export function bgGray(text:string):string { return `${BgGray}${text}${Reset}`; }

export function string(text:string):string {return `${Green}'${text}'${Reset}`}
export function number(text:string):string {return `${Yellow}${text}${Reset}`}
export function bool(text:string):string {return `${Cyan}${text}${Reset}`}