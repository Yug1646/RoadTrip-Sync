import { borderRadius, colors, globalStyles, spacing } from "@/constants/theme";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  Text,
  View,
  StyleSheet,
} from "react-native";

type Mode = "login" | "signup";

type AuthScreenProps = {
  initialMode: Mode;
};

export default function AuthScreen({ initialMode }: AuthScreenProps) {
  const [mode, setMode] = useState<Mode>(initialMode);

  return (
    <KeyboardAvoidingView>
      <Text style={globalStyles.h2}>RoadTrip Sync</Text>
      <Text>Coordinate stops, telemetry and live convoy navigation</Text>
      <View style={styles.tabRow}>
        <Pressable
          style={[styles.tab, mode === "login" && styles.tabActive]}
          onPress={() => setMode("login")}
        >
          <Text>Log In</Text>
        </Pressable>
        <Pressable
          style={[styles.tab, mode === "signup" && styles.tabActive]}
          onPress={() => setMode("signup")}
        >
          <Text>Sign Up</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  tabRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: colors.secondaryLight,
  },
});
