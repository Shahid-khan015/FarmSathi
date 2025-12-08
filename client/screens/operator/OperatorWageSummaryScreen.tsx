import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { useApp } from "@/context/AppContext";
import { Spacing } from "@/constants/theme";
import { OperatorStackParamList } from "@/navigation/OperatorStackNavigator";
import { Job } from "@/data/mockData";
import { WageCard } from "@/components/WageCard";

type NavigationProp = NativeStackNavigationProp<OperatorStackParamList>;

export default function OperatorWageSummaryScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();
  const { currentUser, getOperatorJobs } = useApp();

  const allJobs = currentUser ? getOperatorJobs(currentUser.id) : [];
  const completedJobs = allJobs.filter((job) => job.status === "completed");

  const totalEarnings = completedJobs.reduce(
    (sum, job) => sum + job.estimatedWage,
    0,
  );
  const approvedEarnings = completedJobs
    .filter((job) => job.wageStatus === "approved")
    .reduce((sum, job) => sum + job.estimatedWage, 0);
  const pendingEarnings = completedJobs
    .filter((job) => job.wageStatus === "pending")
    .reduce((sum, job) => sum + job.estimatedWage, 0);

  const handleJobPress = (job: Job) => {
    navigation.navigate("OperatorWageDetail", { job });
  };

  const renderHeader = () => (
    <View style={styles.headerSection}>
      <View
        style={[styles.totalCard, { backgroundColor: theme.backgroundDefault }]}
      >
        <ThemedText type="small" style={{ color: theme.textSecondary }}>
          Total Earnings
        </ThemedText>
        <ThemedText type="h1" style={{ color: theme.primary }}>
          {"\u20B9"} {totalEarnings.toLocaleString()}
        </ThemedText>
        <View style={styles.earningsRow}>
          <View style={styles.earningsItem}>
            <View
              style={[styles.dot, { backgroundColor: theme.statusApproved }]}
            />
            <ThemedText type="small" style={{ color: theme.textSecondary }}>
              Approved: {"\u20B9"}{approvedEarnings.toLocaleString()}
            </ThemedText>
          </View>
          <View style={styles.earningsItem}>
            <View
              style={[styles.dot, { backgroundColor: theme.statusPending }]}
            />
            <ThemedText type="small" style={{ color: theme.textSecondary }}>
              Pending: {"\u20B9"}{pendingEarnings.toLocaleString()}
            </ThemedText>
          </View>
        </View>
      </View>

      <ThemedText type="h4" style={styles.sectionTitle}>
        Completed Jobs
      </ThemedText>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <FlatList
        data={completedJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <WageCard job={item} onPress={() => handleJobPress(item)} />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="inbox" size={48} color={theme.textSecondary} />
            <ThemedText type="body" style={{ color: theme.textSecondary }}>
              No completed jobs yet
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
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  totalCard: {
    padding: Spacing.xl,
    borderRadius: 20,
    alignItems: "center",
    gap: Spacing.sm,
  },
  earningsRow: {
    flexDirection: "row",
    gap: Spacing.xl,
    marginTop: Spacing.sm,
  },
  earningsItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  sectionTitle: {
    marginTop: Spacing.md,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing["4xl"],
    gap: Spacing.md,
  },
});
