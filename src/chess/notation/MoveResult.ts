
import { ChessSquare } from '../core/ChessSquare';
import { ChessPieceType } from '../core/ChessPieceType';

export default class MoveResult {

    _origin: ChessSquare;
    _destination: ChessSquare;

    _promotion?: ChessPieceType;

    public constructor(origin: ChessSquare, destination: ChessSquare, promotion?: ChessPieceType) {
        this._origin = origin;
        this._destination = destination;
        this._promotion = promotion;
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

    public toString(): string {
        return this.origin + " -> " + this.destination;
    }
}
