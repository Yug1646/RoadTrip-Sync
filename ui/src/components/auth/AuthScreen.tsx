import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Platform,
  TextInput,
  View,
  KeyboardAvoidingView,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  globalStyles,
  borderRadius,
  colors,
  spacing,
  typography,
} from "@/constants/theme";
import Feather from "@expo/vector-icons/Feather";
import PrimaryButton from "@/components/PrimaryButton";

type Mode = "login" | "signup";
type AuthScreenProps = {
  initialMode: Mode;
};

export default function AuthScreen({ initialMode }: AuthScreenProps) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleContinue = () => {
    if (mode === "signup" && !username.trim()) return;
    if (!email.trim() || !password.trim()) return;
    if (mode === "signup" && password.trim().length < 8) return;
    router.replace("/home");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.screen}
      >
      {/* ---------- ADD LOGO ---------- */}
      <Text style={[globalStyles.h1, styles.title]}>RoadTrip Sync</Text>
      <Text style={[globalStyles.body, styles.subtitle]}>
        Coordinate stops, telemetry and live convoy navigation
      </Text>

      {/* SLIDER VIEW */}
      <View style={styles.sliderTrack}>
        <Pressable
          style={[styles.sliderOption, mode === "login" && styles.sliderActive]}
          onPress={() => setMode("login")}
        >
          <Text
            style={[
              styles.sliderText,
              mode === "login" && styles.sliderTextActive,
            ]}
          >
            Log In
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.sliderOption,
            mode === "signup" && styles.sliderActive,
          ]}
          onPress={() => setMode("signup")}
        >
          <Text
            style={[
              styles.sliderText,
              mode === "signup" && styles.sliderTextActive,
            ]}
          >
            Sign Up
          </Text>
        </Pressable>
      </View>
      
      {/* INPUT FIELD FORMS */}
      <View style={[globalStyles.card, styles.form]}>
        {mode === "signup" && (
          <View style={styles.field}>
            <Text style={globalStyles.body}>Username</Text>
            <View style={styles.inputWrap}>
              <View style={styles.leadingIcon}>
                <Feather
                  name="user"
                  size={16}
                  color={colors.neutral.placeholder}
                />
              </View>
              <TextInput
                style={styles.input}
                placeholder="e.g. convoy_lead"
                placeholderTextColor={colors.neutral.placeholder}
                autoCapitalize="none"
                value={username}
                onChangeText={setUsername}
              />
            </View>
          </View>
        )}

        <View style={styles.field}>
          <Text style={globalStyles.body}>Email</Text>
          <View style={styles.inputWrap}>
            <View style={styles.leadingIcon}>
              <Feather
                name="mail"
                size={16}
                color={colors.neutral.placeholder}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="navigator@roadtripsync.io"
              placeholderTextColor={colors.neutral.placeholder}
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        <View style={styles.field}>
          <View style={styles.labelRow}>
            <Text style={globalStyles.body}>Password</Text>
            <Pressable>
              <Text style={styles.forgotLink}>Forgot password?</Text>
            </Pressable>
          </View>
          <View style={styles.inputWrap}>
            <View style={styles.leadingIcon}>
              <Feather
                name="lock"
                size={16}
                color={colors.neutral.placeholder}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="At least 8 characters"
              placeholderTextColor={colors.neutral.placeholder}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <Pressable
              style={styles.eyeButton}
              onPress={() => setShowPassword((s) => !s)}
            >
              <Feather
                name={showPassword ? "eye-off" : "eye"}
                size={18}
                color={colors.neutral.placeholder}
              />
            </Pressable>
          </View>
        </View>

        <PrimaryButton
          label={mode === "login" ? "Log In" : "Create Account"}
          onPress={handleContinue}
          icon={
            <Feather
              name={mode === "login" ? "log-in" : "plus-circle"}
              size={16}
              color={colors.neutral.white}
            />
          }
        />
      </View>

      <View style={styles.banner}>
        <Feather name="shield" size={14} color={colors.secondary} />
        <Text style={styles.bannerText}>
          Designed for group drivers and road convoys.
        </Text>
      </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.neutral.background,
  },
  screen: {
    flex: 1,
    padding: spacing.lg,
    gap: spacing.md,
    justifyContent: "center",
  },
  banner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    backgroundColor: colors.tertiaryLight,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignSelf: "stretch",
  },
  bannerText: {
    fontSize: typography.size.xs,
    color: colors.neutral.body,
  },
  title: {
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
  },
  sliderTrack: {
    flexDirection: "row",
    backgroundColor: colors.tertiaryLight,
    borderRadius: borderRadius.full,
    padding: spacing.xs,
  },
  sliderOption: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    alignItems: "center",
  },
  sliderActive: {
    backgroundColor: colors.neutral.card,
  },
  sliderText: {
    fontSize: typography.size.sm,
    color: colors.neutral.placeholder,
  },
  sliderTextActive: {
    color: colors.primary,
  },
  form: {
    gap: spacing.md,
    alignSelf: "stretch",
  },
  field: {
    gap: spacing.xs,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  forgotLink: {
    fontSize: typography.size.xs,
    color: colors.secondary,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.tertiaryLight,
    borderRadius: borderRadius.md,
  },
  leadingIcon: {
    paddingLeft: spacing.md,
  },
  input: {
    flex: 1,
    paddingLeft: spacing.xs,
    paddingRight: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.size.md,
    color: colors.primary,
  },
  eyeButton: {
    paddingHorizontal: spacing.sm,
  },
});
