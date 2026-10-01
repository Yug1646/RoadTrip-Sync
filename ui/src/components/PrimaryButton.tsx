import { globalStyles } from "@/constants/theme";
import { TouchableOpacity, Text } from "react-native";

type PrimaryButtonProps = {
  label: string;
  onPress?: () => void;
};

export default function PrimaryButton({ label, onPress }: PrimaryButtonProps) {
  return (
    <TouchableOpacity style={globalStyles.primaryButton} onPress={onPress}>
      <Text style={globalStyles.primaryButtonText}>{label}</Text>
    </TouchableOpacity>
  );
}
