
import { ChessBoard } from './chess/core/ChessBoard'
import { ChessSquare } from './chess/core/ChessSquare'

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

        const pawnMove = this.isPawnMove(command, board);

        if (pawnMove != null)
            return pawnMove;

        return "e2e4";
    }


    isPawnMove(command: string, board: ChessBoard): string | null {

        if (command.length != 2)
            return null;

        const square = ChessSquare.fromString(command);
        const destination = square.toString();

        var origin = square.down;

        if (null == board.getAtSquare(origin))
            origin = origin.down;

        return origin + destination;
    }
}
