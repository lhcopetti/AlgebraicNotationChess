import { ChessBoard, LocalizedPiece } from '../../../../src/chess/core/ChessBoard';
import ChessPieceType from '../../../../src/chess/core/ChessPieceType';
import ChessColor from '../../../../src/chess/core/ChessColor';
import { ChessSquare, files, ranks } from '../../../../src/chess/core/ChessSquare';
import KnightMoveStrategy from '../../../../src/chess/core/move/KnightMoveStrategy';


describe('ChessBoard toString', function() {

    const moveStrategy = new KnightMoveStrategy();

    it('a knight in the center can move to eight different squares', function() {

        const board = ChessBoard.fromStringList([
            [ "e4", ChessPieceType.KNIGHT, ChessColor.WHITE ]
        ])
        const from = ChessSquare.fromString("e4");

        const validMoves = moveStrategy.getValidMoves(from, board);

        expect(validMoves).toEqual([
            ChessSquare.fromString("d6"),
            ChessSquare.fromString("f6"),
            ChessSquare.fromString("c5"),
            ChessSquare.fromString("c3"),
            ChessSquare.fromString("d2"),
            ChessSquare.fromString("f2"),
            ChessSquare.fromString("g5"),
            ChessSquare.fromString("g3"),
        ]);
    });
});
