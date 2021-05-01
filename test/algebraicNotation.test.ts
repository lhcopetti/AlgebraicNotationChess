import AlgebraicNotationLibrary from '../src/AlgebraicNotation';
import { ChessBoard } from '../src/chess/core/ChessBoard';



const assert = require('assert');

describe('Will correctly convert pawn moves by white', function() {

    const lib = new AlgebraicNotationLibrary();
    const board = ChessBoard.fromList([]);

    it('e4', function() {
        assert.equal("e2e4", lib.convert("e4", board));
    });

    it('a4', function() {
        assert.equal("a2a4", lib.convert("a4", board));
    });

    it('d4', function() {
        assert.equal("d2d4", lib.convert("d4", board));
    });

});

