export const colors = {
  primary: "#111827",
  onPrimary: "#FFFFFF",

  textMuted: "#6B7280",
  textSecondary: "#4B5563",
  textBody: "#374151",
  textPlaceholder: "#9CA3AF",

  error: "#DC2626",
  destructive: "#B91C1C",

  background: "#F4F6F8",
  surface: "#FFFFFF",
  surfaceSubtle: "#F9FAFB",

  border: "#E5E7EB",
  imagePlaceholder: "#E5E7EB",
} as const;

export type ColorName = keyof typeof colors;
