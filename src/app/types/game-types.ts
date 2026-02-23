import type { BoardType } from "@/features/board";

export type DispatchAction =
  | { type: "addHistory"; payload: BoardType }
  | { type: "resetHistory"; payload?: never }
  | { type: "setCurrentMove"; payload: number };

export type GameStoreState = {
  history: BoardType[];
  currentMove: number;
  dispatch: (action: DispatchAction) => void;
};
