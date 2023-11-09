import { useState } from 'react';
import './App.css';
import Board from './components/Board';
import ScoreBoard from './components/ScoreBoard';
import ResetButton from './components/ResetButton';

function App() {
  const WIN_CONDITIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

   const [board, setBoard] = useState(Array(9).fill(null));
   const [xPlaying, setXPlaying] = useState(true);
   const [scores, setScores] = useState({xScore: 0, oScore: 0})
   const [gameOver, setGameOver] = useState(false)
   
   const handleBoxClick = (boxIdx) => {
    if (gameOver || board[boxIdx]) {
      // Ignore clicks if the game is over or the box is already filled.
      return;
    }

    const updatedBoard = board.map((value, idx) => {
      if(idx === boxIdx) {
        return xPlaying === true ? "X" : "O";
      } else {
        return value;
      }
    })
    const winner = checkWinner(updatedBoard)
    if(winner){
      if(winner === "O"){
         setScores((prevScores) => ({ ...prevScores, oScore: prevScores.oScore + 1 }));
      }else{
        setScores((prevScores) => ({ ...prevScores, xScore: prevScores.xScore + 1 }));
      }
      setGameOver(true);
    } else if (!updatedBoard.includes(null)) {
      // If there is no winner and no empty squares, it's a draw.
      setGameOver(true);
    }
    setBoard(updatedBoard);
    setXPlaying(!xPlaying);
   }

   const checkWinner = (board) => {
    for(let i=0 ; i< WIN_CONDITIONS.length; i++){
      const [x,y,z] = WIN_CONDITIONS[i]

      if(board[x] && board[x] === board[y] && board[y] === board[z]){
        return board[x];
      }
    }
    return null; // Return null when there's no winner.
   }
    
   const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null))
   }

  return (
    <div>
    <ScoreBoard scores={scores} xPlaying={xPlaying}/>
    <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick}/>
    <ResetButton resetBoard={resetBoard}/>
    </div>
  );
}

export default App;
