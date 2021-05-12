
import { ChessBoard, LocalizedPiece } from '../../../../src/chess/core/ChessBoard';
import { ChessSquare } from '../../../../src/chess/core/ChessSquare';
import ChessColor from '../../../../src/chess/core/ChessColor';
import MoveStrategyHelper from '../../../../src/chess/core/move/MoveStrategyHelper';

export default class BishopMoveStrategy {

    getValidMoves(from: ChessSquare, board: ChessBoard): ChessSquare[] {

        const topLeft = MoveStrategyHelper.getMovesInDirection(from, board, (sq) => sq.up?.left);
        const topRight = MoveStrategyHelper.getMovesInDirection(from, board, (sq) => sq.up?.right);
        const bottomLeft = MoveStrategyHelper.getMovesInDirection(from, board, (sq) => sq.down?.left);
        const bottomRight = MoveStrategyHelper.getMovesInDirection(from, board, (sq) => sq.down?.right);

        const result = [...topLeft, ...topRight, ...bottomLeft, ...bottomRight];

        console.log(result);
        return result;
    }
}

