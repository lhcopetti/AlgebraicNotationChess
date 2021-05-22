import { ChessPieceType } from './ChessPieceType';
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

    public equal(piece?: ChessPiece): boolean {
        return this.piece == piece?.piece && this.color == piece?.color;
    }

    public toString(): string {
        const color = this.color == ChessColor.BLACK ? 'b' : 'w';
        const piece = this.pieceTypeToString();

        return color + piece;
    }

    private pieceTypeToString(): string {
        switch (this.piece) {
            case ChessPieceType.PAWN:
                return 'p';
            case ChessPieceType.ROOK:
                return 'r';
            case ChessPieceType.KNIGHT:
                return 'k';
            case ChessPieceType.BISHOP:
                return 'b';
            case ChessPieceType.QUEEN:
                return 'q';
            case ChessPieceType.KING:
                return 'k';
        }
    }
}
