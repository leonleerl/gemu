const hiraganaToKatakana: { [key: string]: string } = {
  'あ': 'ア', 'い': 'イ', 'う': 'ウ', 'え': 'エ', 'お': 'オ',
  'か': 'カ', 'き': 'キ', 'く': 'ク', 'け': 'ケ', 'こ': 'コ',
  'さ': 'サ', 'し': 'シ', 'す': 'ス', 'せ': 'セ', 'そ': 'ソ',
  'た': 'タ', 'ち': 'チ', 'つ': 'ツ', 'て': 'テ', 'と': 'ト',
  'な': 'ナ', 'に': 'ニ', 'ぬ': 'ヌ', 'ね': 'ネ', 'の': 'ノ',
  'は': 'ハ', 'ひ': 'ヒ', 'ふ': 'フ', 'へ': 'ヘ', 'ほ': 'ホ',
  'ま': 'マ', 'み': 'ミ', 'む': 'ム', 'め': 'メ', 'も': 'モ',
  'や': 'ヤ', 'ゆ': 'ユ', 'よ': 'ヨ',
  'ら': 'ラ', 'り': 'リ', 'る': 'ル', 'れ': 'レ', 'ろ': 'ロ',
  'わ': 'ワ', 'を': 'ヲ', 'ん': 'ン',
  // Add dakuten and handakuten versions as needed
  'が': 'ガ', 'ぎ': 'ギ', 'ぐ': 'グ', 'げ': 'ゲ', 'ご': 'ゴ',
  // ... add more as needed
};

// Create reverse mapping
const katakanaToHiragana: { [key: string]: string } = 
  Object.fromEntries(Object.entries(hiraganaToKatakana).map(([k, v]) => [v, k]));

export const toKatakana = (text: string): string => {
  return text.split('').map(char => hiraganaToKatakana[char] || char).join('');
};

export const toHiragana = (text: string): string => {
  return text.split('').map(char => katakanaToHiragana[char] || char).join('');
};

export const isKanaMatch = (text1: string, text2: string): boolean => {
  const hira1 = toHiragana(text1);
  const hira2 = toHiragana(text2);
  return hira1 === hira2;
}; 