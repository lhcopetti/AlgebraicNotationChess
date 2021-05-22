enum ChessPieceType {
    PAWN,
    ROOK,
    KNIGHT,
    BISHOP,
    QUEEN,
    KING,
}

const names = new Map([
    ['P', ChessPieceType.PAWN],
    ['R', ChessPieceType.ROOK],
    ['N', ChessPieceType.KNIGHT],
    ['B', ChessPieceType.BISHOP],
    ['Q', ChessPieceType.QUEEN],
    ['K', ChessPieceType.KING],
]);

function pieceFromString(piece: string) {
    const result = names.get(piece);

    if (result == null) throw new Error(`Cannot create ChessPieceType from string: ${piece}`);

    return result;
}

export { ChessPieceType, pieceFromString };
