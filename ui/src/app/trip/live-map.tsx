//? Live Map — static shell. Mappls map + real socket data arrive in Phase 6
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
  borderRadius,
  colors,
  globalStyles,
  spacing,
  typography,
} from "@/constants/theme";
import AppHeader from "@/components/ui/AppHeader";

//? Static roster — design phase. Real positions arrive with sockets + GPS
const ROSTER = [
  { id: "1", name: "Yug Jain", vehicle: "Car", live: true },
  { id: "2", name: "Tony Stark", vehicle: "Motorcycle", live: true },
  { id: "3", name: "Peter Parker", vehicle: "Transit", live: false },
];

export default function LiveMapScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <AppHeader title="Live Map" />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mapPlaceholder}>
          <View style={styles.mapPinTile}>
            <Feather name="map-pin" size={22} color={colors.secondary} />
          </View>
          <Text style={styles.mapPlaceholderTitle}>Convoy Map</Text>
          <Text style={styles.mapPlaceholderBody}>
            Mappls map with live convoy markers loads here — development build
            required.
          </Text>
        </View>

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
              <View
                style={[
                  styles.livePill,
                  !member.live && styles.livePillOff,
                ]}
              >
                <View
                  style={[
                    styles.liveDot,
                    !member.live && styles.liveDotOff,
                  ]}
                />
                <Text
                  style={[
                    styles.liveText,
                    !member.live && styles.liveTextOff,
                  ]}
                >
                  {member.live ? "Live" : "Offline"}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.infoBanner}>
          <Feather name="radio" size={14} color={colors.tertiary} />
          <Text style={styles.infoText}>
            Live tracking comes online with the convoy — positions update every
            few seconds once the trip is active.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  mapPlaceholder: {
    backgroundColor: colors.tertiaryLight,
    borderRadius: borderRadius.lg,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
    gap: spacing.xs,
    minHeight: 220,
  },
  mapPinTile: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    backgroundColor: colors.neutral.card,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xs,
  },
  mapPlaceholderTitle: {
    fontSize: typography.size.md,
    fontFamily: typography.fontFamily.bold,
    color: colors.primary,
  },
  mapPlaceholderBody: {
    fontSize: typography.size.xs,
    color: colors.neutral.body,
    textAlign: "center",
    maxWidth: 240,
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
  livePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    backgroundColor: colors.secondaryLight,
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
  liveText: {
    fontSize: 10,
    fontFamily: typography.fontFamily.bold,
    color: colors.secondary,
  },
  livePillOff: {
    backgroundColor: colors.neutral.card,
    borderWidth: 1,
    borderColor: colors.neutral.border,
  },
  liveDotOff: {
    backgroundColor: colors.neutral.placeholder,
  },
  liveTextOff: {
    color: colors.neutral.placeholder,
  },
  infoBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.tertiaryLight,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  infoText: {
    flex: 1,
    fontSize: typography.size.xs,
    color: colors.neutral.body,
  },
});
