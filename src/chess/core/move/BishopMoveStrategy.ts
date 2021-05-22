import { ChessBoard, LocalizedPiece } from '../ChessBoard';
import { ChessSquare } from '../ChessSquare';
import ChessColor from '../ChessColor';
import MoveStrategyHelper from './MoveStrategyHelper';

export default class BishopMoveStrategy {
    getValidMoves(from: ChessSquare, board: ChessBoard): ChessSquare[] {
        const topLeft = MoveStrategyHelper.getMovesInDirection(from, board, (sq) => sq.up?.left);
        const topRight = MoveStrategyHelper.getMovesInDirection(from, board, (sq) => sq.up?.right);
        const bottomLeft = MoveStrategyHelper.getMovesInDirection(from, board, (sq) => sq.down?.left);
        const bottomRight = MoveStrategyHelper.getMovesInDirection(from, board, (sq) => sq.down?.right);

        const result = [...topLeft, ...topRight, ...bottomLeft, ...bottomRight];

        return result;
    }
}
