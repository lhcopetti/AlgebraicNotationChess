import { ChessBoard, LocalizedPiece } from '../ChessBoard';
import { ChessSquare } from '../ChessSquare';
import ChessColor from '../ChessColor';
import { ChessPieceType } from '../ChessPieceType';
import Objects from '../../../object/Objects';

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
            from.right?.right?.down,
        ];

        return knightSquares.filter(Objects.nonNull);
    }
}
