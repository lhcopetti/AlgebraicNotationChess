import { ChessBoard, LocalizedPiece } from '../../../../src/chess/core/ChessBoard';
import ChessPiece from '../../../../src/chess/core/ChessPiece';
import ChessPieceType from '../../../../src/chess/core/ChessPieceType';
import ChessColor from '../../../../src/chess/core/ChessColor';
import { ChessSquare, files, ranks } from '../../../../src/chess/core/ChessSquare';
import PawnMoveStrategy from '../../../../src/chess/core/move/PawnMoveStrategy';


describe('Tests for PawnMoveStrategy', function() {

    const moveStrategy = new PawnMoveStrategy();

    it('first move of a white pawn', function() {

        const board = ChessBoard.defaultStartingPosition();
        const from = ChessSquare.fromString("e2")!;

        const validMoves = moveStrategy.getValidMoves(from, board)
            .map(p => p.toString());

        expect(validMoves).toEqual([ "e3", "e4" ]);
    });

    it('first move of a white pawn blocked by piece', function() {

        const piece = new ChessPiece(ChessPieceType.KING, ChessColor.WHITE);
        const square = ChessSquare.fromString("e3")!;

        const board = ChessBoard.defaultStartingPosition().putPieceAtSquare(piece, square);
        const from = ChessSquare.fromString("e2")!;

        const validMoves = moveStrategy.getValidMoves(from, board)
            .map(p => p.toString());

        expect(validMoves).toEqual([]);
    });

    it('first move of a black pawn', function() {

        const board = ChessBoard.defaultStartingPosition();
        const from = ChessSquare.fromString("e7")!;

        const validMoves = moveStrategy.getValidMoves(from, board)
            .map(p => p.toString());

        expect(validMoves).toEqual([ "e6", "e5" ]);
    });

    it('move by white pawn in the middle of the board', function() {

        const board = ChessBoard.fromStringList([
            [ "e4", ChessPieceType.PAWN, ChessColor.WHITE ]
        ]);

        const from = ChessSquare.fromString("e4")!;

        const validMoves = moveStrategy.getValidMoves(from, board)
            .map(p => p.toString());

        expect(validMoves).toEqual([ "e5" ]);
    });
});



