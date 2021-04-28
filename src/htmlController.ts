
import CommandListener from 'src/CommandListener';

export default class HtmlController {

    document: Document;

    commandDisplay?: HTMLElement;
    textInput?: HTMLInputElement;

    listener?: CommandListener;

    constructor(document: Document) {
        this.document = document;
    }

    init() {
        this.commandDisplay = this.document.createElement("div");
        this.commandDisplay.appendChild(this.document.createTextNode(""));
        this.document.body.appendChild(this.commandDisplay);

        const textInput = this.document.createElement("input");
        textInput.setAttribute("type", "text");
        this.document.body.appendChild(textInput);

        const self = this;
        textInput.addEventListener("keydown", e => {
            console.log("Key press registered: " + e.key);

            if (e.key == "Enter") {
                const command = this.textInput?.value;

                if (command == null)
                    return;

                console.log("Command finished: " + command);
                this.notifyNewCommand(command);
            }
        });

        const cgBoard = document.querySelector("cg-board");
        console.log(cgBoard);

        const cgContainer = document.querySelector("cg-container");
        console.log(cgContainer);

        this.textInput = textInput;
    }

    addListener(listener: CommandListener) {
        this.listener = listener;
    }

    notifyNewCommand(command: string) {
        this.listener?.handleCommand(command);
        this.clearInput();
    }

    clearInput() {
        if (this.textInput == null)
            return;

        this.textInput.value = "";
    }

    updateCommandDisplay(newCommandDisplayText: string) {
        if (null == this.commandDisplay)
            return;

        this.commandDisplay.innerHTML = "Commands: " + newCommandDisplayText;
    }
}
