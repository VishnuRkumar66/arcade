import React, { useState, useEffect, useRef } from "react";

const Typing = () => {
  const inputRef = useRef(null);
  const sentenceList = [
    "the quick brown fox jumps over the lazy dog",
    "coding in React is fun and powerful",
    "typing speed improves with regular practice",
    "a good developer writes clean and efficient code",
    "javascript is the language of the web",
    "never stop learning new skills",
    "tailwind css makes styling easier",
    "debugging is twice as hard as writing code",
    "frontend development requires attention to detail",
    "react components can be reused everywhere",
  ];
  const getRandomSentence = () =>
    sentenceList[Math.floor(Math.random() * sentenceList.length)];
  const [sampleText, setSampleText] = useState(getRandomSentence());

  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [result, setResult] = useState("");

  useEffect(() => {
    inputRef.current?.focus();
    if (input.length === 1) setStartTime(Date.now());
    if (input === sampleText) {
      const timeTaken = (Date.now() - startTime) / 1000;
      const wpm = Math.round((sampleText.split(" ").length / timeTaken) * 60);
      setResult(`✅ Done in ${timeTaken.toFixed(2)} sec — WPM: ${wpm}`);
    }
  }, [input]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const renderColoredText = () => {
    return sampleText.split("").map((char, idx) => {
      let color = "text-white";
      if (idx < input.length) {
        color = char === input[idx] ? "text-green-500" : "text-red-500";
      }

      return (
        <span key={idx} className={`${color}`}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-black/50 p-7">
      <button
        onClick={() => window.history.back()}
        className="absolute top-1 right-2 bg-red-600 p-1 rounded hover:bg-red-700 text-white"
      >
        ✖️
      </button>
      <p className="mb-4 bg-gray-700 mt-6 px-4 py-2 rounded font-mono text-lg">
        {renderColoredText()}
      </p>
      <textarea
        ref={inputRef}
        rows={3}
        value={input}
        onChange={handleChange}
        placeholder="Start typing here..."
        className="w-[300px] rounded bg-gray-800 text-white p-3 outline-none border focus:border-green-500"
      />
      {result && (
        <>
          <p className="mt-4 text-green-400">{result}</p>

          <button
            onClick={() => {
              setInput("");
              setResult("");
              setStartTime(null);
            }}
            className="mt-2 bg-red-500 hover:bg-red-700  px-3 py-1 rounded text-white"
          >
            🔁 Retry
          </button>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white"
          >
            🚨 Restart
          </button>
        </>
      )}
    </div>
  );
};

export default Typing;
