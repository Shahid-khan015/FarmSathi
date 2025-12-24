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
import { Button } from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";
import { AuthStackParamList } from "@/navigation/AuthStackNavigator";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

interface LoginErrors {
  phone?: string;
  password?: string;
}

export default function LoginScreen({ navigation }: Props) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();

  const validateInputs = (): boolean => {
    const newErrors: LoginErrors = {};

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateInputs()) {
      return;
    }

    setLoading(true);
    try {
      // Simulate API call with delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock success - navigate to Home
      navigation.navigate("Home", { userName: "User" });
    } catch (error) {
      Alert.alert("Login Failed", "An error occurred during login. Please try again.");
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
            <ThemedText style={styles.title}>Login</ThemedText>
            <ThemedText style={styles.subtitle}>
              Welcome back to AgriTrack
            </ThemedText>
          </View>

          <View style={styles.form}>
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

            <Button
              onPress={handleLogin}
              disabled={loading}
              style={styles.loginButton}
            >
              {loading ? (
                <ActivityIndicator
                  color={colors.buttonText}
                  size="small"
                />
              ) : (
                <ThemedText style={styles.buttonText}>Login</ThemedText>
              )}
            </Button>
          </View>

          <View style={styles.footer}>
            <ThemedText style={styles.footerText}>
              Don't have an account?{" "}
              <ThemedText
                style={[styles.link, { color: colors.primary }]}
                onPress={() => navigation.navigate("Register")}
              >
                Register here
              </ThemedText>
            </ThemedText>
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
  loginButton: {
    marginTop: 8,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    alignItems: "center",
    marginTop: 16,
  },
  footerText: {
    fontSize: 14,
  },
  link: {
    fontWeight: "600",
  },
});
