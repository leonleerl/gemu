/**
 * Interface representing a Japanese Kanji character and its properties.
 * @interface Kanji
 */
interface Kanji {
  /** Frequency of appearance in Mainichi Shinbun newspaper (null if not available) */
  freq_mainichi_shinbun: number | null;

  /** School grade level where this kanji is taught in Japan (1-6 for elementary, 7-9 for junior high, null if not applicable) */
  grade: number | null;

  /** English keyword from Heisig's "Remembering the Kanji" method (null if not included in Heisig's system) */
  heisig_en: string | null;

  /** JLPT (Japanese Language Proficiency Test) level (N5-N1, null if not part of JLPT) */
  jlpt: number | null;

  /** The actual kanji character */
  kanji: string;

  /** Array of kun'yomi readings (Japanese readings) in hiragana */
  kun_readings: string[];

  /** Array of English meanings/translations for the kanji */
  meanings: string[];

  /** Array of readings specifically used in Japanese names */
  name_readings: string[];

  /** Array of additional information or usage notes */
  notes: string[];

  /** Array of on'yomi readings (Chinese-derived readings) in katakana */
  on_readings: string[];

  /** Number of strokes needed to write the kanji */
  stroke_count: number;

  /** Unicode value of the kanji character */
  unicode: string;
}

export type { Kanji };
