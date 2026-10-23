import type { ReactNode } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

//? Styles
import { globalStyles } from "@/constants/theme";

type PrimaryButtonProps = {
  label: string;
  onPress?: () => void;
  icon?: ReactNode;
};

export default function PrimaryButton({
  label,
  onPress,
  icon,
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity style={globalStyles.primaryButton} onPress={onPress}>
      <View style={styles.content}>
        <Text style={globalStyles.primaryButtonText}>{label}</Text>
        {icon}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});
