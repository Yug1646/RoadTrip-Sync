import type { ComponentProps } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import type { TravelMode } from "@/types/trip";

type MaterialIconName = ComponentProps<typeof MaterialIcons>["name"];

export type ModeOption = {
  value: TravelMode;
  label: string;
  icon: MaterialIconName;
};

export const MODE_OPTIONS: ModeOption[] = [
  { value: "car", label: "Car", icon: "directions-car" },
  { value: "motorcycle", label: "Motorcycle", icon: "two-wheeler" },
  { value: "public_transport", label: "Transit", icon: "directions-bus" },
  { value: "walk", label: "Walk", icon: "directions-walk" },
  { value: "other", label: "Custom", icon: "tune" },
];
