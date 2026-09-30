import { StyleSheet } from "react-native";

export const colors = {
  // Brand Palette
  primary: "#0F2942", // Deep Navy (Headers, main logo, dark cards)
  secondary: "#FF6B35", // Vibrant Orange (Primary action buttons, active states)
  tertiary: "#2A7B9B", // Route Teal (Maps, route blue badges, transport icons)

  // Surface Tints (For light badge backgrounds & highlighted pills)
  secondaryLight: "#FFF0EB",
  tertiaryLight: "#EBF5F8",

  // Neutrals & Structure
  neutral: {
    title: "#0F172A", // High-contrast headings
    body: "#64748B", // Subtitles and body text
    placeholder: "#94A3B8", // Disabled/Placeholder text
    border: "#E2E8F0", // Input outlines & subtle card dividers
    background: "#F8FAFC", // Screen background color
    card: "#FFFFFF", // Card background
  },
};

export const typography = {
  fontFamily: {
    regular: "PlusJakartaSans_400Regular",
    medium: "PlusJakartaSans_500Medium",
    semibold: "PlusJakartaSans_600SemiBold",
    bold: "PlusJakartaSans_700Bold",
  },
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    title: 32,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const borderRadius = {
  sm: 8,
  md: 12, // Inputs and standard buttons
  lg: 16, // Trip cards
  xl: 24, // Bottom sheets & code blocks
  full: 9999, // Pill buttons and avatars
};

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
} as const;

export const globalStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.neutral.background,
  },
  card: {
    backgroundColor: colors.neutral.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.neutral.border,
  },
  primaryButton: {
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: typography.size.md,
    fontFamily: typography.fontFamily.bold,
  },
});
