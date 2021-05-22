import { ChessBoard, LocalizedPiece } from '../ChessBoard';
import { ChessSquare } from '../ChessSquare';
import ChessColor from '../ChessColor';
import { ChessPieceType } from '../ChessPieceType';

export default class MoveStrategyHelper {
    public static getMovesInDirection(
        from: ChessSquare,
        board: ChessBoard,
        direction: (square: ChessSquare) => ChessSquare | null | undefined,
        limit: number = Number.MAX_SAFE_INTEGER,

    ) : ChessSquare[] {
        let currentSquare = direction(from);
        const validMoves = [];

        let limitCounter = 0;

        const originPiece = board.getAtSquare(from);

        while (currentSquare != null) {
            const piece = board.getAtSquare(currentSquare);

            if (piece != null) {
                if (piece.color != originPiece?.color) validMoves.push(currentSquare);

                break;
            }

            validMoves.push(currentSquare);
            currentSquare = direction(currentSquare);
            limitCounter++;

            if (limitCounter >= limit) break;
        }

        return validMoves;
    }
}
