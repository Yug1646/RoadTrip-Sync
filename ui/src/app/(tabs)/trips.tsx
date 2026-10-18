import { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  borderRadius,
  colors,
  globalStyles,
  spacing,
  typography,
} from "@/constants/theme";
import TripCard from "@/components/trips/TripCard";
import FilterChips from "@/components/ui/FilterChips";
import { trips } from "@/data/trips";
import type { TripStatus } from "@/types/trip";

type Filter = "all" | TripStatus;

const CHIPS: { key: Filter; label: string }[] = [
  { key: "all", label: "All Trips" },
  { key: "active", label: "Active" },
  { key: "planned", label: "Planned" },
  { key: "completed", label: "Completed" },
];

export default function TripsScreen() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const countFor = (status: TripStatus) =>
    trips.filter((trip) => trip.status === status).length;

  const chipItems = CHIPS.map((chip) => ({
    key: chip.key,
    label:
      chip.key === "all" ? chip.label : `${chip.label} (${countFor(chip.key)})`,
  }));

  const visibleTrips = trips
    .filter((trip) => filter === "all" || trip.status === filter)
    .filter((trip) => {
      const q = query.trim().toLowerCase();
      if (!q) return true;
      return (
        trip.name.toLowerCase().includes(q) ||
        trip.startLocation.toLowerCase().includes(q) ||
        trip.endLocation.toLowerCase().includes(q)
      );
    });

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.searchWrap}>
        <Feather name="search" size={16} color={colors.neutral.placeholder} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search trips or places..."
          placeholderTextColor={colors.neutral.placeholder}
          autoCapitalize="none"
          value={query}
          onChangeText={setQuery}
        />
        {query.length > 0 && (
          <Pressable onPress={() => setQuery("")}>
            <Feather
              name="x-circle"
              size={16}
              color={colors.neutral.placeholder}
            />
          </Pressable>
        )}
      </View>

      <FilterChips
        items={chipItems}
        active={filter}
        onSelect={(key) => setFilter(key as Filter)}
      />

      <View style={styles.list}>
        {visibleTrips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
        {visibleTrips.length === 0 && (
          <View style={styles.emptyState}>
            <Feather
              name="compass"
              size={28}
              color={colors.neutral.placeholder}
            />
            <Text style={styles.emptyTitle}>No trips found</Text>
            <Text style={globalStyles.body}>
              Try a different name or clear the filters.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.neutral.background,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.tertiaryLight,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
  },
  searchInput: {
    flex: 1,
    paddingVertical: spacing.sm,
    fontSize: typography.size.sm,
    color: colors.primary,
  },
  list: {
    gap: spacing.md,
  },
  emptyState: {
    backgroundColor: colors.neutral.card,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    alignItems: "center",
    gap: spacing.xs,
  },
  emptyTitle: {
    fontSize: typography.size.md,
    fontFamily: typography.fontFamily.bold,
    color: colors.primary,
  },
});
