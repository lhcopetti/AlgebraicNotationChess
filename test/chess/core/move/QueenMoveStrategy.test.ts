import { ChessBoard, LocalizedPiece } from '../../../../src/chess/core/ChessBoard';
import ChessPieceType from '../../../../src/chess/core/ChessPieceType';
import ChessColor from '../../../../src/chess/core/ChessColor';
import { ChessSquare, files, ranks } from '../../../../src/chess/core/ChessSquare';
import QueenMoveStrategy from '../../../../src/chess/core/move/QueenMoveStrategy';


describe('Tests for QueenMoveStrategy', function() {

    const moveStrategy = new QueenMoveStrategy();

    it('a queen not yet developed cannot move to any square', function() {

        const board = ChessBoard.defaultStartingPosition();
        const from = ChessSquare.fromString("d1")!;

        const validMoves = moveStrategy.getValidMoves(from, board);
        expect(validMoves).toEqual([]);
    });

    it('a queen in the center of the board can move to 27 squares', function() {

        const board = ChessBoard.fromStringList([]);
        const from = ChessSquare.fromString("e4")!;

        const validMoves = moveStrategy.getValidMoves(from, board);
        expect(validMoves.length).toEqual(27);
    });
});
