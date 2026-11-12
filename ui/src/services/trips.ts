import type { Trip, TripResponse } from "@/types/trip";
import { apiFetch } from "./api";

function toTrip(response: TripResponse): Trip {
  return {
    id: String(response.id),
    name: response.name,
    startLocation: response.startLocation,
    endLocation: response.endLocation,
    status: response.status,
    dateLabel: "",
    footerText: "",
    footerAction: "",
  };
}

export async function getMyTrips(): Promise<Trip[]> {
  const data = await apiFetch<TripResponse[]>("/api/trips");
  return data.map(toTrip);
}
