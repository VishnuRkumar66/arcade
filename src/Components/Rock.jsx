import React, { useState } from "react";

const Rock = () => {
  const choices = ["🪨", "✂️", "📜"];
  const [choiceAI, setChoiceAI] = useState("");
  const [choiceUser, setChoiceUser] = useState("");
  const [user, setUser] = useState(0);
  const [ai, setAi] = useState(0);
  const [draw, setDraw] = useState(0);
  const [result, setResult] = useState("");

  function clicked(idx) {
    const aiChoice = choices[Math.floor(Math.random() * 3)];
    setChoiceUser(idx);
    setChoiceAI(aiChoice);

    if (idx === aiChoice) {
      setDraw((c) => c + 1);
      setResult("It's a Draw! 🤝");
    } else if (
      (idx === "📜" && aiChoice === "✂️") ||
      (idx === "🪨" && aiChoice === "📜") ||
      (idx === "✂️" && aiChoice === "🪨")
    ) {
      setAi((c) => c + 1);
      setResult("AI Wins! 💻");
    } else {
      setUser((c) => c + 1);
      setResult("You Win! 🎉");
    }
  }

  function resetScores() {
    setUser(0);
    setAi(0);
    setDraw(0);
    setResult("");
    setChoiceUser("");
    setChoiceAI("");
  }

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-black/50 p-7">
      <button
        onClick={() => window.history.back()}
        className="absolute top-1 right-2 bg-red-600 p-1 rounded hover:bg-red-700 text-white"
      >
        ✖️
      </button>

      <h1 className="text-2xl mb-2">ROCK PAPER SCISSORS</h1>
      <p className="text-lg mb-2">Choose your move:</p>

      <div className="flex gap-4 mb-6">
        {choices.map((list, index) => (
          <button
            key={index}
            onClick={() => clicked(list)}
            className="text-4xl border-4 border-white p-2 bg-gray-900 rounded-2xl hover:bg-gray-700 hover:border-amber-200 transition"
          >
            {list}
          </button>
        ))}
      </div>

      {result && (
        <>
          <div className="bg-gray-800 p-2 fixed mt-10 flex flex-col w-80 h-50 items-center justify-center rounded-lg text-2xl shadow-lg">
            <p>Your Choice:{choiceUser}</p>
            <p>AI Choice:{choiceAI}</p>
            <br />
            <p className="text-[30px]">{result}</p>

            <button
              className="border p-2 text-[11px] rounded bg-green-500 hover:bg-green-600 mt-2"
              onClick={() => setResult(false)}
            >
              NEXT
            </button>
          </div>
        </>
      )}

      <h2 className="text-xl mt-20 font-bold mb-2">Scoreboard</h2>
      <div className="flex gap-4 text-center mb-4">
        <div className="bg-green-600 px-4 py-2 rounded">You: {user}</div>
        <div className="bg-blue-600 px-4 py-2 rounded">Draws: {draw}</div>
        <div className="bg-red-600 px-4 py-2 rounded">AI: {ai}</div>
      </div>

      <button
        onClick={resetScores}
        className="mt-1 bg-yellow-500 hover:bg-yellow-600 text-black p-1 rounded font-semibold"
      >
        🔄 Reset Game
      </button>
    </div>
  );
};

export default Rock;
