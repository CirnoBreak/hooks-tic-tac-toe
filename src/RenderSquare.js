import Square from './Square';
import React, { useReducer } from 'react';

const initState = {
  squares: Array(9).fill(null),
};

function reducer(state, action) {
  switch(action.type) {
    case 'changeSquares':
      const { squares } = state;
      const { xIsNext, index }= action;
      const newSquares = squares.slice();
      newSquares[index] = xIsNext ? 'X' : 'O';
      return {
        ...state,
        squares: newSquares,
      }
    default:
      return state;

  }
}

function RenderSquare ({ index, xIsNext, onClick }) {
  const [state, dispatch] = useReducer(reducer, initState);
  const { squares } = state;
  return (
    <Square
      value={squares[index]}
      onClick={() => {
        dispatch({type: 'changeSquares', index, xIsNext});
        onClick();
      }}
    />
  )
}

export default RenderSquare;