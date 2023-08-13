import React from "react";

type Props = {
  board: Array<Array<string | null>>;
  onClickCell: (row: number, col: number) => void;
};

const Board: React.FC<Props> = ({ board, onClickCell }) => {
  return (
    <div className="board">
      {board.map((rowValues, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {rowValues.map((cellValue, colIndex) => (
            <button
              key={colIndex}
              className="cell"
              onClick={() => onClickCell(rowIndex, colIndex)}
            >
              {cellValue}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
