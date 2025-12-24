import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";

export type UserRole = "farmer" | "operator" | "owner";

interface RoleSelectorProps {
  selectedRole: UserRole | null;
  onRoleSelect: (role: UserRole) => void;
  style?: ViewStyle;
}

const ROLES: { role: UserRole; label: string; icon: string }[] = [
  { role: "farmer", label: "Farmer", icon: "leaf" },
  { role: "operator", label: "Operator", icon: "wrench" },
  { role: "owner", label: "Owner", icon: "briefcase" },
];

export default function RoleSelector({
  selectedRole,
  onRoleSelect,
  style,
}: RoleSelectorProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, { color: colors.text }]}>Select Your Role</Text>
      <View style={styles.rolesGrid}>
        {ROLES.map(({ role, label, icon }) => (
          <TouchableOpacity
            key={role}
            style={[
              styles.roleCard,
              {
                backgroundColor: colors.card,
                borderColor:
                  selectedRole === role ? colors.primary : colors.border,
              },
            ]}
            onPress={() => onRoleSelect(role)}
          >
            <MaterialCommunityIcons
              name={icon as any}
              size={32}
              color={selectedRole === role ? colors.primary : colors.muted}
            />
            <Text
              style={[
                styles.roleLabel,
                {
                  color: selectedRole === role ? colors.primary : colors.text,
                },
              ]}
            >
              {label}
            </Text>
            {selectedRole === role && (
              <View
                style={[styles.checkmark, { backgroundColor: colors.primary }]}
              >
                <MaterialCommunityIcons
                  name="check"
                  size={16}
                  color={colors.backgroundDefault}
                />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
  },
  rolesGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  roleCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    borderRadius: 12,
    borderWidth: 2,
    position: "relative",
  },
  roleLabel: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "600",
  },
  checkmark: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
