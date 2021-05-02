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
