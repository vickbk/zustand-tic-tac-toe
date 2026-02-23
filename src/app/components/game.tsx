import { History } from "@/features/history/components/history";
import { useGameStore } from "../hooks";
import { Board } from "./board";

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
