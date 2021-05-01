
import ChessPieceType from './ChessPieceType';
import ChessColor from './ChessColor';

export default class ChessPiece {

    private _piece: ChessPieceType;
    private _color: ChessColor;

    constructor(piece: ChessPieceType, color: ChessColor) {
        this._piece = piece;
        this._color = color;
    }

    public get piece() {
        return this._piece;
    }

    public get color() {
        return this._color;
    }
}
