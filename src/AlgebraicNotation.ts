
import { ChessBoard } from './chess/core/ChessBoard'
import { ChessSquare } from './chess/core/ChessSquare'

export default class AlgebraicNotation {

    convertToChessSquare(command: string, board: ChessBoard): [ ChessSquare, ChessSquare ] {
        const converted = this.convert(command, board);

        const origin = ChessSquare.fromString(converted.slice(0, 2));
        const destination = ChessSquare.fromString(converted.slice(2));

        return [ origin, destination ];
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
