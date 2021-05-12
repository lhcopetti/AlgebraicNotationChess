
import { ChessBoard } from '../../../../src/chess/core/ChessBoard';
import { ChessSquare } from '../../../../src/chess/core/ChessSquare';

interface ChessMoveStrategy {

    canMoveTo(from: ChessSquare, board: ChessBoard): boolean;

}
