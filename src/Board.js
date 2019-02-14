/**
 * 棋盘组件
 */
import React from 'react';
import Square from './Square';

/**
 * 棋盘组件
 * @param {Array} squares 当前棋盘棋子状态
 * @param {Function} onClick 父组件的点击事件
 */
function Board ({ squares, onClick }) {
  /**
   * 渲染一行棋盘(三格)
   * @param {number} start 每一行棋盘的起始index，用于加上遍历时的index来获取真实index
   */
  const renderSquare = (start) => {
    return (
      <div className="board-row">
        {
          Array.from({ length: 3}).map((val, index, arr) => (
            <Square
              key={index}
              value={squares[start + index]}
              onClick={ () => onClick((start + index)) }
            />
          ))
        }
      </div>
    )
  };
  return (
    <div>
      { renderSquare(0) }
      { renderSquare(3) }
      { renderSquare(6) }
    </div>
  )
}

export default Board;