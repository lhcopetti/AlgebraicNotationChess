
import { ChessBoard, LocalizedPiece } from '../../../../src/chess/core/ChessBoard';
import { ChessSquare } from '../../../../src/chess/core/ChessSquare';
import ChessColor from '../../../../src/chess/core/ChessColor';
import { ChessPieceType } from '../../../../src/chess/core/ChessPieceType';

export default class MoveStrategyHelper {

    public static getMovesInDirection(
        from: ChessSquare, 
        board: ChessBoard, 
        direction: (square: ChessSquare) => ChessSquare | null | undefined,
        limit: number = Number.MAX_SAFE_INTEGER

    ) : ChessSquare[] {

        let currentSquare = direction(from);
        const validMoves = [];

        let limitCounter = 0;

        const originPiece = board.getAtSquare(from);

        while(null != currentSquare) {

            const piece = board.getAtSquare(currentSquare);

            if (null != piece) {
                if (piece.color != originPiece?.color)
                    validMoves.push(currentSquare);

                break;
            }

            validMoves.push(currentSquare);
            currentSquare = direction(currentSquare);
            limitCounter++;

            if (limitCounter >= limit)
                break;
        }

        return validMoves;
    }
}

