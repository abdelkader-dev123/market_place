import { Redirect, Stack } from "expo-router";

import { useAuth } from "@/features/auth/hooks";

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect href="/(main)" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
