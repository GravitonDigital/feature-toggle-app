export const LanguageRange = Java.type<LanguageRangeConstructor>("java.util.Locale.LanguageRange");

interface LanguageRangeConstructor {
  parse(ranges: string): LanguageRange[];
  parse(ranges: string, map: Record<string, string[]>): LanguageRange[];
}

export type LanguageRange = {
  getRange(): string;
  getWeight(): number;
};
