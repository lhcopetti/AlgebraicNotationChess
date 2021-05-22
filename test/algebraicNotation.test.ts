import AlgebraicNotationLibrary from '../src/AlgebraicNotation';
import { ChessBoard } from '../src/chess/core/ChessBoard';
import ChessColor from '../src/chess/core/ChessColor';
import { ChessPieceType } from '../src/chess/core/ChessPieceType';


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

describe('Conversion of pawn moves in the middle of the board', function() {

    const lib = new AlgebraicNotationLibrary();

    it('f5', function() {

        const board = ChessBoard.fromStringList([
            [ "f4", ChessPieceType.PAWN, ChessColor.WHITE ]
        ]);

        expect(lib.convert("f5", board, ChessColor.WHITE).toString()).toEqual("f4 -> f5");
    });

    it('e5', function() {

        const board = ChessBoard.fromStringList([
            [ "e4", ChessPieceType.PAWN, ChessColor.WHITE ]
        ]);

        expect(lib.convert("e5", board, ChessColor.WHITE).toString()).toEqual("e4 -> e5");
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

describe('Conversion of pawn captures', function() {

    const lib = new AlgebraicNotationLibrary();

    it('exd5', function() {
        const board = ChessBoard.fromStringList([
            [ "e4", ChessPieceType.PAWN, ChessColor.WHITE ],
            [ "d5", ChessPieceType.PAWN, ChessColor.WHITE ]
        ]);

        const move = lib.convert("exd5", board, ChessColor.WHITE);
        expect(move.toString()).toEqual("e4 -> d5");
        expect(move.isCapture).toEqual(true);
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

describe('Conversion of knight captures', function() {

    const lib = new AlgebraicNotationLibrary();

    it('Nxd4', function() {

        const board = ChessBoard.fromStringList([
            [ "d4", ChessPieceType.PAWN, ChessColor.BLACK ],
            [ "f3", ChessPieceType.KNIGHT, ChessColor.WHITE ]
        ]);

        expect(lib.convert("Nxd4", board, ChessColor.WHITE).toString()).toEqual("f3 -> d4");
    });

});

describe('Conversion of bishop moves', function() {

    const lib = new AlgebraicNotationLibrary();

    it('Be2 for white', function() {

        const board = ChessBoard.fromStringList([
            [ "f1", ChessPieceType.BISHOP, ChessColor.WHITE ]
        ]);

        const move = lib.convert("Be2", board, ChessColor.WHITE);
        expect(move.toString()).toEqual("f1 -> e2");
        expect(move.isCapture).toEqual(false);
    });

});

describe('Conversion of bishop captures', function() {

    const lib = new AlgebraicNotationLibrary();

    it('Bxc6', function() {

        const board = ChessBoard.fromStringList([
            [ "c6", ChessPieceType.KNIGHT, ChessColor.BLACK ],
            [ "b5", ChessPieceType.BISHOP, ChessColor.WHITE ]
        ]);

        expect(lib.convert("Bxc6", board, ChessColor.WHITE).toString()).toEqual("b5 -> c6");
    });

});

describe('Conversion of castle move', function() {

    const lib = new AlgebraicNotationLibrary();

    it('long castle', function() {
        const board = ChessBoard.fromStringList([]);
        expect(lib.convert("O-O-O", board, ChessColor.WHITE).toString()).toEqual("e1 -> c1");
    });

    it('short castle', function() {
        const board = ChessBoard.fromStringList([]);
        expect(lib.convert("O-O", board, ChessColor.WHITE).toString()).toEqual("e1 -> g1");
    });

    it('long castle for black', function() {
        const board = ChessBoard.fromStringList([]);
        expect(lib.convert("O-O-O", board, ChessColor.BLACK).toString()).toEqual("e8 -> c8");
    });

    it('short castle for black', function() {
        const board = ChessBoard.fromStringList([]);
        expect(lib.convert("O-O", board, ChessColor.BLACK).toString()).toEqual("e8 -> g8");
    });

});
