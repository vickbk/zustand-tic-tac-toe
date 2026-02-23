import { useGameStore } from "../hooks";
import { Board } from "./board";
import { History } from "./history";

export function Game() {
  const { history, currentMove } = useGameStore((state) => state);

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">Tic Tac Toe</h1>
      <Board squares={history[currentMove]} />
      <History />
    </div>
  );
}
