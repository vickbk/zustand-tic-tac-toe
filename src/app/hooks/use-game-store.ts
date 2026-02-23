import type { BoardType } from "@/features/board";
import { usePickFromStore } from "@/shared";
import { create } from "zustand";
import { combine } from "zustand/middleware";
import type { DispatchAction, GameStoreState } from "../types";

/**
 * Zustand store hook for managing the Tic-Tac-Toe game state.
 *
 * Contains game history, current move index, and a dispatch function for state updates.
 * Supports actions: addHistory, resetHistory, and setCurrentMove.
 *
 * @example
 * const { history, currentMove, dispatch } = useGameStore();
 * dispatch({ type: "addHistory", payload: newSquares });
 */

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

/**
 * React hook to access the entire game store state.
 *
 * @returns {GameStoreState} The entire game store state.
 *
 * @example
 * // Get entire state
 * const allState = useGameStoreState();
 */
export function useGameStoreState(): GameStoreState;

/**
 * React hook to access specific keys from the game store state.
 *
 * @template K - The keys of GameStoreState to pick.
 * @param {[K, ...K[]]} keys - Array of keys to select from the store.
 * @returns {Pick<GameStoreState, K>} The selected state properties.
 *
 * @example
 * // Get specific keys
 * const { currentMove, dispatch } = useGameStoreState(["currentMove", "dispatch"]);
 */
export function useGameStoreState<K extends keyof GameStoreState>(
  keys: [K, ...K[]],
): Pick<GameStoreState, K>;

export function useGameStoreState<K extends keyof GameStoreState>(
  keys?: [K, ...K[]],
) {
  return usePickFromStore(useGameStore, keys);
}
