import React from 'react';
import '../App.css'

function Square({ val, squareDecision }) {
    return(
        <div className="square" onClick={squareDecision}>
            {val}
        </div>
    )
}

export default Square;