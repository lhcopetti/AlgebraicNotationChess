
import LibNotation from 'src/AlgebraicNotation';
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
            console.log ("Command: " + command + " has been ignored, gameId has not been set yet");
            return;
        }

        console.log("The command typed is: " + command);

        const lichessCommand = this.libNotation.convert(command);
        this.lichessAPIClient.sendMove(gameId, lichessCommand);
    }

    updateGameId(gameId: string) {
        console.log("Updated the GameID to: " + gameId);
        this.gameId = gameId;
    }
}
