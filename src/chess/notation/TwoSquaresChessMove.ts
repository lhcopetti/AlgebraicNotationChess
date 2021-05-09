
import { ChessSquare } from '../core/ChessSquare';

export default class TwoSquaresChessMove {

    _origin: ChessSquare;
    _destination: ChessSquare;

    public constructor(origin: ChessSquare, destination: ChessSquare) {
        this._origin = origin;
        this._destination = destination;
    }

    public get origin() {
        return this._origin;
    }

    public get destination() {
        return this._destination;
    }

    public toString(): string {
        return this.origin + " -> " + this.destination;
    }
}
