import AlgebraicNotationLibrary from '../src/AlgebraicNotation';
import { ChessBoard } from '../src/chess/core/ChessBoard';
import ChessColor from '../src/chess/core/ChessColor';
import ChessPieceType from '../src/chess/core/ChessPieceType';
import ChessGame from '../src/chess/core/ChessGame';
import LichessHtmlBoardReader from '../src/LichessHtmlBoardReader';



describe('LichessHtmlBoardReader tests', function() {

    it('Will send all the moves to the chessGame', () => {

        const game = ChessGame.newGame();
        game.playMove = jest.fn();

        const reader = new LichessHtmlBoardReader();

        reader.replayMoves(["move1", "move2", "move3"], game);

        expect(game.playMove).toHaveBeenNthCalledWith(1, "move1");
        expect(game.playMove).toHaveBeenNthCalledWith(2, "move2");
        expect(game.playMove).toHaveBeenNthCalledWith(3, "move3");
    });

});
