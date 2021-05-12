import { ChessSquare } from '../../../src/chess/core/ChessSquare';
import CommandParser from '../../../src/chess/notation/CommandParser';
import ChessColor from '../../../src/chess/core/ChessColor';


describe('parse pawn captures', function() {

    const parser = new CommandParser();

    it('pawn capture for white', function() {

        const command = "exd5";
        const result = parser.parse(command, ChessColor.WHITE);

        expect(result.destination).toBe("d5");
        expect(result.origin).toBe("e4");
    });

    it('pawn capture for blac', function() {

        const command = "dxe4";
        const result = parser.parse(command, ChessColor.BLACK);

        expect(result.destination).toBe("e4");
        expect(result.origin).toBe("d5");
    });

});


