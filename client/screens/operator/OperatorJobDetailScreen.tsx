import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert, Platform } from "react-native";
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
import { Button } from "@/components/Button";
import { InfoCard } from "@/components/InfoCard";

type RouteProps = RouteProp<OperatorStackParamList, "OperatorJobDetail">;

export default function OperatorJobDetailScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const route = useRoute<RouteProps>();
  const { theme } = useTheme();
  const { jobs, updateJobStatus } = useApp();

  const jobFromRoute = route.params.job;
  const currentJob = jobs.find((j) => j.id === jobFromRoute.id) || jobFromRoute;

  const handleStartJob = () => {
    updateJobStatus(currentJob.id, "in_progress");
    showToast("Job started successfully");
  };

  const handleEndJob = () => {
    updateJobStatus(currentJob.id, "completed");
    showToast("Job completed successfully");
  };

  const showToast = (message: string) => {
    if (Platform.OS === "web") {
      alert(message);
    } else {
      Alert.alert("Success", message);
    }
  };

  const getStatusLabel = () => {
    switch (currentJob.status) {
      case "not_started":
        return "Not Started";
      case "in_progress":
        return "In Progress";
      case "completed":
        return "Completed";
      default:
        return "Unknown";
    }
  };

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
          Job #{currentJob.id.toUpperCase()}
        </ThemedText>
        <StatusBadge status={currentJob.status} type="job" />
      </View>

      <InfoCard title="Job Information">
        <View style={styles.infoRow}>
          <Feather name="map-pin" size={18} color={theme.textSecondary} />
          <View style={styles.infoContent}>
            <ThemedText type="small" style={{ color: theme.textSecondary }}>
              Field
            </ThemedText>
            <ThemedText type="body">
              {currentJob.fieldName} - {currentJob.village}
            </ThemedText>
          </View>
        </View>
        <View style={styles.infoRow}>
          <Feather name="truck" size={18} color={theme.textSecondary} />
          <View style={styles.infoContent}>
            <ThemedText type="small" style={{ color: theme.textSecondary }}>
              Machine
            </ThemedText>
            <ThemedText type="body">{currentJob.machineName}</ThemedText>
          </View>
        </View>
        <View style={styles.infoRow}>
          <Feather name="user" size={18} color={theme.textSecondary} />
          <View style={styles.infoContent}>
            <ThemedText type="small" style={{ color: theme.textSecondary }}>
              Farmer
            </ThemedText>
            <ThemedText type="body">{currentJob.farmerName}</ThemedText>
          </View>
        </View>
      </InfoCard>

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
          <View style={styles.summaryItem}>
            <Feather name="droplet" size={20} color={theme.primary} />
            <ThemedText type="h4">{currentJob.fuelUsed} L</ThemedText>
            <ThemedText type="small" style={{ color: theme.textSecondary }}>
              Fuel Used
            </ThemedText>
          </View>
        </View>
      </InfoCard>

      <InfoCard title="Estimated Wage">
        <View style={styles.wageContainer}>
          <ThemedText type="h2" style={{ color: theme.primary }}>
            {"\u20B9"} {currentJob.estimatedWage.toLocaleString()}
          </ThemedText>
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            {currentJob.rateType === "per_hour"
              ? `${"\u20B9"}${currentJob.rateValue}/hour`
              : `${"\u20B9"}${currentJob.rateValue}/km`}
          </ThemedText>
        </View>
      </InfoCard>

      <View style={styles.buttonContainer}>
        {currentJob.status === "not_started" ? (
          <Button onPress={handleStartJob}>Start Job</Button>
        ) : currentJob.status === "in_progress" ? (
          <Button onPress={handleEndJob}>End Job</Button>
        ) : (
          <Button disabled>Job Completed</Button>
        )}
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
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  infoContent: {
    flex: 1,
    gap: Spacing.xs,
  },
  summaryGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  summaryItem: {
    alignItems: "center",
    gap: Spacing.xs,
  },
  wageContainer: {
    alignItems: "center",
    gap: Spacing.xs,
  },
  buttonContainer: {
    marginTop: Spacing.md,
  },
});
