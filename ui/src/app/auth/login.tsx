import { KeyboardAvoidingView, ScrollView, Text } from "react-native";

export default function LoginScreen() {
  return (
    <KeyboardAvoidingView>
      {/* CREATE A CUSTOM CONTAINER FOR LOGIN FORM */}
      <ScrollView>
        <Text>Login</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
