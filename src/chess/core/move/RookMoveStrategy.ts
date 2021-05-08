
import { ChessBoard, LocalizedPiece } from '../../../../src/chess/core/ChessBoard';
import { ChessSquare } from '../../../../src/chess/core/ChessSquare';
import ChessColor from '../../../../src/chess/core/ChessColor';
import ChessPieceType from '../../../../src/chess/core/ChessPieceType';
import MoveStrategyHelper from '../../../../src/chess/core/move/MoveStrategyHelper';

export default class RookMoveStrategy {

    getValidMoves(from: ChessSquare, board: ChessBoard): ChessSquare[] {

        const up = MoveStrategyHelper.getMovesInDirection(from, board, sq => sq.up);
        const down = MoveStrategyHelper.getMovesInDirection(from, board, sq => sq.down);
        const left = MoveStrategyHelper.getMovesInDirection(from, board, sq => sq.left);
        const right = MoveStrategyHelper.getMovesInDirection(from, board, sq => sq.right);

        return [...up, ...down, ...left, ...right];
    }
}


