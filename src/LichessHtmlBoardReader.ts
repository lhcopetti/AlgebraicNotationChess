
import { ChessBoard } from './chess/core/ChessBoard';

class HtmlPiece {
    classList: string;
    style: string;

    constructor(classList: string, style: string) {
        this.classList = classList;
        this.style = style;
    }
}

class HtmlBoardDescriptor {

    height: number;
    width: number;
    pieces: HtmlPiece[];

    constructor(height: number, width: number, pieces: HtmlPiece[]) {
        this.height = height;
        this.width = width;
        this.pieces = pieces;
    }
}

export default class LichessHtmlBoardReader {

    readBoard(document: Document) {
        const htmlBoardDescriptor = this.readBoardDescriptor(document);
        console.log(htmlBoardDescriptor);
        return this.createChessBoard(htmlBoardDescriptor);
    }

    readBoardDescriptor(document: Document) {
        const cgContainer = document.querySelector("cg-container");
        const cgBoard = document.querySelector("cg-board");

        if (cgContainer == null || cgBoard == null) {
            throw new Error("Could not find cg-container or cg-board elements");
        }

        const boardWidth = cgContainer.getBoundingClientRect().width;
        const boardHeight = cgContainer.getBoundingClientRect().height;
        const htmlPieces = Array.from(cgBoard.children as HTMLCollectionOf<HTMLElement>)
            .map(htmlPiece => {
                return {
                    classList: htmlPiece.classList.value,
                    style: htmlPiece.style.cssText
                };
            });

        return new HtmlBoardDescriptor(boardHeight, boardWidth, htmlPieces);
    }

    createChessBoard(htmlBoardDescriptor: HtmlBoardDescriptor): ChessBoard {
        //throw new Error();
        return ChessBoard.fromList([]);
    }

}
