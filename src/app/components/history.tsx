import { useGameStore } from "../hooks";

export const History = () => {
  const { history, dispatch, currentMove } = useGameStore((state) => state);
  const isGameStart = history.length === 1;
  return (
    <ol className="list-decimal">
      {!isGameStart &&
        history.map((_, index) => (
          <li key={index}>
            {
              <button
                className={index === currentMove ? "font-bold" : ""}
                type="button"
                onClick={() =>
                  dispatch({ type: "setCurrentMove", payload: index })
                }
              >
                {index === 0
                  ? "Go to game start"
                  : `${index !== currentMove ? "Go to move" : "Current Move"} #${index}`}
              </button>
            }
          </li>
        ))}
    </ol>
  );
};
