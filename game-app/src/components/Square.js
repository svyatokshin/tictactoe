import React, {useEffect} from 'react';
import Depaulo from '../images/Depaulo.jpg'
import Mush from '../images/Mush.jpg';
import '../App.css';
import styled from 'styled-components';

const Img = styled.img`
    width: 65px;

`

function Square({ val, squareDecision }) {
    let value = val;
    if (val == 'X'){
        val = <Img src={Mush}/>
    }
    console.log('val', value);
    return(
        <div className="square" onClick={squareDecision}>
            { val == "O" ? <Img src={Depaulo}/>: <h5>{val}</h5>}
        </div>
    )
}

export default Square;