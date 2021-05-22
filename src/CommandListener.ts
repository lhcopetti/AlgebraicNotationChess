import ChessGame from './chess/core/ChessGame';

export default interface CommandListener {

    handleCommand(command: string, board: ChessGame): void;
}
