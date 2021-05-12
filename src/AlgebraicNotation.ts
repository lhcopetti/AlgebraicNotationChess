
import ChessPiece from './chess/core/ChessPiece';
import { ChessPieceType, pieceFromString } from './chess/core/ChessPieceType';
import { ChessBoard } from './chess/core/ChessBoard'
import { ChessSquare } from './chess/core/ChessSquare'
import ChessColor from '../src/chess/core/ChessColor';

import { ChessMoveStrategy } from '../src/chess/core/move/ChessMoveStrategy';
import PawnMoveStrategy from '../src/chess/core/move/PawnMoveStrategy';
import RookMoveStrategy from '../src/chess/core/move/RookMoveStrategy';
import KnightMoveStrategy from '../src/chess/core/move/KnightMoveStrategy';
import BishopMoveStrategy from '../src/chess/core/move/BishopMoveStrategy';
import QueenMoveStrategy from '../src/chess/core/move/QueenMoveStrategy';
import KingMoveStrategy from '../src/chess/core/move/KingMoveStrategy';
import TwoSquaresChessMove from '../src/chess/notation/TwoSquaresChessMove';

class ParseResult {
    _destination: string;
    _isCapture: boolean = false;
    _piece: ChessPieceType;

    constructor(destination: string, isCapture: boolean, piece: ChessPieceType) {
        this._destination = destination;
        this._isCapture = isCapture;
        this._piece = piece;
    }

    public get destination() {
        return this._destination;
    }

    public get piece() {
        return this._piece;
    }

    public get isCapture() {
        return this._isCapture;
    }
};

export default class AlgebraicNotation {

    convert(command: string, board: ChessBoard, turn: ChessColor): TwoSquaresChessMove {

        console.log("Converting algebraic notation: " + command + " into a two step square move");

        const move = this.doConvert(command, board, turn);

        console.log("Command [" + command + "] converted to [" + move + "]");
        return new TwoSquaresChessMove(move.origin, move.destination);
    }

    doConvert(command: string, board: ChessBoard, turn: ChessColor): TwoSquaresChessMove {

        const parsedCommand = this.parseCommand(command);

        const moveStrategy = this.getMoveStrategy(parsedCommand.piece);

        const targetPiece = new ChessPiece(parsedCommand.piece, turn);
        const pieceCandidates = board.getPieces(targetPiece);

        const origin = pieceCandidates.find(p => moveStrategy
                                            .getValidMoves(p, board)
                                            .map(sq => sq.toString())
                                            .includes(parsedCommand.destination));

        if (null == origin)
            throw new Error("Could not convert: " + command + " successfully");

        const destSquare = ChessSquare.fromString(parsedCommand.destination)!;
        return new TwoSquaresChessMove(origin, destSquare);
    }

    parseCommand(command: string): ParseResult {

        if (command.length == 2)
            return new ParseResult(command, false, ChessPieceType.PAWN);

        if (command.length == 3) {
            const piece = pieceFromString(command[0]);
            const destination = command.substring(1)
            return new ParseResult(destination, false, piece);
        }

        throw Error("Could not parse command: " + command);
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


    isPawnMove(command: string, board: ChessBoard, turn: ChessColor): TwoSquaresChessMove | null {

        if (command.length != 2)
            return null;

        const destination = ChessSquare.fromString(command)!;

        const moveBack = (square: ChessSquare) => turn == ChessColor.WHITE ? square.down! : square.up!;
        var origin = moveBack(destination);

        if (null == board.getAtSquare(origin))
            origin = moveBack(origin);

        return new TwoSquaresChessMove(origin, destination);
    }

    isKnightMove(command: string, board: ChessBoard, turn: ChessColor): TwoSquaresChessMove | undefined {

        if (command[0] != "N")
            return undefined;

        const destination = command.substring(1);
        const piece = new ChessPiece(ChessPieceType.KNIGHT, turn);

        const originSquareCandidates = board.getPieces(piece);
        const moveStrategy = new KnightMoveStrategy();

        const origin = originSquareCandidates.find(p => moveStrategy
                                                            .getValidMoves(p, board)
                                                            .map(sq => sq.toString())
                                                            .includes(destination));

        if (null == origin)
            return undefined;

        const destSquare = ChessSquare.fromString(destination)!;
        return new TwoSquaresChessMove(origin, destSquare);
    }
}
