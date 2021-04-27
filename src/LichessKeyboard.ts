
import LibNotation from 'src/algebraicNotation';
import LichessClient from 'src/LichessAPIClient';


export default class LichessKeyboard {

    libNotation: LibNotation;
    lichessAPIClient: LichessClient;

    gameId? : string;

    constructor(libNotation: LibNotation, lichessAPIClient: LichessClient) {
        this.libNotation = libNotation;
        this.lichessAPIClient = lichessAPIClient;
    }

    handleCommand(command: string) {
        const gameId = this.gameId;

        if (gameId == null) {
            console.log ("Command: " + command + " has been ignore, gameId has not been set it");
            return;
        }

        console.log("The command typed is: " + command);
        this.lichessAPIClient.sendMove(gameId, command);
    }

    updateGameId(gameId: string) {
        console.log("Updated the GameID to: " + gameId);
        this.gameId = gameId;
    }
}
