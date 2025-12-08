import React, { useState } from "react";
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
import { Job, WageStatus } from "@/data/mockData";
import { JobCard } from "@/components/JobCard";

type NavigationProp = NativeStackNavigationProp<FarmerStackParamList>;

type FilterType = "all" | "approved" | "pending" | "disputed";

export default function FarmerJobHistoryScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();
  const { currentUser, getFarmerJobs } = useApp();

  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const allJobs = currentUser ? getFarmerJobs(currentUser.id) : [];

  const filteredJobs = allJobs.filter((job) => {
    if (activeFilter === "all") return true;
    return job.wageStatus === activeFilter;
  });

  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: "All" },
    { key: "approved", label: "Approved" },
    { key: "pending", label: "Pending" },
    { key: "disputed", label: "Disputed" },
  ];

  const handleJobPress = (job: Job) => {
    navigation.navigate("FarmerJobDetail", { job });
  };

  const renderHeader = () => (
    <View style={styles.filterContainer}>
      {filters.map((filter) => (
        <Pressable
          key={filter.key}
          onPress={() => setActiveFilter(filter.key)}
          style={[
            styles.filterPill,
            {
              backgroundColor:
                activeFilter === filter.key
                  ? theme.primary
                  : theme.backgroundDefault,
            },
          ]}
        >
          <ThemedText
            type="small"
            style={{
              color: activeFilter === filter.key ? theme.white : theme.text,
              fontWeight: activeFilter === filter.key ? "600" : "400",
            }}
          >
            {filter.label}
          </ThemedText>
        </Pressable>
      ))}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <FlatList
        data={filteredJobs}
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
  filterContainer: {
    flexDirection: "row",
    gap: Spacing.sm,
    marginBottom: Spacing.md,
    flexWrap: "wrap",
  },
  filterPill: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing["4xl"],
    gap: Spacing.md,
  },
});
