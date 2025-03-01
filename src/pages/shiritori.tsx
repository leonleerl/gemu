"use client"
import { useState } from "react";

export default function ShiritoriGame() {
  const [lastWord, setLastWord] = useState("しりとり");
  const [inputWord, setInputWord] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    if (!inputWord) return;
    
    const lastChar = lastWord.slice(-1);
    const firstChar = inputWord[0];

    if (lastChar === firstChar) {
      setLastWord(inputWord);
      setScore(score + 1);
      setMessage("Correct!");
    } else {
      setMessage("Invalid word! Must start with: " + lastChar);
    }

    setInputWord("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 bg-opacity-40 p-6">
      <h1 className="text-3xl font-bold mb-4">Shiritori Challenge</h1>
      <div className="bg-white p-6 rounded-lg shadow-md text-center w-96">
        <p className="text-lg font-semibold">Last Word:</p>
        <p className="text-2xl font-bold text-blue-500 mb-4">{lastWord}</p>
        <p className="text-gray-600">Your word must start with: <span className="font-bold">{lastWord.slice(-1)}</span></p>
        <input
          type="text"
          value={inputWord}
          onChange={(e) => setInputWord(e.target.value)}
          className="mt-3 p-2 border rounded w-full text-center"
          placeholder="Enter a word..."
        />
        <button
          onClick={handleSubmit}
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
        >
          Submit
        </button>
        <p className="mt-2 text-lg font-semibold text-green-500">{message}</p>
      </div>
      <p className="mt-4 text-xl font-semibold">Score: {score}</p>
      <button
        onClick={() => { setLastWord("しりとり"); setScore(0); setMessage(""); }}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Reset Game
      </button>
    </div>
  );
}
