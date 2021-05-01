import { ChessBoard, LocalizedPiece } from '../../../src/chess/core/ChessBoard';
import ChessPieceType from '../../../src/chess/core/ChessPieceType';
import ChessColor from '../../../src/chess/core/ChessColor';


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

    it('a single pawn on e4', function() {
        const pieces: LocalizedPiece[] = [
            [ "e4", ChessPieceType.PAWN, ChessColor.WHITE ]
        ];

        const board = ChessBoard.fromStringList(pieces);

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

});

