import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { socket } from "@/services/socket";
import { getTripById } from "@/services/trips";
import { colors, globalStyles, spacing, typography } from "@/constants/theme";
import AppHeader from "@/components/ui/AppHeader";
import type { TripResponse } from "@/types/trip";

export default function DetailsScreen() {
  const { tripId } = useLocalSearchParams<{ tripId?: string }>();
  const [trip, setTrip] = useState<TripResponse | null>(null);

  useEffect(() => {
    if (!tripId) return;

    getTripById(tripId).then(setTrip).catch(console.log);

    socket.emit("trip:join", { tripId: Number(tripId) });

    socket.on("member:joined", (data) => {
      console.log("Member joined the convoy:", data);
    });

    socket.on("location:update", (data) => {
      console.log("Location update:", data);
    });

    return () => {
      socket.off("member:joined");
      socket.off("location:update");
    };
  }, [tripId]);

  return (
    <SafeAreaView style={styles.screen}>
      <AppHeader title="Convoy Lobby" />
      <ScrollView contentContainerStyle={styles.content}>
        {trip ? (
          <View style={styles.infoCard}>
            <Text style={globalStyles.h2}>{trip.name}</Text>
            <Text style={globalStyles.body}>
              {trip.startLocation} → {trip.endLocation}
            </Text>
            <Text style={globalStyles.caption}>
              Join code: {trip.joinCode} — share it with your convoy
            </Text>
          </View>
        ) : (
          <Text style={globalStyles.body}>Loading trip…</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.neutral.background,
    paddingHorizontal: spacing.lg,
  },
  content: { paddingTop: spacing.md, gap: spacing.md },
  infoCard: {
    backgroundColor: colors.neutral.card,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    borderRadius: 16,
    padding: spacing.md,
    gap: spacing.xs,
  },
});
