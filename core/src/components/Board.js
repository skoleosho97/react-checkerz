import React from 'react';
import Square from './Square';
import '../assets/Game.css';

class Board extends React.Component {

    renderSquare(i, color) {
        return <Square
        piece = {this.props.squares[i]}
        style = {this.props.squares[i] ? this.props.squares[i].style : null}
        color = {color}
        onClick = {() => this.props.onClick(i)} 
        />
    };

    render() {
        const board = [];

        for (let i = 0; i < 8; i++) {
            const squareRows = [];

            for(let j = 0; j < 8; j++) {
                const squareColor = (i % 2 === 0 && j % 2 === 0) || (!((i % 2) === 0) && !((j % 2) === 0))
                    ? "dark" : "light";
                squareRows.push(this.renderSquare((i * 8) + j, squareColor));
            }

            board.push(<div className="row">{squareRows}</div>)
        }

        return (
            <div>
                {board}
            </div>
        );
    }
}

export default Board;