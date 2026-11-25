//? Convoy Lobby — trip info, roster, start/delete actions (static roster until logic pass)
import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  borderRadius,
  colors,
  globalStyles,
  spacing,
  typography,
} from "@/constants/theme";
import AppHeader from "@/components/ui/AppHeader";
import { getTripById } from "@/services/trips";
import type { TripResponse } from "@/types/trip";

//? Static roster — design phase. Logic pass replaces this with GET /:tripId/vehicles
const ROSTER = [
  { id: "1", name: "Yug Jain", role: "Host", vehicle: "Car" },
  { id: "2", name: "Tony Stark", role: "Driver", vehicle: "Motorcycle" },
  { id: "3", name: "Peter Parker", role: "Driver", vehicle: "Transit" },
];

export default function DetailsScreen() {
  const { tripId } = useLocalSearchParams<{ tripId?: string }>();
  const [trip, setTrip] = useState<TripResponse | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!tripId) return;
    getTripById(tripId).then(setTrip).catch(console.log);
  }, [tripId]);

  return (
    <SafeAreaView style={styles.screen}>
      <AppHeader title="Convoy Lobby" />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {trip ? (
          <View style={[globalStyles.card, styles.tripCard]}>
            <Text style={globalStyles.h2}>{trip.name}</Text>
            <View style={styles.routeRow}>
              <Feather name="map-pin" size={12} color={colors.neutral.body} />
              <Text style={globalStyles.body}>
                {trip.startLocation} → {trip.endLocation}
              </Text>
            </View>
            <View style={styles.joinCodeRow}>
              <Text style={styles.joinCodeLabel}>JOIN CODE</Text>
              <Text style={styles.joinCode}>{trip.joinCode}</Text>
              <Pressable style={styles.copyButton}>
                <Feather name="copy" size={14} color={colors.primary} />
                <Text style={styles.copyText}>Copy</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <Text style={globalStyles.body}>Loading trip…</Text>
        )}

        <View style={[globalStyles.card, styles.rosterCard]}>
          <Text style={[globalStyles.h3, styles.sectionTitle]}>
            Travel Group
          </Text>
          {ROSTER.map((member) => (
            <View key={member.id} style={styles.rosterRow}>
              <View style={styles.memberAvatar}>
                <Text style={styles.memberAvatarText}>
                  {member.name.charAt(0)}
                </Text>
              </View>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={styles.memberMeta}>{member.vehicle}</Text>
              </View>
              <View style={styles.memberStatus}>
                {member.role === "Host" && (
                  <View style={styles.hostPill}>
                    <Text style={styles.hostPillText}>HOST</Text>
                  </View>
                )}
                <Feather
                  name="radio"
                  size={12}
                  color={colors.tertiary}
                />
              </View>
            </View>
          ))}
        </View>

        <Pressable
          style={styles.mapLink}
          onPress={() => router.push("/trip/live-map")}
        >
          <Feather name="map" size={16} color={colors.tertiary} />
          <Text style={styles.mapLinkText}>Open Live Map</Text>
          <Feather name="chevron-right" size={14} color={colors.tertiary} />
        </Pressable>

        <PrimaryActions />

        <View style={styles.telemetryBanner}>
          <Feather name="radio" size={14} color={colors.tertiary} />
          <Text style={styles.telemetryText}>
            Live tracking comes online with the convoy — map view arrives in the
            next build.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

//? Static primary actions — Start Trip + Delete wired in the logic pass
function PrimaryActions() {
  return (
    <View style={styles.actionsColumn}>
      <Pressable style={styles.startButton}>
        <Feather name="play" size={16} color={colors.neutral.white} />
        <Text style={styles.startButtonText}>Start Trip</Text>
      </Pressable>
      <Pressable style={styles.deleteButton}>
        <Feather name="trash-2" size={16} color={colors.secondary} />
        <Text style={styles.deleteButtonText}>Delete Trip</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.neutral.background,
    paddingHorizontal: spacing.lg,
  },
  content: {
    paddingTop: spacing.md,
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
  tripCard: {
    gap: spacing.sm,
    alignSelf: "stretch",
  },
  routeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  joinCodeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.tertiaryLight,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    alignSelf: "flex-start",
  },
  joinCodeLabel: {
    fontSize: 10,
    fontFamily: typography.fontFamily.bold,
    color: colors.neutral.body,
  },
  joinCode: {
    fontSize: typography.size.sm,
    fontFamily: typography.fontFamily.bold,
    color: colors.primary,
    letterSpacing: 2,
  },
  copyButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: spacing.xs,
  },
  copyText: {
    fontSize: typography.size.xs,
    color: colors.primary,
    fontFamily: typography.fontFamily.medium,
  },
  rosterCard: {
    gap: spacing.sm,
    alignSelf: "stretch",
  },
  sectionTitle: {
    marginBottom: spacing.xs,
  },
  rosterRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  memberAvatar: {
    width: 34,
    height: 34,
    borderRadius: borderRadius.full,
    backgroundColor: colors.tertiary,
    alignItems: "center",
    justifyContent: "center",
  },
  memberAvatarText: {
    fontSize: typography.size.sm,
    fontFamily: typography.fontFamily.bold,
    color: colors.neutral.white,
  },
  memberInfo: {
    flex: 1,
    gap: 1,
  },
  memberName: {
    fontSize: typography.size.sm,
    fontFamily: typography.fontFamily.semibold,
    color: colors.primary,
  },
  memberMeta: {
    fontSize: typography.size.xs,
    color: colors.neutral.body,
  },
  memberStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  hostPill: {
    backgroundColor: colors.secondaryLight,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  hostPillText: {
    fontSize: 10,
    fontFamily: typography.fontFamily.bold,
    color: colors.secondary,
  },
  mapLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.neutral.card,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  mapLinkText: {
    flex: 1,
    fontSize: typography.size.sm,
    fontFamily: typography.fontFamily.semibold,
    color: colors.primary,
  },
  actionsColumn: {
    gap: spacing.sm,
  },
  startButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
  },
  startButtonText: {
    fontSize: typography.size.sm,
    fontFamily: typography.fontFamily.bold,
    color: colors.neutral.white,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: colors.secondaryLight,
    backgroundColor: colors.neutral.card,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
  },
  deleteButtonText: {
    fontSize: typography.size.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.secondary,
  },
  telemetryBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.tertiaryLight,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  telemetryText: {
    flex: 1,
    fontSize: typography.size.xs,
    color: colors.neutral.body,
  },
});
