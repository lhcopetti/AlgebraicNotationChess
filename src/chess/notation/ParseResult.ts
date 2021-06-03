import ChessPiece from '../core/ChessPiece';
import { ChessPieceType, pieceFromString } from '../core/ChessPieceType';
import { ChessBoard } from '../core/ChessBoard';
import { ChessSquare } from '../core/ChessSquare';
import ChessColor from '../core/ChessColor';

export default class ParseResult {
    private _origin?: string;

    private _destination: string;

    private _isCapture: boolean = false;

    private _piece: ChessPieceType;

    private _promotion?: ChessPieceType;
    
    private _desambiguatingFile?: string;

    constructor(origin: string | undefined,
        destination: string,
        isCapture: boolean,
        piece: ChessPieceType,
        promotion?: ChessPieceType,
        desambiguatingFile?: string
               ) {
        this._origin = origin;
        this._destination = destination;
        this._isCapture = isCapture;
        this._piece = piece;
        this._promotion = promotion;
        this._desambiguatingFile = desambiguatingFile;
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

    public get promotion() {
        return this._promotion;
    }

    public get desambiguatingFile() {
        return this._desambiguatingFile;
    }
}
