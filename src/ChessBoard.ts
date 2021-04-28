

export default class ChessBoard {

    pieces: any[]

    constructor(pieces: any[]) {
        this.pieces = pieces;
    }

    isEmpty() {
        return this.pieces.length == 0;
    }
}
