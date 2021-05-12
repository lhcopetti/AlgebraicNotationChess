import ChessPiece from '../core/ChessPiece';
import { ChessPieceType, pieceFromString } from '../core/ChessPieceType';
import { ChessBoard } from '../core/ChessBoard'
import { ChessSquare } from '../core/ChessSquare'
import ChessColor from '../core/ChessColor';
import ParseResult from './ParseResult';

export default class CommandParser {

    parse(command: string, turn: ChessColor): ParseResult {

        if (command.length == 2)
            return new ParseResult(undefined, command, false, ChessPieceType.PAWN);

        if (command.length == 3) {
            const piece = pieceFromString(command[0]);
            const destination = command.substring(1)
            return new ParseResult(undefined, destination, false, piece);
        }

        if (command.length == 4) {
            const destination = ChessSquare.fromString(command.substring(2))!;

            const originRank = turn == ChessColor.WHITE ? destination.down!.rank : destination.up!.rank;
            const originFile = command[0];
            const origin = ChessSquare.fromString(originFile + originRank)!;

            return new ParseResult(origin.toString(), destination.toString(), true, ChessPieceType.PAWN);
        }

        throw Error("Could not parse command: " + command);
    }

}
