class ChessSquare {

    private _file: string;
    private _rank: string;

    private constructor(file: string, rank: string) {
        this._file = file;
        this._rank = rank;
    }

    public static fromString(square: string) {
        const file = square[0];
        const rank = Number(square[1]);

        if (files.indexOf(file) < 0 || ranks.indexOf(rank) < 0)
            return null;

        return new ChessSquare(file, "" + rank);
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

    public get down(): ChessSquare | null {
        const newRank = Number(this.rank) - 1;
        return ChessSquare.fromString(this.file + newRank);
    }

    public get up(): ChessSquare | null {
        const newRank = 1 + Number(this.rank);
        return ChessSquare.fromString(this.file + newRank);
    }

    public get left(): ChessSquare | null {
        const leftFile = files[files.indexOf(this.file) - 1];
        return ChessSquare.fromString(leftFile + this.rank);
    }

    public get right(): ChessSquare | null {
        const rightFile = files[files.indexOf(this.file) + 1];
        return ChessSquare.fromString(rightFile + this.rank);
    }

    public equals(otherSquare: ChessSquare) {
        return this.file == otherSquare.file && this.rank == otherSquare.rank;
    }
}

const files = [ "a", "b", "c", "d", "e", "f", "g", "h" ];
const ranks = [ 1, 2, 3, 4, 5, 6, 7, 8 ];

const initialRankForWhite = 2;
const initialRankForBlack = 7;

export { ChessSquare, files, ranks, initialRankForWhite, initialRankForBlack };
