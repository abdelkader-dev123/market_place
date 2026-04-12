import { Redirect } from "expo-router";

import { useAuth } from "@/features/auth/hooks";

export default function Index() {
  const { isAuthenticated } = useAuth();
  return <Redirect href={isAuthenticated ? "/(main)" : "/(auth)/login"} />;
}
