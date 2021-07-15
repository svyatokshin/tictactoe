import React, {useEffect} from 'react';
import Depaulo from '../images/Depaulo.jpg'
import '../App.css'

function Square({ val, squareDecision }) {
    let value = val;
    console.log('val', value);
    return(
        <div className="square" onClick={squareDecision}>
            { val == "O" ? <img src={Depaulo}/>: <h5>{val}</h5>}
        </div>
    )
}

export default Square;