import { ChessBoard, LocalizedPiece } from '../../../../src/chess/core/ChessBoard';
import { ChessPieceType } from '../../../../src/chess/core/ChessPieceType';
import ChessColor from '../../../../src/chess/core/ChessColor';
import { ChessSquare, files, ranks } from '../../../../src/chess/core/ChessSquare';
import BishopMoveStrategy from '../../../../src/chess/core/move/BishopMoveStrategy';


describe('Tests for BishopMoveStrategy', function() {

    const moveStrategy = new BishopMoveStrategy();

    it('a bishop not yet developed cannot move to any square', function() {

        const board = ChessBoard.defaultStartingPosition();
        const from = ChessSquare.fromString("c1")!;

        const validMoves = moveStrategy.getValidMoves(from, board);

        expect(validMoves).toEqual([]);
    });

    it('A bishop in the middle of the board can move to 13 different squares', function() {

        const board = ChessBoard.fromStringList([]);
        const from = ChessSquare.fromString("d5")!;

        const validMoves = moveStrategy.getValidMoves(from, board);

        expect(validMoves.length).toBe(13);
    });
});

