import ChessPiece from './chess/core/ChessPiece';
import { ChessPieceType, pieceFromString } from './chess/core/ChessPieceType';
import { ChessBoard } from './chess/core/ChessBoard';
import { ChessSquare } from './chess/core/ChessSquare';
import ChessColor from './chess/core/ChessColor';
import CommandParser from './chess/notation/CommandParser';
import ParseResult from './chess/notation/ParseResult';

import { ChessMoveStrategy } from './chess/core/move/ChessMoveStrategy';
import PawnMoveStrategy from './chess/core/move/PawnMoveStrategy';
import RookMoveStrategy from './chess/core/move/RookMoveStrategy';
import KnightMoveStrategy from './chess/core/move/KnightMoveStrategy';
import BishopMoveStrategy from './chess/core/move/BishopMoveStrategy';
import QueenMoveStrategy from './chess/core/move/QueenMoveStrategy';
import KingMoveStrategy from './chess/core/move/KingMoveStrategy';
import MoveResult from './chess/notation/MoveResult';

export default class AlgebraicNotation {
    convert(command: string, board: ChessBoard, turn: ChessColor): MoveResult {
        console.log(`Converting algebraic notation: ${command} into a two step square move`);

        const cleanCommand = command.replace(/[+#]/, '');

        const move = this.doConvert(cleanCommand, board, turn);

        console.log(`Command [${cleanCommand}] converted to [${move}]`);
        return move;
    }

    doConvert(command: string, board: ChessBoard, turn: ChessColor): MoveResult {
        const parseResult = new CommandParser().parse(command, turn);

        const destination = ChessSquare.fromString(parseResult.destination)!;
        const origin = this.computeOrigin(parseResult, board, turn);

        if (origin == null) {
            console.log('The current board is: ');
            console.log(board.toString());
            throw new Error(`Could not convert: ${command} successfully`);
        }

        return new MoveResult(origin, destination, parseResult.promotion, parseResult.isCapture);
    }

    private computeOrigin(parsed: ParseResult, board: ChessBoard, turn: ChessColor): ChessSquare | undefined {
        if (parsed.origin != null) return ChessSquare.fromString(parsed.origin)!;

        return this.computeValidOrigin(parsed, board, turn);
    }

    private computeValidOrigin(parsed: ParseResult, board: ChessBoard, turn: ChessColor): ChessSquare | undefined {
        const moveStrategy = this.getMoveStrategy(parsed.piece);

        const targetPiece = new ChessPiece(parsed.piece, turn);
        const allPieceSquares = board.getPieces(targetPiece);

        const candidates = allPieceSquares
                            .filter(p => this.canMoveToSquare(p, board, parsed))
                            .filter(p => this.checkDisambiguation(p, board, parsed));

        if (candidates.length == 0) {
            return undefined;
        }

        if (candidates.length > 1) {
            throw new Error("More than one piece may make this move");
        }

        return candidates[0];
    }

    private canMoveToSquare(sq: ChessSquare, board: ChessBoard, parseResult: ParseResult): boolean {

        const piece = board.getAtSquare(sq)!;
        const move = this.getMoveStrategy(piece.piece)

        return move.getValidMoves(sq, board)
                    .map((sq) => sq.toString())
                    .includes(parseResult.destination)
    }

    private checkDisambiguation(sq: ChessSquare, board: ChessBoard, parseResult: ParseResult): boolean {

        if (parseResult.disambiguatingFile && sq.file != parseResult.disambiguatingFile)
            return false;

        add parse rank

        return true;
    }

    getMoveStrategy(piece: ChessPieceType): ChessMoveStrategy {
        const moves = new Map<number, ChessMoveStrategy>([
            [ChessPieceType.PAWN, new PawnMoveStrategy()],
            [ChessPieceType.ROOK, new RookMoveStrategy()],
            [ChessPieceType.KNIGHT, new KnightMoveStrategy()],
            [ChessPieceType.BISHOP, new BishopMoveStrategy()],
            [ChessPieceType.QUEEN, new QueenMoveStrategy()],
            [ChessPieceType.KING, new KingMoveStrategy()],
        ]);

        const move = moves.get(piece);

        if (move == null) throw new Error(`Could not find move strategy for piece: ${piece}`);

        return move;
    }
}
