// TicTacToe.js

import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  const handleMove = (index) => {
    if (board[index] === '' && !winner) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      checkWinner(newBoard);
    }
  };

  const checkWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }

    if (!board.includes('')) {
      setWinner('Draw');
    }
  };

  const renderCell = (index) => {
    return (
      <div className="cell" onClick={() => handleMove(index)}>
        {board[index]}
      </div>
    );
  };

  const renderBoard = () => {
    return (
      <div className="board">
        {board.map((cell, index) => (
          renderCell(index)
        ))}
      </div>
    );
  };

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setCurrentPlayer('X');
    setWinner(null);
  };


  return (
    <div className="container">
      <h1>Tic-Tac-Toe</h1>
      {renderBoard()}
      <div className="status">
      
        {!winner && (
          <p>Current player: {currentPlayer}</p>
        )}
        {winner && (
          <div className="popup">
             <p>Player {winner} wins!</p>
            <button onClick={resetGame}>New Game</button>
          </div>
        )}
      </div>
    </div>

  );
};

export default App;
