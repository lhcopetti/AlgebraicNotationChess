
import ChessPiece from './chess/core/ChessPiece';
import ChessPieceType from './chess/core/ChessPieceType';
import { ChessBoard } from './chess/core/ChessBoard'
import { ChessSquare } from './chess/core/ChessSquare'
import ChessColor from '../src/chess/core/ChessColor';
import KnightMoveStrategy from '../src/chess/core/move/KnightMoveStrategy';
import TwoSquaresChessMove from '../src/chess/notation/TwoSquaresChessMove';

export default class AlgebraicNotation {

    convert(command: string, board: ChessBoard, turn: ChessColor): TwoSquaresChessMove {

        console.log("Converting algebraic notation: " + command + " into a two step square move");

        const move = this.doConvert(command, board, turn);

        console.log("Command [" + command + "] converted to [" + move + "]");
        return new TwoSquaresChessMove(move.origin, move.destination);
    }

    doConvert(command: string, board: ChessBoard, turn: ChessColor): TwoSquaresChessMove {

        const pawnMove = this.isPawnMove(command, board, turn);

        if (pawnMove != null)
            return pawnMove;

        const knightMove = this.isKnightMove(command, board, turn);
        if (knightMove != null)
            return knightMove;

        throw new Error("Could not convert move: " + command);
    }


    isPawnMove(command: string, board: ChessBoard, turn: ChessColor): TwoSquaresChessMove | null {

        if (command.length != 2)
            return null;

        const destination = ChessSquare.fromString(command)!;

        const moveBack = (square: ChessSquare) => turn == ChessColor.WHITE ? square.down! : square.up!;
        var origin = moveBack(destination);

        if (null == board.getAtSquare(origin))
            origin = moveBack(origin);

        return new TwoSquaresChessMove(origin, destination);
    }

    isKnightMove(command: string, board: ChessBoard, turn: ChessColor): TwoSquaresChessMove | undefined {

        if (command[0] != "N")
            return undefined;

        const destination = command.substring(1);
        const piece = new ChessPiece(ChessPieceType.KNIGHT, turn);

        const originSquareCandidates = board.getPieces(piece);
        const moveStrategy = new KnightMoveStrategy();

        const origin = originSquareCandidates.find(p => moveStrategy
                                                            .getValidMoves(p, board)
                                                            .map(sq => sq.toString())
                                                            .includes(destination));

        if (null == origin)
            return undefined;

        const destSquare = ChessSquare.fromString(destination)!;
        return new TwoSquaresChessMove(origin, destSquare);
    }
}
