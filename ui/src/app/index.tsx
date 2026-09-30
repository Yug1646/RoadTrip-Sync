import { colors, globalStyles, typography } from "@/constants/theme";
import { Text, ScrollView } from "react-native";

export default function Index() {
  return (
    <ScrollView style={globalStyles.screenContainer}>
      <Text
        style={{
          fontFamily: typography.fontFamily.bold,
          fontSize: typography.size.title,
          color: colors.primary,
        }}
      >
        RoadTrip Sync
      </Text>
      <Text
        style={{
          fontFamily: typography.fontFamily.medium,
          fontSize: typography.size.lg,
          color: colors.primary,
        }}
      >
        Stay together. Wherever the road takes you.
      </Text>
      {/* add a button 'get started'*/}
      <Text>Already have an account?</Text>
    </ScrollView>
  );
}
