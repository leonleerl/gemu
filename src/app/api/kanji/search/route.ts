import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { isKanaMatch } from '@/utils/kanaConverter';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const word = searchParams.get('word');

    // Read the JSON file
    const jsonDirectory = process.cwd();
    const fileContents = await fs.readFile(
      path.join(jsonDirectory, 'kanjiapi_full.json'),
      'utf8'
    );
    const data = JSON.parse(fileContents);

    // If no word parameter, return a random kanji with valid JLPT
    if (!word) {
      const validJlptKanjis = Object.entries(data.kanjis).filter(([_, value]: [string, any]) => {
        return !(value.jlpt === null || value.jlpt === undefined || value.jlpt === "");
      });

      const randomIndex = Math.floor(Math.random() * validJlptKanjis.length);
      const [kanji, kanjiData] = validJlptKanjis[randomIndex];

      return NextResponse.json({
        matches: [{
          kanji,
          data: kanjiData
        }]
      });
    }

    // If word parameter exists, search for matching kanji
    const matchingKanjis = Object.entries(data.kanjis).filter(([_, value]: [string, any]) => {
      // First check JLPT, only proceed if it's valid
      if (value.jlpt === null || value.jlpt === undefined || value.jlpt === "") {
        return false;
      }

      const kunReadings = value.kun_readings || [];
      const onReadings = value.on_readings || [];
      
      // Then check readings
      return [...kunReadings, ...onReadings].some(reading => 
        isKanaMatch(reading, word)
      );
    });

    if (matchingKanjis.length === 0) {
      return NextResponse.json({ matches: null });
    }

    return NextResponse.json({
      matches: matchingKanjis.map(([kanji, data]) => ({
        kanji,
        data
      }))
    });

  } catch (error) {
    console.error('Error in kanji search:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}