import type { BoardType } from "@/features/board";
import { create } from "zustand";
import { combine } from "zustand/middleware";
import { useShallow } from "zustand/shallow";
import type { DispatchAction, GameStoreState } from "../types";

export const useGameStore = create<GameStoreState>(
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

// Overload signatures for strict typing
export function useGameStoreState(): GameStoreState;
export function useGameStoreState<K extends keyof GameStoreState>(
  keys: readonly [K, ...K[]],
): Pick<GameStoreState, K>;

export function useGameStoreState<K extends keyof GameStoreState>(
  keys?: readonly [K, ...K[]] | undefined,
): GameStoreState | Pick<GameStoreState, K> {
  return useGameStore(
    useShallow((state) => {
      if (!keys) return state;
      const result = {} as Pick<GameStoreState, K>;
      for (const key of keys) {
        if (!(key in state)) {
          throw new Error(
            `Key "${String(key)}" does not exist in the game store.`,
          );
        }
        (result as GameStoreState)[key] = state[key];
      }
      return result;
    }),
  );
}
