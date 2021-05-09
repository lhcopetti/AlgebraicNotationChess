import AlgebraicNotationLibrary from '../src/AlgebraicNotation';
import { ChessBoard } from '../src/chess/core/ChessBoard';
import ChessColor from '../src/chess/core/ChessColor';
import ChessPieceType from '../src/chess/core/ChessPieceType';


describe('Will correctly convert first pawn moves', function() {

    const lib = new AlgebraicNotationLibrary();
    const board = ChessBoard.defaultStartingPosition();

    it('e4', function() {
        expect(lib.convert("e4", board, ChessColor.WHITE).toString()).toEqual("e2 -> e4");
    });

    it('a4', function() {
        expect(lib.convert("a4", board, ChessColor.WHITE).toString()).toEqual("a2 -> a4");
    });

    it('d4', function() {
        expect(lib.convert("d4", board, ChessColor.WHITE).toString()).toEqual("d2 -> d4");
    });

    it('e5', function() {
        expect(lib.convert("e5", board, ChessColor.BLACK).toString()).toEqual("e7 -> e5");
    });

});

describe('Conversion of a pawn move in the middle of the board by white', function() {

    const lib = new AlgebraicNotationLibrary();
    const board = ChessBoard.fromStringList([
        [ "f4", ChessPieceType.PAWN, ChessColor.WHITE ]
    ]);

    it('f5', function() {
        expect(lib.convert("f5", board, ChessColor.WHITE).toString()).toEqual("f4 -> f5");
    });

});

describe('Conversion of pawn moves with stacked pawns', function() {

    const lib = new AlgebraicNotationLibrary();

    const boardForWhite = ChessBoard.fromStringList([
        [ "f4", ChessPieceType.PAWN, ChessColor.WHITE ],
        [ "f3", ChessPieceType.PAWN, ChessColor.WHITE ]
    ]);

    it('f5 for white', function() {
        expect(lib.convert("f5", boardForWhite, ChessColor.WHITE).toString()).toEqual("f4 -> f5");
    });

    const boardForBlack = ChessBoard.fromStringList([
        [ "f7", ChessPieceType.PAWN, ChessColor.BLACK ],
        [ "f6", ChessPieceType.PAWN, ChessColor.BLACK ]
    ]);

    it('f5 for black', function() {
        expect(lib.convert("f5", boardForBlack, ChessColor.BLACK).toString()).toEqual("f6 -> f5");
    });

});

describe('Conversion of knight moves', function() {

    const lib = new AlgebraicNotationLibrary();

    it('f5 for white', function() {

        const board = ChessBoard.fromStringList([
            [ "b1", ChessPieceType.KNIGHT, ChessColor.WHITE ]
        ]);

        expect(lib.convert("Nc3", board, ChessColor.WHITE).toString()).toEqual("b1 -> c3");
    });

});
