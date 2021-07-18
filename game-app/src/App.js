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
  const [isAiTurn, setIsAiTurn] = useState(false);
  const [boardIndex, setBoardIndex] = useState([]);
  const [count, setCount] = useState(0);
  let finishedBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];


  useEffect(() => {
    console.log('running useEffect')
    checkIfTie();
    checkIfWin();
    
    // if (count === 9){
    //   checkIfFull();
    // }
    console.log('count', count);
    
    setBoardIndex(board.map((item, index) => {
        if(item !== ""){
          return index;
        }
      }))
    if (player === 'X'){
      setPlayer('O')
    }
    else {
      setPlayer('X')
      }
  }, [board]);

  useEffect(() => {
    console.log(count);
    if(board == boardIndex){
      checkIfTie();
      checkIfWin();
      
    }
    if(isAiTurn){
      console.log('boardIndex', boardIndex);
      let rand = Math.floor(Math.random() * 9)
      while (boardIndex.includes(rand)){
        rand = Math.floor(Math.random() * 9)
      }
      squareDecision(rand);
    }
    setIsAiTurn(false)
  }, [player])

  useEffect(() => {
    if (result.state !== ""){
      restart();
    }
  }, [result])

  const squareDecision = (square) => {
    setBoard(
      board.map((val, index) => {
      if (index === square && val === "" && player === 'X') {
        setIsAiTurn(true)
        return player
      }
      if (index === square && val === "" && player === 'O') {
        setCount(count + 1);
        return player
      }
      if (index === square && val !== ""){
        if (player === 'X'){
          setPlayer('O')
        }
        else {
          setPlayer('X')
        }
      }
      setCount(count+1);
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
        let newWinner = player
        if (player === "X"){
          newWinner = "Mush";
        }
        if (player === 'O'){
          newWinner = "Ryan";
        }
        setCount(0)
        setResult({
          winner: newWinner,
          state: "Wins!"
        })
      }
    });
  }

  const checkIfTie = () => {
    let filled = true;
    board.forEach((square) => {
      if(square === ""){
        filled = false
      } 
    })
    if (filled) {
      checkIfWin();
      setResult({
        winner:"Both",
        state: 'Tied'})
    }
  }

  const checkIfFull = () => {
    setBoardIndex(board.map((item, index) => {
      if(item !== ""){
        return index;
      }
    }))
    if (boardIndex == finishedBoard){
      checkIfWin();
      restart();
    }
  }

  const restart = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("O");
  }

  return (
    <div className="App">
      <h1>Current Degen: {player == 'O' ? "Ryan" : "Mush"}</h1>
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
