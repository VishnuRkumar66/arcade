import React, { useState, useEffect } from "react";

const Wordle = () => {
  const [word, setWord] = useState(null);
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState([]);
  const [message, setMessage] = useState("Enter first guess! (max 6 attempts)");
  const [next, setNext] = useState(false);
  const [wordList, setWordList] = useState([]);
  useEffect(() => {
    fetch("./words.json")
      .then((response) => response.json())
      .then((data) => {
        setWordList(data.words);
        const randomWord =
          data.words[Math.floor(Math.random() * data.words.length)];
        setWord(randomWord.toUpperCase());
      })
      .catch((error) => console.error("Error fetching words:", error));
  }, []);

  const handleChange = (e) => {
    setGuess(e.target.value.toUpperCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^[a-zA-Z]+$/.test(guess)) {
      setMessage("Enter a valid word!");
      setGuess("");
      return;
    }
    if (guess.length !== word.length) {
      setMessage(`Guess must be 5 letters long.`);
      return;
    }
    if (!wordList.includes(guess.toLowerCase())) {
      setMessage("Word not in my database!");
      setGuess("");
      return;
    }
    if (attempts.includes(guess)) {
      setMessage("Already Guessed this word!");
      setGuess("");
      return;
    }

    const newAttempts = [...attempts, guess];
    setAttempts(newAttempts);

    if (guess === word) {
      setNext(true);
      setMessage("Congratulations! You guessed the word!");
    } else if (newAttempts.length >= 6) {
      setNext(true);
      setMessage(
        `Maximum 6 attempts reached. 
         The word was "${word}".`
      );
      return;
    } else {
      setMessage("Enter next guess.");
      setGuess("");
      console.log(word);
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
      <h1 className="text-3xl mt-4 mb-3">Wordle Game</h1>
      {word ? (
        <div className="flex flex-col items-center">
          <div className="mb-1">
            {attempts.map((attempt, index) => (
              <div key={index} className="text-[20px]">
                {attempt.split("").map((letter, i) => (
                  <div
                    key={i}
                    className={`inline-block w-8 h-8 text-center mt-1 border-1 ${
                      word[i] === letter
                        ? "bg-green-500"
                        : word.includes(letter)
                        ? "bg-yellow-400"
                        : "bg-gray-500"
                    }`}
                  >
                    {letter}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {!next ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center"
            >
              <input
                type="text"
                value={guess}
                onChange={handleChange}
                maxLength={word.length}
                className=" p-1 border-2 border-gray-300 rounded mt-3 w-40 text-center"
              />
              <button
                type="submit"
                className="bg-blue-500 p-2 mt-2 rounded text-white hover:bg-blue-700"
              >
                Submit
              </button>
              <p className="mt-2 text-[18px]">{message}</p>
            </form>
          ) : (
            <div className="mt-4 flex flex-col items-center">
              <p className="text-lg text-center p-1">{message}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-green-700 p-2 mt-2 text-white rounded hover:bg-green-800"
              >
                Play Again
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-lg">Loading...</p>
      )}
    </div>
  );
};
export default Wordle;
