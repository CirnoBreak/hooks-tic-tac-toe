import React from 'react';
import './App.css';
import Board from './Board';

function App () {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div></div>
          <ol></ol>
        </div>
      </div>
    );
}

export default App;
