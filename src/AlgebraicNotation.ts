
import { ChessBoard } from './chess/core/ChessBoard'
import { ChessSquare } from './chess/core/ChessSquare'
import ChessColor from '../src/chess/core/ChessColor';

export default class AlgebraicNotation {

    convertToChessSquare(command: string, board: ChessBoard, turn: ChessColor): [ ChessSquare, ChessSquare ] {
        const converted = this.convert(command, board, turn);

        const origin = ChessSquare.fromString(converted.slice(0, 2));
        const destination = ChessSquare.fromString(converted.slice(2));

        return [ origin, destination ];
    }

    convert(command: string, board: ChessBoard, turn: ChessColor): string {

        console.log("Converting algebraic notation: " + command + " to a Lichess API move");
        const result = this.doConvert(command, board, turn);
        console.log("Command [" + command + "] converted to [" + result + "]");

        return result;
    }

    doConvert(command: string, board: ChessBoard, turn: ChessColor): string {

        const pawnMove = this.isPawnMove(command, board, turn);

        if (pawnMove != null)
            return pawnMove;

        return "e2e4";
    }


    isPawnMove(command: string, board: ChessBoard, turn: ChessColor): string | null {

        if (command.length != 2)
            return null;

        const square = ChessSquare.fromString(command);
        const destination = square.toString();

        const moveBack = (square: ChessSquare) => turn == ChessColor.WHITE ? square.down : square.up;
        var origin = moveBack(square);

        if (null == board.getAtSquare(origin))
            origin = moveBack(origin);

        return origin + destination;
    }
}
