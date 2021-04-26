

export default class LichessKeyboard {

    constructor(libNotation, lichessAPIClient) {
        this.libNotation = libNotation;
        this.lichessAPIClient = lichessAPIClient;
    }

    handleCommand(command) {

        this.handleCommandFinished(command);
        this.notifyListenerEndOfCommand(command);
    }

    updateGameId(gameId) {
        console.log("Updated the GameID to: " + gameId);
        this.gameId = gameId;
    }

    handleCommandFinished(command) {
        const gameId = this.gameId;

        console.log("The command typed is: " + command);
        this.lichessAPIClient.sendMove(gameId, command);
    }

    addEventListener(listener) {
        this.listener = listener;
    }

    notifyListenerEndOfCommand(command) {
        this.listener.notifyEndOfCommand(command);
    }
}
