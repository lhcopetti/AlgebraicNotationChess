
export function main() {
      console.log(
              "Is chrome.runtime available here?",
              typeof chrome.runtime.sendMessage == "function",
            );
};

import LibNotation from '/src/js/algebraicNotation.js'
import LibHtml from '/src/js/htmlController.js'
import LichessKeyboard from '/src/js/LichessKeyboard.js'
import LichessAPIClient from '/src/js/LichessAPIClient.js'

const command = {
    commandText: "" 
};

function clearCommand() {
    command.commandText = "";
}

function appendCommand(comm) {
    command.commandText += comm;
}


function clearCommandDisplay() {
    clearCommand();
    htmlController.clearInput();
    updateCommandDisplay();
}

function appendCommandDisplay(command) {
    appendCommand(command);
    updateCommandDisplay();
}

function updateCommandDisplay() {
    htmlController.updateCommandDisplay("Commands: " + command.commandText);
}

console.log("Initializing LichessKeyboard extension");

const htmlController = new LibHtml(document);
const libNotation = new LibNotation();

const token = "eNbZ8vaMfceKlXUk";
const lichessAPIClient = new LichessAPIClient(token);

const lichessKeyboard = new LichessKeyboard(libNotation, lichessAPIClient);


lichessKeyboard.addEventListener(htmlController);
htmlController.addKeyListener(lichessKeyboard);


htmlController.init();
clearCommandDisplay();


chrome.runtime.sendMessage({ data: "URL_REQUEST" } , function(response) {
      console.log(response);
    const url = response.data;
    const gameId = url.substring(url.lastIndexOf('/') + 1);
    lichessKeyboard.updateGameId(gameId);
});
