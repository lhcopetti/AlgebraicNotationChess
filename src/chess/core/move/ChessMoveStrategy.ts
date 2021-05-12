
import { ChessBoard } from '../../../../src/chess/core/ChessBoard';
import { ChessSquare } from '../../../../src/chess/core/ChessSquare';

export interface ChessMoveStrategy {

    getValidMoves(from: ChessSquare, board: ChessBoard): ChessSquare[];

}
