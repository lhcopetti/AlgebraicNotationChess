
import ChessGame from './chess/core/ChessGame';

export default class LichessHtmlBoardReader {

    readBoard(document: Document) {

        const self = this;
        const htmlBoardDescriptor = this.readBoardDescriptor(document);
        console.log(htmlBoardDescriptor);
        return this.createChessGame(htmlBoardDescriptor);
    }

    readBoardDescriptor(document: Document): string[] {

        const listOfMovesElementName = "l4x"
        const listOfMoves = document.querySelector(listOfMovesElementName);

        if (null == listOfMoves) {
            console.log("Could not read the board. The element " + listOfMovesElementName + " could not be found");
            return [];
        }

        const moves = Array.from(listOfMoves.children as HTMLCollectionOf<HTMLElement>)
            .filter(c => c.tagName.toUpperCase() == "U8T")
            .map(moveElement => moveElement.innerText);

        return moves;
    }

    createChessGame(moves: string[]): ChessGame {
        const game = ChessGame.newGame();
        return this.replayMoves(moves, game);
    }

    replayMoves(moves: string[], game: ChessGame) {
        console.log("A");
        moves.forEach(m => game.playMove(m));
        return game;
    }

}
