import React, { useState, useEffect } from "react";
const symbols = ["😂", "😘", "❤️", "😎", "🤩", "🤑", "😭", "😡"];
const shuffledTiles = [...symbols, ...symbols].sort(() => Math.random() - 0.5);

const Tiles = () => {
  const [tiles, setTiles] = useState(
    shuffledTiles.map((symbol, index) => ({
      id: index,
      symbol,
      flipped: false,
      matched: false,
    }))
  );
  const [move, setMove] = useState(0);
  const [selected, setSelected] = useState([]);
  const [disableClick, setDisableClick] = useState(false);

  useEffect(() => {
    if (selected.length === 2) {
      setDisableClick(true);
      const [first, second] = selected;
      if (tiles[first].symbol === tiles[second].symbol) {
        setTiles((prev) =>
          prev.map((tile) =>
            selected.includes(tile.id) ? { ...tile, matched: true } : tile
          )
        );
      } else {
        setTimeout(() => {
          setTiles((prev) =>
            prev.map((tile) =>
              selected.includes(tile.id) ? { ...tile, flipped: false } : tile
            )
          );
        }, 800);
      }
      setTimeout(() => {
        setSelected([]);
        setDisableClick(false);
      }, 800);
    }
  }, [selected]);

  const handleTileClick = (id) => {
    if (disableClick || tiles[id].flipped || tiles[id].matched) return;

    setTiles((prev) =>
      prev.map((tile) => (tile.id === id ? { ...tile, flipped: true } : tile))
    );

    setSelected((prev) => {
      const newSelected = [...prev, id];
      if (newSelected.length === 2) {
        setMove((c) => c + 1 / 2);
      }
      return newSelected;
    });
  };
  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-black/70 text-white ">
      <button
        onClick={() => window.history.back()}
        className="absolute top-2 right-2 bg-red-600 p-1 rounded hover:bg-red-700"
      >
        ✖️
      </button>
      <p className="text-[30px] mt-2 mb-3">TILES</p>
      <div className="grid grid-cols-4 gap-1">
        {tiles.map((tile) => (
          <div
            key={tile.id}
            className="cursor-pointer"
            onClick={() => handleTileClick(tile.id)}
          >
            <div
              className={`flex items-center justify-center h-20 w-20 text-[40px] border rounded-xl transition-colors duration-300 
    ${tile.flipped ? "bg-gray-500 " : "bg-amber-50"}
  `}
            >
              {tile.flipped || tile.matched ? tile.symbol : "❓"}
            </div>
          </div>
        ))}
      </div>
      <p>moves : {move}</p>

      {tiles.filter((tile) => tile.matched).length === symbols.length * 2 && (
        <div className="bg-red-500 p-6 fixed mt-36 flex flex-col items-center rounded-lg shadow-lg">
          <p className="text-[22px]">🤩🥳 YOU WON! 🤩🥳</p>
          <p className="text-[19px]">Your Total Moves: {move}</p>
          <p className="text-gray-800">Beat it next time.</p>
          <button
            className="border p-2  rounded bg-green-500 hover:bg-green-600 mt-2"
            onClick={() => window.location.reload()}
          >
            New Game
          </button>
        </div>
      )}
    </div>
  );
};
export default Tiles;
