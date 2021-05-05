import { ChessSquare, files, ranks } from '../../../src/chess/core/ChessSquare';


describe('ChessSquare fromString/toString', function() {

    it('fromString', function() {

        const square = ChessSquare.fromString("e4");
        const command = square.toString();
        expect(command).toBe("e4");
    });

    it('down should decrement the rank', function() {
        const square = ChessSquare.fromString("e4").down;
        expect(square.toString()).toBe("e3");
    });

    it('up should increment the rank', function() {
        const square = ChessSquare.fromString("e7").down;
        expect(square.toString()).toBe("e6");
    });

    it('up should decrement the file', function() {
        const square = ChessSquare.fromString("e7").left;
        expect(square.toString()).toBe("d7");
    });

    it('up should increment the file', function() {
        const square = ChessSquare.fromString("e7").right;
        expect(square.toString()).toBe("f7");
    });

});

describe('equality', function() {

    it('same square constructed from string should be equal', function() {

        const lhs = ChessSquare.fromString("e4");
        const rhs = ChessSquare.fromString("e4");
        expect(lhs).toEqual(rhs);
        expect(lhs.equals(rhs)).toBe(true);
    });

});

