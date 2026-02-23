import { useGameStore } from "../hooks";

export const Status = ({ status }: { status: string }) => {
  const { history, resetHistory } = useGameStore((state) => state);
  return (
    <div>
      {status}{" "}
      {history.length !== 1 && (
        <button
          type="button"
          onClick={() => {
            resetHistory();
          }}
        >
          Reset
        </button>
      )}
    </div>
  );
};
