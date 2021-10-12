import React from 'react';
import blackPiece from '../assets/blackPiece.png';
import redPiece from '../assets/redPiece.png';

class Piece extends React.Component {
    constructor(player){
        super();
        this.player = player;
        this.style = (player === 1 ? 
            {backgroundImage: `url(${blackPiece})`, backgroundSize: 'contain'} : 
            {backgroundImage: `url(${redPiece})`, backgroundSize: 'contain'});
    }

    isPossible(start, end) {
        return ((Math.abs(start - end) % 7 === 0 && Math.abs(start - end) / 7 <= 2) 
        || (Math.abs(start - end) % 9 === 0 && Math.abs(start - end) / 9 <= 2))
    }

    getDestPath(start, end) {
        let path = [], pathStart, pathEnd, inc

        if (start > end) {
            pathStart = end;
            pathEnd = start;
        } else {
            pathStart = start;
            pathEnd = end;
        }

        if (Math.abs(pathStart - pathEnd) % 7 === 0) {
            inc = 7;
            pathStart += inc;
        } else if (Math.abs(pathStart - pathEnd) % 9 === 0) {
            inc = 9;
            pathStart += inc;
        }

        for (let i = pathStart; i < pathEnd; i += inc) {
            path.push(i);
        }

        return path;
    }
}

export default Piece;