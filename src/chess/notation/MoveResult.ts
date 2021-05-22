import { ChessSquare } from '../core/ChessSquare';
import { ChessPieceType } from '../core/ChessPieceType';

export default class MoveResult {
    _origin: ChessSquare;

    _destination: ChessSquare;

    _promotion?: ChessPieceType;

    _capture?: boolean;

    public constructor(origin: ChessSquare,
        destination: ChessSquare,
        promotion?: ChessPieceType,
        capture?: boolean) {
        this._origin = origin;
        this._destination = destination;
        this._promotion = promotion;
        this._capture = capture;
    }

    public get origin() {
        return this._origin;
    }

    public get destination() {
        return this._destination;
    }

    public get promotion() {
        return this._promotion;
    }

    public get isCapture() {
        return this._capture;
    }

    public toString(): string {
        return `${this.origin} -> ${this.destination}`;
    }
}
