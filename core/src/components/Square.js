import React from 'react';
import '../assets/Game.css';

const Square = (props) => {
    return (
        <button 
        className={"square " + props.color}
        onClick={props.onClick}
        style={props.style}>
        </button>
    );
}

export default Square;