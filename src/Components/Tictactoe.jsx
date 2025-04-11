import React, { useState } from "react";

const Tictactoe = () => {
  const [cells, setCells] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const calculateWinner = (squares) => {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };
  const checkDraw = (squares) => {
    return squares.every((cell) => cell !== null);
  };

  const handleClick = (index) => {
    if (cells[index] || winner || isDraw) return;

    const newCells = cells.slice();
    newCells[index] = isXNext ? "X" : "O";
    setCells(newCells);
    setIsXNext(!isXNext);
    const currentWinner = calculateWinner(newCells);
    if (currentWinner) {
      setWinner(currentWinner);
    } else if (checkDraw(newCells)) {
      setIsDraw(true);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center bg-black/80 text-white p-4">
      <button
        onClick={() => window.history.back()}
        className="absolute top-2 right-2 bg-red-600 p-1 rounded hover:bg-red-700"
      >
        ✖️
      </button>
      <p className="text-[30px] mt-4 mb-3">Tic-tac-toe</p>
      <div className="grid grid-cols-3 gap-1 w-[240px] h-[240px]">
        {cells.map((cell, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={`flex items-center justify-center border-1 text-2xl border-gray-400 h-[78px] w-[78px] cursor-pointer 
    ${cell === "X" ? "bg-black" : cell === "O" ? "bg-red-600" : "bg-gray-300"}
  `}
          >
            {cell}
          </div>
        ))}
      </div>
      {winner ? (
        <div className="mt-3 flex flex-col items-center">
          <p className="text-[24px]">{`Player ${winner} wins!`}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-1 p-2 bg-green-600 hover:bg-green-700 text-white rounded"
          >
            Restart Game
          </button>
        </div>
      ) : isDraw ? (
        <div className="mt-3 flex flex-col items-center">
          <p className="text-[24px]">It's a Draw!</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-1 p-2 bg-green-600 hover:bg-green-700 text-white rounded"
          >
            Restart Game
          </button>
        </div>
      ) : (
        <p className="mt-2 text-[20px]">{`Next Player: ${
          isXNext ? "X" : "O"
        }`}</p>
      )}
    </div>
  );
};
export default Tictactoe;
