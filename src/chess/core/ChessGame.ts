import { ChessBoard } from './ChessBoard';
import ChessPiece from './ChessPiece';
import { ChessPieceType } from './ChessPieceType';
import ChessColor from './ChessColor';
import { ChessSquare, files, ranks } from './ChessSquare';
import AlgebraicNotation from '../../AlgebraicNotation';
import MoveResult from '../../chess/notation/MoveResult';


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

    static newGameFromPosition(board: ChessBoard, turn: ChessColor) {
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

        this.verifyCapture(move, this.board);

        this._board = this.board.movePiece(move.origin, move.destination);

        this.verifyPromotion(move);

        this._turn ^= 1;
    }

    private verifyCapture(move: MoveResult, board: ChessBoard) {

        if (move.isCapture && board.getAtSquare(move.destination) == undefined)
            throw "There is no piece to capture at " + move.destination.toString();

        if (!move.isCapture && board.getAtSquare(move.destination) != undefined)
            throw "You cannot move to the square " + move.destination + " because it already contains piece";
    }

    private verifyPromotion(move: MoveResult) {
        if (!move.promotion)
            return;

        const type = this.board.getAtSquare(move.destination)!.piece;
        if (type != ChessPieceType.PAWN)
            return;

        const color = this.board.getAtSquare(move.destination)!.color;
        const piece = new ChessPiece(move.promotion, color);
        this._board = this.board.putPieceAtSquare(piece, move.destination);
    }
};
