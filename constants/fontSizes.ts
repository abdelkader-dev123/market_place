export const fontSizes = {
  xs: 12,
  sm: 13,
  base: 15,
  md: 16,
  lg: 17,
  xl: 18,
  "2xl": 20,
  "3xl": 24,
  "4xl": 28,
} as const;

export type FontSizeName = keyof typeof fontSizes;
