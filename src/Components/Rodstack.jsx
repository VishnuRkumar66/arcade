import React, { useState } from "react";

const Rodstack = () => {
  const StartRod = [
    { id: 1, size: "w-25", color: "bg-violet-400" },
    { id: 2, size: "w-21", color: "bg-blue-400" },
    { id: 3, size: "w-17", color: "bg-red-400" },
    { id: 4, size: "w-13", color: "bg-green-400" },
  ];

  const [rods, setRods] = useState([
    { Name: "A", rodz: [...StartRod] },
    { Name: "B", rodz: [] },
    { Name: "C", rodz: [] },
  ]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  const [dragInfo, setDragInfo] = useState(null);
  const handleDragStart = (fromRodIndex, disk) => {
    setDragInfo({ fromRodIndex, disk });
  };
  const handleDrop = (toRodIndex) => {
    if (!dragInfo) return;
    const { fromRodIndex, disk } = dragInfo;
    if (fromRodIndex === toRodIndex) return;
    const fromRod = [...rods[fromRodIndex].rodz];
    const toRod = [...rods[toRodIndex].rodz];
    if (disk !== fromRod[fromRod.length - 1]) return;
    if (toRod.length && disk.id < toRod[toRod.length - 1].id) {
      alert("❌ Cannot place bigger disk on smaller!");
      return;
    }
    fromRod.pop();
    toRod.push(disk);
    const newRods = rods.map((rod, idx) => {
      if (idx === fromRodIndex) return { ...rod, rodz: fromRod };
      if (idx === toRodIndex) return { ...rod, rodz: toRod };
      return rod;
    });

    setRods(newRods);
    setDragInfo(null);
    setMoves((c) => c + 1);

    const totalDisks = StartRod.length;
    if (newRods[2].rodz.length === totalDisks) {
      setWon(true);
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-black/70 ">
      <button
        onClick={() => window.history.back()}
        className="absolute top-2 right-2 bg-red-600  rounded hover:bg-red-700"
      >
        ✖️
      </button>
      <p className="text-[30px] mt-4 mb-2 font-bold">STACK </p>
      <div className="bg-amber-300 flex justify-center gap-[40px] p-4 min-w-[350px] min-h-[300px] rounded-2xl">
        {rods.map((rod, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-end h-full"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(index)}
          >
            <div className="relative flex flex-col-reverse items-center  mb-2 h-60 w-20">
              <div className="absolute bottom-0 bg-amber-800 w-2 h-full z-0"></div>

              {rod.rodz.map((disk, dIndex) => (
                <div
                  key={dIndex}
                  draggable={dIndex === rod.rodz.length - 1}
                  onDragStart={() => handleDragStart(index, disk)}
                  className={`h-6 ${disk.size} ${
                    disk.color
                  } rounded mb-1 z-10 ${
                    dIndex === rod.rodz.length - 1
                      ? "cursor-grab"
                      : "cursor-not-allowed opacity-90"
                  }`}
                ></div>
              ))}
            </div>

            <p className="text-black">{rod.Name}</p>
          </div>
        ))}
      </div>

      <button
        className="border px-2 py-1 rounded bg-green-500 hover:bg-green-600 text-[10px] mt-2"
        onClick={() => window.location.reload()}
      >
        RESET
      </button>

      {won && (
        <div className="bg-red-500 p-13 fixed mt-30  rounded z-10 flex flex-col items-center">
          <p className="text-[22px] ">🤩 YOU WON! 🤩</p>
          <p className="text-[19px]">Your Total Moves: {moves}</p>
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

export default Rodstack;
