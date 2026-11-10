/** One row of the generated icon manifest. */
export interface IconEntry {
  /** Ticker / ISO code from Figma brackets, e.g. "BTC", "UAH", "UA", "GB-ENG". Null for brands and illustrations. */
  code: string | null;
  /** Human name from Figma, e.g. "Bitcoin", "Ukraine". */
  name: string;
  /** File name in src/assets/icons/<group>/ without ".svg". */
  file: string;
  /** Other names to find the icon by (old country names etc.). */
  aliases?: string[];
  /** Reason the icon should not be used in new screens. */
  deprecated?: string;
}
