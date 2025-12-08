import React, { useState } from "react";
import { View, StyleSheet, ScrollView, FlatList, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useRoute, RouteProp } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { useApp } from "@/context/AppContext";
import { Spacing, BorderRadius } from "@/constants/theme";
import { OwnerStackParamList } from "@/navigation/OwnerStackNavigator";
import { StatusBadge } from "@/components/StatusBadge";
import { InfoCard } from "@/components/InfoCard";
import { JobCard } from "@/components/JobCard";
import { mockMaintenanceRecords } from "@/data/mockData";

type RouteProps = RouteProp<OwnerStackParamList, "MachineDetail">;

type TabType = "jobs" | "usage" | "maintenance";

export default function MachineDetailScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const route = useRoute<RouteProps>();
  const { theme } = useTheme();
  const { jobs } = useApp();

  const machine = route.params.machine;
  const [activeTab, setActiveTab] = useState<TabType>("jobs");

  const machineJobs = jobs.filter((job) => job.machineId === machine.id);
  const maintenanceRecords = mockMaintenanceRecords.filter(
    (m) => m.machineId === machine.id,
  );

  const tabs: { key: TabType; label: string; icon: keyof typeof Feather.glyphMap }[] = [
    { key: "jobs", label: "Jobs", icon: "briefcase" },
    { key: "usage", label: "Usage", icon: "bar-chart-2" },
    { key: "maintenance", label: "Service", icon: "tool" },
  ];

  const usageData = [
    { label: "Mon", value: 65 },
    { label: "Tue", value: 80 },
    { label: "Wed", value: 45 },
    { label: "Thu", value: 90 },
    { label: "Fri", value: 70 },
    { label: "Sat", value: 55 },
    { label: "Sun", value: 20 },
  ];

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
      <View style={styles.machineHeader}>
        <View
          style={[styles.machineIcon, { backgroundColor: theme.primary + "20" }]}
        >
          <Feather name="truck" size={32} color={theme.primary} />
        </View>
        <View style={styles.machineInfo}>
          <ThemedText type="h3">{machine.name}</ThemedText>
          <ThemedText type="body" style={{ color: theme.textSecondary }}>
            {machine.type}
          </ThemedText>
          <StatusBadge status={machine.status} type="machine" />
        </View>
      </View>

      <View style={styles.statsRow}>
        <View
          style={[styles.statItem, { backgroundColor: theme.backgroundDefault }]}
        >
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            Engine Hours
          </ThemedText>
          <ThemedText type="h4">{machine.engineHours} h</ThemedText>
        </View>
        <View
          style={[styles.statItem, { backgroundColor: theme.backgroundDefault }]}
        >
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            Next Service
          </ThemedText>
          <ThemedText type="h4">{machine.nextServiceDue} h</ThemedText>
        </View>
      </View>

      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <Pressable
            key={tab.key}
            onPress={() => setActiveTab(tab.key)}
            style={[
              styles.tab,
              {
                backgroundColor:
                  activeTab === tab.key
                    ? theme.primary
                    : theme.backgroundDefault,
              },
            ]}
          >
            <Feather
              name={tab.icon}
              size={18}
              color={activeTab === tab.key ? theme.white : theme.textSecondary}
            />
            <ThemedText
              type="small"
              style={{
                color: activeTab === tab.key ? theme.white : theme.text,
                fontWeight: activeTab === tab.key ? "600" : "400",
              }}
            >
              {tab.label}
            </ThemedText>
          </Pressable>
        ))}
      </View>

      {activeTab === "jobs" ? (
        <View style={styles.tabContent}>
          {machineJobs.length > 0 ? (
            machineJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onPress={() => {}}
                showWage
                showOperator
                showFarmer
              />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Feather name="inbox" size={48} color={theme.textSecondary} />
              <ThemedText type="body" style={{ color: theme.textSecondary }}>
                No jobs for this machine
              </ThemedText>
            </View>
          )}
        </View>
      ) : activeTab === "usage" ? (
        <InfoCard title="Weekly Usage">
          <View style={styles.chartContainer}>
            {usageData.map((day, index) => (
              <View key={index} style={styles.barContainer}>
                <View style={styles.barWrapper}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: `${day.value}%`,
                        backgroundColor: theme.primary,
                      },
                    ]}
                  />
                </View>
                <ThemedText type="small" style={{ color: theme.textSecondary }}>
                  {day.label}
                </ThemedText>
              </View>
            ))}
          </View>
          <View style={styles.chartLegend}>
            <ThemedText type="small" style={{ color: theme.textSecondary }}>
              Utilization percentage per day
            </ThemedText>
          </View>
        </InfoCard>
      ) : (
        <View style={styles.tabContent}>
          <InfoCard title="Next Service Due">
            <View style={styles.serviceInfo}>
              <Feather name="alert-circle" size={24} color={theme.statusPending} />
              <View>
                <ThemedText type="body">
                  In {machine.nextServiceDue} engine hours
                </ThemedText>
                <ThemedText type="small" style={{ color: theme.textSecondary }}>
                  Approximately 5-7 working days
                </ThemedText>
              </View>
            </View>
          </InfoCard>

          <ThemedText type="h4" style={{ marginTop: Spacing.lg }}>
            Past Services
          </ThemedText>
          {maintenanceRecords.map((record) => (
            <View
              key={record.id}
              style={[
                styles.maintenanceItem,
                { backgroundColor: theme.backgroundDefault },
              ]}
            >
              <View style={styles.maintenanceHeader}>
                <Feather name="tool" size={18} color={theme.primary} />
                <ThemedText type="body" style={{ fontWeight: "600" }}>
                  {record.description}
                </ThemedText>
              </View>
              <View style={styles.maintenanceDetails}>
                <ThemedText type="small" style={{ color: theme.textSecondary }}>
                  {record.date}
                </ThemedText>
                <ThemedText type="small" style={{ color: theme.textSecondary }}>
                  At {record.engineHoursAtService} engine hours
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  machineHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.lg,
  },
  machineIcon: {
    width: 72,
    height: 72,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  machineInfo: {
    flex: 1,
    gap: Spacing.xs,
  },
  statsRow: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  statItem: {
    flex: 1,
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: "center",
    gap: Spacing.xs,
  },
  tabContainer: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.xs,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  tabContent: {
    gap: Spacing.md,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing["4xl"],
    gap: Spacing.md,
  },
  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 150,
    paddingTop: Spacing.md,
  },
  barContainer: {
    alignItems: "center",
    gap: Spacing.sm,
  },
  barWrapper: {
    flex: 1,
    width: 24,
    justifyContent: "flex-end",
  },
  bar: {
    width: "100%",
    borderRadius: BorderRadius.xs,
  },
  chartLegend: {
    alignItems: "center",
    marginTop: Spacing.md,
  },
  serviceInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  maintenanceItem: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
  },
  maintenanceHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  maintenanceDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: Spacing.xl + Spacing.sm,
  },
});
