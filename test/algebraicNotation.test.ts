import AlgebraicNotationLibrary from '../src/AlgebraicNotation';



const assert = require('assert');

describe('Will correctly convert pawn moves by white', function() {

    const lib = new AlgebraicNotationLibrary();

    it('e4', function() {
        assert.equal("e2e4", lib.convert("e4"));
    });

    it('a4', function() {
        assert.equal("a2a4", lib.convert("a4"));
    });

    it('d4', function() {
        assert.equal("d2d4", lib.convert("d4"));
    });

});

