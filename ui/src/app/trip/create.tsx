import { useState, type ComponentProps } from "react";
import { useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
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
import { generateJoinCode } from "@/utils/joinCode";
import type { TravelMode } from "@/types/trip";

type MaterialIconName = ComponentProps<typeof MaterialIcons>["name"];

const MODE_OPTIONS: {
  value: TravelMode;
  label: string;
  icon: MaterialIconName;
}[] = [
  { value: "car", label: "Car", icon: "directions-car" },
  { value: "motorcycle", label: "Motorcycle", icon: "two-wheeler" },
  { value: "public_transport", label: "Transit", icon: "directions-bus" },
  { value: "walk", label: "Walk", icon: "directions-walk" },
  { value: "other", label: "Custom", icon: "tune" },
];

export default function CreateScreen() {
  const [tripName, setTripName] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [mode, setMode] = useState<TravelMode>("car");
  const [transitName, setTransitName] = useState("");
  const [created, setCreated] = useState(false);
  const [joinCode, setJoinCode] = useState("");
  const router = useRouter();

  const selectedMode =
    MODE_OPTIONS.find((option) => option.value === mode) ?? MODE_OPTIONS[0];

  const handleCreate = () => {
    if (!tripName.trim() || !startLocation.trim() || !destination.trim())
      return;
    if (
      (mode === "public_transport" || mode === "other") &&
      !transitName.trim()
    )
      return;
    setJoinCode(generateJoinCode(6));
    setCreated(true);
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
          <View style={styles.headerRow}>
            <View style={styles.headerLogo}>
              <Image
                source={require("../../../assets/images/appLogo.png")}
                style={styles.headerLogoImage}
                contentFit="fill"
              />
            </View>
            <Text style={styles.headerTitle}>Active Route Details</Text>
            <View style={styles.headerAvatar}>
              <Text style={styles.headerAvatarText}>Y</Text>
            </View>
          </View>

          <View style={styles.pillRow}>
            <View
              style={[styles.pill, { backgroundColor: colors.secondaryLight }]}
            >
              <Text style={[styles.pillText, { color: colors.secondary }]}>
                HOST SETUP
              </Text>
            </View>
          </View>

          <Text style={globalStyles.h1}>Route Blueprint</Text>
          <Text style={globalStyles.body}>
            Set your waypoints, pick vehicle dynamics, and distribute the room
            sync code to fellow drivers.
          </Text>

          <View style={[globalStyles.card, styles.formGap]}>
            <View style={styles.field}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Trip Name</Text>
                <Text style={styles.labelHint}>Convoy Title</Text>
              </View>
              <View style={styles.inputWrap}>
                <Feather
                  name="flag"
                  size={16}
                  color={colors.neutral.placeholder}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Pacific Coast Highway Run"
                  placeholderTextColor={colors.neutral.placeholder}
                  value={tripName}
                  onChangeText={setTripName}
                />
              </View>
            </View>

            <View style={styles.field}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Starting Location</Text>
                <Feather
                  name="target"
                  size={14}
                  color={colors.neutral.placeholder}
                />
              </View>
              <View style={styles.inputWrap}>
                <Feather
                  name="target"
                  size={16}
                  color={colors.neutral.placeholder}
                />
                <TextInput
                  style={styles.input}
                  placeholder="San Francisco, CA (Ferry Building)"
                  placeholderTextColor={colors.neutral.placeholder}
                  value={startLocation}
                  onChangeText={setStartLocation}
                />
              </View>
            </View>

            <View style={styles.field}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Destination</Text>
                <Feather
                  name="map-pin"
                  size={14}
                  color={colors.neutral.placeholder}
                />
              </View>
              <View style={styles.inputWrap}>
                <Feather
                  name="map-pin"
                  size={16}
                  color={colors.neutral.placeholder}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Big Sur River Inn, CA"
                  placeholderTextColor={colors.neutral.placeholder}
                  value={destination}
                  onChangeText={setDestination}
                />
              </View>
            </View>

            <View style={styles.field}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Your Travel Mode</Text>
                <Text style={styles.labelHint}>
                  {selectedMode.label} Selected
                </Text>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.modeRow}
              >
                {MODE_OPTIONS.map((option) => {
                  const isSelected = mode === option.value;
                  return (
                    <Pressable
                      key={option.value}
                      style={[
                        styles.modeChip,
                        isSelected && styles.modeChipActive,
                      ]}
                      onPress={() => setMode(option.value)}
                    >
                      <MaterialIcons
                        name={option.icon}
                        size={16}
                        color={
                          isSelected ? colors.neutral.white : colors.primary
                        }
                      />
                      <Text
                        style={[
                          styles.modeChipText,
                          isSelected && styles.modeChipTextActive,
                        ]}
                      >
                        {option.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>

            {(mode === "public_transport" || mode === "other") && (
              <View style={styles.field}>
                <View style={styles.labelRow}>
                  <Text style={styles.label}>Transit Name</Text>
                </View>
                <View style={styles.inputWrap}>
                  <Feather
                    name="briefcase"
                    size={16}
                    color={colors.neutral.placeholder}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="e.g. Golden Gate Bus 101"
                    placeholderTextColor={colors.neutral.placeholder}
                    value={transitName}
                    onChangeText={setTransitName}
                  />
                </View>
              </View>
            )}

            <Pressable style={styles.createButton} onPress={handleCreate}>
              <Feather name="plus" size={16} color={colors.neutral.white} />
              <Text style={styles.createButtonText}>Create Trip</Text>
            </Pressable>
          </View>

          {created && (
            <View style={styles.createdWrap}>
              <View style={styles.pillRow}>
                <View
                  style={[
                    styles.pill,
                    { backgroundColor: colors.secondaryLight },
                  ]}
                >
                  <Feather name="settings" size={12} color={colors.secondary} />
                  <Text style={[styles.pillText, { color: colors.secondary }]}>
                    Trip Created 🎉
                  </Text>
                </View>
                <View
                  style={[
                    styles.pill,
                    { backgroundColor: colors.tertiaryLight },
                  ]}
                >
                  <Text style={[styles.pillText, { color: colors.tertiary }]}>
                    Ready to Join
                  </Text>
                </View>
              </View>

              <View style={[globalStyles.card, styles.createdCard]}>
                <Text style={styles.createdLabel}>LIVE ROUTE SYNC</Text>
                <View style={styles.createdRouteRow}>
                  <Text style={globalStyles.h2}>{startLocation}</Text>
                  <Feather
                    name="arrow-right"
                    size={18}
                    color={colors.secondary}
                  />
                  <Text style={globalStyles.h2}>{destination}</Text>
                </View>
                <View style={styles.createdMetaRow}>
                  <Feather
                    name="map-pin"
                    size={12}
                    color={colors.neutral.body}
                  />
                  <Text style={styles.createdMeta}>
                    142 miles • ~2h 45m along CA-1S
                  </Text>
                </View>

                <View style={styles.passcodeCard}>
                  <View style={styles.passcodeHeader}>
                    <Text style={styles.passcodeLabel}>
                      DRIVER LOBBY PASSCODE
                    </Text>
                    <View style={styles.livePill}>
                      <View style={styles.liveDot} />
                      <Text style={styles.livePillText}>Live Session</Text>
                    </View>
                  </View>
                  <Text style={styles.passcodeText}>{joinCode}</Text>
                  <Text style={styles.passcodeHint}>
                    Convoy companions can enter this passcode in their app to
                    link up instantly.
                  </Text>
                </View>

                <View style={styles.actionRow}>
                  <Pressable style={styles.actionButton}>
                    <Feather name="copy" size={16} color={colors.primary} />
                    <Text style={styles.actionButtonText}>Copy Code</Text>
                  </Pressable>
                  <Pressable style={styles.actionButton}>
                    <Feather name="share" size={16} color={colors.primary} />
                    <Text style={styles.actionButtonText}>Share Invite</Text>
                  </Pressable>
                </View>

                <Pressable
                  style={styles.lobbyButton}
                  onPress={() => router.push("/trip/details")}
                >
                  <Text style={styles.lobbyButtonText}>
                    Continue to Convoy Lobby
                  </Text>
                  <Feather
                    name="arrow-right"
                    size={16}
                    color={colors.secondary}
                  />
                </Pressable>
              </View>
            </View>
          )}

          <View style={styles.telemetryBanner}>
            <View style={styles.telemetryIconTile}>
              <Feather name="disc" size={16} color={colors.tertiary} />
            </View>
            <View style={styles.telemetryText}>
              <Text style={styles.telemetryTitle}>
                Automatic Telemetry Active
              </Text>
              <Text style={styles.telemetryBody}>
                Waypoints, route alerts, and pit-stop pauses will synchronize
                across all joined dashboards in real time.
              </Text>
            </View>
          </View>
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
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  headerLogo: {
    width: 30,
    height: 30,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.neutral.title,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  headerLogoImage: {
    width: 28,
    height: 28,
  },
  headerTitle: {
    flex: 1,
    fontSize: typography.size.lg,
    fontFamily: typography.fontFamily.bold,
    color: colors.primary,
  },
  headerAvatar: {
    width: 34,
    height: 34,
    borderRadius: borderRadius.full,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  headerAvatarText: {
    fontSize: typography.size.sm,
    fontFamily: typography.fontFamily.bold,
    color: colors.neutral.white,
  },
  pillRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    alignSelf: "flex-start",
  },
  pillText: {
    fontSize: typography.size.xs,
    fontFamily: typography.fontFamily.bold,
  },
  formGap: {
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
  label: {
    fontSize: typography.size.sm,
    fontFamily: typography.fontFamily.semibold,
    color: colors.primary,
  },
  labelHint: {
    fontSize: typography.size.xs,
    color: colors.neutral.body,
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
  modeRow: {
    gap: spacing.sm,
    paddingRight: spacing.md,
  },
  modeChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    backgroundColor: colors.tertiaryLight,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs + 2,
  },
  modeChipActive: {
    backgroundColor: colors.secondaryDark,
  },
  modeChipText: {
    fontSize: typography.size.xs,
    fontFamily: typography.fontFamily.medium,
    color: colors.primary,
  },
  modeChipTextActive: {
    color: colors.neutral.white,
    fontFamily: typography.fontFamily.bold,
  },
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    backgroundColor: colors.secondaryDark,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    marginTop: spacing.xs,
  },
  createButtonText: {
    fontSize: typography.size.sm,
    fontFamily: typography.fontFamily.bold,
    color: colors.neutral.white,
  },
  createdWrap: {
    gap: spacing.md,
  },
  createdCard: {
    gap: spacing.sm,
    alignSelf: "stretch",
  },
  createdLabel: {
    fontSize: typography.size.xs,
    fontFamily: typography.fontFamily.bold,
    color: colors.neutral.body,
  },
  createdRouteRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    flexWrap: "wrap",
  },
  createdMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  createdMeta: {
    fontSize: typography.size.xs,
    color: colors.neutral.body,
  },
  passcodeCard: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    gap: spacing.sm,
  },
  passcodeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  passcodeLabel: {
    fontSize: typography.size.xs,
    fontFamily: typography.fontFamily.bold,
    color: colors.neutral.white,
  },
  livePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: borderRadius.full,
    backgroundColor: colors.secondary,
  },
  livePillText: {
    fontSize: typography.size.xs,
    color: colors.neutral.white,
  },
  passcodeText: {
    fontSize: 32,
    fontFamily: typography.fontFamily.bold,
    color: colors.secondaryLight,
    letterSpacing: 8,
    textAlign: "center",
  },
  passcodeHint: {
    fontSize: typography.size.xs,
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
  },
  actionRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    backgroundColor: colors.tertiaryLight,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
  },
  actionButtonText: {
    fontSize: typography.size.sm,
    fontFamily: typography.fontFamily.semibold,
    color: colors.primary,
  },
  lobbyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
  },
  lobbyButtonText: {
    fontSize: typography.size.sm,
    fontFamily: typography.fontFamily.bold,
    color: colors.neutral.white,
  },
  telemetryBanner: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
    backgroundColor: colors.neutral.card,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  telemetryIconTile: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    backgroundColor: colors.tertiaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  telemetryText: {
    flex: 1,
    gap: 2,
  },
  telemetryTitle: {
    fontSize: typography.size.sm,
    fontFamily: typography.fontFamily.semibold,
    color: colors.primary,
  },
  telemetryBody: {
    fontSize: typography.size.xs,
    color: colors.neutral.body,
  },
});
