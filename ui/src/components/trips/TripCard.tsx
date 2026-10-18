import {
  Feather,
} from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import {
  borderRadius,
  colors,
  globalStyles,
  spacing,
  typography,
} from "@/constants/theme";
import type { Trip, TripStatus } from "@/types/trip";

const AVATAR_COLORS = [colors.primary, colors.secondary, colors.tertiary];

const STATUS_BADGE: Record<
  TripStatus,
  { bg: string; text: string; label: string }
> = {
  active: { bg: colors.secondaryLight, text: colors.secondary, label: "ACTIVE" },
  planned: { bg: colors.neutral.card, text: colors.neutral.body, label: "PLANNED" },
  completed: { bg: colors.tertiaryLight, text: colors.tertiary, label: "COMPLETED" },
};

export default function TripCard({ trip }: { trip: Trip }) {
  const badge = STATUS_BADGE[trip.status];

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={[styles.badge, { backgroundColor: badge.bg }]}>
          {trip.status === "active" && (
            <View style={[styles.badgeDot, { backgroundColor: badge.text }]} />
          )}
          {trip.status === "completed" && (
            <Feather name="check-circle" size={12} color={badge.text} />
          )}
          <Text style={[styles.badgeText, { color: badge.text }]}>
            {badge.label}
          </Text>
        </View>

        {trip.status === "active" ? (
          <View style={styles.livePill}>
            <Feather name="radio" size={12} color={colors.tertiary} />
            <Text style={styles.livePillText}>Live Sync</Text>
          </View>
        ) : (
          <View style={styles.metaRow}>
            {trip.status === "planned" && (
              <Feather name="clock" size={12} color={colors.neutral.body} />
            )}
            <Text style={styles.dateText}>{trip.dateLabel}</Text>
          </View>
        )}
      </View>

      <View style={styles.titleRow}>
        <View style={styles.titleBlock}>
          <Text style={globalStyles.h3}>{trip.name}</Text>
          <View style={styles.routeRow}>
            <Feather name="map-pin" size={12} color={colors.neutral.body} />
            <Text style={styles.routeText}>
              {trip.startLocation} → {trip.endLocation}
            </Text>
          </View>
        </View>
        {trip.milesLeft != null && (
          <View style={styles.milesBox}>
            <Text style={styles.milesNumber}>{trip.milesLeft}</Text>
            <Text style={styles.milesLabel}>MI LEFT</Text>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          {trip.members && (
            <View style={styles.avatarRow}>
              {trip.members.map((member, index) => (
                <View
                  key={member.initial}
                  style={[
                    styles.avatar,
                    { backgroundColor: AVATAR_COLORS[index % AVATAR_COLORS.length] },
                  ]}
                >
                  <Text style={styles.avatarText}>{member.initial}</Text>
                </View>
              ))}
              {trip.extraMembers != null && (
                <View style={[styles.avatar, styles.avatarExtra]}>
                  <Text style={styles.avatarExtraText}>+{trip.extraMembers}</Text>
                </View>
              )}
            </View>
          )}
          <Text style={styles.footerText}>{trip.footerText}</Text>
        </View>
        <View style={styles.footerAction}>
          <Text style={styles.footerActionText}>{trip.footerAction}</Text>
          <Feather name="chevron-right" size={14} color={colors.secondary} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.neutral.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.neutral.border,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    alignSelf: "flex-start",
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: borderRadius.full,
  },
  badgeText: {
    fontSize: typography.size.xs,
    fontFamily: typography.fontFamily.bold,
  },
  livePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    backgroundColor: colors.tertiaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  livePillText: {
    fontSize: typography.size.xs,
    color: colors.tertiary,
    fontFamily: typography.fontFamily.medium,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  dateText: {
    fontSize: typography.size.xs,
    color: colors.neutral.body,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  titleBlock: {
    flex: 1,
    gap: spacing.xs,
  },
  routeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  routeText: {
    fontSize: typography.size.sm,
    color: colors.neutral.body,
  },
  milesBox: {
    backgroundColor: colors.tertiaryLight,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    alignItems: "center",
    marginLeft: spacing.sm,
  },
  milesNumber: {
    fontSize: typography.size.xl,
    fontFamily: typography.fontFamily.bold,
    color: colors.primary,
  },
  milesLabel: {
    fontSize: 9,
    color: colors.tertiary,
    fontFamily: typography.fontFamily.bold,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: colors.neutral.border,
    paddingTop: spacing.sm,
  },
  footerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    flex: 1,
  },
  avatarRow: {
    flexDirection: "row",
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: borderRadius.full,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.neutral.card,
    marginLeft: -6,
  },
  avatarExtra: {
    backgroundColor: colors.tertiaryLight,
  },
  avatarText: {
    fontSize: 10,
    color: colors.neutral.white,
    fontFamily: typography.fontFamily.bold,
  },
  avatarExtraText: {
    fontSize: 10,
    color: colors.tertiary,
    fontFamily: typography.fontFamily.bold,
  },
  footerText: {
    fontSize: typography.size.xs,
    color: colors.neutral.body,
    flexShrink: 1,
  },
  footerAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  footerActionText: {
    fontSize: typography.size.xs,
    color: colors.secondary,
    fontFamily: typography.fontFamily.bold,
  },
});
