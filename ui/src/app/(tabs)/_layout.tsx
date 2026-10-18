/*
  TODO: Replace placeholder logo mark and initials avatar with real assets
*/
import { colors, borderRadius, spacing, typography } from "@/constants/theme";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

function HeaderTitle({ title }: { title: string }) {
  return (
    <View style={styles.headerTitleRow}>
      <View style={styles.logoMark}>
        <Text style={styles.logoText}>RTS</Text>
      </View>
      <Text style={styles.headerTitleText}>{title}</Text>
    </View>
  );
}

function UserAvatar() {
  return (
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>Y</Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerRightContainerStyle: { paddingRight: spacing.md },
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.neutral.placeholder,
        tabBarStyle: { backgroundColor: colors.neutral.card, height: 60 },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: () => <HeaderTitle title="Home" />,
          headerRight: () => <UserAvatar />,
          tabBarIcon: ({ color, size }) => (
            <Feather name="compass" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="trips"
        options={{
          headerTitle: () => <HeaderTitle title="Trips" />,
          headerRight: () => <UserAvatar />,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="alt-route" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: () => <HeaderTitle title="Profile" />,
          headerRight: () => <UserAvatar />,
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  logoMark: {
    width: 30,
    height: 30,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: typography.size.sm,
    fontFamily: typography.fontFamily.bold,
    color: colors.secondary,
  },
  headerTitleText: {
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
