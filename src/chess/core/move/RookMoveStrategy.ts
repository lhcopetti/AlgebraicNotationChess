import { ChessBoard, LocalizedPiece } from '../ChessBoard';
import { ChessSquare } from '../ChessSquare';
import ChessColor from '../ChessColor';
import MoveStrategyHelper from './MoveStrategyHelper';

export default class RookMoveStrategy {
    getValidMoves(from: ChessSquare, board: ChessBoard): ChessSquare[] {
        const up = MoveStrategyHelper.getMovesInDirection(from, board, (sq) => sq.up);
        const down = MoveStrategyHelper.getMovesInDirection(from, board, (sq) => sq.down);
        const left = MoveStrategyHelper.getMovesInDirection(from, board, (sq) => sq.left);
        const right = MoveStrategyHelper.getMovesInDirection(from, board, (sq) => sq.right);

        return [...up, ...down, ...left, ...right];
    }
}
