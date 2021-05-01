
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

    public toString(): string {
        return ChessFile[this.file] + this.rank.rank;
    }

    public get file() {
        return this._file;
    }

    public get rank() {
        return this._rank;
    }

    public get down() {
        return new ChessSquare(this.file, new ChessRank(this.rank.rank - 1));
    }
}

enum ChessFile {
    a, b, c, d, e, f, g, h
}

const chessFileCount = Object.keys(ChessFile).length / 2;


class ChessRank {

    private _rank: number;

    constructor(rank: number) {
        if (rank < 1 || rank > 8)
            throw new Error("Invalid number for a ChessRank: " + rank);

        this._rank = rank;
    }

    public static fromString(rank: string) {
        return new ChessRank(+rank);
    }

    public get rank() {
        return this._rank;
    }

    public static get rankCount() {
        return 8;
    }
}


export { ChessFile, ChessRank, ChessSquare, chessFileCount }
