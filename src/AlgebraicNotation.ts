

export default class AlgebraicNotation {

    files: string[];

    constructor() {
        this.files = [ "a", "b", "c", "d", "e", "f", "g", "h" ];
    }

    convert(command: string): string {

        console.log("Converting algebraic notation: " + command + " to a Lichess API move");
        const result = this.doConvert(command);
        console.log("Command [" + command + "] converted to [" + result + "]");

        return result;
    }

    doConvert(command: string): string {
        return "e2e4";
    }
}
