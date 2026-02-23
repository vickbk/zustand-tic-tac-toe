export type Player = "X" | "O";

export type SquareValue = Player | null;

export type BoardType = Array<SquareValue>;

export type DispatchAction =
  | { type: "addHistory"; payload: BoardType }
  | { type: "resetHistory"; payload: never }
  | { type: "setCurrentMove"; payload: number };
