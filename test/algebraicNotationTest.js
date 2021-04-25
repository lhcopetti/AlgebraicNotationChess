const AlgebraicNotationLibrary = require('../src/js/algebraicNotation.js');
const assert = require('assert');

describe('pawn moves', function() {

    const lib = new AlgebraicNotationLibrary();

    it('asdkfjasldfkj', function() {
        assert.equal("e2e4", lib.convert("e4"));
    });
});

