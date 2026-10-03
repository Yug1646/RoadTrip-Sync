import { globalStyles } from "@/constants/theme";
import { KeyboardAvoidingView, ScrollView, Text } from "react-native";

export default function SignupScreen() {
  return (
    <KeyboardAvoidingView>
      {/* CREATE A CUSTOM CONTAINER FOR SIGN UP FORM */}
      <ScrollView>
        <Text style={globalStyles.h1}>Sign Up</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
