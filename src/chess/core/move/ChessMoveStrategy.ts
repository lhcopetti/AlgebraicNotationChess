import { ChessBoard } from '../ChessBoard';
import { ChessSquare } from '../ChessSquare';

export interface ChessMoveStrategy {

    getValidMoves(from: ChessSquare, board: ChessBoard): ChessSquare[];

}
