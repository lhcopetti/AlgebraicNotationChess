
import LibNotation from './AlgebraicNotation';
import LichessClient from './LichessAPIClient';
import ChessGame from './chess/core/ChessGame';


export default class LichessKeyboard {

    libNotation: LibNotation;
    lichessAPIClient: LichessClient;

    gameId? : string;

    constructor(libNotation: LibNotation, lichessAPIClient: LichessClient) {
        this.libNotation = libNotation;
        this.lichessAPIClient = lichessAPIClient;
    }

    handleCommand(command: string, game: ChessGame) {
        const gameId = this.gameId;

        if (gameId == null) {
            console.log ("Command: " + command + " has been ignored, gameId has not been set yet");
            return;
        }

        console.log("The command typed is: " + command);

        const move = this.libNotation.convert(command, game.board, game.turn);
        const lichessCommand = move.origin.toString() + move.destination.toString();

        this.lichessAPIClient.sendMove(gameId, lichessCommand);
    }

    updateGameId(gameId: string) {
        console.log("Updated the GameID to: " + gameId);
        this.gameId = gameId;
    }
}
