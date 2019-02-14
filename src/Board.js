import React from 'react';
import Square from './Square';

function RenderSquare ({ value, onClick }) {
  return (
    <Square
      value={value}
      onClick={onClick}
    />
  )
}

function genSquare(start, squares, onClick) {
  return (
    <div className="board-row">
      {
        Array.from({ length: 3}).map((val, index, arr) => (
          <RenderSquare
            key={index}
            value={squares[start + index]}
            onClick={ () => onClick((start + index)) }
          />
        ))
      }
    </div>
  )
}

function Board ({ squares, onClick }) {
  return (
    <div>
      { genSquare(0, squares, onClick) }
      { genSquare(3, squares, onClick) }
      { genSquare(6, squares, onClick) }
    </div>
  )
}

export default Board;