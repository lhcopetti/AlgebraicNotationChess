

export default class LichessKeyboard {

    constructor(libNotation, lichessAPIClient) {
        this.libNotation = libNotation;
        this.lichessAPIClient = lichessAPIClient;
        this.commandBuffer = "";
    }

    handleKeyPressed(key) {
        console.log("Key pressed: " + key);
        this.handleCommandEntered(key);
    }

    clearCommand() {
        this.commandBuffer = "";
    }

    appendCommand(comm) {
        this.commandBuffer += comm;
    }

    handleCommandEntered(data) {

        if (data === "Enter") {
            this.handleCommandFinished();
            this.clearCommand();
            this.notifyListenerEndOfCommand(this.commandBuffer);
            return;
        }

        this.appendCommand(data);
    }

    updateGameId(gameId) {
        console.log("Updated the GameID to: " + gameId);
        this.gameId = gameId;
    }

    handleCommandFinished() {
        const gameId = this.gameId;
        const move = this.commandBuffer;

        console.log("The command typed is: " + move);
        this.lichessAPIClient.sendMove(gameId, move);
    }

    addEventListener(listener) {
        this.listener = listener;
    }

    notifyListenerEndOfCommand(command) {
        this.listener.notifyEndOfCommand(command);
    }
}
