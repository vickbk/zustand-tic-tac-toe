import { useGameStoreState } from "@/app/hooks";

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
