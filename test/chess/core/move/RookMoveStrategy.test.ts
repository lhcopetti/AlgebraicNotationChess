import { ChessBoard, LocalizedPiece } from '../../../../src/chess/core/ChessBoard';
import ChessColor from '../../../../src/chess/core/ChessColor';
import { ChessSquare, files, ranks } from '../../../../src/chess/core/ChessSquare';
import RookMoveStrategy from '../../../../src/chess/core/move/RookMoveStrategy';


describe('Tests for RookMoveStrategy', function() {

    const moveStrategy = new RookMoveStrategy();

    it('a rook not yet developed cannot move to any square', function() {

        const board = ChessBoard.defaultStartingPosition();
        const from = ChessSquare.fromString("a1")!;

        const validMoves = moveStrategy.getValidMoves(from, board);

        expect(validMoves).toEqual([]);
    });

    it('A rook in the middle of the board can move to 14 different squares', function() {

        const board = ChessBoard.fromStringList([]);
        const from = ChessSquare.fromString("d5")!;

        const validMoves = moveStrategy.getValidMoves(from, board);

        expect(validMoves.length).toBe(14);
    });
});


