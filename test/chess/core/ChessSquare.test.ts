import { ChessFile, ChessRank, ChessSquare } from '../../../src/chess/core/ChessSquare';

const assert = require('assert');

describe('ChessSquare fromString/toString', function() {

    it('fromString', function() {

        const square = ChessSquare.fromString("e4");
        const command = square.toString();
        assert.equal(command, "e4");
    });

    it('down should decrement the rank', function() {

        const square = ChessSquare.fromString("e4").down;
        assert.equal(square.toString(), "e3");
    });
});

