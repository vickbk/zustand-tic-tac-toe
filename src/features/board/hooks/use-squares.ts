import { useGameStoreState } from "@/app/hooks";
import { getGameData } from "../scripts";
import type { BoardType } from "../types";

/**
 * React hook for managing Tic-Tac-Toe board square interactions and game status.
 *
 * @param {BoardType} squares - The current board state as an array of 9 squares.
 * @returns A tuple containing:
 * - A function to handle square clicks (adds a move if valid).
 * - The current game status string (e.g., "Winner: X", "Next player: O").
 *
 * @example
 * const [handleSquareClick, status] = useSquares(currentSquares);
 */
export function useSquares(squares: BoardType) {
  const { currentMove, dispatch } = useGameStoreState([
    "currentMove",
    "dispatch",
  ]);
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
