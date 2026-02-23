import { Board } from "@/features/board/components/board";
import { History } from "@/features/history/components/history";
import { useGameStoreState } from "../hooks";

export function Game() {
  const { history, currentMove } = useGameStoreState([
    "currentMove",
    "history",
  ]);

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">Tic Tac Toe</h1>
      <Board squares={history[currentMove]} />
      <History />
    </div>
  );
}
