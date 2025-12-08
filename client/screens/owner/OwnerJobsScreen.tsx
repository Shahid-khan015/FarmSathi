import React, { useState } from "react";
import { View, StyleSheet, FlatList, Pressable, Switch } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { useApp } from "@/context/AppContext";
import { Spacing, BorderRadius } from "@/constants/theme";
import { Job } from "@/data/mockData";
import { StatusBadge } from "@/components/StatusBadge";

export default function OwnerJobsScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();
  const { currentUser, getOwnerJobs, updateWagePaid } = useApp();

  const allJobs = currentUser ? getOwnerJobs(currentUser.id) : [];

  const handleToggleWagePaid = (jobId: string, paid: boolean) => {
    updateWagePaid(jobId, paid);
  };

  const renderJobCard = ({ item }: { item: Job }) => (
    <Pressable
      style={[styles.jobCard, { backgroundColor: theme.backgroundDefault }]}
    >
      <View style={styles.jobHeader}>
        <View style={styles.jobInfo}>
          <ThemedText type="body" style={{ fontWeight: "600" }}>
            {item.fieldName} - {item.village}
          </ThemedText>
          <View style={styles.jobMeta}>
            <Feather name="truck" size={14} color={theme.textSecondary} />
            <ThemedText type="small" style={{ color: theme.textSecondary }}>
              {item.machineName}
            </ThemedText>
          </View>
          <View style={styles.jobMeta}>
            <Feather name="user" size={14} color={theme.textSecondary} />
            <ThemedText type="small" style={{ color: theme.textSecondary }}>
              {item.operatorName}
            </ThemedText>
          </View>
        </View>
        <View style={styles.jobRight}>
          <ThemedText type="h4" style={{ color: theme.primary }}>
            {"\u20B9"}{item.estimatedWage}
          </ThemedText>
          <StatusBadge status={item.status} type="job" />
        </View>
      </View>

      <View style={[styles.divider, { backgroundColor: theme.border }]} />

      <View style={styles.jobFooter}>
        <View style={styles.approvalStatus}>
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            Farmer:
          </ThemedText>
          <View
            style={[
              styles.approvalBadge,
              {
                backgroundColor:
                  item.wageStatus === "approved"
                    ? theme.statusApproved + "20"
                    : item.wageStatus === "disputed"
                      ? theme.statusDisputed + "20"
                      : theme.statusPending + "20",
              },
            ]}
          >
            <ThemedText
              type="small"
              style={{
                color:
                  item.wageStatus === "approved"
                    ? theme.statusApproved
                    : item.wageStatus === "disputed"
                      ? theme.statusDisputed
                      : theme.statusPending,
                fontWeight: "600",
              }}
            >
              {item.wageStatus === "approved"
                ? "Approved"
                : item.wageStatus === "disputed"
                  ? "Disputed"
                  : "Pending"}
            </ThemedText>
          </View>
        </View>

        <View style={styles.paidToggle}>
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            Wage Paid
          </ThemedText>
          <Switch
            value={item.wagePaid}
            onValueChange={(value) => handleToggleWagePaid(item.id, value)}
            trackColor={{
              false: theme.backgroundSecondary,
              true: theme.primary + "80",
            }}
            thumbColor={item.wagePaid ? theme.primary : theme.backgroundTertiary}
          />
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <FlatList
        data={allJobs}
        keyExtractor={(item) => item.id}
        renderItem={renderJobCard}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="inbox" size={48} color={theme.textSecondary} />
            <ThemedText type="body" style={{ color: theme.textSecondary }}>
              No jobs found
            </ThemedText>
          </View>
        }
        contentContainerStyle={{
          paddingTop: headerHeight + Spacing.xl,
          paddingBottom: insets.bottom + Spacing["2xl"],
          paddingHorizontal: Spacing.lg,
          gap: Spacing.md,
        }}
        scrollIndicatorInsets={{ bottom: insets.bottom }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  jobCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    gap: Spacing.md,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  jobInfo: {
    flex: 1,
    gap: Spacing.xs,
  },
  jobMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  jobRight: {
    alignItems: "flex-end",
    gap: Spacing.xs,
  },
  divider: {
    height: 1,
  },
  jobFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  approvalStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  approvalBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.xs,
  },
  paidToggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing["4xl"],
    gap: Spacing.md,
  },
});
