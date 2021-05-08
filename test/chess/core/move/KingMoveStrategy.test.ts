import { ChessBoard, LocalizedPiece } from '../../../../src/chess/core/ChessBoard';
import ChessPieceType from '../../../../src/chess/core/ChessPieceType';
import ChessColor from '../../../../src/chess/core/ChessColor';
import { ChessSquare, files, ranks } from '../../../../src/chess/core/ChessSquare';
import KingMoveStrategy from '../../../../src/chess/core/move/KingMoveStrategy';


describe('Tests for KingMoveStrategy', function() {

    const moveStrategy = new KingMoveStrategy();

    it('a king not yet developed cannot move', function() {

        const board = ChessBoard.defaultStartingPosition();

        const from = ChessSquare.fromString("e1")!;
        const validMoves = moveStrategy.getValidMoves(from, board);

        expect(validMoves).toEqual([]);
    });

    it('a king in the center of the board can move to eight different squares', function() {

        const board = ChessBoard.fromStringList([]);

        const from = ChessSquare.fromString("e4")!;
        const validMoves = moveStrategy.getValidMoves(from, board);

        expect(validMoves.length).toEqual(8);
    });

});

