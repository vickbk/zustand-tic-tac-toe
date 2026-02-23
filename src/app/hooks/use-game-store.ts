import type { BoardType } from "@/features/board";
import { create } from "zustand";
import { combine } from "zustand/middleware";
import type { DispatchAction } from "../types";

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
                if (action.type !== "addHistory") return state;
                const squares = action.payload;
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
                if (action.type !== "resetHistory") return state;
                return {
                  ...state,
                  history: [Array(9).fill(null)],
                  currentMove: 0,
                };
              },
              setCurrentMove() {
                if (action.type !== "setCurrentMove") return state;
                const currentMove = action.payload;
                return {
                  ...state,
                  currentMove,
                };
              },
            };
            return options[action.type]?.() || state;
          });
        },
      };
    },
  ),
);

export function useGameStoreState() {
  return useGameStore((state) => state);
}
