import { useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  borderRadius,
  colors,
  globalStyles,
  spacing,
  typography,
} from "@/constants/theme";
import { MODE_OPTIONS } from "@/constants/modes";
import AppHeader from "@/components/ui/AppHeader";
import type { TravelMode } from "@/types/trip";

const CODE_LENGTH = 6;

export default function JoinScreen() {
  const { code: codeParam } = useLocalSearchParams<{ code?: string }>();
  const [code, setCode] = useState<string[]>(() => {
    const chars = (codeParam ?? "")
      .replace(/[^A-Za-z0-9]/g, "")
      .toUpperCase()
      .slice(0, CODE_LENGTH)
      .split("");
    return Array.from(
      { length: CODE_LENGTH },
      (_, index) => chars[index] ?? ""
    );
  });
  const [mode, setMode] = useState<TravelMode>("car");
  const [nickname, setNickname] = useState("");
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const router = useRouter();

  const codeString = code.join("");
  const isCodeComplete = codeString.length === CODE_LENGTH;

  const handleChange = (index: number, text: string) => {
    const chars = text.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    const next = [...code];

    if (!chars) {
      next[index] = "";
      setCode(next);
      return;
    }

    let cursor = index;
    for (const char of chars) {
      if (cursor >= CODE_LENGTH) break;
      next[cursor] = char;
      cursor += 1;
    }
    setCode(next);
    inputRefs.current[Math.min(cursor, CODE_LENGTH - 1)]?.focus();
  };

  const handleBackspace = (index: number, key: string) => {
    if (key !== "Backspace" || code[index] || index === 0) return;
    const next = [...code];
    next[index - 1] = "";
    setCode(next);
    inputRefs.current[index - 1]?.focus();
  };

  const handleJoin = () => {
    if (!isCodeComplete || !nickname.trim()) return;
    router.replace("/trip/details");
  };

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.scroll}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <AppHeader title="Join Trip" />

          <Text style={styles.stepLabel}>STEP 1 — TRIP INVITE CODE</Text>
          <View style={styles.codeRow}>
            {code.map((char, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                style={[styles.codeBox, char !== "" && styles.codeBoxFilled]}
                value={char}
                onChangeText={(text) => handleChange(index, text)}
                onKeyPress={(event) => handleBackspace(index, event.nativeEvent.key)}
                maxLength={CODE_LENGTH}
                autoCapitalize="characters"
                autoCorrect={false}
              />
            ))}
          </View>

          {isCodeComplete ? (
            <View style={styles.previewCard}>
              <View style={styles.previewHeader}>
                <Text style={globalStyles.h3}>Pacific Coast Cruise</Text>
                <View style={styles.verifiedPill}>
                  <Feather name="check-circle" size={12} color={colors.tertiary} />
                  <Text style={styles.verifiedPillText}>Verified</Text>
                </View>
              </View>
              <Text style={globalStyles.body}>
                Organizer: Yug • 4 vehicles in convoy
              </Text>
              <Text style={styles.previewHint}>
                Wrong trip? Ask the host to resend the code.
              </Text>
            </View>
          ) : (
            <Text style={styles.codeHint}>
              Enter the {CODE_LENGTH}-character code shared by your organizer.
            </Text>
          )}

          <Text style={styles.stepLabel}>STEP 2 — CHOOSE YOUR TRAVEL MODE</Text>
          <View style={styles.modeGrid}>
            {MODE_OPTIONS.map((option) => {
              const isSelected = mode === option.value;
              return (
                <Pressable
                  key={option.value}
                  style={[styles.modeCell, isSelected && styles.modeCellActive]}
                  onPress={() => setMode(option.value)}
                >
                  <Feather
                    name={isSelected ? "check-circle" : "circle"}
                    size={16}
                    color={isSelected ? colors.secondary : colors.neutral.placeholder}
                  />
                  <MaterialIcons
                    name={option.icon}
                    size={16}
                    color={isSelected ? colors.secondary : colors.primary}
                  />
                  <Text
                    style={[
                      styles.modeCellText,
                      isSelected && styles.modeCellTextActive,
                    ]}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Vehicle Nickname</Text>
            <Text style={styles.labelHint}>Helps the team identify you</Text>
            <View style={styles.inputWrap}>
              <Feather
                name="truck"
                size={16}
                color={colors.neutral.placeholder}
              />
              <TextInput
                style={styles.input}
                placeholder="e.g. Blue Subaru Forester"
                placeholderTextColor={colors.neutral.placeholder}
                value={nickname}
                onChangeText={setNickname}
              />
            </View>
          </View>

          <View style={styles.meshBanner}>
            <Feather name="radio" size={16} color={colors.tertiary} />
            <View style={styles.meshText}>
              <Text style={styles.meshTitle}>Real-Time Telemetry Mesh</Text>
              <Text style={styles.meshBody}>
                Joins live position, speed, and next rest stop, and keeps the
                whole convoy in sync automatically.
              </Text>
            </View>
          </View>

          <Pressable style={styles.joinButton} onPress={handleJoin}>
            <Feather name="log-in" size={16} color={colors.neutral.white} />
            <Text style={styles.joinButtonText}>Join Trip & Enter Convoy</Text>
          </Pressable>

          <Text style={styles.footerText}>
            You are joining an active convoy. You can leave anytime from the
            trip dashboard.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.neutral.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
  stepLabel: {
    fontSize: typography.size.xs,
    fontFamily: typography.fontFamily.bold,
    color: colors.primary,
    marginTop: spacing.xs,
  },
  codeRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  codeBox: {
    flex: 1,
    minWidth: 0,
    paddingHorizontal: 0,
    height: 52,
    backgroundColor: colors.tertiaryLight,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.tertiaryLight,
    textAlign: "center",
    fontSize: typography.size.xl,
    fontFamily: typography.fontFamily.bold,
    color: colors.primary,
  },
  codeBoxFilled: {
    borderColor: colors.secondary,
    backgroundColor: colors.neutral.card,
  },
  codeHint: {
    fontSize: typography.size.xs,
    color: colors.neutral.body,
  },
  previewCard: {
    backgroundColor: colors.neutral.card,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    gap: spacing.xs,
  },
  previewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  verifiedPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    backgroundColor: colors.tertiaryLight,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  verifiedPillText: {
    fontSize: typography.size.xs,
    color: colors.tertiary,
    fontFamily: typography.fontFamily.medium,
  },
  previewHint: {
    fontSize: typography.size.xs,
    color: colors.neutral.placeholder,
  },
  modeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  modeCell: {
    flexGrow: 1,
    flexBasis: "30%",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    backgroundColor: colors.neutral.card,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  modeCellActive: {
    backgroundColor: colors.secondaryLight,
    borderColor: colors.secondary,
  },
  modeCellText: {
    fontSize: typography.size.xs,
    fontFamily: typography.fontFamily.medium,
    color: colors.primary,
    flexShrink: 1,
  },
  modeCellTextActive: {
    fontFamily: typography.fontFamily.bold,
    color: colors.secondary,
  },
  field: {
    gap: spacing.xs,
  },
  label: {
    fontSize: typography.size.sm,
    fontFamily: typography.fontFamily.semibold,
    color: colors.primary,
  },
  labelHint: {
    fontSize: typography.size.xs,
    color: colors.neutral.body,
    marginBottom: spacing.xs,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.tertiaryLight,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.sm,
    fontSize: typography.size.sm,
    color: colors.primary,
  },
  meshBanner: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
    backgroundColor: colors.tertiaryLight,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  meshText: {
    flex: 1,
    gap: 2,
  },
  meshTitle: {
    fontSize: typography.size.sm,
    fontFamily: typography.fontFamily.semibold,
    color: colors.primary,
  },
  meshBody: {
    fontSize: typography.size.xs,
    color: colors.neutral.body,
  },
  joinButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
  },
  joinButtonText: {
    fontSize: typography.size.sm,
    fontFamily: typography.fontFamily.bold,
    color: colors.neutral.white,
  },
  footerText: {
    fontSize: typography.size.xs,
    color: colors.neutral.placeholder,
    textAlign: "center",
  },
});
