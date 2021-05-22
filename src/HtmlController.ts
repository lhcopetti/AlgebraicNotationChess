import CommandListener from './CommandListener';
import LichessHtmlBoardReader from './LichessHtmlBoardReader';
import ChessGame from './chess/core/ChessGame';

export default class HtmlController {
    private document: Document;

    private boardReader: LichessHtmlBoardReader;

    private commandDisplay?: HTMLElement;

    private textInput?: HTMLInputElement;

    private listener?: CommandListener;

    constructor(document: Document, boardReader: LichessHtmlBoardReader) {
        this.document = document;
        this.boardReader = boardReader;
    }

    init() {
        this.commandDisplay = this.document.createElement('div');
        this.commandDisplay.appendChild(this.document.createTextNode(''));
        this.document.body.appendChild(this.commandDisplay);

        const textInput = this.document.createElement('input');
        textInput.setAttribute('type', 'text');
        this.document.body.appendChild(textInput);

        const self = this;
        textInput.addEventListener('keydown', (e) => {
            console.log(`Key press registered: ${e.key}`);

            if (e.key == 'Enter') {
                const command = this.textInput?.value;

                if (command == null) return;

                console.log(`Command finished: ${command}`);

                const board = this.boardReader.readBoard(document);
                this.notifyNewCommand(command, board);
            }
        });

        const cgBoard = document.querySelector('cg-board');
        console.log(cgBoard);

        const cgContainer = document.querySelector('cg-container');
        console.log(cgContainer);

        this.textInput = textInput;
    }

    addListener(listener: CommandListener) {
        this.listener = listener;
    }

    notifyNewCommand(command: string, game: ChessGame) {
        this.clearInput();
        this.listener?.handleCommand(command, game);
        this.updateCommandDisplay(command);
    }

    clearInput() {
        if (this.textInput == null) return;

        this.textInput.value = '';
    }

    updateCommandDisplay(newCommandDisplayText: string) {
        if (this.commandDisplay == null) return;

        this.commandDisplay.innerHTML = `Command executed: ${newCommandDisplayText}`;
    }
}
