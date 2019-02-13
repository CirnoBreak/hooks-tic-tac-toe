import React, { useState } from 'react';
import RenderSquare from './RenderSquare';

function Board () {
  const status = 'Next player: X';
  const [xIsNext, setXIsNext] = useState(true);
  return (
    <div>
      <div className="status">{ status }</div>
      <div className="board-row">
        <RenderSquare index="0" xIsNext={xIsNext} onClick={() => setXIsNext(!xIsNext)} />
        <RenderSquare index="1" xIsNext={xIsNext} onClick={() => setXIsNext(!xIsNext)} />
        <RenderSquare index="2" xIsNext={xIsNext} onClick={() => setXIsNext(!xIsNext)} />
      </div>
      <div className="board-row">
        <RenderSquare index="3" xIsNext={xIsNext} onClick={() => setXIsNext(!xIsNext)} />
        <RenderSquare index="4" xIsNext={xIsNext} onClick={() => setXIsNext(!xIsNext)} />
        <RenderSquare index="5" xIsNext={xIsNext} onClick={() => setXIsNext(!xIsNext)} />
      </div>
      <div className="board-row">
        <RenderSquare index="6" xIsNext={xIsNext} onClick={() => setXIsNext(!xIsNext)} />
        <RenderSquare index="7" xIsNext={xIsNext} onClick={() => setXIsNext(!xIsNext)} />
        <RenderSquare index="8" xIsNext={xIsNext} onClick={() => setXIsNext(!xIsNext)} />
        
      </div>
    </div>
  )
}

export default Board;