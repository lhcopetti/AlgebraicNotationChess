import { ChessSquare } from '../../../src/chess/core/ChessSquare';
import TwoSquaresChessMove from '../../../src/chess/notation/TwoSquaresChessMove';


describe('Tests for TwoSquaresChessMove notation', function() {

    it('toString', function() {

        const origin = ChessSquare.fromString("e2")!;
        const destination = ChessSquare.fromString("e4")!;

        const move = new TwoSquaresChessMove(origin, destination);

        expect(move.toString()).toBe("e2 -> e4");
    });

});

