import { ChessBoard, LocalizedPiece } from '../../../../src/chess/core/ChessBoard';
import ChessPiece from '../../../../src/chess/core/ChessPiece';
import { ChessPieceType } from '../../../../src/chess/core/ChessPieceType';
import ChessColor from '../../../../src/chess/core/ChessColor';
import { ChessSquare, files, ranks } from '../../../../src/chess/core/ChessSquare';
import MoveStrategyHelper from '../../../../src/chess/core/move/MoveStrategyHelper';


describe('MoveStrategyHelper', function() {

    it('blocked off pieces should have no legal moves', function() {

        const board = ChessBoard.fromStringList([
            [ "a1", ChessPieceType.ROOK, ChessColor.WHITE ],
            [ "a2", ChessPieceType.PAWN, ChessColor.WHITE ]
        ]);

        const squareMoves = MoveStrategyHelper.getMovesInDirection(
            ChessSquare.fromString("a1")!,
            board,
            (sq) => sq.up
        );

        const moves = squareMoves.map(m => m.toString());
        expect(moves).toEqual([]);
    });

    it('should allow captures when computing available moves when the colors are different', function() {

        const board = ChessBoard.fromStringList([
            [ "a1", ChessPieceType.ROOK, ChessColor.WHITE ],
            [ "a5", ChessPieceType.ROOK, ChessColor.BLACK ]
        ]);

        const squareMoves = MoveStrategyHelper.getMovesInDirection(
            ChessSquare.fromString("a1")!,
            board,
            (sq) => sq.up
        );

        const moves = squareMoves.map(m => m.toString());

        expect(moves).toEqual(expect.arrayContaining([ "a2", "a3", "a4", "a5" ]));
    });
});
