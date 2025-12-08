import React from "react";
import { View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";

interface StatCardProps {
  title: string;
  value: string;
  icon: keyof typeof Feather.glyphMap;
  color: string;
}

export function StatCard({ title, value, icon, color }: StatCardProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.backgroundDefault }]}>
      <View style={[styles.iconContainer, { backgroundColor: color + "20" }]}>
        <Feather name={icon} size={18} color={color} />
      </View>
      <ThemedText type="h4" style={styles.value}>
        {value}
      </ThemedText>
      <ThemedText
        type="small"
        style={[styles.title, { color: theme.textSecondary }]}
        numberOfLines={1}
      >
        {title}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: "center",
    gap: Spacing.xs,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  value: {
    textAlign: "center",
  },
  title: {
    textAlign: "center",
  },
});
