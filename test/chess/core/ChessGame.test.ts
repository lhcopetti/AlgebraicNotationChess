import { ChessBoard, LocalizedPiece } from '../../../src/chess/core/ChessBoard';
import ChessPieceType from '../../../src/chess/core/ChessPieceType';
import ChessColor from '../../../src/chess/core/ChessColor';
import { ChessSquare, files, ranks } from '../../../src/chess/core/ChessSquare';
import ChessGame from '../../../src/chess/core/ChessGame';


describe('ChessGame newGame', function() {

    it('initializes a new game correctly', () => {
        const game = ChessGame.newGame();

        expect(game.board.toString()).toEqual(ChessBoard.defaultStartingPosition().toString());
        expect(game.turn).toEqual(ChessColor.WHITE);
    });
});

describe('Playing moves', function() {

    it("bobby fischer's favorite move", () => {
        const game = ChessGame.newGame();

        game.playMove("e4");

        expect(game.getPieceAt("e2")).toEqual(undefined);

        const pieceAtE4 = game.getPieceAt("e4");
        expect(pieceAtE4?.piece).toEqual(ChessPieceType.PAWN);
        expect(pieceAtE4?.color).toEqual(ChessColor.WHITE);
    });
});

describe('The turn should alternate between white and black', function() {

    it("bobby fischer's favorite move", () => {
        const game = ChessGame.newGame();

        expect(game.turn).toEqual(ChessColor.WHITE);

        game.playMove("e4");
        expect(game.turn).toEqual(ChessColor.BLACK);

        game.playMove("c5");
        expect(game.turn).toEqual(ChessColor.WHITE);
    });
});
