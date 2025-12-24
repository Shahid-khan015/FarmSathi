import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { AuthStackParamList } from "@/navigation/AuthStackNavigator";

type Props = NativeStackScreenProps<AuthStackParamList, "Home">;

export default function HomeScreen({ route, navigation }: Props) {
  const { userName = "User" } = route.params;
  const { colors } = useTheme();

  const handleLogout = () => {
    navigation.navigate("Login");
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View
          style={[styles.avatarCircle, { backgroundColor: colors.primary }]}
        >
          <ThemedText style={styles.avatarText}>
            {userName.charAt(0).toUpperCase()}
          </ThemedText>
        </View>
        <ThemedText style={styles.welcomeText}>Welcome,</ThemedText>
        <ThemedText style={styles.userName}>{userName}</ThemedText>
      </View>

      <View style={styles.content}>
        <View
          style={[styles.infoCard, { backgroundColor: colors.card }]}
        >
          <MaterialCommunityIcons
            name="information"
            size={24}
            color={colors.primary}
            style={styles.infoIcon}
          />
          <ThemedText style={styles.infoTitle}>Ready to Get Started?</ThemedText>
          <ThemedText style={styles.infoText}>
            You have successfully logged in to AgriTrack. Choose your role to
            continue exploring the platform.
          </ThemedText>
        </View>

        <View style={styles.featuresSection}>
          <ThemedText style={styles.featuresTitle}>Features</ThemedText>
          <FeatureItem icon="leaf" label="Farmer Tools" />
          <FeatureItem icon="wrench" label="Machine Operations" />
          <FeatureItem icon="briefcase" label="Owner Dashboard" />
        </View>
      </View>

      <TouchableOpacity
        style={[styles.logoutButton, { backgroundColor: colors.danger }]}
        onPress={handleLogout}
      >
        <MaterialCommunityIcons name="power" size={20} color={colors.buttonText} />
        <ThemedText style={styles.logoutText}>Logout</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

interface FeatureItemProps {
  icon: string;
  label: string;
}

function FeatureItem({ icon, label }: FeatureItemProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.featureItem}>
      <MaterialCommunityIcons
        name={icon as any}
        size={20}
        color={colors.primary}
      />
      <ThemedText style={styles.featureLabel}>{label}</ThemedText>
      <MaterialCommunityIcons
        name="chevron-right" as any
        size={20}
        color={colors.muted}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "700",
  },
  welcomeText: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
  },
  content: {
    flex: 1,
  },
  infoCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 32,
    alignItems: "center",
  },
  infoIcon: {
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: "center",
    lineHeight: 20,
  },
  featuresSection: {
    marginBottom: 24,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  featureLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 24,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
