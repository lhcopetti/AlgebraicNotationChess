import { ChessSquare } from '../../../src/chess/core/ChessSquare';
import MoveResult from '../../../src/chess/notation/MoveResult';


describe('Tests for MoveResult notation', function() {

    it('toString', function() {

        const origin = ChessSquare.fromString("e2")!;
        const destination = ChessSquare.fromString("e4")!;

        const move = new MoveResult(origin, destination);

        expect(move.toString()).toBe("e2 -> e4");
    });

});

