import { ChessBoard } from './ChessBoard';
import ChessPiece from './ChessPiece';
import ChessColor from './ChessColor';
import { ChessSquare, files, ranks } from './ChessSquare';
import AlgebraicNotation from '../../AlgebraicNotation';


export default class ChessGame {

    private _turn: ChessColor;
    private _board: ChessBoard;

    private constructor(board: ChessBoard, turn: ChessColor) {
        this._board = board;
        this._turn = turn;
    }

    static newGame(): ChessGame {
        const board = ChessBoard.defaultStartingPosition();
        const turn = ChessColor.WHITE;
        return new ChessGame(board, turn);
    }

    public getPieceAt(coord: string) {
        return this.board.getAt(coord);
    }

    public get board() {
        return this._board;
    }

    public get turn() {
        return this._turn;
    }

    public playMove(command: string) {
        const lib = new AlgebraicNotation();
        const move = lib.convert(command, this.board, this.turn);

        this._board = this.board.movePiece(move.origin, move.destination);
        this._turn ^= 1;
    }
};
