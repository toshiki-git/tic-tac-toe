import React, { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";

function App() {
  const [board, setBoard] = useState<Array<Array<string | null>>>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<string | null>(null);

  const handleCellClick = (row: number, col: number) => {
    // 既にセルが埋まっている、またはゲームが終了している場合は何もしない
    if (board[row][col] || winner) return;

    const newBoard = board.map((row) => [...row]);
    newBoard[row][col] = currentPlayer;

    setBoard(newBoard);

    // 現在のプレイヤーを切り替えます。
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  useEffect(() => {
    // 勝利条件のチェックなど、ゲームの結果を計算するロジックをここに実装
    // 例: 3つ並んだら勝者をsetWinnerでセットする

    // 簡易的な勝者の判定
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] &&
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2]
      ) {
        setWinner(board[i][0]);
      }
    }

    // ... 他にも横、斜めの勝者判定を追加
  }, [board]);

  return (
    <div className="App">
      <Board board={board} onClickCell={handleCellClick} />
      {winner && <div>Winner: {winner}</div>}
    </div>
  );
}

export default App;
