
import ChessBoard from '/src/ChessBoard';

export default class LichessHtmlBoardReader {

    readBoard(document) {
        const htmlBoardDescriptor = this.readBoardDescriptor(document);
        console.log(htmlBoardDescriptor);
        return this.createChessBoard(htmlBoardDescriptor);
    }

    readBoardDescriptor(document) {

        const cgContainer = document.querySelector("cg-container");
        const cgBoard = document.querySelector("cg-board");

        const boardWidth = cgContainer.getBoundingClientRect().width;
        const boardHeight = cgContainer.getBoundingClientRect().height;
        const htmlPieces = Array.from(cgBoard.children)
            .map(htmlPiece => {
                return {
                    classList: htmlPiece.classList.value,
                    style: htmlPiece.style.cssText
                };
            });

        return {
            height: boardHeight,
            width: boardWidth,
            pieces: htmlPieces
        };
    }

    createChessBoard(htmlBoardDescriptor) {
        return new ChessBoard(htmlBoardDescriptor.pieces);
    }

}
