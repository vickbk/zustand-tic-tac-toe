import type { BoardType, Player, SquareValue } from "../types";

export function calculateWinner(squares: BoardType) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

export function calculateTurns(squares: BoardType) {
  return squares.filter((square) => !square).length;
}

export function calculateStatus(
  winner: SquareValue,
  turns: number,
  player: Player,
) {
  if (!winner && !turns) return "Draw";
  if (winner) return `Winner ${winner}`;
  return `Next player: ${player}`;
}

export function calculatePlayer(currentMove: number): Player {
  return currentMove % 2 === 0 ? "X" : "O";
}

export function getGameData({
  squares,
  currentMove,
}: {
  squares: BoardType;
  currentMove: number;
}) {
  const winner = calculateWinner(squares);
  const turns = calculateTurns(squares);
  const player = calculatePlayer(currentMove);
  const status = calculateStatus(winner, turns, player);
  return { winner, turns, player, status };
}
