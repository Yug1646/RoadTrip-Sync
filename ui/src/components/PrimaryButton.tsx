import { globalStyles } from "@/constants/theme";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import type { ReactNode } from "react";

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
