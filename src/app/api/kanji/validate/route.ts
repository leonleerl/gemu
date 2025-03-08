import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const kanji = searchParams.get('kanji');

    if (!kanji) {
      return NextResponse.json({ error: 'Kanji parameter is required' }, { status: 400 });
    }

    // Read the JSON file
    const jsonDirectory = process.cwd();
    const fileContents = await fs.readFile(
      path.join(jsonDirectory, 'kanjiapi_full.json'),
      'utf8'
    );
    const data = JSON.parse(fileContents);

    // Get kanji data
    const kanjiData = data.kanjis[kanji];

    if (!kanjiData) {
      return NextResponse.json({ error: 'Kanji not found' }, { status: 404 });
    }

    return NextResponse.json({ data: kanjiData });
  } catch (error) {
    console.error('Error in GET request:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
} 