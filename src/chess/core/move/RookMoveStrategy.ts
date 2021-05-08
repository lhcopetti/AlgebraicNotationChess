
import { ChessBoard, LocalizedPiece } from '../../../../src/chess/core/ChessBoard';
import { ChessSquare } from '../../../../src/chess/core/ChessSquare';
import ChessColor from '../../../../src/chess/core/ChessColor';
import ChessPieceType from '../../../../src/chess/core/ChessPieceType';

export default class RookMoveStrategy {

    getValidMoves(from: ChessSquare, board: ChessBoard): ChessSquare[] {

        const up = RookMoveStrategy.getValidMoves(from, board, (sq) => sq.up);
        const down = RookMoveStrategy.getValidMoves(from, board, (sq) => sq.down);
        const left = RookMoveStrategy.getValidMoves(from, board, (sq) => sq.left);
        const right = RookMoveStrategy.getValidMoves(from, board, (sq) => sq.right);

        return [...up, ...down, ...left, ...right];
    }

    private static getValidMoves(from: ChessSquare, board: ChessBoard, direction: (square: ChessSquare) => ChessSquare | null | undefined): ChessSquare[] {
        let currentSquare = direction(from);
        const validMoves = [];

        while(null != currentSquare && null == board.getAtSquare(currentSquare)) {
            validMoves.push(currentSquare);
            currentSquare = direction(currentSquare);
        }

        return validMoves;
    }
}


