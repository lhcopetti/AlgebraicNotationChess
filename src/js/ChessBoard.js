

export default class ChessBoard {

    constructor(pieces) {
        this.pieces = pieces;
    }

    isEmpty() {
        return this.pieces.length == 0;
    }
}
