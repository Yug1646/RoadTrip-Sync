import { useRouter } from "expo-router";
import {
  Platform,
  TextInput,
  View,
  KeyboardAvoidingView,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import {
  globalStyles,
  borderRadius,
  colors,
  spacing,
  typography,
} from "@/constants/theme";
import PrimaryButton from "@/components/PrimaryButton";
import { useState } from "react";

type Mode = "login" | "signup";

type AuthScreenProps = {
  initialMode: Mode;
};

export default function AuthScreen({ initialMode }: AuthScreenProps) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleContinue = () => {
    if (!email.trim() || password.trim()) return;
    router.replace("/home");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.screen}
    >
      <Text style={globalStyles.h2}>RoadTrip Sync</Text>
      <Text>Coordinate stops, telemetry and live convoy navigation</Text>
      {/* SLIDER VIEW */}
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
      <View style={[globalStyles.card, styles.form]}>
        <View style={styles.field}>
          <Text style={globalStyles.body}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="yug@roadtrip.dev"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.field}>
          <Text style={globalStyles.body}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <PrimaryButton
          label={mode === "login" ? "Log In" : "Sign Up"}
          onPress={handleContinue}
        />
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
  screen: {
    flex: 1,
    backgroundColor: colors.neutral.background,
    padding: spacing.lg,
    gap: spacing.md,
  },
  form: {
    marginTop: spacing.xs,
    gap: spacing.md,
    alignSelf: "stretch",
  },
  field: {
    gap: spacing.xs,
  },
  input: {
    backgroundColor: colors.neutral.card,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.size.md,
    color: colors.primary,
  },
});
