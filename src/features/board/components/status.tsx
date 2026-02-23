import { useGameStoreState } from "@/app/hooks";

export const Status = ({ status }: { status: string }) => {
  const { history, resetHistory } = useGameStoreState();
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
