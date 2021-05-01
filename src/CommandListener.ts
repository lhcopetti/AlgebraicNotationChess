import { ChessBoard } from './chess/core/ChessBoard'

export default interface CommandListener {

    handleCommand(command: string, board: ChessBoard): void;
}
