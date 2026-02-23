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
      className={
        "p-4 border rounded-lg" +
        (value ? " bg-gray-200 cursor-not-allowed!" : "")
      }
      type="button"
      onClick={onClick}
    >
      {value ?? "-"}
    </button>
  );
};
