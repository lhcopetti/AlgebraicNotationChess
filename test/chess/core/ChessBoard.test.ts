import { ChessBoard, LocalizedPiece } from '../../../src/chess/core/ChessBoard';
import ChessPieceType from '../../../src/chess/core/ChessPieceType';
import ChessColor from '../../../src/chess/core/ChessColor';


const assert = require('assert');

describe('ChessBoard initialization', function() {

    it('a single pawn on e4', function() {
        const pieces: [LocalizedPiece] = [
            [ "e4", ChessPieceType.PAWN, ChessColor.WHITE ]
        ];

        const board = ChessBoard.fromStringList(pieces);

        const chessPiece = board.getAt("e4");

        //assert.equal(chessPiece?.piece, ChessPieceType.PAWN);
        //assert.equal(chessPiece?.color, ChessColor.WHITE);
    });

});

