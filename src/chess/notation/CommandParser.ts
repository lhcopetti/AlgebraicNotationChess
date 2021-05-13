import ChessPiece from '../core/ChessPiece';
import { ChessPieceType, pieceFromString } from '../core/ChessPieceType';
import { ChessBoard } from '../core/ChessBoard'
import { ChessSquare, files } from '../core/ChessSquare'
import ChessColor from '../core/ChessColor';
import ParseResult from './ParseResult';

export default class CommandParser {

    public parse(command: string, turn: ChessColor): ParseResult {

        let result;

        if (result = this.parseCastle(command, turn)) {
            return result;
        }

        if (command.length == 2)
            return new ParseResult(undefined, command, false, ChessPieceType.PAWN);

        if (command.length == 3) {
            const piece = pieceFromString(command[0]);
            const destination = command.substring(1)
            return new ParseResult(undefined, destination, false, piece);
        }

        if (result = this.parseCapture(command, turn))
            return result;

        throw Error("Could not parse command: " + command);
    }

    private parseCastle(command: string, turn: ChessColor): ParseResult | undefined {
        const rank = turn == ChessColor.WHITE ? "1" : "8";

        if (command == "O-O-O")
            return new ParseResult("e" + rank, "c" + rank, false, ChessPieceType.KING);

        if (command == "O-O")
            return new ParseResult("e" + rank, "g" + rank, false, ChessPieceType.KING);
    }

    private parseCapture(command: string, turn: ChessColor): ParseResult | undefined {

        if (command.length != 4)
            return;

        if (files.includes(command[0])) {
            return this.parsePawnCapture(command, turn);
        }

        return this.parsePieceCapture(command, turn);
    }

    private parsePawnCapture(command: string, turn: ChessColor): ParseResult | undefined {

        const originFile = command[0];
        const destination = ChessSquare.fromString(command.substring(2))!;

        const originRank = turn == ChessColor.WHITE ? destination.down!.rank : destination.up!.rank;
        const origin = ChessSquare.fromString(originFile + originRank)!;

        return new ParseResult(origin.toString(), destination.toString(), true, ChessPieceType.PAWN);
    }

    private parsePieceCapture(command: string, turn: ChessColor): ParseResult | undefined {

        const piece = pieceFromString(command[0]);
        const destination = ChessSquare.fromString(command.substring(2))!;
        return new ParseResult(undefined, destination.toString(), true, piece);
    }
}
