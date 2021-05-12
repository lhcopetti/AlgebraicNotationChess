import ChessPiece from '../core/ChessPiece';
import { ChessPieceType, pieceFromString } from '../core/ChessPieceType';
import { ChessBoard } from '../core/ChessBoard'
import { ChessSquare } from '../core/ChessSquare'
import ChessColor from '../core/ChessColor';


export default class ParseResult {
    private _origin?: string;
    private _destination: string;
    private _isCapture: boolean = false;
    private _piece: ChessPieceType;

    constructor(origin: string | undefined, destination: string, isCapture: boolean, piece: ChessPieceType) {
        this._origin = origin;
        this._destination = destination;
        this._isCapture = isCapture;
        this._piece = piece;
    }

    public get origin() {
        return this._origin;
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

