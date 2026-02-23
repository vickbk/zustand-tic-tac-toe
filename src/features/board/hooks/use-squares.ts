import { useGameStoreState } from "@/app/hooks";
import { getGameData } from "../scripts";
import type { BoardType } from "../types";

export function useSquares(squares: BoardType) {
  const { currentMove, dispatch } = useGameStoreState();
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
