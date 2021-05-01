
import ChessPiece from './ChessPiece';
import ChessColor from './ChessColor';
import ChessPieceType from './ChessPieceType';
import { ChessRank, ChessFile, ChessSquare } from './ChessSquare';

class ChessBoard {

    board: ChessPiece[][];

    constructor(b: ChessPiece[][]) {
        this.board = b;
    }

    static fromStringList(pieces: [LocalizedPiece]) {

        const pieceList: [ ChessPiece, ChessSquare ][] = pieces.map(p => {
                const piece = new ChessPiece(p[1], p[2]);
                const square = ChessSquare.fromString(p[0]);
                return [ piece, square ];
            });

        return ChessBoard.fromList(pieceList);
    }

    static fromList(localizedChessPieces: [ChessPiece, ChessSquare][]) {
        const pieces = [[]];
        return new ChessBoard(pieces);
    }


    getAt(coordinate: string): ChessPiece | null {

        const square = ChessSquare.fromString(coordinate);
        const file = square.file;
        const rank = square.rank;

        const boardFile = this.board[file];
        if (!boardFile)
            return null;

        return boardFile[rank.rank];
    }
}

type LocalizedPiece = [ string, ChessPieceType, ChessColor ];

export { ChessBoard, LocalizedPiece };
