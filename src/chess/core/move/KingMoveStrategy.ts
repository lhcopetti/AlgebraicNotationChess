
import { ChessBoard, LocalizedPiece } from '../../../../src/chess/core/ChessBoard';
import { ChessSquare } from '../../../../src/chess/core/ChessSquare';
import ChessColor from '../../../../src/chess/core/ChessColor';
import ChessPieceType from '../../../../src/chess/core/ChessPieceType';
import MoveStrategyHelper from '../../../../src/chess/core/move/MoveStrategyHelper';

export default class QueenMoveStrategy {

    getValidMoves(from: ChessSquare, board: ChessBoard): ChessSquare[] {

        const limit = 1;
        const up = MoveStrategyHelper.getMovesInDirection(from, board, sq => sq.up, limit);
        const down = MoveStrategyHelper.getMovesInDirection(from, board, sq => sq.down, limit);
        const left = MoveStrategyHelper.getMovesInDirection(from, board, sq => sq.left, limit);
        const right = MoveStrategyHelper.getMovesInDirection(from, board, sq => sq.right, limit);

        const topLeft = MoveStrategyHelper.getMovesInDirection(from, board, (sq) => sq.up?.left, limit);
        const topRight = MoveStrategyHelper.getMovesInDirection(from, board, (sq) => sq.up?.right, limit);
        const bottomLeft = MoveStrategyHelper.getMovesInDirection(from, board, (sq) => sq.down?.left, limit);
        const bottomRight = MoveStrategyHelper.getMovesInDirection(from, board, (sq) => sq.down?.right, limit);

        return [
            ...up, ...down, ...left, ...right,
            ...topLeft, ...topRight, ...bottomLeft, ...bottomRight
        ];
    }
}



