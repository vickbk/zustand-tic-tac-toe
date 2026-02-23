import type { SquareValue } from "../types";

export const SquareButton = ({
  value = null,
  onClick,
}: {
  value: SquareValue;
  onClick?: () => void;
}) => {
  return (
    <button
      className={"p-4 border rounded-lg" + (value ? " bg-gray-200" : "")}
      type="button"
      disabled={!!value}
      onClick={onClick}
    >
      {value ?? "-"}
    </button>
  );
};
