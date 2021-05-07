import { ChessBoard, LocalizedPiece } from '../../../src/chess/core/ChessBoard';
import ChessPieceType from '../../../src/chess/core/ChessPieceType';
import ChessColor from '../../../src/chess/core/ChessColor';
import { ChessSquare, files, ranks } from '../../../src/chess/core/ChessSquare';


const assert = require('assert');

describe('ChessBoard toString', function() {

    it('should be able to print an empty board', function() {

        const board = ChessBoard.fromStringList([]);

        const result = board.toString();

        assert.equal(result,
`-- -- -- -- -- -- -- -- 8
-- -- -- -- -- -- -- -- 7
-- -- -- -- -- -- -- -- 6
-- -- -- -- -- -- -- -- 5
-- -- -- -- -- -- -- -- 4
-- -- -- -- -- -- -- -- 3
-- -- -- -- -- -- -- -- 2
-- -- -- -- -- -- -- -- 1
a  b  c  d  e  f  g  h`
                    );
    });


    it('print a board with only two kings', function() {

        const board = ChessBoard.fromStringList([
            [ "a1", ChessPieceType.KING, ChessColor.WHITE ],
            [ "h8", ChessPieceType.KING, ChessColor.BLACK ]
        ]);

        const result = board.toString();

        assert.equal(result,
`-- -- -- -- -- -- -- bk 8
-- -- -- -- -- -- -- -- 7
-- -- -- -- -- -- -- -- 6
-- -- -- -- -- -- -- -- 5
-- -- -- -- -- -- -- -- 4
-- -- -- -- -- -- -- -- 3
-- -- -- -- -- -- -- -- 2
wk -- -- -- -- -- -- -- 1
a  b  c  d  e  f  g  h`
                    );
    });

});


describe('ChessBoard initialization', function() {

    it('should return undefined when there is no piece at the square', function() {
        const pieces: LocalizedPiece[] = [];

        const board = ChessBoard.fromStringList(pieces);

        const pieceAtE4 = board.getAt("e4");
        assert.equal(pieceAtE4, undefined);

        const pieceAtF6 = board.getAt("e6");
        assert.equal(pieceAtF6, undefined);
    });

    it('a single pawn on e4', function() {
        const pieces: LocalizedPiece[] = [
            [ "e4", ChessPieceType.PAWN, ChessColor.WHITE ]
        ];

        const board = ChessBoard.fromStringList(pieces);
        console.log(board.toString());

        const chessPiece = board.getAt("e4");

        assert.equal(chessPiece?.piece, ChessPieceType.PAWN);
        assert.equal(chessPiece?.color, ChessColor.WHITE);
    });

    it('kings at the edge of the board', function() {
        const pieces: LocalizedPiece[] = [
            [ "a1", ChessPieceType.KING, ChessColor.WHITE ],
            [ "h8", ChessPieceType.KING, ChessColor.BLACK ]
        ];

        const board = ChessBoard.fromStringList(pieces);

        const whiteKing = board.getAt("a1");
        assert.equal(whiteKing?.piece, ChessPieceType.KING);
        assert.equal(whiteKing?.color, ChessColor.WHITE);

        const blackKing = board.getAt("h8");
        assert.equal(blackKing?.piece, ChessPieceType.KING);
        assert.equal(blackKing?.color, ChessColor.BLACK);
    });


    it('default chess setup', function() {

        const board = ChessBoard.defaultStartingPosition();

        const verifier = (coordinate: string, type: ChessPieceType, color: ChessColor) => {

            const square = ChessSquare.fromString(coordinate)!;

            const piece = board.getAtSquare(square);

            assert.equal(piece?.piece, type);
            assert.equal(piece?.color, color);
        };


        verifier("a2", ChessPieceType.PAWN, ChessColor.WHITE);
        verifier("b2", ChessPieceType.PAWN, ChessColor.WHITE);
        verifier("c2", ChessPieceType.PAWN, ChessColor.WHITE);
        verifier("d2", ChessPieceType.PAWN, ChessColor.WHITE);
        verifier("e2", ChessPieceType.PAWN, ChessColor.WHITE);
        verifier("f2", ChessPieceType.PAWN, ChessColor.WHITE);
        verifier("g2", ChessPieceType.PAWN, ChessColor.WHITE);
        verifier("h2", ChessPieceType.PAWN, ChessColor.WHITE);

        verifier("a1", ChessPieceType.ROOK, ChessColor.WHITE);
        verifier("b1", ChessPieceType.KNIGHT, ChessColor.WHITE);
        verifier("c1", ChessPieceType.BISHOP, ChessColor.WHITE);
        verifier("d1", ChessPieceType.QUEEN, ChessColor.WHITE);
        verifier("e1", ChessPieceType.KING, ChessColor.WHITE);
        verifier("f1", ChessPieceType.BISHOP, ChessColor.WHITE);
        verifier("g1", ChessPieceType.KNIGHT, ChessColor.WHITE);
        verifier("h1", ChessPieceType.ROOK, ChessColor.WHITE);

        verifier("a7", ChessPieceType.PAWN, ChessColor.BLACK);
        verifier("b7", ChessPieceType.PAWN, ChessColor.BLACK);
        verifier("c7", ChessPieceType.PAWN, ChessColor.BLACK);
        verifier("d7", ChessPieceType.PAWN, ChessColor.BLACK);
        verifier("e7", ChessPieceType.PAWN, ChessColor.BLACK);
        verifier("f7", ChessPieceType.PAWN, ChessColor.BLACK);
        verifier("g7", ChessPieceType.PAWN, ChessColor.BLACK);
        verifier("h7", ChessPieceType.PAWN, ChessColor.BLACK);

        verifier("a8", ChessPieceType.ROOK  , ChessColor.BLACK);
        verifier("b8", ChessPieceType.KNIGHT, ChessColor.BLACK);
        verifier("c8", ChessPieceType.BISHOP, ChessColor.BLACK);
        verifier("d8", ChessPieceType.QUEEN , ChessColor.BLACK);
        verifier("e8", ChessPieceType.KING  , ChessColor.BLACK);
        verifier("f8", ChessPieceType.BISHOP, ChessColor.BLACK);
        verifier("g8", ChessPieceType.KNIGHT, ChessColor.BLACK);
        verifier("h8", ChessPieceType.ROOK  , ChessColor.BLACK);

    });

});

