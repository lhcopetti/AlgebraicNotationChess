
import ChessPiece from './chess/core/ChessPiece';
import { ChessPieceType, pieceFromString } from './chess/core/ChessPieceType';
import { ChessBoard } from './chess/core/ChessBoard'
import { ChessSquare } from './chess/core/ChessSquare'
import ChessColor from '../src/chess/core/ChessColor';
import CommandParser from './chess/notation/CommandParser';
import ParseResult from './chess/notation/ParseResult';

import { ChessMoveStrategy } from '../src/chess/core/move/ChessMoveStrategy';
import PawnMoveStrategy from '../src/chess/core/move/PawnMoveStrategy';
import RookMoveStrategy from '../src/chess/core/move/RookMoveStrategy';
import KnightMoveStrategy from '../src/chess/core/move/KnightMoveStrategy';
import BishopMoveStrategy from '../src/chess/core/move/BishopMoveStrategy';
import QueenMoveStrategy from '../src/chess/core/move/QueenMoveStrategy';
import KingMoveStrategy from '../src/chess/core/move/KingMoveStrategy';
import MoveResult from '../src/chess/notation/MoveResult';


export default class AlgebraicNotation {

    convert(command: string, board: ChessBoard, turn: ChessColor): MoveResult {

        console.log("Converting algebraic notation: " + command + " into a two step square move");

        const cleanCommand = command.replace(/[+#]/, "");

        const move = this.doConvert(cleanCommand, board, turn);

        console.log("Command [" + cleanCommand + "] converted to [" + move + "]");
        return move;
    }

    doConvert(command: string, board: ChessBoard, turn: ChessColor): MoveResult {

        const parseResult = new CommandParser().parse(command, turn);

        const destination = ChessSquare.fromString(parseResult.destination)!;
        const origin = this.computeOrigin(parseResult, board, turn);

        if (null == origin) {
            console.log("The current board is: ");
            console.log(board.toString());
            throw new Error("Could not convert: " + command + " successfully");
        }

        return new MoveResult(origin, destination, parseResult.promotion);
    }

    private computeOrigin(parsed: ParseResult, board: ChessBoard, turn: ChessColor): ChessSquare | undefined {

        if (parsed.origin != null)
            return ChessSquare.fromString(parsed.origin)!;

        return this.computeValidOrigin(parsed, board, turn);
    }

    private computeValidOrigin(parsed: ParseResult, board: ChessBoard, turn: ChessColor): ChessSquare | undefined {

        const moveStrategy = this.getMoveStrategy(parsed.piece);

        const targetPiece = new ChessPiece(parsed.piece, turn);
        const pieceCandidates = board.getPieces(targetPiece);

        return pieceCandidates.find(p => moveStrategy
                                            .getValidMoves(p, board)
                                            .map(sq => sq.toString())
                                            .includes(parsed.destination));
    }

    getMoveStrategy(piece: ChessPieceType): ChessMoveStrategy {

        const moves = new Map<number, ChessMoveStrategy>([
            [ ChessPieceType.PAWN, new PawnMoveStrategy() ],
            [ ChessPieceType.ROOK, new RookMoveStrategy() ],
            [ ChessPieceType.KNIGHT, new KnightMoveStrategy() ],
            [ ChessPieceType.BISHOP, new BishopMoveStrategy() ],
            [ ChessPieceType.QUEEN, new QueenMoveStrategy() ],
            [ ChessPieceType.KING, new KingMoveStrategy() ]
        ]);

        const move = moves.get(piece);

        if (null == move)
            throw new Error("Could not find move strategy for piece: " + piece);

        return move;
    }

}
