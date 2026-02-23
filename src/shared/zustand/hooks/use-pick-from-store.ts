import type { StoreApi, UseBoundStore } from "zustand";
import { useShallow } from "zustand/react/shallow";

/**
 * React hook to select specific keys from a Zustand store using shallow comparison.
 *
 * @template T - The store state object type.
 * @template K - The keys of the store state to pick.
 * @param {UseBoundStore<StoreApi<T>>} useHook - The Zustand store hook.
 * @param {K[]} [keys] - Optional array of keys to pick from the store state. If omitted, returns the entire state.
 * @returns {Pick<T, K>} An object containing only the picked keys and their values from the store state.
 *
 * @example
 * const { count, user } = usePickFromStore(useStore, ["count", "user"]);
 */
export function usePickFromStore<T extends object, K extends keyof T>(
  useHook: UseBoundStore<StoreApi<T>>,
  keys?: K[],
): Pick<T, K> {
  return useHook(
    useShallow((state) => {
      if (!keys) return state as Pick<T, K>;
      return keys.reduce(
        (acc, key) => {
          if (!(key in state)) {
            if (import.meta.env.DEV) {
              console.warn(
                `Key "${String(key)}" does not exist in the store state. This may indicate a type mismatch.`,
              );
            }
            return acc;
          }
          acc[key] = state[key];
          return acc;
        },
        {} as Pick<T, K>,
      );
    }),
  );
}
