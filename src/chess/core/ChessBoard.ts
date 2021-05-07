
import ChessPiece from './ChessPiece';
import ChessColor from './ChessColor';
import ChessPieceType from './ChessPieceType';
import { ChessSquare, files, ranks } from './ChessSquare';
import Arrays from '../../collection/Arrays';

class ChessBoard {

    board: (ChessPiece | undefined)[][];

    public constructor(b: (ChessPiece | undefined)[][]) {
        this.board = b;
    }

    public static fromStringList(pieces: LocalizedPiece[]) {

        const pieceList: [ ChessPiece, ChessSquare ][] = pieces.map(p => {
                const piece = new ChessPiece(p[1], p[2]);
                const square = ChessSquare.fromString(p[0])!;
                return [ piece, square ];
            });

        return ChessBoard.fromList(pieceList);
    }

    public static fromList(localizedChessPieces: [ChessPiece, ChessSquare][]) {
        const pieces: ChessPiece[][] = this.emptyBoard();

        const rankCount = ranks.length;

        for (let piece of localizedChessPieces) {
            const rankIndex = ranks.length - Number(piece[1].rank);
            const fileIndex = files.indexOf(piece[1].file);

            pieces[rankIndex][fileIndex] = piece[0];
        }

        return new ChessBoard(pieces);
    }

    private static emptyBoard(): ChessPiece[][] {

        const board = [];

        for (let i = 0; i < ranks.length; ++i)
            board[i] = [];

        return board;
    }

    public movePiece(origin: ChessSquare, destination: ChessSquare) {

        const newPieces = Arrays.cloneMatrix(this.board);
        const newBoard = new ChessBoard(newPieces);

        const pieceToMove = newBoard.getAtSquare(origin);
        if (null == pieceToMove)
            throw new Error("No piece to move at: " + origin);

        newBoard.setAtSquare(destination, pieceToMove);
        newBoard.setAtSquare(origin, undefined);
        return newBoard;
    }

    public getAt(coordinate: string): ChessPiece | undefined {
        const square = ChessSquare.fromString(coordinate)!;
        return this.getAtSquare(square);
    }

    public getAtSquare(square: ChessSquare): ChessPiece | undefined {
        const file = files.indexOf(square.file);
        const rank = Number(square.rank);

        console.log("File: " + file + " Rank: " + rank + " Square: " + square.toString());
        return this.board[ranks.length - rank][file];
    }

    private setAtSquare(square: ChessSquare, value?: ChessPiece) {
        const file = files.indexOf(square.file);
        const rank = +square.rank;
        this.board[ranks.length - rank][file] = value;
    }

    public toString(): string {
        const rankCount = ranks.length;
        const fileCount = files.length;

        const result: string[] = [];

        for (let i = 0; i < rankCount; ++i) {

            var line = "";
            for (let j = 0; j < fileCount; ++j) {
                const piece = this.pieceToString(this.board[i][j]);
                line += piece + " ";
            }

            line += rankCount - i;
            result.push(line);
        }

        var fileLine = "";
        for (let i = 0; i < fileCount; ++i) {
            fileLine += files[i];

            if (i < fileCount - 1)
                fileLine += "  ";
        }

        result.push(fileLine);

        return result.join("\n");
    }

    private pieceToString(piece?: ChessPiece) {
        if (null == piece)
            return "--"

        return piece.toString();
    }

    public static defaultStartingPosition(): ChessBoard {
        const pieces: LocalizedPiece[] = [
        [ "a2", ChessPieceType.PAWN, ChessColor.WHITE ],
        [ "b2", ChessPieceType.PAWN, ChessColor.WHITE ],
        [ "c2", ChessPieceType.PAWN, ChessColor.WHITE ],
        [ "d2", ChessPieceType.PAWN, ChessColor.WHITE ],
        [ "e2", ChessPieceType.PAWN, ChessColor.WHITE ],
        [ "f2", ChessPieceType.PAWN, ChessColor.WHITE ],
        [ "g2", ChessPieceType.PAWN, ChessColor.WHITE ],
        [ "h2", ChessPieceType.PAWN, ChessColor.WHITE ],

        [ "a1", ChessPieceType.ROOK     , ChessColor.WHITE ],
        [ "b1", ChessPieceType.KNIGHT   , ChessColor.WHITE ],
        [ "c1", ChessPieceType.BISHOP   , ChessColor.WHITE ],
        [ "d1", ChessPieceType.QUEEN    , ChessColor.WHITE ],
        [ "e1", ChessPieceType.KING     , ChessColor.WHITE ],
        [ "f1", ChessPieceType.BISHOP   , ChessColor.WHITE ],
        [ "g1", ChessPieceType.KNIGHT   , ChessColor.WHITE ],
        [ "h1", ChessPieceType.ROOK     , ChessColor.WHITE ],

        [ "a7", ChessPieceType.PAWN, ChessColor.BLACK ],
        [ "b7", ChessPieceType.PAWN, ChessColor.BLACK ],
        [ "c7", ChessPieceType.PAWN, ChessColor.BLACK ],
        [ "d7", ChessPieceType.PAWN, ChessColor.BLACK ],
        [ "e7", ChessPieceType.PAWN, ChessColor.BLACK ],
        [ "f7", ChessPieceType.PAWN, ChessColor.BLACK ],
        [ "g7", ChessPieceType.PAWN, ChessColor.BLACK ],
        [ "h7", ChessPieceType.PAWN, ChessColor.BLACK ],

        [ "a8", ChessPieceType.ROOK     , ChessColor.BLACK ],
        [ "b8", ChessPieceType.KNIGHT   , ChessColor.BLACK ],
        [ "c8", ChessPieceType.BISHOP   , ChessColor.BLACK ],
        [ "d8", ChessPieceType.QUEEN    , ChessColor.BLACK ],
        [ "e8", ChessPieceType.KING     , ChessColor.BLACK ],
        [ "f8", ChessPieceType.BISHOP   , ChessColor.BLACK ],
        [ "g8", ChessPieceType.KNIGHT   , ChessColor.BLACK ],
        [ "h8", ChessPieceType.ROOK     , ChessColor.BLACK ]

        ];

        return ChessBoard.fromStringList(pieces);
    }

}

type LocalizedPiece = [ string, ChessPieceType, ChessColor ];

export { ChessBoard, LocalizedPiece };
