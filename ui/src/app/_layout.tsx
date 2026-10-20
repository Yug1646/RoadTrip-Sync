import { Stack, useSegments, useRouter } from "expo-router";
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
} from "@expo-google-fonts/plus-jakarta-sans";
import { useEffect, useState } from "react";
import { loadToken, getToken } from "@/services/token";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
  });
  const [isAuthReady, setIsAuthReady] = useState(false);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    loadToken().then(() => setIsAuthReady(true));
  }, []);

  useEffect(() => {
    if (!isAuthReady) return;
    const token = getToken();
    const inAuth = segments[0] === "auth";
    const inProtected = segments[0] === "(tabs)" || segments[0] === "trip";

    if (!token && inProtected) {
      router.replace("/auth");
    } else if (token && !inProtected) {
      router.replace("/home");
    }
  }, [isAuthReady, segments]);

  if (!loaded || !isAuthReady) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
