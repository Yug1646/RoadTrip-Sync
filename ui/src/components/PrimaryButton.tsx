import { globalStyles } from "@/constants/theme";
import { TouchableOpacity, Text } from "react-native";

type PrimaryButtonProps = {
  label: string;
};

export default function PrimaryButton({ label }: PrimaryButtonProps) {
  return (
    <TouchableOpacity style={globalStyles.primaryButton}>
      <Text style={globalStyles.primaryButtonText}>{label}</Text>
    </TouchableOpacity>
  );
}
