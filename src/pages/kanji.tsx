"use client"
import { useState, useEffect } from "react";
import { toHiragana, toKatakana } from '@/utils/kanaConverter';

interface KanjiData {
  kanji: string;
  data: {
    kun_readings: string[];
    on_readings: string[];
    name_readings: string[];
    meanings: string[];
  };
}

export default function KanjiGame() {
  const [currentKanji, setCurrentKanji] = useState<KanjiData | null>(null);
  const [kanjiInput, setKanjiInput] = useState("");
  const [hiraganaInput, setHiraganaInput] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hintData, setHintData] = useState<KanjiData | null>(null);

  // Get initial random kanji
  useEffect(() => {
    getRandomKanji("し");  // Start with し
  }, []);

  const getRandomKanji = async (char: string) => {
    try {
      setIsLoading(true);
      let validKanjiFound = false;
      let data;

      while (!validKanjiFound) {
        const response = await fetch(`/api/kanji/random/${char}`);
        if (!response.ok) throw new Error('Failed to fetch kanji');
        data = await response.json();

        // Check if any readings end with ん or ン
        const allReadings = [
          ...(data.data.kun_readings || []),
          ...(data.data.on_readings || []),
          ...(data.data.name_readings || [])
        ].map(reading => reading.replace(/\./g, ''));

        const hasNEnding = allReadings.some(reading => 
          reading.endsWith('ん') || reading.endsWith('ン')
        );

        if (!hasNEnding) {
          validKanjiFound = true;
        }
      }

      setCurrentKanji(data);
    } catch (error) {
      setMessage("Error fetching kanji. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateAndSubmit = async () => {
    if (!kanjiInput || !hiraganaInput || !currentKanji) return;

    // Check if input ends with ん
    if (hiraganaInput.endsWith("ん")) {
      setMessage("Words ending with ん are not allowed!");
      return;
    }

    // Get the last character of current kanji's reading
    const currentReading = currentKanji.data.kun_readings[0]?.replace(/\./g, '') || 
                         currentKanji.data.on_readings[0]?.replace(/\./g, '') || 
                         currentKanji.data.name_readings[0]?.replace(/\./g, '');
    
    const lastChar = currentReading[currentReading.length - 1];

    // Check if first character matches
    if (hiraganaInput[0] !== lastChar) {
      setMessage(`Word must start with: ${lastChar}`);
      return;
    }

    try {
      setIsLoading(true);
      // Use local API endpoint instead of external API
      const response = await fetch(`/api/kanji/validate?kanji=${encodeURIComponent(kanjiInput)}`);
      if (!response.ok) {
        throw new Error('Invalid kanji');
      }
      const { data: kanjiData } = await response.json();

      // Convert user input to both forms for comparison
      const hiraganaVersion = toHiragana(hiraganaInput);
      const katakanaVersion = toKatakana(hiraganaInput);

      // Check if hiragana input matches any readings (ignoring dots and checking both kana forms)
      const allReadings = [
        ...(kanjiData.kun_readings || []).map((r: string) => r.replace(/\./g, '')),
        ...(kanjiData.on_readings || []).map((r: string) => r.replace(/\./g, '')),
        ...(kanjiData.name_readings || []).map((r: string) => r.replace(/\./g, ''))
      ];

      const isValidReading = allReadings.some(reading => {
        const cleanReading = reading.replace(/\./g, '');
        return cleanReading === hiraganaVersion || cleanReading === katakanaVersion;
      });

      if (isValidReading) {
        setScore(score + 1);
        setMessage("Correct! Keep going!");
        // Get new random kanji starting with last character of current input
        await getRandomKanji(hiraganaInput[hiraganaInput.length - 1]);
      } else {
        setMessage("Invalid reading for this kanji!");
      }
    } catch (error) {
      setMessage("Error validating kanji. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
      setKanjiInput("");
      setHiraganaInput("");
    }
  };

  // New function to get hint data
  const getHint = async () => {
    if (!kanjiInput) return;
    
    try {
      const response = await fetch(`/api/kanji/validate?kanji=${encodeURIComponent(kanjiInput)}`);
      if (!response.ok) {
        setHintData(null);
        return;
      }
      const data = await response.json();
      setHintData({ kanji: kanjiInput, data: data.data });
    } catch (error) {
      console.error('Error fetching hint:', error);
      setHintData(null);
    }
  };

  // Helper function to clean readings
  const cleanReading = (reading: string): string => {
    return reading
      .replace(/\./g, '')    // remove dots
      .replace(/-$/, '')     // remove trailing hyphen
      .replace(/^-/, '');    // remove leading hyphen
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 bg-opacity-40 p-6">
      <h1 className="text-3xl font-bold mb-4">
        <ruby>
          漢字
          <rt>かんじ</rt>
        </ruby>
        しりとりゲーム
      </h1>
      
      <div className="flex gap-6">
        {/* Main game panel */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center w-96">
          <p className="text-lg font-semibold">Current Word:</p>
          {currentKanji && (
            <>
              <p className="text-2xl font-bold text-blue-500 mb-4">
                <ruby>
                  {currentKanji.kanji}
                  <rt>
                    {cleanReading(
                      currentKanji.data.kun_readings[0] || 
                      currentKanji.data.on_readings[0] || 
                      currentKanji.data.name_readings[0] || ''
                    )}
                  </rt>
                </ruby>
              </p>
              
              <div className="bg-gray-50 p-4 rounded-md mb-4 text-left">
                <p className="mb-2">
                  <span className="font-semibold text-gray-700">訓読み: </span>
                  <span className="text-gray-600">
                    {currentKanji.data.kun_readings.length > 0 
                      ? currentKanji.data.kun_readings
                          .map(reading => toHiragana(cleanReading(reading)))
                          .join('、')
                      : '—'}
                  </span>
                </p>
                <p className="mb-2">
                  <span className="font-semibold text-gray-700">音読み: </span>
                  <span className="text-gray-600">
                    {currentKanji.data.on_readings.length > 0
                      ? currentKanji.data.on_readings
                          .map(reading => toHiragana(cleanReading(reading)))
                          .join('、')
                      : '—'}
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-gray-700">名前読み: </span>
                  <span className="text-gray-600">
                    {currentKanji.data.name_readings.length > 0
                      ? currentKanji.data.name_readings
                          .map(reading => toHiragana(cleanReading(reading)))
                          .join('、')
                      : '—'}
                  </span>
                </p>
              </div>
            </>
          )}
          
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={kanjiInput}
                onChange={(e) => setKanjiInput(e.target.value)}
                className="p-2 border rounded w-full text-center"
                placeholder="Enter kanji..."
                disabled={isLoading}
              />
              <button
                onClick={getHint}
                className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Hint
              </button>
            </div>
            <input
              type="text"
              value={hiraganaInput}
              onChange={(e) => setHiraganaInput(e.target.value)}
              className="p-2 border rounded w-full text-center"
              placeholder="Enter reading (hiragana)..."
              disabled={isLoading}
            />
          </div>

          <button
            onClick={validateAndSubmit}
            disabled={isLoading}
            className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full disabled:bg-blue-300"
          >
            {isLoading ? "Checking..." : "Submit"}
          </button>
          
          <p className={`mt-2 text-lg font-semibold ${
            message.includes("Error") || message.includes("Invalid") 
              ? "text-red-500" 
              : "text-green-500"
          }`}>
            {message}
          </p>
        </div>

        {/* Hint panel */}
        {hintData && (
          <div className="bg-white p-6 rounded-lg shadow-md w-80">
            <h2 className="text-lg font-semibold mb-4">Readings for {hintData.kanji}:</h2>
            <div className="bg-gray-50 p-4 rounded-md text-left">
              <p className="mb-2">
                <span className="font-semibold text-gray-700">訓読み: </span>
                <span className="text-gray-600">
                  {hintData.data.kun_readings.length > 0 
                    ? hintData.data.kun_readings
                        .map(reading => toHiragana(cleanReading(reading)))
                        .join('、')
                    : '—'}
                </span>
              </p>
              <p className="mb-2">
                <span className="font-semibold text-gray-700">音読み: </span>
                <span className="text-gray-600">
                  {hintData.data.on_readings.length > 0
                    ? hintData.data.on_readings
                        .map(reading => toHiragana(cleanReading(reading)))
                        .join('、')
                    : '—'}
                </span>
              </p>
              <p>
                <span className="font-semibold text-gray-700">名前読み: </span>
                <span className="text-gray-600">
                  {hintData.data.name_readings.length > 0
                    ? hintData.data.name_readings
                        .map(reading => toHiragana(cleanReading(reading)))
                        .join('、')
                    : '—'}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
      
      <p className="mt-4 text-xl font-semibold">Score: {score}</p>
      
      <button
        onClick={() => {
          getRandomKanji("し");
          setScore(0);
          setMessage("");
          setKanjiInput("");
          setHiraganaInput("");
          setHintData(null);
        }}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Reset Game
      </button>
    </div>
  );
}
