import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
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
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/constants/colors";
import { fontSizes } from "@/constants/fontSizes";
import { login as loginApi } from "@/features/auth/api";
import { useAuth, useLoginForm } from "@/features/auth/hooks";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const {
    values,
    fieldErrors,
    requestError,
    setField,
    setRequestError,
    validate,
    clearErrors,
  } = useLoginForm();

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: async (token) => {
      await login(token);
      router.replace("/(main)");
    },
    onError: () => {
      setRequestError("Invalid credentials. Please try again.");
    },
  });

  const onSubmit = () => {
    clearErrors();
    const parsed = validate();
    if (!parsed) return;
    loginMutation.mutate(parsed);
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
              onChangeText={(v) => setField("username", v)}
              placeholder="Enter username"
              placeholderTextColor={colors.textPlaceholder}
              style={[
                styles.input,
                fieldErrors.username ? styles.inputError : null,
              ]}
              value={values.username}
            />
            {fieldErrors.username ? (
              <Text style={styles.fieldError}>{fieldErrors.username}</Text>
            ) : null}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              onChangeText={(v) => setField("password", v)}
              placeholder="Enter password"
              placeholderTextColor={colors.textPlaceholder}
              secureTextEntry
              style={[
                styles.input,
                fieldErrors.password ? styles.inputError : null,
              ]}
              value={values.password}
            />
            {fieldErrors.password ? (
              <Text style={styles.fieldError}>{fieldErrors.password}</Text>
            ) : null}
          </View>

          {requestError ? (
            <Text style={styles.requestError}>{requestError}</Text>
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
              <ActivityIndicator color={colors.onPrimary} />
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
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.primary,
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  title: {
    color: colors.primary,
    fontSize: fontSizes["4xl"],
    fontWeight: "700",
    marginBottom: 8,
  },
  inputGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: fontSizes.sm,
    color: colors.textBody,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.primary,
    fontSize: fontSizes.base,
  },
  inputError: {
    borderColor: colors.error,
  },
  fieldError: {
    color: colors.error,
    fontSize: fontSizes.xs,
    marginTop: 4,
  },
  requestError: {
    color: colors.error,
    marginBottom: 10,
    fontSize: fontSizes.sm,
  },
  button: {
    marginTop: 8,
    backgroundColor: colors.primary,
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
    color: colors.onPrimary,
    fontSize: fontSizes.md,
    fontWeight: "600",
  },
});
