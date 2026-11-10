import { apiFetch } from "./api";
import type { UserProfile } from "@/types/user";

export async function getCurrentUser(): Promise<UserProfile> {
  return apiFetch<UserProfile>("/api/users/me");
}