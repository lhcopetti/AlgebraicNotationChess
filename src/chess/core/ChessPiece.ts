
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

    public toString(): string {

        const color = this.color == ChessColor.BLACK ? "b" : "w";
        const piece = this.pieceTypeToString();

        return color + piece;
    }

    private pieceTypeToString(): string {
        
        if (this.piece == ChessPieceType.KING)
            return "k";
        if (this.piece == ChessPieceType.PAWN)
            return "p";

        throw new Error("ChessPieceType: " + this.piece + " not yet supported");
    }
}
