import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useRoute, RouteProp } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { useApp } from "@/context/AppContext";
import { Spacing, BorderRadius } from "@/constants/theme";
import { OperatorStackParamList } from "@/navigation/OperatorStackNavigator";
import { StatusBadge } from "@/components/StatusBadge";
import { InfoCard } from "@/components/InfoCard";

type RouteProps = RouteProp<OperatorStackParamList, "OperatorWageDetail">;

export default function OperatorWageDetailScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const route = useRoute<RouteProps>();
  const { theme } = useTheme();
  const { jobs } = useApp();

  const jobFromRoute = route.params.job;
  const currentJob = jobs.find((j) => j.id === jobFromRoute.id) || jobFromRoute;

  const rateDescription =
    currentJob.rateType === "per_hour"
      ? `${"\u20B9"}${currentJob.rateValue} per hour x ${currentJob.engineHours} hours`
      : `${"\u20B9"}${currentJob.rateValue} per km x ${currentJob.distanceCovered} km`;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      contentContainerStyle={{
        paddingTop: headerHeight + Spacing.xl,
        paddingBottom: insets.bottom + Spacing["2xl"],
        paddingHorizontal: Spacing.lg,
        gap: Spacing.lg,
      }}
    >
      <View style={styles.statusHeader}>
        <ThemedText type="small" style={{ color: theme.textSecondary }}>
          {currentJob.fieldName} - {currentJob.village}
        </ThemedText>
        <StatusBadge status={currentJob.wageStatus} type="wage" />
      </View>

      <ThemedText type="small" style={{ color: theme.textSecondary }}>
        {currentJob.date}
      </ThemedText>

      <InfoCard title="Work Summary">
        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <Feather name="navigation" size={20} color={theme.primary} />
            <ThemedText type="h4">{currentJob.distanceCovered} km</ThemedText>
            <ThemedText type="small" style={{ color: theme.textSecondary }}>
              Distance
            </ThemedText>
          </View>
          <View style={styles.summaryItem}>
            <Feather name="clock" size={20} color={theme.primary} />
            <ThemedText type="h4">{currentJob.engineHours} h</ThemedText>
            <ThemedText type="small" style={{ color: theme.textSecondary }}>
              Engine Hours
            </ThemedText>
          </View>
        </View>
      </InfoCard>

      <InfoCard title="Wage Breakdown">
        <View style={styles.wageBreakdown}>
          <View style={styles.formulaRow}>
            <Feather name="percent" size={18} color={theme.textSecondary} />
            <ThemedText type="body">{rateDescription}</ThemedText>
          </View>

          <View
            style={[styles.divider, { backgroundColor: theme.border }]}
          />

          <View style={styles.totalRow}>
            <ThemedText type="body" style={{ color: theme.textSecondary }}>
              Gross Wage
            </ThemedText>
            <ThemedText type="h2" style={{ color: theme.primary }}>
              {"\u20B9"} {currentJob.estimatedWage.toLocaleString()}
            </ThemedText>
          </View>
        </View>
      </InfoCard>

      <View
        style={[styles.statusCard, { backgroundColor: theme.backgroundDefault }]}
      >
        <ThemedText type="body" style={{ fontWeight: "600" }}>
          Payment Status
        </ThemedText>
        <View style={styles.statusInfo}>
          {currentJob.wageStatus === "approved" ? (
            <>
              <Feather
                name="check-circle"
                size={24}
                color={theme.statusApproved}
              />
              <ThemedText type="body" style={{ color: theme.statusApproved }}>
                Approved by Farmer
              </ThemedText>
            </>
          ) : currentJob.wageStatus === "disputed" ? (
            <>
              <Feather
                name="alert-circle"
                size={24}
                color={theme.statusDisputed}
              />
              <ThemedText type="body" style={{ color: theme.statusDisputed }}>
                Disputed - Under Review
              </ThemedText>
            </>
          ) : (
            <>
              <Feather name="clock" size={24} color={theme.statusPending} />
              <ThemedText type="body" style={{ color: theme.statusPending }}>
                Pending Farmer Approval
              </ThemedText>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  summaryItem: {
    alignItems: "center",
    gap: Spacing.xs,
  },
  wageBreakdown: {
    gap: Spacing.md,
  },
  formulaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  divider: {
    height: 1,
    marginVertical: Spacing.sm,
  },
  totalRow: {
    alignItems: "center",
    gap: Spacing.xs,
  },
  statusCard: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.lg,
    gap: Spacing.md,
  },
  statusInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
});
