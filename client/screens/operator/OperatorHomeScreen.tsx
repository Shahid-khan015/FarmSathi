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
import { OperatorStackParamList } from "@/navigation/OperatorStackNavigator";
import { Job } from "@/data/mockData";
import { StatCard } from "@/components/StatCard";
import { JobCard } from "@/components/JobCard";
import { Button } from "@/components/Button";

type NavigationProp = NativeStackNavigationProp<OperatorStackParamList>;

export default function OperatorHomeScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();
  const { currentUser, getOperatorJobs } = useApp();

  const allJobs = currentUser ? getOperatorJobs(currentUser.id) : [];
  const todayJobs = allJobs.filter((job) => job.date === "2024-12-08");
  const completedToday = todayJobs.filter((job) => job.status === "completed").length;
  const pendingToday = todayJobs.filter((job) => job.status !== "completed").length;

  const handleJobPress = (job: Job) => {
    navigation.navigate("OperatorJobDetail", { job });
  };

  const handleWageSummary = () => {
    navigation.navigate("OperatorWageSummary");
  };

  const renderHeader = () => (
    <View style={styles.headerSection}>
      <ThemedText type="h3">
        Hi, {currentUser?.name || "Operator"}
      </ThemedText>
      <ThemedText type="body" style={{ color: theme.textSecondary }}>
        {"Here's your work overview"}
      </ThemedText>

      <View style={styles.statsRow}>
        <StatCard
          title="Jobs Today"
          value={todayJobs.length.toString()}
          icon="briefcase"
          color={theme.primary}
        />
        <StatCard
          title="Completed"
          value={completedToday.toString()}
          icon="check-circle"
          color={theme.statusCompleted}
        />
        <StatCard
          title="Pending"
          value={pendingToday.toString()}
          icon="clock"
          color={theme.statusPending}
        />
      </View>

      <ThemedText type="h4" style={styles.sectionTitle}>
        {"Today's Jobs"}
      </ThemedText>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footerSection}>
      <Button onPress={handleWageSummary}>
        View Wage Summary
      </Button>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <FlatList
        data={todayJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <JobCard
            job={item}
            onPress={() => handleJobPress(item)}
            showWage
            showOperator={false}
          />
        )}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="inbox" size={48} color={theme.textSecondary} />
            <ThemedText type="body" style={{ color: theme.textSecondary }}>
              No jobs scheduled for today
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
  sectionTitle: {
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
