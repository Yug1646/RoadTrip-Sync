import { useState } from "react";
import { useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  borderRadius,
  colors,
  globalStyles,
  spacing,
  typography,
} from "@/constants/theme";
import TripCard from "@/components/trips/TripCard";
import { trips } from "@/data/trips";
import type { TripStatus } from "@/types/trip";

type Filter = "all" | TripStatus;

const CHIPS: { key: Filter; label: string }[] = [
  { key: "all", label: "All Trips" },
  { key: "active", label: "Active" },
  { key: "planned", label: "Planned" },
  { key: "completed", label: "Completed" },
];

export default function HomeScreen() {
  const [filter, setFilter] = useState<Filter>("all");
  const [joinCode, setJoinCode] = useState("");
  const router = useRouter();

  const countFor = (status: TripStatus) =>
    trips.filter((trip) => trip.status === status).length;

  const visibleTrips =
    filter === "all" ? trips : trips.filter((trip) => trip.status === filter);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Greeting View */}
      <View style={styles.greetingRow}>
        <View style={styles.greetingBlock}>
          <Text style={globalStyles.h1}>
            Good morning,{"\n"}Yug
          </Text>
          <Text style={globalStyles.body}>Ready for your next trip?</Text>
        </View>
      </View>

      {/* Start trip view */}
      <Pressable
        style={styles.startCard}
        onPress={() => router.push("/trip/create")}
      >
        <View style={styles.startLeft}>
          <View style={styles.startIconTile}>
            <Feather name="briefcase" size={18} color={colors.secondary} />
          </View>
          <Text style={styles.startTitle}>Start a Trip</Text>
          <Text style={styles.startBody}>
            Create a trip and share the code with your group
          </Text>
        </View>
        <View style={styles.startButton}>
          <Feather name="arrow-right" size={22} color={colors.neutral.white} />
        </View>
      </Pressable>

      {/* Join Trip view */}
      <View style={styles.joinCard}>
        <View style={styles.joinHeader}>
          <View style={styles.joinIconTile}>
            <Feather name="link" size={18} color={colors.tertiary} />
          </View>
          <View style={styles.joinHeaderText}>
            <Text style={globalStyles.h3}>Join a Trip</Text>
            <Text style={globalStyles.body}>
              Enter a trip code from your organizer
            </Text>
          </View>
        </View>
        <View style={styles.joinRow}>
          <TextInput
            style={styles.joinInput}
            placeholder="e.g. PAC-892"
            placeholderTextColor={colors.neutral.placeholder}
            autoCapitalize="characters"
            value={joinCode}
            onChangeText={setJoinCode}
            maxLength={6}
          />
          <Pressable style={styles.joinButton}>
            <Text style={styles.joinButtonText}>Join</Text>
            <Feather name="send" size={14} color={colors.primary} />
          </Pressable>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={globalStyles.h2}>Your Trips</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{trips.length}</Text>
        </View>
        <View style={styles.sortRow}>
          <Text style={styles.sortText}>Active First</Text>
          <Feather name="sliders" size={12} color={colors.secondary} />
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipRow}
      >
        {CHIPS.map((chip) => {
          const isActive = filter === chip.key;
          const count = chip.key === "all" ? trips.length : countFor(chip.key);
          return (
            <Pressable
              key={chip.key}
              style={[styles.chip, isActive && styles.chipActive]}
              onPress={() => setFilter(chip.key)}
            >
              <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                {chip.key === "all" ? chip.label : `${chip.label} (${count})`}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.tripList}>
        {visibleTrips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </View>

      <View style={styles.ctaCard}>
        <View style={styles.ctaIconTile}>
          <Feather name="bar-chart-2" size={20} color={colors.tertiary} />
        </View>
        <Text style={globalStyles.h3}>Have another adventure in mind?</Text>
        <Text style={styles.ctaBody}>
          Start or join a convoy to keep vehicle speeds, rest stops, and routes
          perfectly in sync.
        </Text>
        <View style={styles.ctaButtons}>
          <Pressable style={styles.ctaPrimary} onPress={() => router.push("/trip/create")}>
            <Text style={styles.ctaPrimaryText}>Create Convoy</Text>
          </Pressable>
          <Pressable style={styles.ctaSecondary}>
            <Text style={styles.ctaSecondaryText}>Learn More</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.neutral.background,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
  greetingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  greetingBlock: {
    gap: spacing.xs,
    flex: 1,
  },
  syncPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    backgroundColor: colors.tertiaryLight,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    marginTop: spacing.sm,
    alignSelf: "flex-start",
  },
  syncDot: {
    width: 6,
    height: 6,
    borderRadius: borderRadius.full,
    backgroundColor: colors.tertiary,
  },
  syncPillText: {
    fontSize: 9,
    fontFamily: typography.fontFamily.bold,
    color: colors.primary,
  },
  startCard: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  startLeft: {
    flex: 1,
    gap: spacing.xs,
    paddingRight: spacing.md,
  },
  startIconTile: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.md,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xs,
  },
  startTitle: {
    fontSize: typography.size.lg,
    fontFamily: typography.fontFamily.bold,
    color: colors.neutral.white,
  },
  startBody: {
    fontSize: typography.size.xs,
    color: "rgba(255,255,255,0.7)",
  },
  startButton: {
    width: 52,
    height: 52,
    borderRadius: borderRadius.full,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  joinCard: {
    backgroundColor: colors.neutral.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.neutral.border,
  },
  joinHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  joinIconTile: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.md,
    backgroundColor: colors.tertiaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  joinHeaderText: {
    flex: 1,
    gap: 2,
  },
  joinRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  joinInput: {
    flex: 1,
    backgroundColor: colors.neutral.background,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.size.sm,
    color: colors.primary,
  },
  joinButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    backgroundColor: colors.tertiaryLight,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
  },
  joinButtonText: {
    fontSize: typography.size.sm,
    fontFamily: typography.fontFamily.bold,
    color: colors.primary,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  countBadge: {
    backgroundColor: colors.tertiaryLight,
    borderRadius: borderRadius.full,
    minWidth: 22,
    height: 22,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  countText: {
    fontSize: typography.size.xs,
    color: colors.tertiary,
    fontFamily: typography.fontFamily.bold,
  },
  sortRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    marginLeft: "auto",
  },
  sortText: {
    fontSize: typography.size.xs,
    color: colors.secondary,
    fontFamily: typography.fontFamily.medium,
  },
  chipRow: {
    gap: spacing.sm,
    paddingRight: spacing.lg,
  },
  chip: {
    backgroundColor: colors.neutral.card,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: typography.size.xs,
    color: colors.primary,
    fontFamily: typography.fontFamily.medium,
  },
  chipTextActive: {
    color: colors.neutral.white,
    fontFamily: typography.fontFamily.bold,
  },
  tripList: {
    gap: spacing.md,
  },
  ctaCard: {
    backgroundColor: colors.tertiaryLight,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: "center",
    gap: spacing.sm,
  },
  ctaIconTile: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.full,
    backgroundColor: colors.neutral.card,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xs,
  },
  ctaBody: {
    fontSize: typography.size.xs,
    color: colors.neutral.body,
    textAlign: "center",
  },
  ctaButtons: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  ctaPrimary: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  ctaPrimaryText: {
    fontSize: typography.size.xs,
    fontFamily: typography.fontFamily.bold,
    color: colors.neutral.white,
  },
  ctaSecondary: {
    backgroundColor: colors.neutral.card,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  ctaSecondaryText: {
    fontSize: typography.size.xs,
    fontFamily: typography.fontFamily.medium,
    color: colors.neutral.body,
  },
});
