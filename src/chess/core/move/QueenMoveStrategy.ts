import { ChessBoard, LocalizedPiece } from '../ChessBoard';
import { ChessSquare } from '../ChessSquare';
import ChessColor from '../ChessColor';
import MoveStrategyHelper from './MoveStrategyHelper';

export default class QueenMoveStrategy {
    getValidMoves(from: ChessSquare, board: ChessBoard): ChessSquare[] {
        const up = MoveStrategyHelper.getMovesInDirection(from, board, (sq) => sq.up);
        const down = MoveStrategyHelper.getMovesInDirection(from, board, (sq) => sq.down);
        const left = MoveStrategyHelper.getMovesInDirection(from, board, (sq) => sq.left);
        const right = MoveStrategyHelper.getMovesInDirection(from, board, (sq) => sq.right);

        const topLeft = MoveStrategyHelper.getMovesInDirection(from, board, (sq) => sq.up?.left);
        const topRight = MoveStrategyHelper.getMovesInDirection(from, board, (sq) => sq.up?.right);
        const bottomLeft = MoveStrategyHelper.getMovesInDirection(from, board, (sq) => sq.down?.left);
        const bottomRight = MoveStrategyHelper.getMovesInDirection(from, board, (sq) => sq.down?.right);

        return [
            ...up, ...down, ...left, ...right,
            ...topLeft, ...topRight, ...bottomLeft, ...bottomRight,
        ];
    }
}
