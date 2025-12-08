import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";
import { Job } from "@/data/mockData";
import { StatusBadge } from "@/components/StatusBadge";

interface JobCardProps {
  job: Job;
  onPress: () => void;
  showWage?: boolean;
  showOperator?: boolean;
  showFarmer?: boolean;
}

export function JobCard({
  job,
  onPress,
  showWage = true,
  showOperator = true,
  showFarmer = true,
}: JobCardProps) {
  const { theme } = useTheme();

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
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <ThemedText type="body" style={styles.fieldName}>
            {job.fieldName} - {job.village}
          </ThemedText>
          <View style={styles.metaRow}>
            <Feather name="truck" size={14} color={theme.textSecondary} />
            <ThemedText type="small" style={{ color: theme.textSecondary }}>
              {job.machineName}
            </ThemedText>
          </View>
          {showOperator ? (
            <View style={styles.metaRow}>
              <Feather name="user" size={14} color={theme.textSecondary} />
              <ThemedText type="small" style={{ color: theme.textSecondary }}>
                {job.operatorName}
              </ThemedText>
            </View>
          ) : null}
          {showFarmer ? (
            <View style={styles.metaRow}>
              <Feather name="sun" size={14} color={theme.textSecondary} />
              <ThemedText type="small" style={{ color: theme.textSecondary }}>
                {job.farmerName}
              </ThemedText>
            </View>
          ) : null}
        </View>
        <View style={styles.rightSection}>
          {showWage ? (
            <ThemedText type="h4" style={{ color: theme.primary }}>
              {"\u20B9"} {job.estimatedWage}
            </ThemedText>
          ) : null}
          <StatusBadge status={job.status} type="job" />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleContainer: {
    flex: 1,
    gap: Spacing.xs,
  },
  fieldName: {
    fontWeight: "600",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  rightSection: {
    alignItems: "flex-end",
    gap: Spacing.sm,
  },
});
