import { useGameStoreState } from "@/app/hooks";

/**
 * React hook for managing and accessing game move history.
 *
 * @returns An object containing:
 * - `history`: Array of board states representing all moves in the game.
 * - `isGameStart`: Boolean indicating if the game is at the initial state.
 * - `setCurrentMove`: Function to navigate to a specific move by index.
 * - `isCurrentMove`: Function to check if a given index is the current move.
 *
 * @example
 * const { history, isGameStart, setCurrentMove, isCurrentMove } = useHistory();
 */
export function useHistory() {
  const { history, dispatch, currentMove } = useGameStoreState();

  return {
    history,
    isGameStart: history.length === 1,
    setCurrentMove: (index: number) =>
      dispatch({ type: "setCurrentMove", payload: index }),
    isCurrentMove: (index: number) => index === currentMove,
  };
}
