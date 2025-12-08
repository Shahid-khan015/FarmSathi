import { Platform } from "react-native";

const primaryGreen = "#2E7D32";
const primaryGreenLight = "#4CAF50";
const primaryGreenDark = "#1B5E20";

export const Colors = {
  light: {
    text: "#1A1A1A",
    textSecondary: "#666666",
    buttonText: "#FFFFFF",
    tabIconDefault: "#687076",
    tabIconSelected: primaryGreen,
    link: primaryGreen,
    primary: primaryGreen,
    primaryLight: primaryGreenLight,
    primaryDark: primaryGreenDark,
    backgroundRoot: "#FAFAFA",
    backgroundDefault: "#F5F5F5",
    backgroundSecondary: "#EEEEEE",
    backgroundTertiary: "#E0E0E0",
    statusApproved: "#4CAF50",
    statusPending: "#FFA726",
    statusDisputed: "#EF5350",
    statusActive: "#4CAF50",
    statusIdle: "#9E9E9E",
    statusOffline: "#EF5350",
    statusInProgress: "#42A5F5",
    statusNotStarted: "#BDBDBD",
    statusCompleted: "#4CAF50",
    white: "#FFFFFF",
    border: "#E0E0E0",
  },
  dark: {
    text: "#ECEDEE",
    textSecondary: "#9BA1A6",
    buttonText: "#FFFFFF",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: primaryGreenLight,
    link: primaryGreenLight,
    primary: primaryGreenLight,
    primaryLight: "#81C784",
    primaryDark: primaryGreen,
    backgroundRoot: "#121212",
    backgroundDefault: "#1E1E1E",
    backgroundSecondary: "#2A2A2A",
    backgroundTertiary: "#363636",
    statusApproved: "#66BB6A",
    statusPending: "#FFB74D",
    statusDisputed: "#EF5350",
    statusActive: "#66BB6A",
    statusIdle: "#9E9E9E",
    statusOffline: "#EF5350",
    statusInProgress: "#64B5F6",
    statusNotStarted: "#757575",
    statusCompleted: "#66BB6A",
    white: "#FFFFFF",
    border: "#404040",
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  "4xl": 40,
  "5xl": 48,
  inputHeight: 48,
  buttonHeight: 52,
};

export const BorderRadius = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  "2xl": 32,
  "3xl": 40,
  full: 9999,
};

export const Typography = {
  h1: {
    fontSize: 32,
    fontWeight: "700" as const,
  },
  h2: {
    fontSize: 28,
    fontWeight: "700" as const,
  },
  h3: {
    fontSize: 24,
    fontWeight: "600" as const,
  },
  h4: {
    fontSize: 20,
    fontWeight: "600" as const,
  },
  body: {
    fontSize: 16,
    fontWeight: "400" as const,
  },
  small: {
    fontSize: 14,
    fontWeight: "400" as const,
  },
  link: {
    fontSize: 16,
    fontWeight: "400" as const,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
