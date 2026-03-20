import { Redirect } from "expo-router";

export default function Index() {
  // In a real app, check if user is logged in
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return <Redirect href="/(auth)/onboarding" />;
  }

  return <Redirect href="/(tabs)" />;
}
