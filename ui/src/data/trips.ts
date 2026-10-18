import type { Trip } from "@/types/trip";

export const trips: Trip[] = [
  {
    id: "1",
    name: "Pacific Coast Cruise",
    startLocation: "San Francisco",
    endLocation: "Big Sur",
    status: "active",
    dateLabel: "",
    footerText: "4 vehicles in convoy",
    footerAction: "Map",
    milesLeft: 68,
    members: [{ initial: "Y" }, { initial: "M" }, { initial: "K" }],
    extraMembers: 1,
  },
  {
    id: "2",
    name: "Yosemite High Sierra",
    startLocation: "Fresno",
    endLocation: "Tuolumne Meadows",
    status: "planned",
    dateLabel: "Tomorrow, 07:00 AM",
    footerText: "6 companions RSVP'd",
    footerAction: "Route Plan",
  },
  {
    id: "3",
    name: "Lake Tahoe Weekend",
    startLocation: "Sacramento",
    endLocation: "South Lake Tahoe",
    status: "completed",
    dateLabel: "Oct 14 – 16",
    footerText: "3 vehicles completed (342 mi)",
    footerAction: "Summary",
  },
];
