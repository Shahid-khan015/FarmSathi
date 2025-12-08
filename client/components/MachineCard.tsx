import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";
import { Machine } from "@/data/mockData";
import { StatusBadge } from "@/components/StatusBadge";

interface MachineCardProps {
  machine: Machine;
  onPress: () => void;
}

export function MachineCard({ machine, onPress }: MachineCardProps) {
  const { theme } = useTheme();

  const getMachineIcon = (): keyof typeof Feather.glyphMap => {
    switch (machine.type) {
      case "Tractor":
        return "truck";
      case "Harvester":
        return "scissors";
      case "Plough":
        return "grid";
      case "Seeder":
        return "cloud-rain";
      default:
        return "truck";
    }
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.backgroundDefault,
          opacity: pressed ? 0.9 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
    >
      <View
        style={[styles.iconContainer, { backgroundColor: theme.primary + "20" }]}
      >
        <Feather name={getMachineIcon()} size={24} color={theme.primary} />
      </View>
      <View style={styles.content}>
        <ThemedText type="body" style={styles.name}>
          {machine.name}
        </ThemedText>
        <ThemedText type="small" style={{ color: theme.textSecondary }}>
          {machine.type}
        </ThemedText>
      </View>
      <View style={styles.rightSection}>
        <StatusBadge status={machine.status} type="machine" />
        <Feather name="chevron-right" size={20} color={theme.textSecondary} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    gap: Spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    gap: Spacing.xs,
  },
  name: {
    fontWeight: "600",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
});
