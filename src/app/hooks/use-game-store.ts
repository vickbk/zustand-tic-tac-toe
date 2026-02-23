import { create } from "zustand";
import { combine } from "zustand/middleware";
import type { BoardType, DispatchAction } from "../types/game-types";

export const useGameStore = create(
  combine(
    {
      history: [Array(9).fill(null)] as BoardType[],
      currentMove: 0,
    },
    (set) => {
      return {
        dispatch(action: DispatchAction) {
          set((state) => {
            const options = {
              addHistory() {
                const squares: BoardType = action.payload as BoardType;
                return {
                  ...state,
                  history: [
                    ...state.history.slice(0, state.currentMove + 1),
                    squares,
                  ],
                  currentMove: state.currentMove + 1,
                };
              },
              resetHistory() {
                return {
                  ...state,
                  history: [Array(9).fill(null)],
                  currentMove: 0,
                };
              },
              setCurrentMove() {
                const currentMove = action.payload as number;
                return {
                  ...state,
                  currentMove,
                };
              },
            };
            return options[action.type]?.() || state;
          });
        },
        addHistory: (
          squares: BoardType | ((prevSquares: BoardType) => BoardType),
        ) => {
          set((state) => ({
            ...state,
            history: [
              ...state.history.slice(0, state.currentMove + 1),
              typeof squares === "function"
                ? squares(state.history[state.currentMove])
                : squares,
            ],
            currentMove: state.currentMove + 1,
          }));
        },
        resetHistory: () => {
          set((state) => ({
            ...state,
            history: [Array(9).fill(null)],
            currentMove: 0,
          }));
        },
        setCurrentMove: (
          currentMove: number | ((prevCurrentMove: number) => number),
        ) => {
          set((state) => ({
            ...state,
            currentMove:
              typeof currentMove === "function"
                ? currentMove(state.currentMove)
                : currentMove,
          }));
        },
      };
    },
  ),
);

export function useGameStoreState() {
  return useGameStore((state) => state);
}
