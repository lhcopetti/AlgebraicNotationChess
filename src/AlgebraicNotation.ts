
import ChessPiece from './chess/core/ChessPiece';
import ChessPieceType from './chess/core/ChessPieceType';
import { ChessBoard } from './chess/core/ChessBoard'
import { ChessSquare } from './chess/core/ChessSquare'
import ChessColor from '../src/chess/core/ChessColor';
import KnightMoveStrategy from '../src/chess/core/move/KnightMoveStrategy';

export default class AlgebraicNotation {

    convertToChessSquare(command: string, board: ChessBoard, turn: ChessColor): [ ChessSquare, ChessSquare ] {
        const converted = this.convert(command, board, turn);

        const origin = ChessSquare.fromString(converted.slice(0, 2))!;
        const destination = ChessSquare.fromString(converted.slice(2))!;

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

        const knightMove = this.isKnightMove(command, board, turn);
        if (knightMove != null)
            return knightMove;

        throw new Error("Could not convert move: " + command);
    }


    isPawnMove(command: string, board: ChessBoard, turn: ChessColor): string | null {

        if (command.length != 2)
            return null;

        const square = ChessSquare.fromString(command)!;
        const destination = square.toString();

        console.log("The square: " + square);

        const moveBack = (square: ChessSquare) => turn == ChessColor.WHITE ? square.down! : square.up!;
        var origin = moveBack(square);

        if (null == board.getAtSquare(origin))
            origin = moveBack(origin);

        return origin + destination;
    }

    isKnightMove(command: string, board: ChessBoard, turn: ChessColor): string | undefined {
        if (command[0] != "N")
            return undefined;

        const destination = command.substring(1);
        const piece = new ChessPiece(ChessPieceType.KNIGHT, turn);

        const originSquareCandidates = board.getPieces(piece);
        const moveStrategy = new KnightMoveStrategy();

        const origin = originSquareCandidates.find(p => moveStrategy
                                                            .getValidMoves(p, board)
                                                            .map(sq => sq.toString())
                                                            .includes(destination)
                                                    )?.toString();

        return origin?.concat(destination);
    }
}
