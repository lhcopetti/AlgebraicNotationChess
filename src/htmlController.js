

export default class HtmlController {

    constructor(document) {
        this.doc = document;
    }

    init() {
        this.commandDisplay = this.doc.createElement("div");
        this.commandDisplay.appendChild(this.doc.createTextNode(""));
        this.doc.body.appendChild(this.commandDisplay);

        this.textInput = this.doc.createElement("input");
        this.textInput.type = "text";
        this.doc.body.appendChild(this.textInput);

        const self = this;
        this.textInput.addEventListener("keydown", e => {
            console.log("Key press registered: " + e.key);

            if (e.key == "Enter") {
                const command = this.textInput.value;
                console.log("Command finished: " + command);
                this.notifyNewCommand(command);
            }
        });

        const cgBoard = document.querySelector("cg-board");
        console.log(cgBoard);

        const cgContainer = document.querySelector("cg-container");
        console.log(cgContainer);
    }

    addListener(listener) {
        this.listener = listener;
    }

    notifyNewCommand(command) {
        this.listener.handleCommand(command);
        this.clearInput();
    }

    clearInput() {
        this.textInput.value = "";
    }

    updateCommandDisplay(newCommandDisplayText) {
        this.commandDisplay.innerHTML = "Commands: " + newCommandDisplayText;
    }

    notifyEndOfCommand(command) {
        console.log("The command has finished: " + command);
        this.clearInput();
    }
}
