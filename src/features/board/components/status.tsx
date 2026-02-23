import { useGameStoreState } from "@/app/hooks";

export const Status = ({ status }: { status: string }) => {
  const { history, dispatch } = useGameStoreState();
  return (
    <div>
      {status}{" "}
      {history.length !== 1 && (
        <button
          className="px-2 rounded-lg outline text-red-600"
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
