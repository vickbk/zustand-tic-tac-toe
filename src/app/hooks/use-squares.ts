import { getGameData } from "../scripts";
import type { BoardType } from "../types";
import { useGameStore } from "./use-game-store";

export function useSquares(squares: BoardType) {
  const { currentMove, dispatch } = useGameStore((state) => state);
  const { winner, player, status } = getGameData({
    squares,
    currentMove,
  });

  return [
    (index: number) => {
      if (squares[index] || winner) return;
      const nextSquares = squares.slice();
      nextSquares[index] = player;
      dispatch({ type: "addHistory", payload: nextSquares });
    },
    status,
  ] as const;
}
