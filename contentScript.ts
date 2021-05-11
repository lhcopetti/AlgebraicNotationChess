
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
import TokenStorage from './src/chrome/TokenStorage'

console.log("Initializing LichessKeyboard extension");

const lichessBoardReader = new LichessHtmlBoardReader();
const htmlController = new LibHtml(document, lichessBoardReader);
const libNotation = new LibNotation();

const lichessAPIClient = new LichessAPIClient();
const tokenStorage = new TokenStorage();

const lichessKeyboard = new LichessKeyboard(libNotation, lichessAPIClient);

tokenStorage.addTokenChangedListener(newToken => {
    console.log("TokenChangedListener called with: " + newToken);
    lichessAPIClient.updateToken(newToken);
});

htmlController.addListener(lichessKeyboard);

htmlController.init();

chrome.runtime.sendMessage({ data: "URL_REQUEST" } , function(response) {
    console.log(response);
    const url = response.data;
    const gameId = url.substring(url.lastIndexOf('/') + 1);
    lichessKeyboard.updateGameId(gameId);
});

setTimeout(() => {
   const htmlBoard = lichessBoardReader.readBoard(document);
   console.log(htmlBoard);
}, 1000);


tokenStorage.getToken().then(token => lichessAPIClient.updateToken(token));
