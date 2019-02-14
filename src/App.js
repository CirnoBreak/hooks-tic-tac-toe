import React, { useReducer } from 'react';
import './App.css';
import Board from './Board';

const initState = {
  history: [{
    squares: Array(9).fill(null),
  }],
  xIsNext: true
};

function reducer(state, action) {
  switch(action.type) {
    case 'changeSquares':
      const { history, xIsNext } = state;
      const { index }= action;
      const { squares } = history[history.length - 1];
      const newSquares = squares.slice();
      if (calculateWinner(squares) || squares[index]) {
        return state;
      }
      newSquares[index] = xIsNext ? 'X' : 'O';
      return {
        ...state,
        history: [...history, {squares: newSquares}],
        xIsNext: !xIsNext
      }
    default:
      return state;
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App () {
  const [state, dispatch] = useReducer(reducer, initState);
  const { history, xIsNext } = state;
  const { squares } = history[history.length - 1];
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={squares}
          onClick={(i) => dispatch({ type: 'changeSquares', index: i })}
        />
      </div>
      <div className="game-info">
        <div>{ status }</div>
        <ol></ol>
      </div>
    </div>
  );
}

export default App;
