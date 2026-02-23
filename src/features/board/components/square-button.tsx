import type { SquareValue } from "../types";

export const SquareButton = ({
  value = null,
  onClick,
}: {
  value: SquareValue;
  onClick?: () => void;
}) => {
  return (
    <button className="p-4 border rounded-lg" type="button" onClick={onClick}>
      {value ?? ""}
    </button>
  );
};
