import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

import { colors } from "@/constants/colors";
import { useAuth } from "@/features/auth/hooks";
import { queryClient } from "@/services/queryClient";

export default function RootLayout() {
  const { hydrate, isHydrated, isAuthenticated } = useAuth();

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  if (!isHydrated) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Protected guard={isAuthenticated}>
          <Stack.Screen name="(main)" />
        </Stack.Protected>
      </Stack>
    </QueryClientProvider>
  );
}
