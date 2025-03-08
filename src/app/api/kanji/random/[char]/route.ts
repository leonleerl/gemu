import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { toHiragana, toKatakana } from '@/utils/kanaConverter';

// Function to check if character is kanji (not hiragana or katakana)
function isKanji(char: string): boolean {
  return char.match(/[\u4e00-\u9faf\u3400-\u4dbf]/) !== null;
}

export async function GET(
  request: Request,
  { params }: { params: { char: string } }
) {
  try {
    const searchChar = params.char;

    // If input is kanji, fetch from external API
    if (isKanji(searchChar)) {
      const apiUrl = process.env.JISHO_API_URL;
      if (!apiUrl) {
        throw new Error('JISHO_API_URL is not defined in environment variables');
      }

      const response = await fetch(`${apiUrl}/${encodeURIComponent(searchChar)}`);
      
      if (!response.ok) {
        return NextResponse.json(
          { error: 'Kanji not found in external API' }, 
          { status: 404 }
        );
      }

      const kanjiData = await response.json();
      return NextResponse.json({ kanji: searchChar, data: kanjiData });
    }

    // If input is kana, use existing local JSON search logic
    const searchCharKata = toKatakana(searchChar);
    const searchCharHira = toHiragana(searchChar);

    // Read the JSON file
    const jsonDirectory = process.cwd();
    const fileContents = await fs.readFile(
      path.join(jsonDirectory, 'kanjiapi_full.json'),
      'utf8'
    );
    const data = JSON.parse(fileContents);

    // Filter kanjis that match the criteria
    const matchingKanjis = Object.entries(data.kanjis).filter(([_, value]: [string, any]) => {
      // First check JLPT, only proceed if it's valid
      if (value.jlpt === null || value.jlpt === undefined || value.jlpt === "") {
        return false;
      }

      const kunReadings = value.kun_readings || [];
      const onReadings = value.on_readings || [];
      
      return [...kunReadings, ...onReadings].some(reading => {
        const firstChar = reading[0];
        return firstChar === searchCharHira || firstChar === searchCharKata;
      });
    });

    if (matchingKanjis.length === 0) {
      return NextResponse.json({ error: 'No matching kanji found' }, { status: 404 });
    }

    // Select a random kanji from matches
    const randomIndex = Math.floor(Math.random() * matchingKanjis.length);
    const [kanji, kanjiData] = matchingKanjis[randomIndex];

    return NextResponse.json({ kanji, data: kanjiData });

  } catch (error) {
    console.error('Error in GET request:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  }
}