import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { login as loginApi } from "@/features/auth/api";
import { useAuth } from "@/features/auth/hooks";
import { SafeAreaView } from "react-native-safe-area-context";

const DEFAULT_USERNAME = "emilys";
const DEFAULT_PASSWORD = "emilyspass";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const [username, setUsername] = useState(DEFAULT_USERNAME);
  const [password, setPassword] = useState(DEFAULT_PASSWORD);
  const [localError, setLocalError] = useState<string | null>(null);
  const [requestError, setRequestError] = useState<string | null>(null);

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: async (token) => {
      await login(token);
      router.replace("/(protected)");
    },
    onError: () => {
      setRequestError("Invalid credentials. Please try again.");
    },
  });

  const onSubmit = async () => {
    setLocalError(null);
    setRequestError(null);

    if (!username.trim() || !password.trim()) {
      setLocalError("Please enter both username and password.");
      return;
    }

    loginMutation.mutate({ username, password });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Sign in to Market</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={setUsername}
              placeholder="Enter username"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
              value={username}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              onChangeText={setPassword}
              placeholder="Enter password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              style={styles.input}
              value={password}
            />
          </View>

          {localError || requestError ? (
            <Text style={styles.error}>{localError ?? requestError}</Text>
          ) : null}

          <Pressable
            disabled={loginMutation.isPending}
            onPress={onSubmit}
            style={({ pressed }) => [
              styles.button,
              pressed && !loginMutation.isPending ? styles.buttonPressed : null,
              loginMutation.isPending ? styles.buttonDisabled : null,
            ]}
          >
            {loginMutation.isPending ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F6F8",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#111827",
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  kicker: {
    color: "#6B7280",
    fontSize: 13,
    marginBottom: 4,
  },
  title: {
    color: "#111827",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    color: "#4B5563",
    marginTop: 8,
    marginBottom: 20,
    lineHeight: 20,
  },
  inputGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#111827",
    fontSize: 15,
  },
  error: {
    color: "#DC2626",
    marginBottom: 10,
    fontSize: 13,
  },
  button: {
    marginTop: 8,
    backgroundColor: "#111827",
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: "center",
  },
  buttonPressed: {
    opacity: 0.9,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  helperText: {
    marginTop: 14,
    color: "#6B7280",
    fontSize: 12,
  },
});
