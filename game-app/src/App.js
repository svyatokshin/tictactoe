import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import Square from './components/Square';
import {Paterns, Patterns} from './Patterns';
import Depaulo from './images/Depaulo.jpg';

function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("O");
  const [result, setResult] = useState({winner: "No One", state: ""});

  useEffect(() => {
    checkIfWin();
    checkTie();
    if (player === 'X'){
      setPlayer('O')
    }
    else {
      setPlayer('X')
      }
    
  }, [board]);

  useEffect(() => {
    if (result.state !== ""){
      restart();
    }
  }, [result])

  const squareDecision = (square) => {
    
    setBoard(
      board.map((val, index) => {
      if (index === square && val === "") {
        return player;
      }
      if (index === square && val !== ""){
        if (player === 'X'){
          setPlayer('O')
        }
        else {
          setPlayer('X')
        }
      }
      return val;
      })
    )
  }

  const checkIfWin = () => {
    Patterns.forEach((currPat) => {
      const firstPlayer = board[currPat[0]];
      if(firstPlayer === "" ) return
      let foundWinningPattern = true;
      currPat.forEach(index => {
        if (board[index] !== firstPlayer){
          foundWinningPattern = false;
        }
      })
      if (foundWinningPattern) {
        setResult({
          winner: player,
          state: "Won"
        })
      }
    });
  }

  const checkTie = () => {
    let filled = true;
    board.forEach((square) => {
      if(square === ""){
        filled = false
      } 
    })
    if (filled) {
      setResult({
        winner:"Both",
        state: 'Tied'})
    }
  }

  const restart = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("O");
  }

  return (
    <div className="App">
      <h1>Current Player {player}</h1>
      <h2> Winner: {result.winner} {result.state}</h2>
      <div className="board">
        <div className="row">
          <Square val={board[0]} squareDecision={() => squareDecision(0)}/>
          <Square val={board[1]} squareDecision={() => squareDecision(1)}/>
          <Square val={board[2]} squareDecision={() => squareDecision(2)}/>
        </div>
        <div className="row">
          <Square val={board[3]} squareDecision={() => squareDecision(3)}/>
          <Square val={board[4]} squareDecision={() => squareDecision(4)}/>
          <Square val={board[5]} squareDecision={() => squareDecision(5)}/>
        </div>
        <div className="row">
          <Square val={board[6]} squareDecision={() => squareDecision(6)}/>
          <Square val={board[7]} squareDecision={() => squareDecision(7)}/>
          <Square val={board[8]} squareDecision={() => squareDecision(8)}/>
        </div>
      </div>
    </div>
  );
}

export default App;
