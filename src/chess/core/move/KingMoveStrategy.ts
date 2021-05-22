import { ChessBoard, LocalizedPiece } from '../ChessBoard';
import { ChessSquare } from '../ChessSquare';
import ChessColor from '../ChessColor';
import { ChessPieceType } from '../ChessPieceType';
import MoveStrategyHelper from './MoveStrategyHelper';

export default class QueenMoveStrategy {
    getValidMoves(from: ChessSquare, board: ChessBoard): ChessSquare[] {
        const limit = 1;
        const up = MoveStrategyHelper.getMovesInDirection(from, board, (sq) => sq.up, limit);
        const down = MoveStrategyHelper.getMovesInDirection(from, board, (sq) => sq.down, limit);
        const left = MoveStrategyHelper.getMovesInDirection(from, board, (sq) => sq.left, limit);
        const right = MoveStrategyHelper.getMovesInDirection(from, board, (sq) => sq.right, limit);

        const topLeft = MoveStrategyHelper.getMovesInDirection(from, board, (sq) => sq.up?.left, limit);
        const topRight = MoveStrategyHelper.getMovesInDirection(from, board, (sq) => sq.up?.right, limit);
        const bottomLeft = MoveStrategyHelper.getMovesInDirection(from, board, (sq) => sq.down?.left, limit);
        const bottomRight = MoveStrategyHelper.getMovesInDirection(from, board, (sq) => sq.down?.right, limit);

        return [
            ...up, ...down, ...left, ...right,
            ...topLeft, ...topRight, ...bottomLeft, ...bottomRight,
        ];
    }
}
