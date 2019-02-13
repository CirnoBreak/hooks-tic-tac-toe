import React, { useReducer } from 'react';
import Square from './Square';

const initState = {
  squares: Array(9).fill(null),
  xIsNext: true
};

function reducer(state, action) {
  switch(action.type) {
    case 'changeSquares':
      const { squares, xIsNext } = state;
      const { index }= action;
      const newSquares = squares.slice();
      newSquares[index] = xIsNext ? 'X' : 'O';
      return {
        ...state,
        squares: newSquares,
        xIsNext: !xIsNext
      }
    default:
      return state;
  }
}

function RenderSquare ({ value, onClick }) {
  return (
    <Square
      value={value}
      onClick={onClick}
    />
  )
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


function genSquare(start, squares, dispatch) {
  return (
    <div className="board-row">
      {
        Array.from({ length: 3}).map((val, index, arr) => (
          <RenderSquare
            key={index}
            value={squares[start + index]}
            onClick={() => dispatch({type: 'changeSquares', index: start + index})}
          />
        ))
      }
    </div>
  )
}

function Board () {
  const [state, dispatch] = useReducer(reducer, initState);
  const { squares, xIsNext } = state;
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next Player: ' + (xIsNext ? 'X' : 'O');
  }
  return (
    <div>
      <div className="status">
        { status }
      </div>
      { genSquare(0, squares, dispatch) }
      { genSquare(3, squares, dispatch) }
      { genSquare(6, squares, dispatch) }
    </div>
  )
}

export default Board;