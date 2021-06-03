import ChessPiece from '../core/ChessPiece';
import { ChessPieceType, pieceFromString } from '../core/ChessPieceType';
import { ChessBoard } from '../core/ChessBoard';
import { ChessSquare, files, ranks } from '../core/ChessSquare';
import ChessColor from '../core/ChessColor';
import ParseResult from './ParseResult';

export default class CommandParser {
    public parse(command: string, turn: ChessColor): ParseResult {
        let result;

        if (result = this.parseCastle(command, turn)) {
            return result;
        }

        if (result = this.parsePromotion(command, turn)) {
            return result;
        }

        if(result = this.parsePieceMove(command, turn))
            return result;

        throw Error(`Could not parse command: ${command}`);
    }

    private parseCastle(command: string, turn: ChessColor): ParseResult | undefined {
        const rank = turn == ChessColor.WHITE ? '1' : '8';

        if (command == 'O-O-O') return new ParseResult(`e${rank}`, `c${rank}`, false, ChessPieceType.KING);

        if (command == 'O-O') return new ParseResult(`e${rank}`, `g${rank}`, false, ChessPieceType.KING);
    }

    private parsePromotion(command: string, turn: ChessColor): ParseResult | undefined {
        const index = command.indexOf('=');
        if (index < 0) return;

        const file = command[0];
        const promotion = pieceFromString(command.substring(index + 1));
        const piece = ChessPieceType.PAWN;
        const destination = ChessSquare.fromString(command.substring(index - 2, index))!;
        const origin = file + this.getPreviousSquare(destination, turn).rank;
        const capture = command.includes('x');

        return new ParseResult(origin, destination.toString(), capture, piece, promotion);
    }

    private parsePieceMove(command: string, turn: ChessColor): ParseResult {

        const destSquare = this.parseDestination(command);
        command = this.consumeDestination(command);

        const pieceType = this.parsePieceType(command);
        command = this.consumePieceType(command);

        const desambiguatingFile = this.parseDesambiguatingFile(command);
        command = this.consumeDesambiguatingFile(command);

        const isCapture = this.parseCapture(command);
        command = this.consumeCapture(command);

        const computedOrigin = this.computeOriginFromPawnCapture(destSquare, desambiguatingFile, turn, pieceType, isCapture);

        return new ParseResult(computedOrigin?.toString(), destSquare.toString(), isCapture, pieceType);
    }

    private parseDestination(command: string): ChessSquare {
        const sq = command.substring(command.length - 2, command.length);
        return ChessSquare.fromString(sq)!;
    }

    private consumeDestination(command: string): string {
        return command.substring(0, command.length - 2);
    }

    private parsePieceType(command: string): ChessPieceType {
        if (command.length == 0)
            return ChessPieceType.PAWN;

        const piece = command.charAt(0);

        if (files.includes(piece))
            return ChessPieceType.PAWN;

        return pieceFromString(piece);
    }

    private consumePieceType(command: string): string {
        if (command.length == 0)
            return command;

        try {
            const piece = command.charAt(0);
            pieceFromString(piece);
            return command.substring(1);
        } catch(e) {
            return command;
        }
    }

    private parseDesambiguatingFile(command: string): string | undefined {
        if (command.length == 0)
            return undefined;

        const file = command.charAt(0)
        if (files.includes(file))
            return file;

        return undefined;
    }

    private consumeDesambiguatingFile(command: string): string {
        if (command.length == 0)
            return command;

        const file = command.charAt(0)
        if (files.includes(file))
            return command.substring(1);

        return command;
    }

    private parseCapture(command: string): boolean {
        if (command.length == 0)
            return false;

        return command.charAt(0) == 'x';
    }

    private consumeCapture(command: string): string {
        if (command.length == 0 || !command.startsWith('x'))
            return command;

        return command.substring(1);
    }

    private computeOriginFromPawnCapture(destination: ChessSquare
                            , desambiguatingFile: string | undefined
                            , turn: ChessColor
                            , pieceType: ChessPieceType
                            , isCapture: boolean
                            ): ChessSquare | undefined {

        if (!desambiguatingFile || pieceType != ChessPieceType.PAWN || !isCapture)
            return undefined;

        const originFile = desambiguatingFile;

        const originRank = this.getPreviousSquare(destination, turn).rank;
        const origin = ChessSquare.fromString(originFile + originRank)!;

        return origin;
    }

    private getPreviousSquare(square: ChessSquare, turn: ChessColor): ChessSquare {
        return turn == ChessColor.WHITE ? square.down! : square.up!;
    }
}
