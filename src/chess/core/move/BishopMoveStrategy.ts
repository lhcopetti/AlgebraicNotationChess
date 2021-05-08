
import { ChessBoard, LocalizedPiece } from '../../../../src/chess/core/ChessBoard';
import { ChessSquare } from '../../../../src/chess/core/ChessSquare';
import ChessColor from '../../../../src/chess/core/ChessColor';
import ChessPieceType from '../../../../src/chess/core/ChessPieceType';

export default class BishopMoveStrategy {

    getValidMoves(from: ChessSquare, board: ChessBoard): ChessSquare[] {

        const topLeft = BishopMoveStrategy.getValidDiagonalMoves(from, board, (sq) => sq.up?.left);
        const topRight = BishopMoveStrategy.getValidDiagonalMoves(from, board, (sq) => sq.up?.right);
        const bottomLeft = BishopMoveStrategy.getValidDiagonalMoves(from, board, (sq) => sq.down?.left);
        const bottomRight = BishopMoveStrategy.getValidDiagonalMoves(from, board, (sq) => sq.down?.right);

        return [...topLeft, ...topRight, ...bottomLeft, ...bottomRight];
    }

    private static getValidDiagonalMoves(from: ChessSquare, board: ChessBoard, direction: (square: ChessSquare) => ChessSquare | null | undefined): ChessSquare[] {
        let currentSquare = direction(from);
        const validMoves = [];

        while(null != currentSquare && null == board.getAtSquare(currentSquare)) {
            validMoves.push(currentSquare);
            currentSquare = direction(currentSquare);
        }

        return validMoves;
    }
}

