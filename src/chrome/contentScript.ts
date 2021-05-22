import LibNotation from '../AlgebraicNotation'
import LibHtml from '../HtmlController'
import LichessKeyboard from '../LichessKeyboard'
import LichessAPIClient from '../LichessAPIClient'
import LichessHtmlBoardReader from '../LichessHtmlBoardReader'
import TokenStorage from '../chrome/TokenStorage'

console.log("Initializing LichessKeyboard extension");

const lichessBoardReader = new LichessHtmlBoardReader();
const htmlController = new LibHtml(document, lichessBoardReader);

const lichessAPIClient = new LichessAPIClient();
const tokenStorage = new TokenStorage();

const lichessKeyboard = new LichessKeyboard(new LibNotation(), lichessAPIClient);

tokenStorage.addTokenChangedListener(newToken => {
    lichessAPIClient.updateToken(newToken);
});

tokenStorage.getToken().then(token => lichessAPIClient.updateToken(token));


htmlController.addListener(lichessKeyboard);
htmlController.init();

chrome.runtime.sendMessage({ data: "URL_REQUEST" } , function(response) {
    console.log(response);
    const url = response.data;
    const gameId = url.substring(url.lastIndexOf('/') + 1);
    lichessKeyboard.updateGameId(gameId);
});

