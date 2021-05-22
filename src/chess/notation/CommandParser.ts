import { ChessPieceType, pieceFromString } from '../core/ChessPieceType';
import { ChessSquare, files } from '../core/ChessSquare';
import ChessColor from '../core/ChessColor';
import ParseResult from './ParseResult';

export default class CommandParser {
    public parse(command: string, turn: ChessColor): ParseResult {
        let result = this.parseCastle(command, turn);
        if (result) return result;

        result = this.parsePromotion(command, turn);
        if (result) return result;

        if (command.length === 2) {
            return new ParseResult(undefined, command, false, ChessPieceType.PAWN);
        }

        if (command.length === 3) {
            const piece = pieceFromString(command[0]);
            const destination = command.substring(1);
            return new ParseResult(undefined, destination, false, piece);
        }

        result = this.parseCapture(command, turn);
        if (result) return result;

        throw Error(`Could not parse command: ${command}`);
    }

    private static parseCastle(command: string, turn: ChessColor): ParseResult | undefined {
        const rank = turn === ChessColor.WHITE ? '1' : '8';

        if (command === 'O-O-O') return new ParseResult(`e${rank}`, `c${rank}`, false, ChessPieceType.KING);

        if (command === 'O-O') return new ParseResult(`e${rank}`, `g${rank}`, false, ChessPieceType.KING);

        return undefined;
    }

    private static parsePromotion(command: string, turn: ChessColor): ParseResult | undefined {
        const index = command.indexOf('=');
        if (index < 0) return undefined;

        const file = command[0];
        const promotion = pieceFromString(command.substring(index + 1));
        const piece = ChessPieceType.PAWN;
        const destination = ChessSquare.fromString(command.substring(index - 2, index))!;
        const origin = file + this.getPreviousSquare(destination, turn).rank;
        const capture = command.includes('x');

        return new ParseResult(origin, destination.toString(), capture, piece, promotion);
    }

    private parseCapture(command: string, turn: ChessColor): ParseResult | undefined {
        if (command.length !== 4) return undefined;

        if (files.includes(command[0])) {
            return this.parsePawnCapture(command, turn);
        }

        return this.parsePieceCapture(command, turn);
    }

    private parsePawnCapture(command: string, turn: ChessColor): ParseResult | undefined {
        const originFile = command[0];
        const destination = ChessSquare.fromString(command.substring(2))!;

        const originRank = this.getPreviousSquare(destination, turn).rank;
        const origin = originFile + originRank;

        return new ParseResult(origin, destination.toString(), true, ChessPieceType.PAWN);
    }

    private static getPreviousSquare(square: ChessSquare, turn: ChessColor): ChessSquare {
        return turn === ChessColor.WHITE ? square.down! : square.up!;
    }

    private static parsePieceCapture(command: string): ParseResult | undefined {
        const piece = pieceFromString(command[0]);
        const destination = ChessSquare.fromString(command.substring(2))!;
        return new ParseResult(undefined, destination.toString(), true, piece);
    }
}
