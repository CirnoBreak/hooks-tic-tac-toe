/**
 * 井字棋游戏组件
 */
import React, { useReducer } from 'react';
import './Game.css';
import Board from './Board';

// 初始状态，相当于constructor里面的this.state
const initState = {
  history: [{
    squares: Array(9).fill(null),
  }],
  xIsNext: true,
  stepNumber: 0
};

// 相当于classComponent里面的事件
function reducer(state, action) {
  const { history, xIsNext, stepNumber } = state;
  switch(action.type) {
    // 改变井字棋的棋子的事件
    case 'changeSquares':
      const { index }= action;
      const newHistory = history.slice(0, stepNumber + 1);
      // 当前时间点对应的棋盘
      const { squares } = newHistory[newHistory.length - 1];
      const newSquares = squares.slice();
      // 如果有赢家或者当前位置的棋子已下，不执行修改动作
      if (calculateWinner(squares) || squares[index]) {
        return state;
      }
      // 在空白位置下棋，根据当前下棋的player显示X还是O
      newSquares[index] = xIsNext ? 'X' : 'O';
      return {
        ...state,
        history: [...newHistory, {squares: newSquares}],
        xIsNext: !xIsNext,
        stepNumber: newHistory.length
      }
    // 时间旅行的动作
    case 'jumpTo':
      return {
        ...state,
        stepNumber: action.step,
        xIsNext: (action.step % 2) === 0
      }
    default:
      return state;
  }
}

// 计算出winner的方法
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

// 井字棋游戏组件
function Game () {
  const [state, dispatch] = useReducer(reducer, initState);
  const { history, xIsNext, stepNumber } = state;
  // 当前时间点对应的棋盘状态
  const { squares } = history[stepNumber];
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  // 时间点选择组件
  const moves = history.map((step, move) => {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start';
    return (
      <li key={move}>
        <button onClick={ () =>  dispatch({ type: 'jumpTo', step: move }) }>{desc}</button>
      </li>
    )
  })
  

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
        <ol>{ moves }</ol>
      </div>
    </div>
  );
}

export default Game;
