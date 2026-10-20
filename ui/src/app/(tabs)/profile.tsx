import { useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  borderRadius,
  colors,
  globalStyles,
  spacing,
  typography,
} from "@/constants/theme";
import { trips } from "@/data/trips";
import { clearToken } from "@/services/token";

const PREFERENCES = [
  {
    id: "my-trips",
    icon: "map" as const,
    title: "My Trips",
    subtitle: "View past and upcoming trips",
    trailing: "2 active",
  },
  {
    id: "privacy",
    icon: "shield" as const,
    title: "Location & Privacy",
    subtitle: "Who can see your live location",
    trailing: "High Precision",
  },
  {
    id: "travel-mode",
    icon: "navigation" as const,
    title: "Default Travel Mode",
    subtitle: "Applied when you join a convoy",
    trailing: "Car",
  },
];
export default function ProfileScreen() {
  
  const router = useRouter();
  const activeVehicles = trips.filter(
    (trip) => trip.status === "active",
  ).length;

  const stats = [
    { value: "12", label: "Convoy Days" },
    { value: "3,480", label: "Miles Synced" },
    { value: String(activeVehicles), label: "Active Vehicles" },
  ];

  const handleLogout = () => {
    clearToken();
    router.replace("/");
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.profileBlock}>
        <View style={styles.avatarWrap}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>Y</Text>
          </View>
          <View style={styles.editBadge}>
            <Feather name="edit-2" size={12} color={colors.neutral.white} />
          </View>
        </View>
        <Text style={globalStyles.h2}>Yug Jain</Text>
        <Text style={globalStyles.body}>yugjain@gmail.com</Text>
        <View style={styles.modePill}>
          <Feather name="navigation" size={12} color={colors.secondary} />
          <Text style={styles.modePillText}>Preferred Mode: Car</Text>
        </View>
      </View>

      <View style={styles.telemetryCard}>
        <View style={styles.cardHeader}>
          <Text style={globalStyles.h3}>Sync Telemetry</Text>
          <View style={styles.recordPill}>
            <Text style={styles.recordPillText}>All-time record</Text>
          </View>
        </View>
        <View style={styles.statsRow}>
          {stats.map((stat) => (
            <View key={stat.label} style={styles.stat}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.prefsCard}>
        <Text style={[globalStyles.h3, styles.prefsTitle]}>
          Convoy Preferences
        </Text>
        {PREFERENCES.map((pref) => (
          <Pressable key={pref.id} style={styles.prefRow}>
            <View style={styles.prefIconTile}>
              <Feather name={pref.icon} size={16} color={colors.tertiary} />
            </View>
            <View style={styles.prefText}>
              <Text style={styles.prefTitle}>{pref.title}</Text>
              <Text style={styles.prefSubtitle}>{pref.subtitle}</Text>
            </View>
            <View style={styles.prefTrailing}>
              <Text style={styles.prefTrailingText}>{pref.trailing}</Text>
              <Feather
                name="chevron-right"
                size={14}
                color={colors.neutral.placeholder}
              />
            </View>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Feather name="log-out" size={16} color={colors.secondary} />
        <Text style={styles.logoutText}>Log Out</Text>
      </Pressable>

      <Text style={styles.versionText}>RoadTrip Sync</Text>
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
  profileBlock: {
    alignItems: "center",
    gap: spacing.xs,
    paddingVertical: spacing.sm,
  },
  avatarWrap: {
    marginBottom: spacing.xs,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: borderRadius.full,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: typography.size.title,
    fontFamily: typography.fontFamily.bold,
    color: colors.neutral.white,
  },
  editBadge: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 26,
    height: 26,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.neutral.background,
  },
  modePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    backgroundColor: colors.secondaryLight,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    marginTop: spacing.xs,
  },
  modePillText: {
    fontSize: typography.size.xs,
    fontFamily: typography.fontFamily.medium,
    color: colors.secondary,
  },
  telemetryCard: {
    backgroundColor: colors.neutral.card,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    gap: spacing.md,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  recordPill: {
    backgroundColor: colors.tertiaryLight,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  recordPillText: {
    fontSize: typography.size.xs,
    color: colors.tertiary,
    fontFamily: typography.fontFamily.medium,
  },
  statsRow: {
    flexDirection: "row",
  },
  stat: {
    flex: 1,
    alignItems: "center",
    gap: 2,
  },
  statValue: {
    fontSize: typography.size.xl,
    fontFamily: typography.fontFamily.bold,
    color: colors.primary,
  },
  statLabel: {
    fontSize: 10,
    color: colors.neutral.body,
    textAlign: "center",
  },
  prefsCard: {
    backgroundColor: colors.neutral.card,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    gap: spacing.sm,
  },
  prefsTitle: {
    marginBottom: spacing.xs,
  },
  prefRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  prefIconTile: {
    width: 34,
    height: 34,
    borderRadius: borderRadius.md,
    backgroundColor: colors.tertiaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  prefText: {
    flex: 1,
    gap: 1,
  },
  prefTitle: {
    fontSize: typography.size.sm,
    fontFamily: typography.fontFamily.semibold,
    color: colors.primary,
  },
  prefSubtitle: {
    fontSize: typography.size.xs,
    color: colors.neutral.body,
  },
  prefTrailing: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  prefTrailingText: {
    fontSize: typography.size.xs,
    color: colors.neutral.body,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    backgroundColor: colors.secondaryLight,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
  },
  logoutText: {
    fontSize: typography.size.sm,
    fontFamily: typography.fontFamily.bold,
    color: colors.secondary,
  },
  versionText: {
    fontSize: typography.size.xs,
    color: colors.neutral.placeholder,
    textAlign: "center",
  },
});
