import { useGameStoreState } from "@/app/hooks";

export const Status = ({ status }: { status: string }) => {
  const { history, dispatch } = useGameStoreState();
  return (
    <div>
      {status}{" "}
      {history.length !== 1 && (
        <button
          type="button"
          onClick={() => {
            dispatch({ type: "resetHistory" });
          }}
        >
          Reset
        </button>
      )}
    </div>
  );
};
