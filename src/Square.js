import React from 'react';

/**
 * 棋盘单格方块
 * @param {Function} onClick 父组件的点击事件
 * @param {string} value 当前棋子对应的状态(null, X, O)
 */
function Square({ onClick, value }) {
  return (
    <button
      className="square"
      onClick={ () => onClick() }
    >
      { value }
    </button>
  )
}

export default Square;