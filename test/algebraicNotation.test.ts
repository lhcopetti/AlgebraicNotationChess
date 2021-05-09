import AlgebraicNotationLibrary from '../src/AlgebraicNotation';
import { ChessBoard } from '../src/chess/core/ChessBoard';
import ChessColor from '../src/chess/core/ChessColor';
import ChessPieceType from '../src/chess/core/ChessPieceType';



const assert = require('assert');

describe('Will correctly convert first pawn moves', function() {

    const lib = new AlgebraicNotationLibrary();
    const board = ChessBoard.defaultStartingPosition();

    it('e4', function() {
        assert.equal(lib.convert("e4", board, ChessColor.WHITE).toString(), "e2 -> e4");
    });

    it('a4', function() {
        assert.equal(lib.convert("a4", board, ChessColor.WHITE).toString(), "a2 -> a4");
    });

    it('d4', function() {

        console.log(board.toString());
        assert.equal(lib.convert("d4", board, ChessColor.WHITE).toString(), "d2 -> d4");
    });

    it('e5', function() {
        assert.equal(lib.convert("e5", board, ChessColor.BLACK).toString(), "e7 -> e5");
    });

});

describe('Conversion of a pawn move in the middle of the board by white', function() {

    const lib = new AlgebraicNotationLibrary();
    const board = ChessBoard.fromStringList([
        [ "f4", ChessPieceType.PAWN, ChessColor.WHITE ]
    ]);

    it('f5', function() {
        assert.equal("f4 -> f5", lib.convert("f5", board, ChessColor.WHITE).toString());
    });

});

describe('Conversion of pawn moves with stacked pawns', function() {

    const lib = new AlgebraicNotationLibrary();

    const boardForWhite = ChessBoard.fromStringList([
        [ "f4", ChessPieceType.PAWN, ChessColor.WHITE ],
        [ "f3", ChessPieceType.PAWN, ChessColor.WHITE ]
    ]);

    it('f5 for white', function() {
        assert.equal("f4 -> f5", lib.convert("f5", boardForWhite, ChessColor.WHITE).toString());
    });

    const boardForBlack = ChessBoard.fromStringList([
        [ "f7", ChessPieceType.PAWN, ChessColor.BLACK ],
        [ "f6", ChessPieceType.PAWN, ChessColor.BLACK ]
    ]);

    it('f5 for black', function() {
        assert.equal("f6 -> f5", lib.convert("f5", boardForBlack, ChessColor.BLACK).toString());
    });

});

describe('Conversion of knight moves', function() {

    const lib = new AlgebraicNotationLibrary();

    it('f5 for white', function() {

        const board = ChessBoard.fromStringList([
            [ "b1", ChessPieceType.KNIGHT, ChessColor.WHITE ]
        ]);

        assert.equal("b1 -> c3", lib.convert("Nc3", board, ChessColor.WHITE).toString());
    });

});
