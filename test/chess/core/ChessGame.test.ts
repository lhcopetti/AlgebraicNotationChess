import { ChessBoard, LocalizedPiece } from '../../../src/chess/core/ChessBoard';
import ChessPieceType from '../../../src/chess/core/ChessPieceType';
import ChessColor from '../../../src/chess/core/ChessColor';
import { ChessRank, ChessFile, ChessSquare, chessFileCount } from '../../../src/chess/core/ChessSquare';
import ChessGame from '../../../src/chess/core/ChessGame';


const assert = require('assert');

describe('ChessGame newGame', function() {

    it('initializes a new game correctly', () => {
        const game = ChessGame.newGame();

        assert.equal(game.board.toString(), ChessBoard.defaultStartingPosition().toString());
        assert.equal(game.turn, ChessColor.WHITE);
    });
});

describe('Playing moves', function() {

    it("bobby fischer's favorite move", () => {
        const game = ChessGame.newGame();

        game.playMove("e4");

        assert.equal(game.getPieceAt("e2"), null);

        const pieceAtE4 = game.getPieceAt("e4");
        assert.equal(pieceAtE4?.piece, ChessPieceType.PAWN);
        assert.equal(pieceAtE4?.color, ChessColor.WHITE);
    });
});

describe('The turn should alternate between white and black', function() {

    it("bobby fischer's favorite move", () => {
        const game = ChessGame.newGame();

        assert.equal(game.turn, ChessColor.WHITE);
        game.playMove("e4");
        assert.equal(game.turn, ChessColor.BLACK);
        game.playMove("c5");
        assert.equal(game.turn, ChessColor.WHITE);
    });
});
