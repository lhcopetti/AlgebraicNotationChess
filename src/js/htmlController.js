

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

            if (null != self.listener)
                self.listener.handleKeyPressed(e.key);
        });
    }

    addKeyListener(listener) {
        this.listener = listener;
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
