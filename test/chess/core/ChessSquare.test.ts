import { ChessSquare, files, ranks } from '../../../src/chess/core/ChessSquare';


describe('ChessSquare fromString/toString', function() {

    it ('a fromString call with a valid square should return an object', () => {
        expect(ChessSquare.fromString("e4")!).not.toBeNull();
    });

    it ('a fromString call with a valid square should return an object', () => {

        expect(ChessSquare.fromString("zx48"!)).toBeNull();
    });
});

describe('ChessSquare directions', function() {

    it('down should decrement the rank', function() {
        const square = ChessSquare.fromString("e4")!.down!;
        expect(square.toString()).toBe("e3");
    });

    it('up should increment the rank', function() {
        const square = ChessSquare.fromString("e7")!.down!;
        expect(square.toString()).toBe("e6");
    });

    it('up should decrement the file', function() {
        const square = ChessSquare.fromString("e7")!.left!;
        expect(square.toString()).toBe("d7");
    });

    it('up should increment the file', function() {
        const square = ChessSquare.fromString("e7")!.right!;
        expect(square.toString()).toBe("f7");
    });

    it('up should increment to the last available square at the top', function() {
        const square = ChessSquare.fromString("e7")!.up!;
        expect(square.toString()).toBe("e8");
    });

    it('up should increment to the last available square on the left', function() {
        const square = ChessSquare.fromString("b2")!.left!;
        expect(square.toString()).toBe("a2");
    });

    it('up/left should go to the corner of the board', function() {
        const square = ChessSquare.fromString("b7")!.up!.left!;
        expect(square.toString()).toBe("a8");
    });

});

describe('equality', function() {

    it('same square constructed from string should be equal', function() {

        const lhs = ChessSquare.fromString("e4")!;
        const rhs = ChessSquare.fromString("e4")!;
        expect(lhs).toEqual(rhs);
        expect(lhs.equals(rhs)).toBe(true);
    });

});

