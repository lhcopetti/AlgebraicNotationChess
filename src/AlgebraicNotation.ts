
import { ChessBoard } from './chess/core/ChessBoard'

export default class AlgebraicNotation {

    files: string[];

    constructor() {
        this.files = [ "a", "b", "c", "d", "e", "f", "g", "h" ];
    }

    convert(command: string, board: ChessBoard): string {

        console.log("Converting algebraic notation: " + command + " to a Lichess API move");
        const result = this.doConvert(command, board);
        console.log("Command [" + command + "] converted to [" + result + "]");

        return result;
    }

    doConvert(command: string, board: ChessBoard): string {

        const pawnMove = this.isPawnMove(command);

        if (pawnMove != null)
            return pawnMove;

        return "e2e4";
    }


    isPawnMove(command: string): string | null {

        if (command.length != 2)
            return null;

        const file = command[0];
        const rank = command[1];

        console.log("File: " + file + " rank: " + rank);

        if (!this.files.includes(file))
            return null;

        return file + '2' + file + rank;
    }
}
