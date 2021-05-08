
import { ChessBoard, LocalizedPiece } from '../../../../src/chess/core/ChessBoard';
import { ChessSquare } from '../../../../src/chess/core/ChessSquare';
import ChessColor from '../../../../src/chess/core/ChessColor';
import ChessPieceType from '../../../../src/chess/core/ChessPieceType';

export default class MoveStrategyHelper {

    public static getMovesInDirection(
        from: ChessSquare, 
        board: ChessBoard, 
        direction: (square: ChessSquare) => ChessSquare | null | undefined
    ) : ChessSquare[] {


        let currentSquare = direction(from);
        const validMoves = [];

        while(null != currentSquare && null == board.getAtSquare(currentSquare)) {
            validMoves.push(currentSquare);
            currentSquare = direction(currentSquare);
        }

        return validMoves;
    }
}

