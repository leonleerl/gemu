import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { Kanji } from '@/types/kanji';

interface KanjiData {
  kanjis: {
    [key: string]: Kanji;
  }
}

export async function GET() {
  try {
    // Read the JSON file
    const jsonDirectory = process.cwd();
    const fileContents = await fs.readFile(
      path.join(jsonDirectory, 'kanjiapi_full.json'),
      'utf8'
    );
    const data: KanjiData = JSON.parse(fileContents);

    // Filter kanji with valid JLPT
    const validJlptKanjis = Object.entries(data.kanjis).filter(([_, value]: [string, Kanji]) => {
      return !(value.jlpt === null || value.jlpt === undefined || value.jlpt === "");
    });

    // Select random kanji
    const randomIndex = Math.floor(Math.random() * validJlptKanjis.length);
    const [kanji, kanjiData] = validJlptKanjis[randomIndex];

    return NextResponse.json({
      kanji,
      data: kanjiData
    });

  } catch (error) {
    console.error('Error in random kanji:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 