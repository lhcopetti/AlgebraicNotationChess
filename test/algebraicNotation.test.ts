import AlgebraicNotationLibrary from '../src/AlgebraicNotation';
import { ChessBoard } from '../src/chess/core/ChessBoard';
import ChessColor from '../src/chess/core/ChessColor';
import ChessPieceType from '../src/chess/core/ChessPieceType';



const assert = require('assert');

describe('Will correctly convert first pawn moves by white', function() {

    const lib = new AlgebraicNotationLibrary();
    const board = ChessBoard.fromList([]);

    it('e4', function() {
        assert.equal(lib.convert("e4", board), "e2e4");
    });

    it('a4', function() {
        assert.equal(lib.convert("a4", board), "a2a4");
    });

    it('d4', function() {
        assert.equal(lib.convert("d4", board), "d2d4");
    });

});

describe('Conversion of a pawn move in the middle of the board by white', function() {

    const lib = new AlgebraicNotationLibrary();
    const board = ChessBoard.fromStringList([
        [ "f4", ChessPieceType.PAWN, ChessColor.WHITE ]
    ]);

    it('f5', function() {
        assert.equal("f4f5", lib.convert("f5", board));
    });
});
