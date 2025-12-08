import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
  Modal,
  TextInput,
  Pressable,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { useApp } from "@/context/AppContext";
import { Spacing, BorderRadius } from "@/constants/theme";
import { FarmerStackParamList } from "@/navigation/FarmerStackNavigator";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/Button";
import { InfoCard } from "@/components/InfoCard";
import { disputeReasons } from "@/data/mockData";

type RouteProps = RouteProp<FarmerStackParamList, "FarmerJobDetail">;

export default function FarmerJobDetailScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const route = useRoute<RouteProps>();
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { jobs, updateWageStatus } = useApp();

  const jobFromRoute = route.params.job;
  const currentJob = jobs.find((j) => j.id === jobFromRoute.id) || jobFromRoute;

  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [comments, setComments] = useState("");

  const handleApprove = () => {
    updateWageStatus(currentJob.id, "approved");
    showToast("Job and wage approved successfully");
  };

  const handleRaiseDispute = () => {
    setShowDisputeModal(true);
  };

  const handleSubmitDispute = () => {
    updateWageStatus(currentJob.id, "disputed");
    setShowDisputeModal(false);
    setSelectedReason("");
    setComments("");
    showToast("Dispute submitted successfully");
  };

  const showToast = (message: string) => {
    if (Platform.OS === "web") {
      alert(message);
    } else {
      Alert.alert("Success", message);
    }
  };

  const rateDescription =
    currentJob.rateType === "per_hour"
      ? `${"\u20B9"}${currentJob.rateValue} per hour`
      : `${"\u20B9"}${currentJob.rateValue} per km`;

  return (
    <>
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
          <StatusBadge status={currentJob.wageStatus} type="wage" />
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
                Operator
              </ThemedText>
              <ThemedText type="body">{currentJob.operatorName}</ThemedText>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Feather name="calendar" size={18} color={theme.textSecondary} />
            <View style={styles.infoContent}>
              <ThemedText type="small" style={{ color: theme.textSecondary }}>
                Date
              </ThemedText>
              <ThemedText type="body">{currentJob.date}</ThemedText>
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
              <Feather name="grid" size={20} color={theme.primary} />
              <ThemedText type="h4">{currentJob.estimatedArea} acres</ThemedText>
              <ThemedText type="small" style={{ color: theme.textSecondary }}>
                Est. Area
              </ThemedText>
            </View>
          </View>
        </InfoCard>

        <InfoCard title="Wage Summary">
          <View style={styles.wageDetails}>
            <View style={styles.wageRow}>
              <ThemedText type="body" style={{ color: theme.textSecondary }}>
                Rate Type
              </ThemedText>
              <ThemedText type="body">
                {currentJob.rateType === "per_hour" ? "Per Hour" : "Per Distance"}
              </ThemedText>
            </View>
            <View style={styles.wageRow}>
              <ThemedText type="body" style={{ color: theme.textSecondary }}>
                Rate Value
              </ThemedText>
              <ThemedText type="body">{rateDescription}</ThemedText>
            </View>
            <View style={[styles.divider, { backgroundColor: theme.border }]} />
            <View style={styles.wageRow}>
              <ThemedText type="h4">Total Wage</ThemedText>
              <ThemedText type="h3" style={{ color: theme.primary }}>
                {"\u20B9"} {currentJob.estimatedWage.toLocaleString()}
              </ThemedText>
            </View>
          </View>
        </InfoCard>

        {currentJob.wageStatus === "pending" ? (
          <View style={styles.buttonContainer}>
            <Button onPress={handleApprove}>Approve Job & Wage</Button>
            <Pressable
              onPress={handleRaiseDispute}
              style={[
                styles.disputeButton,
                { borderColor: theme.statusDisputed },
              ]}
            >
              <ThemedText
                type="body"
                style={{ color: theme.statusDisputed, fontWeight: "600" }}
              >
                Raise Dispute
              </ThemedText>
            </Pressable>
          </View>
        ) : currentJob.wageStatus === "approved" ? (
          <View
            style={[
              styles.statusMessage,
              { backgroundColor: theme.statusApproved + "20" },
            ]}
          >
            <Feather name="check-circle" size={24} color={theme.statusApproved} />
            <ThemedText type="body" style={{ color: theme.statusApproved }}>
              You have approved this job
            </ThemedText>
          </View>
        ) : (
          <View
            style={[
              styles.statusMessage,
              { backgroundColor: theme.statusDisputed + "20" },
            ]}
          >
            <Feather name="alert-circle" size={24} color={theme.statusDisputed} />
            <ThemedText type="body" style={{ color: theme.statusDisputed }}>
              Dispute submitted - Under review
            </ThemedText>
          </View>
        )}
      </ScrollView>

      <Modal
        visible={showDisputeModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowDisputeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <ThemedView style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <ThemedText type="h4">Raise Dispute</ThemedText>
              <Pressable onPress={() => setShowDisputeModal(false)}>
                <Feather name="x" size={24} color={theme.text} />
              </Pressable>
            </View>

            <ThemedText type="body" style={{ marginBottom: Spacing.md }}>
              Select a reason for the dispute
            </ThemedText>

            <View style={styles.reasonsContainer}>
              {disputeReasons.map((reason) => (
                <Pressable
                  key={reason}
                  onPress={() => setSelectedReason(reason)}
                  style={[
                    styles.reasonOption,
                    {
                      backgroundColor:
                        selectedReason === reason
                          ? theme.primary + "20"
                          : theme.backgroundDefault,
                      borderColor:
                        selectedReason === reason ? theme.primary : theme.border,
                    },
                  ]}
                >
                  <ThemedText type="body">{reason}</ThemedText>
                </Pressable>
              ))}
            </View>

            <ThemedText
              type="body"
              style={{ marginTop: Spacing.lg, marginBottom: Spacing.sm }}
            >
              Additional Comments
            </ThemedText>
            <TextInput
              value={comments}
              onChangeText={setComments}
              multiline
              numberOfLines={3}
              placeholder="Enter any additional details..."
              placeholderTextColor={theme.textSecondary}
              style={[
                styles.textInput,
                {
                  backgroundColor: theme.backgroundDefault,
                  color: theme.text,
                  borderColor: theme.border,
                },
              ]}
            />

            <Button
              onPress={handleSubmitDispute}
              disabled={!selectedReason}
              style={{ marginTop: Spacing.xl }}
            >
              Submit Dispute
            </Button>
          </ThemedView>
        </View>
      </Modal>
    </>
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
  wageDetails: {
    gap: Spacing.sm,
  },
  wageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  divider: {
    height: 1,
    marginVertical: Spacing.sm,
  },
  buttonContainer: {
    gap: Spacing.md,
  },
  disputeButton: {
    height: 52,
    borderRadius: BorderRadius.full,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  statusMessage: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    padding: Spacing.xl,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  reasonsContainer: {
    gap: Spacing.sm,
  },
  reasonOption: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    minHeight: 80,
    textAlignVertical: "top",
  },
});
