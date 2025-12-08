import React from "react";
import { View, StyleSheet, Image, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { useApp } from "@/context/AppContext";
import { Spacing, BorderRadius } from "@/constants/theme";
import { Role, mockUsers } from "@/data/mockData";

export default function RoleSelectScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const { setCurrentRole, setCurrentUser } = useApp();

  const handleRoleSelect = (role: Role) => {
    const user = mockUsers.find((u) => u.role === role);
    if (user) {
      setCurrentUser(user);
    }
    setCurrentRole(role);
  };

  const roles: { role: Role; title: string; icon: keyof typeof Feather.glyphMap; description: string }[] = [
    {
      role: "farmer",
      title: "I am a Farmer",
      icon: "sun",
      description: "View and approve work on your fields",
    },
    {
      role: "owner",
      title: "I am a Machine Owner",
      icon: "truck",
      description: "Manage machines and operator wages",
    },
    {
      role: "operator",
      title: "I am an Operator",
      icon: "user",
      description: "Track jobs and view wage summaries",
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <View
        style={[
          styles.content,
          {
            paddingTop: insets.top + Spacing["4xl"],
            paddingBottom: insets.bottom + Spacing["2xl"],
          },
        ]}
      >
        <View style={styles.header}>
          <Image
            source={require("../../assets/images/icon.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <ThemedText type="h2" style={styles.title}>
            AgriTrack
          </ThemedText>
          <ThemedText
            type="body"
            style={[styles.subtitle, { color: theme.textSecondary }]}
          >
            Agricultural Machinery Work Monitoring
          </ThemedText>
        </View>

        <View style={styles.roleContainer}>
          <ThemedText type="h4" style={styles.sectionTitle}>
            Select Your Role
          </ThemedText>

          {roles.map((item) => (
            <Pressable
              key={item.role}
              onPress={() => handleRoleSelect(item.role)}
              style={({ pressed }) => [
                styles.roleButton,
                {
                  backgroundColor: theme.backgroundDefault,
                  borderColor: theme.border,
                  opacity: pressed ? 0.8 : 1,
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                },
              ]}
            >
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: theme.primary },
                ]}
              >
                <Feather name={item.icon} size={24} color={theme.white} />
              </View>
              <View style={styles.roleTextContainer}>
                <ThemedText type="body" style={styles.roleTitle}>
                  {item.title}
                </ThemedText>
                <ThemedText
                  type="small"
                  style={[styles.roleDescription, { color: theme.textSecondary }]}
                >
                  {item.description}
                </ThemedText>
              </View>
              <Feather name="chevron-right" size={24} color={theme.textSecondary} />
            </Pressable>
          ))}
        </View>

        <ThemedText
          type="small"
          style={[styles.footer, { color: theme.textSecondary }]}
        >
          Transparent wage tracking for everyone
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    gap: Spacing.sm,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: Spacing.md,
  },
  title: {
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
  },
  roleContainer: {
    gap: Spacing.md,
  },
  sectionTitle: {
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  roleButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    gap: Spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  roleTextContainer: {
    flex: 1,
    gap: Spacing.xs,
  },
  roleTitle: {
    fontWeight: "600",
  },
  roleDescription: {},
  footer: {
    textAlign: "center",
  },
});
