import { useHistory } from "../hooks";

export const History = () => {
  const { history, setCurrentMove, isGameStart, isCurrentMove } = useHistory();
  return (
    <ol className="list-decimal">
      {!isGameStart &&
        history.map((_, index) => (
          <li key={index}>
            {
              <button
                className={isCurrentMove(index) ? "font-bold" : "underline"}
                type="button"
                onClick={() => setCurrentMove(index)}
              >
                {index === 0
                  ? "Go to game start"
                  : `${!isCurrentMove(index) ? "Go to move" : "Current Move"} #${index}`}
              </button>
            }
          </li>
        ))}
    </ol>
  );
};
