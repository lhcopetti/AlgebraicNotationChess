
export function main() {
      console.log(
              "Is chrome.runtime available here?",
              typeof chrome.runtime.sendMessage == "function",
            );
};

import libNotation from '/src/js/algebraicNotation.js'

const commandDisplay = document.createElement("div");
commandDisplay.appendChild(document.createTextNode(""));
document.body.appendChild(commandDisplay);

const buttonClearDisplay = document.createElement("BUTTON");
buttonClearDisplay.appendChild(document.createTextNode("Clear Commands"));
document.body.appendChild(buttonClearDisplay);

const textInput = document.createElement("input");
textInput.type = "text";
document.body.appendChild(textInput);

textInput.addEventListener("keydown", e => {
    console.log(e);
    handleCommandEntered(e.key);
});

const command = {
    commandText: "Type to play" 
};

function clearCommand() {
    command.commandText = "";
}

function clearInput() {
    textInput.value = "";
}

function appendCommand(comm) {
    command.commandText += comm;
}


function clearCommandDisplay() {
    clearCommand();
    clearInput();
    updateCommandDisplay();
}

function appendCommandDisplay(command) {
    appendCommand(command);
    updateCommandDisplay();
}

buttonClearDisplay.addEventListener("click", e => {
    console.log("Clear clicked");
    clearCommandDisplay();
});


function updateCommandDisplay() {
    commandDisplay.innerHTML = "Commands: " + command.commandText;
}

function onKeyPressed(event) {
    console.log("Key press registered");
    console.log(event);
    handleCommandEntered(event);
}

function handleCommandEntered(data) {

    console.log("Data received: " + data);
    if (data === "Enter") {
        handleCommandFinished();
        clearCommandDisplay();
        return;
    }

    appendCommandDisplay(data);
}

function sendMoveCommandToLichess(token, gameId, move) {
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

function handleCommandFinished() {
    const gameId = "fkNCOdZe";
    const token = "eNbZ8vaMfceKlXUk"
    const move = command.commandText;

    libNotation("e2e4");

    console.log("The command is: " + move);
    sendMoveCommandToLichess(token, gameId, move);
}

clearCommandDisplay();

