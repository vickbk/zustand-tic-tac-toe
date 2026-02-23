import { useSquares } from "../hooks";
import type { BoardType } from "../types";
import { SquareButton } from "./square-button";
import { Status } from "./status";

export const Board = ({ squares }: { squares: BoardType }) => {
  const [handleClick, status] = useSquares(squares);

  return (
    <>
      <div className="grid gap-2 grid-cols-3">
        {squares.map((square, index) => (
          <SquareButton
            key={index}
            value={square}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
      <Status status={status} />
    </>
  );
};
