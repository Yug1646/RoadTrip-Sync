import PrimaryButton from "@/components/PrimaryButton";
import { colors, globalStyles, spacing } from "@/constants/theme";
import { Link, useRouter } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={[globalStyles.h1, styles.title]}>RoadTrip Sync</Text>
      <Text style={[globalStyles.h3, styles.subtitle]}>
        Stay together. Wherever the road takes you
      </Text>
      <PrimaryButton
        label="Get Started →"
        onPress={() => router.push("/auth")}
      />
      <View style={styles.row}>
        <Text style={globalStyles.body}>Already have an account?</Text>
        <Text style={globalStyles.link}>
          <Link href="/auth">Login</Link>
        </Text>
      </View>
    </SafeAreaView>
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
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginTop: spacing.md,
  },
});
