

export default class LichessKeyboard {

    constructor(libNotation) {
        this.libNotation = libNotation;
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
    }

    sendMoveCommandToLichess(token, gameId, move) {
        const method = 'POST';
        const body = {};

        const headers = new Headers();
        headers.append("Authorization", "Bearer " + token);

        fetch('https://lichess.org/api/board/game/' + gameId + '/move/' + move, {
            method: method,
            body: body,
            headers: headers
        })
            .then(res => res.json())
            .then(console.log)
    }

    handleCommandFinished() {
        const gameId = "fkNCOdZe";
        const token = "eNbZ8vaMfceKlXUk"
        const move = this.commandBuffer;

        this.libNotation.convert("d5");

        console.log("The command is: " + move);
        this.sendMoveCommandToLichess(token, gameId, move);
    }

    addEventListener(listener) {
        this.listener = listener;
    }

    notifyListenerEndOfCommand(command) {
        this.listener.notifyEndOfCommand(command);
    }
}
