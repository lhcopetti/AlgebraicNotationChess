import ChessPiece from '../core/ChessPiece';
import { ChessPieceType, pieceFromString } from '../core/ChessPieceType';
import { ChessBoard } from '../core/ChessBoard';
import { ChessSquare, files, ranks } from '../core/ChessSquare';
import ChessColor from '../core/ChessColor';
import ParseResult from './ParseResult';
import StringStream from './StringStream';

export default class CommandParser {
    public parse(command: string, turn: ChessColor): ParseResult {
        let result;

        if (result = this.parseCastle(command, turn)) {
            return result;
        }

        if (result = this.parsePromotion(command, turn)) {
            return result;
        }

        const stream = new StringStream(command);
        if(result = this.parsePieceMove(stream, turn))
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

    private parsePieceMove(stream: StringStream, turn: ChessColor): ParseResult {

        const destSquare = this.parseDestination(stream);

        const pieceType = this.parsePieceType(stream);

        const disambiguatingFile = this.parseDisambiguatingFile(stream);
        const disambiguatingRank = this.parseDisambiguatingRank(stream);

        const isCapture = this.parseCapture(stream);

        const computedOrigin = this.computeOriginFromPawnCapture(destSquare, disambiguatingFile, turn, pieceType, isCapture);

        return new ParseResult(computedOrigin?.toString(), destSquare.toString(), isCapture, pieceType, undefined, disambiguatingFile, disambiguatingRank);
    }

    private parseDestination(stream: StringStream): ChessSquare {
        const sq = stream.content.substring(stream.length - 2, stream.length);
        const square = ChessSquare.fromString(sq)!;

        stream.slice(0, stream.length - 2);
        return square;
    }

    private parsePieceType(stream: StringStream): ChessPieceType {
        if (stream.empty)
            return ChessPieceType.PAWN;

        const piece = stream.content.charAt(0);

        if (files.includes(piece)) {
            return ChessPieceType.PAWN;
        }
        
        stream.consumeOne();
        return pieceFromString(piece);
    }

    private parseDisambiguatingFile(stream: StringStream): string | undefined {
        if (stream.empty)
            return undefined;

        const file = stream.content.charAt(0)
        if (!files.includes(file))
            return undefined;

        stream.consumeOne();
        return file;
    }

    private parseDisambiguatingRank(stream: StringStream): number | undefined {
        if (stream.empty)
            return undefined;

        const rank = +stream.content.charAt(0)
        if (!ranks.includes(rank))
            return undefined;

        stream.consumeOne();
        return rank;
    }

    private parseCapture(stream: StringStream): boolean {
        if (stream.empty)
            return false;

        if (stream.content.charAt(0) != 'x')
            return false;

        stream.consumeOne();
        return true;
    }

    private computeOriginFromPawnCapture(destination: ChessSquare
                            , disambiguatingFile: string | undefined
                            , turn: ChessColor
                            , pieceType: ChessPieceType
                            , isCapture: boolean
                            ): ChessSquare | undefined {

        if (!disambiguatingFile || pieceType != ChessPieceType.PAWN || !isCapture)
            return undefined;

        const originFile = disambiguatingFile;

        const originRank = this.getPreviousSquare(destination, turn).rank;
        const origin = ChessSquare.fromString(originFile + originRank)!;

        return origin;
    }

    private getPreviousSquare(square: ChessSquare, turn: ChessColor): ChessSquare {
        return turn == ChessColor.WHITE ? square.down! : square.up!;
    }
}
