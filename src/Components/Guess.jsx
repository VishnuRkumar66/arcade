import React, { useState } from "react";

const Guess = () => {
  const [Generate, setGenerate] = useState(null);
  const [counter, setCounter] = useState(0);
  const [newGuess, setNewGuess] = useState("");
  const [alert, setAlert] = useState("");
  const [won, setWon] = useState(false);

  function GenerateNum() {
    const num = Math.floor(Math.random() * 100) + 1;
    setGenerate(num);
    console.log("Generated:", num);
  }
  function newGuessCheck() {
    const guess = parseInt(newGuess);
    if (isNaN(guess)) {
      setAlert("❗ Enter a valid number!");
      return;
    }

    setCounter((c) => c + 1);

    if (guess === Generate) {
      setAlert(`🎉 You guessed right in ${counter + 1} attempts!`);
      setWon(true);
    } else if (guess < Generate) {
      setAlert(`📈 Number is greater than ${guess}`);
    } else {
      setAlert(`📉 Number is lesser than ${guess}`);
    }

    setNewGuess("");
  }

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-black/50 p-7 text-white">
      <button
        onClick={() => window.history.back()}
        className="absolute top-1 right-2 bg-red-600 p-1 rounded hover:bg-red-700 text-white"
      >
        ✖️
      </button>
      <p className="text-2xl font-bold mb-4">🎯 Guess the Number</p>

      {Generate === null ? (
        <button
          onClick={GenerateNum}
          className="border rounded bg-violet-700 px-4 py-2 mt-3 hover:bg-violet-800"
        >
          Generate Number
        </button>
      ) : (
        <>
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") newGuessCheck();
            }}
            onChange={(e) => setNewGuess(e.target.value)}
            placeholder="Your guess..."
            type="number"
            value={newGuess}
            className="text-center border text-xl rounded w-40 h-10 mt-4"
          />
          <button
            onClick={newGuessCheck}
            className="mt-4 bg-green-600 hover:bg-green-700 px-2 py-1 rounded"
          >
            Submit
          </button>
        </>
      )}

      {alert && <p className="mt-4 text-lg">{alert}</p>}
      {won && (
        <>
          <div className="bg-gray-800 fixed mt-10  w-90 p-3 contain-content h-50 text-center rounded-lg text-2xl pt-4 shadow-lg">
            <p>🤩You Won🤩</p>
            <p className="text-xl mt-5">{alert}</p>

            <button
              className="border px-2 mt-6 py-1 text-[11px] rounded bg-green-500 hover:bg-green-600"
              onClick={() => window.location.reload()}
            >
              NEXT
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Guess;
