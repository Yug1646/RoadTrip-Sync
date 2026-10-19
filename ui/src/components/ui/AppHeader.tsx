import { Image } from "expo-image";
import { Text, View, StyleSheet } from "react-native";
import { borderRadius, colors, spacing, typography } from "@/constants/theme";

type AppHeaderProps = {
  title: string;
};

export default function AppHeader({ title }: AppHeaderProps) {
  return (
    <View style={styles.row}>
      <View style={styles.logo}>
        <Image
          source={require("../../../assets/images/appLogo.png")}
          style={styles.logoImage}
          contentFit="fill"
        />
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>Y</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.neutral.title,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  logoImage: {
    width: 28,
    height: 28,
  },
  title: {
    flex: 1,
    fontSize: typography.size.lg,
    fontFamily: typography.fontFamily.bold,
    color: colors.primary,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: borderRadius.full,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: typography.size.sm,
    fontFamily: typography.fontFamily.bold,
    color: colors.neutral.white,
  },
});
