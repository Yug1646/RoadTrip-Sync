import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "authToken";

let cachedToken: string | null = null;

export async function loadToken(): Promise<string | null> {
  let token: string | null;
  if (Platform.OS === "web") {
    token = localStorage.getItem(TOKEN_KEY);
  } else {
    token = await SecureStore.getItemAsync(TOKEN_KEY);
  }
  cachedToken = token;
  return cachedToken;
}

export function saveToken(token: string): void {
  cachedToken = token;
  if (Platform.OS === "web") {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    SecureStore.setItemAsync(TOKEN_KEY, token);
  }
}

export function clearToken(): void {
  cachedToken = null;
  if (Platform.OS === "web") {
    localStorage.removeItem(TOKEN_KEY);
  } else {
    SecureStore.deleteItemAsync(TOKEN_KEY);
  }
}

export function getToken(): string | null {
  return cachedToken;
}