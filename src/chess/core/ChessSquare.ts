
class ChessSquare {

    private _file: ChessFile;
    private _rank: ChessRank;

    public constructor(file: ChessFile, rank: ChessRank) {
        this._file = file;
        this._rank = rank;
    }

    public static fromString(square: string) {
        const file: ChessFile = (<any>ChessFile)[square[0]];
        const rank = new ChessRank(+square[1]);
        return new ChessSquare(file, rank);
    }

    public get file() {
        return this._file;
    }

    public get rank() {
        return this._rank;
    }
}

enum ChessFile {
    a, b, c, d, e, f, g, h
}

class ChessRank {

    private _rank: number;

    constructor(rank: number) {
        if (rank < 1 || rank > 8)
            throw new Error("Invalid number for a ChessRank: " + rank);

        this._rank = rank;
    }

    public get rank() {
        return this._rank;
    }
}


export { ChessFile, ChessRank, ChessSquare }
