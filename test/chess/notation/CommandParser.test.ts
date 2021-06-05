import { ChessSquare } from '../../../src/chess/core/ChessSquare';
import CommandParser from '../../../src/chess/notation/CommandParser';
import ChessColor from '../../../src/chess/core/ChessColor';
import { ChessPieceType } from '../../../src/chess/core/ChessPieceType';


describe('parse pawn moves', function() {

    const parser = new CommandParser();

    it('pawn move for white', function() {

        const result = parser.parse("e4", ChessColor.WHITE);

        expect(result.destination).toBe("e4");
        expect(result.origin).toBe(undefined);
        expect(result.piece).toBe(ChessPieceType.PAWN);
    });

    it('pawn move for black', function() {

        const result = parser.parse("e5", ChessColor.BLACK);

        expect(result.destination).toBe("e5");
        expect(result.origin).toBe(undefined);
        expect(result.piece).toBe(ChessPieceType.PAWN);
    });

});

describe('parse piece moves', function() {

    const parser = new CommandParser();

    it('knight move for white', function() {

        const result = parser.parse("Nc3", ChessColor.WHITE);

        expect(result.destination).toBe("c3");
        expect(result.origin).toBe(undefined);
        expect(result.piece).toBe(ChessPieceType.KNIGHT);
    });

});

describe('parse desambiguating moves', function() {

    const parser = new CommandParser();

    it('knight move with disambiguating file', function() {

        const result = parser.parse("Nge4", ChessColor.WHITE);

        expect(result.destination).toBe("e4");
        expect(result.desambiguatingFile).toBe("g");
        expect(result.piece).toBe(ChessPieceType.KNIGHT);
    });

    it('rook move with disambiguating rank', function() {

        const result = parser.parse("R8e5", ChessColor.WHITE);

        expect(result.destination).toBe("e5");
        expect(result.desambiguatingFile).toBe(undefined);
        expect(result.desambiguatingRank).toBe(8);
        expect(result.piece).toBe(ChessPieceType.ROOK);
    });

    it('both file and rank is required for disambiguating queen moves', function() {

        const result = parser.parse("Qh4e1", ChessColor.WHITE);

        expect(result.destination).toBe("e1");
        expect(result.desambiguatingFile).toBe("h");
        expect(result.desambiguatingRank).toBe(4);
        expect(result.piece).toBe(ChessPieceType.QUEEN);
    });
});

describe('parse piece captures', function() {

    const parser = new CommandParser();

    it('knight capture for white', function() {

        const result = parser.parse("Nxe4", ChessColor.WHITE);

        expect(result.destination).toBe("e4");
        expect(result.origin).toBe(undefined);
        expect(result.piece).toBe(ChessPieceType.KNIGHT);
        expect(result.isCapture).toBe(true);
    });

});

describe('parse pawn captures', function() {

    const parser = new CommandParser();

    it('pawn capture for white', function() {

        const command = "exd5";
        const result = parser.parse(command, ChessColor.WHITE);

        expect(result.destination).toBe("d5");
        expect(result.origin).toBe("e4");
    });

    it('pawn capture for black', function() {

        const command = "dxe4";
        const result = parser.parse(command, ChessColor.BLACK);

        expect(result.destination).toBe("e4");
        expect(result.origin).toBe("d5");
    });

});

describe('parse promotion', function() {

    const parser = new CommandParser();

    it('pawn promotion for white', function() {

        const command = "f8=B";
        const result = parser.parse(command, ChessColor.WHITE);
        console.log(result);

        expect(result.destination).toBe("f8");
        expect(result.origin).toBe("f7");
        expect(result.promotion).toBe(ChessPieceType.BISHOP);
        expect(result.isCapture).toBe(false);
    });

    it('pawn promotion for black', function() {

        const command = "a1=N";
        const result = parser.parse(command, ChessColor.BLACK);
        console.log(result);

        expect(result.destination).toBe("a1");
        expect(result.origin).toBe("a2");
        expect(result.promotion).toBe(ChessPieceType.KNIGHT);
        expect(result.isCapture).toBe(false);
    });

    it('pawn capture with promotion for white', function() {

        const command = "gxf8=Q";
        const result = parser.parse(command, ChessColor.WHITE);
        console.log(result);

        expect(result.destination).toBe("f8");
        expect(result.origin).toBe("g7");
        expect(result.promotion).toBe(ChessPieceType.QUEEN);
        expect(result.isCapture).toBe(true);
    });

    it('pawn capture with promotion for black', function() {

        const command = "exd1=Q";
        const result = parser.parse(command, ChessColor.BLACK);
        console.log(result);

        expect(result.destination).toBe("d1");
        expect(result.origin).toBe("e2");
        expect(result.promotion).toBe(ChessPieceType.QUEEN);
        expect(result.isCapture).toBe(true);
    });
});
