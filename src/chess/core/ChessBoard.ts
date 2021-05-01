
import ChessPiece from './ChessPiece';
import ChessColor from './ChessColor';
import ChessPieceType from './ChessPieceType';
import { ChessRank, ChessFile, ChessSquare, chessFileCount } from './ChessSquare';

class ChessBoard {

    board: ChessPiece[][];

    public constructor(b: ChessPiece[][]) {
        this.board = b;
    }

    public static fromStringList(pieces: LocalizedPiece[]) {

        const pieceList: [ ChessPiece, ChessSquare ][] = pieces.map(p => {
                const piece = new ChessPiece(p[1], p[2]);
                const square = ChessSquare.fromString(p[0]);
                return [ piece, square ];
            });

        return ChessBoard.fromList(pieceList);
    }

    public static fromList(localizedChessPieces: [ChessPiece, ChessSquare][]) {
        const pieces: ChessPiece[][] = this.emptyBoard();

        const rankCount = ChessRank.rankCount;

        for (let piece of localizedChessPieces) {
            const rankIndex = rankCount - piece[1].rank.rank;
            const fileIndex = piece[1].file;
            pieces[rankIndex][fileIndex] = piece[0];
        }

        return new ChessBoard(pieces);
    }

    private static emptyBoard(): ChessPiece[][] {

        const board = [];

        for (let i = 0; i < ChessRank.rankCount; ++i)
            board[i] = [];

        return board;
    }

    public getAt(coordinate: string): ChessPiece | null {
        return this.getAtSquare(ChessSquare.fromString(coordinate));
    }

    public getAtSquare(square: ChessSquare): ChessPiece | null {
        const file = square.file;
        const rank = square.rank;
        return this.board[ChessRank.rankCount - rank.rank][file];
    }

    public toString(): string {
        const rankCount = ChessRank.rankCount;
        const fileCount = chessFileCount;

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
        for (let i = 0; i < chessFileCount; ++i) {
            fileLine += ChessFile[i];

            if (i < chessFileCount - 1)
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
}

type LocalizedPiece = [ string, ChessPieceType, ChessColor ];

export { ChessBoard, LocalizedPiece };
