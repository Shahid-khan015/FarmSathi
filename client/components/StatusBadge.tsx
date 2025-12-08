import React from "react";
import { View, StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius } from "@/constants/theme";
import { JobStatus, WageStatus, MachineStatus } from "@/data/mockData";

interface StatusBadgeProps {
  status: JobStatus | WageStatus | MachineStatus;
  type: "job" | "wage" | "machine";
}

export function StatusBadge({ status, type }: StatusBadgeProps) {
  const { theme } = useTheme();

  const getStatusConfig = () => {
    if (type === "job") {
      switch (status as JobStatus) {
        case "not_started":
          return { label: "Not Started", color: theme.statusNotStarted };
        case "in_progress":
          return { label: "In Progress", color: theme.statusInProgress };
        case "completed":
          return { label: "Completed", color: theme.statusCompleted };
        default:
          return { label: "Unknown", color: theme.textSecondary };
      }
    } else if (type === "wage") {
      switch (status as WageStatus) {
        case "pending":
          return { label: "Pending", color: theme.statusPending };
        case "approved":
          return { label: "Approved", color: theme.statusApproved };
        case "disputed":
          return { label: "Disputed", color: theme.statusDisputed };
        default:
          return { label: "Unknown", color: theme.textSecondary };
      }
    } else {
      switch (status as MachineStatus) {
        case "active":
          return { label: "Active", color: theme.statusActive };
        case "idle":
          return { label: "Idle", color: theme.statusIdle };
        case "offline":
          return { label: "Offline", color: theme.statusOffline };
        default:
          return { label: "Unknown", color: theme.textSecondary };
      }
    }
  };

  const config = getStatusConfig();

  return (
    <View style={[styles.badge, { backgroundColor: config.color + "20" }]}>
      <View style={[styles.dot, { backgroundColor: config.color }]} />
      <ThemedText
        type="small"
        style={[styles.label, { color: config.color }]}
      >
        {config.label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    gap: Spacing.xs,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  label: {
    fontWeight: "600",
  },
});
