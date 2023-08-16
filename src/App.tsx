import React, { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";

function App() {
  type CellValue = "X" | "O" | null;

  const [board, setBoard] = useState<CellValue[][]>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<CellValue | "Draw">(null);

  const handleCellClick = (row: number, col: number) => {
    // 既にセルが埋まっている、またはゲームが終了している場合は何もしない
    if (board[row][col] || winner) return;

    const newBoard = board.map((row) => [...row]);
    newBoard[row][col] = currentPlayer;

    setBoard(newBoard);

    // 現在のプレイヤーを切り替えます。
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const resetGame = () => {
    setBoard([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
    setCurrentPlayer("X");
    setWinner(null);
  };

  useEffect(() => {
    const checkWinner = (board: CellValue[][]): CellValue | "Draw" => {
      // 横、縦、斜めの勝利条件をチェック
      for (let i = 0; i < 3; i++) {
        // 横の勝利条件
        if (
          board[i][0] &&
          board[i][0] === board[i][1] &&
          board[i][0] === board[i][2]
        ) {
          return board[i][0];
        }
        // 縦の勝利条件
        if (
          board[0][i] &&
          board[0][i] === board[1][i] &&
          board[0][i] === board[2][i]
        ) {
          return board[0][i];
        }
      }
      // 左上から右下への斜めの勝利条件
      if (
        board[0][0] &&
        board[0][0] === board[1][1] &&
        board[0][0] === board[2][2]
      ) {
        return board[0][0];
      }
      // 右上から左下への斜めの勝利条件
      if (
        board[0][2] &&
        board[0][2] === board[1][1] &&
        board[0][2] === board[2][0]
      ) {
        return board[0][2];
      }

      // 引き分けの条件
      if (isBoardFull(board)) {
        return "Draw";
      }

      // 勝利者がいない場合はnullを返す
      return null;
    };

    const isBoardFull = (board: CellValue[][]): boolean => {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (!board[i][j]) {
            return false; // セルが空の場合、ボードはまだ埋まっていない
          }
        }
      }
      return true; // 全てのセルが埋まっている
    };

    const result = checkWinner(board);
    if (result === "X" || result === "O" || result === "Draw") {
      setWinner(result);
    }
  }, [board]);

  return (
    <div className="App">
      <Board board={board} onClickCell={handleCellClick} />
      {winner && <div>Winner: {winner}</div>}
    </div>
  );
}

export default App;
