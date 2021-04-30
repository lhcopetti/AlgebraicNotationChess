
export function main() {
      console.log(
              "Is chrome.runtime available here?",
              typeof chrome.runtime.sendMessage == "function",
            );
};

import LibNotation from './src/AlgebraicNotation'
import LibHtml from './src/HtmlController'
import LichessKeyboard from './src/LichessKeyboard'
import LichessAPIClient from './src/LichessAPIClient'
import LichessHtmlBoardReader from './src/LichessHtmlBoardReader'

console.log("Initializing LichessKeyboard extension");

const htmlController = new LibHtml(document);
const libNotation = new LibNotation();

const token = "eNbZ8vaMfceKlXUk";
const lichessAPIClient = new LichessAPIClient(token);

const lichessKeyboard = new LichessKeyboard(libNotation, lichessAPIClient);


htmlController.addListener(lichessKeyboard);

htmlController.init();

chrome.runtime.sendMessage({ data: "URL_REQUEST" } , function(response) {
      console.log(response);
    const url = response.data;
    const gameId = url.substring(url.lastIndexOf('/') + 1);
    lichessKeyboard.updateGameId(gameId);
});


const boardReader = new LichessHtmlBoardReader();
const htmlBoard = boardReader.readBoard(document);
console.log(htmlBoard);
