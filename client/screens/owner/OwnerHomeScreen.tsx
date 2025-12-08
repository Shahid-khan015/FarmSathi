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
import { OwnerStackParamList } from "@/navigation/OwnerStackNavigator";
import { mockMachines, Machine } from "@/data/mockData";
import { StatCard } from "@/components/StatCard";
import { MachineCard } from "@/components/MachineCard";
import { Button } from "@/components/Button";

type NavigationProp = NativeStackNavigationProp<OwnerStackParamList>;

export default function OwnerHomeScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();
  const { currentUser, getOwnerJobs } = useApp();

  const allJobs = currentUser ? getOwnerJobs(currentUser.id) : [];
  const todayJobs = allJobs.filter((job) => job.date === "2024-12-08");
  const totalWageThisWeek = allJobs.reduce(
    (sum, job) => sum + job.estimatedWage,
    0,
  );
  const activeMachines = mockMachines.filter(
    (m) => m.status === "active",
  ).length;

  const handleMachinePress = (machine: Machine) => {
    navigation.navigate("MachineDetail", { machine });
  };

  const handleViewAllJobs = () => {
    navigation.navigate("OwnerJobs");
  };

  const renderHeader = () => (
    <View style={styles.headerSection}>
      <ThemedText type="h3">Owner Dashboard</ThemedText>
      <ThemedText type="body" style={{ color: theme.textSecondary }}>
        Manage your machines and operators
      </ThemedText>

      <View style={styles.statsRow}>
        <StatCard
          title="Active Machines"
          value={activeMachines.toString()}
          icon="truck"
          color={theme.statusActive}
        />
        <StatCard
          title="Jobs Today"
          value={todayJobs.length.toString()}
          icon="briefcase"
          color={theme.primary}
        />
        <StatCard
          title="Week Wage"
          value={`\u20B9${(totalWageThisWeek / 1000).toFixed(1)}K`}
          icon="dollar-sign"
          color={theme.statusPending}
        />
      </View>

      <View style={styles.sectionHeader}>
        <ThemedText type="h4">My Machines</ThemedText>
      </View>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footerSection}>
      <Button onPress={handleViewAllJobs}>View All Jobs</Button>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <FlatList
        data={mockMachines}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MachineCard
            machine={item}
            onPress={() => handleMachinePress(item)}
          />
        )}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
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
});
