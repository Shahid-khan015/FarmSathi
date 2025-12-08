import React from "react";
import { View, StyleSheet, FlatList, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { useApp } from "@/context/AppContext";
import { Spacing, BorderRadius } from "@/constants/theme";
import { FarmerStackParamList } from "@/navigation/FarmerStackNavigator";
import { Job } from "@/data/mockData";
import { StatCard } from "@/components/StatCard";
import { JobCard } from "@/components/JobCard";
import { Button } from "@/components/Button";

type NavigationProp = NativeStackNavigationProp<FarmerStackParamList>;

export default function FarmerHomeScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();
  const { currentUser, getFarmerJobs } = useApp();

  const allJobs = currentUser ? getFarmerJobs(currentUser.id) : [];
  const recentJobs = allJobs.slice(0, 5);
  const totalWage = allJobs.reduce((sum, job) => sum + job.estimatedWage, 0);
  const uniqueMachines = new Set(allJobs.map((job) => job.machineId)).size;

  const handleJobPress = (job: Job) => {
    navigation.navigate("FarmerJobDetail", { job });
  };

  const handleViewHistory = () => {
    navigation.navigate("FarmerJobHistory");
  };

  const renderHeader = () => (
    <View style={styles.headerSection}>
      <ThemedText type="h3">
        Welcome, {currentUser?.name || "Farmer"}
      </ThemedText>
      <ThemedText type="body" style={{ color: theme.textSecondary }}>
        Manage work on your fields
      </ThemedText>

      <View style={styles.statsRow}>
        <StatCard
          title="Jobs This Week"
          value={allJobs.length.toString()}
          icon="briefcase"
          color={theme.primary}
        />
        <StatCard
          title="Total Wage"
          value={`\u20B9${(totalWage / 1000).toFixed(1)}K`}
          icon="dollar-sign"
          color={theme.statusPending}
        />
        <StatCard
          title="Machines"
          value={uniqueMachines.toString()}
          icon="truck"
          color={theme.statusInProgress}
        />
      </View>

      <View style={styles.sectionHeader}>
        <ThemedText type="h4">Recent Jobs on My Fields</ThemedText>
        <Pressable onPress={handleViewHistory}>
          <ThemedText type="small" style={{ color: theme.link }}>
            View All
          </ThemedText>
        </Pressable>
      </View>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footerSection}>
      <Button onPress={handleViewHistory}>
        View Full History
      </Button>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <FlatList
        data={recentJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <JobCard
            job={item}
            onPress={() => handleJobPress(item)}
            showWage
            showOperator
            showFarmer={false}
          />
        )}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="inbox" size={48} color={theme.textSecondary} />
            <ThemedText type="body" style={{ color: theme.textSecondary }}>
              No jobs on your fields yet
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
  headerSection: {
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  statsRow: {
    flexDirection: "row",
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Spacing.lg,
  },
  footerSection: {
    marginTop: Spacing.lg,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing["4xl"],
    gap: Spacing.md,
  },
});
