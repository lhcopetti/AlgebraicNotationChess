import { ChessBoard, LocalizedPiece } from '../ChessBoard';
import { ChessSquare, initialRankForWhite, initialRankForBlack } from '../ChessSquare';
import ChessColor from '../ChessColor';
import MoveStrategyHelper from './MoveStrategyHelper';
import { ChessMoveStrategy } from './ChessMoveStrategy';

export default class PawnMoveStrategy implements ChessMoveStrategy {
    getValidMoves(from: ChessSquare, board: ChessBoard): ChessSquare[] {
        const { color } = board.getAtSquare(from)!;

        const direction = color
            == ChessColor.WHITE
            ? (sq: ChessSquare) => sq.up
            : (sq: ChessSquare) => sq.down;

        return PawnMoveStrategy.getMoves(from, board, direction);
    }

    private static getMoves(from: ChessSquare,
        board: ChessBoard,
        direction: (sq: ChessSquare) => ChessSquare | null | undefined) {
        const moves = [];
        const oneForward = direction(from);

        if (oneForward != null && board.getAtSquare(oneForward) == null) {
            moves.push(oneForward);

            const { rank } = from;
            const twoForward = direction(oneForward);
            if (twoForward != null && PawnMoveStrategy.isInitialRank(from, board) && board.getAtSquare(twoForward) == null) {
                moves.push(twoForward);
            }
        }

        return moves;
    }

    private static isInitialRank(from: ChessSquare, board: ChessBoard) : boolean {
        const sq = board.getAtSquare(from)!;
        const initialRank = sq.color == ChessColor.WHITE ? initialRankForWhite : initialRankForBlack;
        return initialRank == Number(from.rank);
    }
}
