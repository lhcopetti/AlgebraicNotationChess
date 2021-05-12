
import ChessPiece from '../../../src/chess/core/ChessPiece';
import { ChessPieceType } from '../../../src/chess/core/ChessPieceType';
import ChessColor from '../../../src/chess/core/ChessColor';

describe('ChessPiece equality', () => {


    it('should be equal', () => {

        const lhs = new ChessPiece(ChessPieceType.KNIGHT, ChessColor.WHITE);
        const rhs = new ChessPiece(ChessPieceType.KNIGHT, ChessColor.WHITE);
        expect(lhs.equal(rhs)).toBeTruthy();

    });


});
