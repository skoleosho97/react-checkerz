import React from 'react';
import Board from './Board.js';
import createBoard from '../functions/createBoard.js';
import '../assets/Game.css';

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            squares: createBoard(),
            takenRedPieces: 0,
            takenBlackPieces: 0,
            player: 1,
            sourceSelection: -1,
            status: '',
            turn: 'black'
        }
    }

    handleClick(i) {
        const squares = this.state.squares.slice();

        if (this.state.sourceSelection === -1) {
            if (!squares[i] || !(squares[i].player === this.state.player)) {
                this.setState({status: "Please select a player " + this.state.player + " piece."});
            } else {
                squares[i].style = {...squares[i].style, backgroundColor: "#FFDCD4"};
                this.setState({
                    status: "Choose destination for the selected piece",
                    sourceSelection: i
                });
            }
        } else if (this.state.sourceSelection > -1) {
            squares[this.state.sourceSelection].style = 
                {...squares[this.state.sourceSelection].style, backgroundColor: null};
            if (squares[i] && squares[i].player === this.state.player) {
                this.setState({
                    status: "Cannot choose your occupied space. Choose valid source and destination again.",
                    sourceSelection: -1,
                });
            } else {
                const squares = this.state.squares.slice();
                let takenRedPieces = this.state.takenRedPieces;
                let takenBlackPieces = this.state.takenBlackPieces;
                const isPossible = 
                    squares[this.state.sourceSelection].isPossible(this.state.sourceSelection, i);
                const destPath = 
                    squares[this.state.sourceSelection].getDestPath(this.state.sourceSelection, i);
                const isMoveLegal = this.isMoveLegal(destPath);
                
                if (isPossible && isMoveLegal) {
                    if (destPath.length === 1) {
                        if (squares[this.getInBetween(this.state.sourceSelection, i)].player === 1) {
                            takenBlackPieces++;
                        } else {
                            takenRedPieces++;
                        }
                        squares[i] = squares[this.state.sourceSelection];
                        squares[this.state.sourceSelection] = null;
                        squares[this.getInBetween(this.state.sourceSelection, i)] = null;
                        let player = this.state.player === 1 ? 2: 1;
                        let turn = this.state.turn === 'red' ? 'black' : 'red';
                        this.setState({
                            sourceSelection: -1,
                            squares: squares,
                            takenBlackPieces: takenBlackPieces,
                            takenRedPieces: takenRedPieces,
                            player: player,
                            status: '',
                            turn: turn
                        });
                    } else {
                        squares[i] = squares[this.state.sourceSelection];
                        squares[this.state.sourceSelection] = null;
                        let player = this.state.player === 1 ? 2: 1;
                        let turn = this.state.turn === 'red' ? 'black' : 'red';
                        this.setState({
                          sourceSelection: -1,
                          squares: squares,
                          takenBlackPieces: takenBlackPieces,
                          takenRedPieces: takenRedPieces,
                          player: player,
                          status: '',
                          turn: turn
                        });
                    }
                } else {
                    this.setState({
                        status: "Illegal move. Please try again.",
                        sourceSelection: -1,
                    });
                }
            }
        }

        if (this.state.takenRedPieces === 12) {
            this.setState({status: "Game over! Player 1 wins."});
        } else if (this.state.takenBlackPieces === 12) {
            this.setState({status: "Game over! Player 2 wins."});
        }
    }

    isMoveLegal(destPath) {
        let isLegal = true;
        let count = 0;

        for (let i = 0; i < destPath.length; i++) {
            if (this.state.squares[destPath[i]] !== null 
                && this.state.squares[destPath[i]].player === this.state.player) {
              isLegal = false;
            } else if (this.state.squares[destPath[i]] === null ) {
                count++;
            }
        }

        if (count === destPath.length && destPath.length === 1) {
            isLegal = false;
        }
        
        return isLegal;
    }

    getInBetween(a, b) {
        let inc = Math.abs(a - b) / 2;

        if (a > b) {
            return a - inc;
        } else if (a < b) {
            return a + inc;
        }
    }

    render () {
        return (
            <div>
                <div className="container">
                    <div className="board">
                        <Board
                        squares = {this.state.squares}
                        onClick = {(i) => this.handleClick(i)}
                        />
                    </div>
                    <div className="details">
                        <div className="turn">Current Turn: {this.state.turn}</div>
                        <div className="status">{this.state.status}</div>
                    </div>   
                </div>
            </div>
        );
    }
}

export default Game;