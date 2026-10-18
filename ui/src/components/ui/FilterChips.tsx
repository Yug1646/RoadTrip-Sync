import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { borderRadius, colors, spacing, typography } from "@/constants/theme";

type FilterChipsProps = {
  items: { key: string; label: string }[];
  active: string;
  onSelect: (key: string) => void;
};

export default function FilterChips({
  items,
  active,
  onSelect,
}: FilterChipsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {items.map((item) => {
        const isActive = active === item.key;
        return (
          <Pressable
            key={item.key}
            style={[styles.chip, isActive && styles.chipActive]}
            onPress={() => onSelect(item.key)}
          >
            <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: spacing.sm,
    paddingRight: spacing.lg,
  },
  chip: {
    backgroundColor: colors.neutral.card,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: typography.size.xs,
    color: colors.primary,
    fontFamily: typography.fontFamily.medium,
  },
  chipTextActive: {
    color: colors.neutral.white,
    fontFamily: typography.fontFamily.bold,
  },
});
