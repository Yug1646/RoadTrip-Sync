/* 
  TODO: Redirect user to login and signup links
*/
import PrimaryButton from "@/components/PrimaryButton";
import { colors, spacing, typography } from "@/constants/theme";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>RoadTrip Sync</Text>
      <Text style={styles.subtitle}>
        Stay together. Wherever the road takes you.
      </Text>
      <PrimaryButton label="Get Started →" />
      <View style={styles.row}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <Text style={styles.footerLink}>Log in</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.neutral.background,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
    gap: spacing.sm,
  },
  title: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.size.title,
    color: colors.primary,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.size.xxl,
    color: colors.primary,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginTop: spacing.md,
  },
  footerText: {
    fontSize: typography.size.sm,
    color: colors.neutral.body,
  },
  footerLink: {
    fontSize: typography.size.sm,
    textDecorationLine: "underline",
    textDecorationColor: colors.primary,
    color: colors.secondary,
    fontFamily: typography.fontFamily.bold,
  },
});
