
import { ChessBoard, LocalizedPiece } from '../../../../src/chess/core/ChessBoard';
import { ChessSquare } from '../../../../src/chess/core/ChessSquare';
import ChessColor from '../../../../src/chess/core/ChessColor';
import ChessPieceType from '../../../../src/chess/core/ChessPieceType';

export default class KnightMoveStrategy {

    getValidMoves(from: ChessSquare, board: ChessBoard): ChessSquare[] {

        const knightSquares = [
            from.up?.up?.left,
            from.up?.up?.right,

            from.left?.left?.up,
            from.left?.left?.down,

            from.down?.down?.left,
            from.down?.down?.right,

            from.right?.right?.up,
            from.right?.right?.down
        ];

        return knightSquares.filter(KnightMoveStrategy.nonNull);
    }

    private static nonNull(piece: ChessSquare | null | undefined): piece is ChessSquare {
        return piece != null;
    }
}

