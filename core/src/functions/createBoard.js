import Piece from "../components/Piece";

const createBoard = () => {
    const squares = Array(64).fill(null);

    squares[0] = new Piece(2);
    squares[2] = new Piece(2);
    squares[4] = new Piece(2);
    squares[6] = new Piece(2);
    squares[9] = new Piece(2);
    squares[11] = new Piece(2);
    squares[13] = new Piece(2);
    squares[15] = new Piece(2);
    squares[16] = new Piece(2);
    squares[18] = new Piece(2);
    squares[20] = new Piece(2);
    squares[22] = new Piece(2);

    squares[41] = new Piece(1);
    squares[43] = new Piece(1);
    squares[45] = new Piece(1);
    squares[47] = new Piece(1);
    squares[48] = new Piece(1);
    squares[50] = new Piece(1);
    squares[52] = new Piece(1);
    squares[54] = new Piece(1);
    squares[57] = new Piece(1);
    squares[59] = new Piece(1);
    squares[61] = new Piece(1);
    squares[63] = new Piece(1);

    return squares;
}

export default createBoard;