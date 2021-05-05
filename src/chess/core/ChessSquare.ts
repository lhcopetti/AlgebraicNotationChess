class ChessSquare {

    private _file: string;
    private _rank: string;

    public constructor(file: string, rank: string) {
        this._file = file;
        this._rank = rank;
    }

    public static fromString(square: string) {
        const file = square[0];
        const rank = square[1];
        return new ChessSquare(file, rank);
    }

    public toString(): string {
        return this.file + this.rank;
    }

    public get file() {
        return this._file;
    }

    public get rank() {
        return this._rank;
    }

    public get down() {
        //const newRank: number = +this.rank;
        return new ChessSquare(this.file, "" + (Number(this.rank) - 1));
    }

    public get up() {
        const newRank = 1 + Number(this.rank);
        return new ChessSquare(this.file, "" + newRank);
    }

    public get left() {
        const leftFile = files[files.indexOf(this.file) - 1];
        return new ChessSquare(leftFile, this.rank);
    }

    public get right() {
        const leftFile = files[files.indexOf(this.file) + 1];
        return new ChessSquare(leftFile, this.rank);
    }

    public equals(otherSquare: ChessSquare) {
        return this.file == otherSquare.file && this.rank == otherSquare.rank;
    }
}

const files = [ "a", "b", "c", "d", "e", "f", "g", "h" ];
const ranks = [ 1, 2, 3, 4, 5, 6, 7, 8 ];

export { ChessSquare, files, ranks }
