import type { BoardType } from "@/features/board";

export type DispatchAction =
  | { type: "addHistory"; payload: BoardType }
  | { type: "resetHistory"; payload: never }
  | { type: "setCurrentMove"; payload: number };
