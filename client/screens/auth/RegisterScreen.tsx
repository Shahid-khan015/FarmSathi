import React, { useState } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import TextInput from "@/components/TextInput";
import RoleSelector, { UserRole } from "@/components/RoleSelector";
import { Button } from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";
import { useApp } from "@/context/AppContext";
import { AuthStackParamList } from "@/navigation/AuthStackNavigator";
import { mockRegister, getDummyCredentials } from "@/lib/mockAuth";

type Props = NativeStackScreenProps<AuthStackParamList, "Register">;

interface RegisterErrors {
  fullName?: string;
  phone?: string;
  password?: string;
  role?: string;
}

export default function RegisterScreen({ navigation }: Props) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();

  const validateInputs = (): boolean => {
    const newErrors: RegisterErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (phone.length !== 10) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    } else if (!/^\d+$/.test(phone)) {
      newErrors.phone = "Phone number must contain only digits";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!selectedRole) {
      newErrors.role = "Please select a role";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const { setCurrentUser, setCurrentRole } = useApp() || {};

  const handleRegister = async () => {
    if (!validateInputs()) {
      Alert.alert("Validation Error", "Please fill all fields correctly");
      return;
    }

    setLoading(true);
    try {
      // Simulate API call with delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock registration
      const response = mockRegister({
        phone,
        password,
        name: fullName,
      });

      if (response.success && response.user) {
        // Set user role to selected role
        const userWithRole = { ...response.user, role: selectedRole! };
        setCurrentUser?.(userWithRole);
        setCurrentRole?.(selectedRole!);
        
        // Navigate to role selection screen
        navigation.navigate("RoleSelect");
      } else {
        Alert.alert("Registration Failed", response.error || "Please try again");
      }
    } catch (error) {
      Alert.alert("Registration Failed", "An error occurred during registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.flex}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.container}>
          <View style={styles.header}>
            <ThemedText style={styles.title}>Create Account</ThemedText>
            <ThemedText style={styles.subtitle}>
              Join AgriTrack to get started
            </ThemedText>
          </View>

          <View style={styles.form}>
            <TextInput
              label="Full Name"
              placeholder="Enter your full name"
              value={fullName}
              onChangeText={(text) => {
                setFullName(text);
                if (errors.fullName) {
                  setErrors({ ...errors, fullName: undefined });
                }
              }}
              error={errors.fullName}
            />

            <TextInput
              label="Phone Number"
              placeholder="Enter 10-digit phone number"
              value={phone}
              onChangeText={(text) => {
                setPhone(text.replace(/\D/g, "").slice(0, 10));
                if (errors.phone) {
                  setErrors({ ...errors, phone: undefined });
                }
              }}
              keyboardType="numeric"
              maxLength={10}
              error={errors.phone}
            />

            <TextInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) {
                  setErrors({ ...errors, password: undefined });
                }
              }}
              secureTextEntry
              error={errors.password}
            />

            <RoleSelector
              selectedRole={selectedRole}
              onRoleSelect={setSelectedRole}
            />

            {errors.role && (
              <ThemedText style={[styles.error, { color: colors.danger }]}>
                {errors.role}
              </ThemedText>
            )}

            <Button
              onPress={handleRegister}
              disabled={loading}
              style={styles.registerButton}
            >
              {loading ? (
                <ActivityIndicator
                  color={colors.buttonText}
                  size="small"
                />
              ) : (
                <ThemedText style={styles.buttonText}>Create Account</ThemedText>
              )}
            </Button>
          </View>

          <View style={styles.footer}>
            <ThemedText style={styles.footerText}>
              Already have an account?{" "}
              <ThemedText
                style={[styles.link, { color: colors.primary }]}
                onPress={() => navigation.navigate("Login")}
              >
                Login here
              </ThemedText>
            </ThemedText>

            <View style={styles.demoContainer}>
              <ThemedText style={styles.demoTitle}>Demo Credentials</ThemedText>
              {getDummyCredentials().map((cred) => (
                <ThemedText key={cred.phone} style={styles.demoText}>
                  {cred.role}: {cred.phone} / {cred.password}
                </ThemedText>
              ))}
            </View>
          </View>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: {
    marginBottom: 32,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  form: {
    marginBottom: 24,
  },
  registerButton: {
    marginTop: 8,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  error: {
    fontSize: 12,
    marginBottom: 12,
  },
  footer: {
    alignItems: "center",
    marginTop: 16,
    gap: 16,
  },
  footerText: {
    fontSize: 14,
  },
  link: {
    fontWeight: "600",
  },
  demoContainer: {
    backgroundColor: "rgba(46, 125, 50, 0.1)",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    width: "100%",
  },
  demoTitle: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 8,
  },
  demoText: {
    fontSize: 11,
    opacity: 0.7,
    marginBottom: 4,
  },
});
