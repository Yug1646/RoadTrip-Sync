import { globalStyles } from "@/constants/theme";
import { KeyboardAvoidingView, ScrollView, Text } from "react-native";

export default function LoginScreen() {
  return (
    <KeyboardAvoidingView>
      {/* CREATE A CUSTOM CONTAINER FOR LOGIN FORM */}
      <ScrollView>
        <Text style={globalStyles.h1}>Login</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
