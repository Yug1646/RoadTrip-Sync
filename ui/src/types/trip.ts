export type TripStatus = "active" | "planned" | "completed";

export type TravelMode =
  | "car"
  | "motorcycle"
  | "public_transport"
  | "walk"
  | "other";

export type TripMember = {
  initial: string;
};

export type Trip = {
  id: string;
  name: string;
  startLocation: string;
  endLocation: string;
  status: TripStatus;
  dateLabel: string;
  footerText: string;
  footerAction: string;
  milesLeft?: number;
  members?: TripMember[];
  extraMembers?: number;
};

export type TripResponse = {
  id: number;
  name: string;
  joinCode: string;
  startLocation: string;
  endLocation: string;
  createdBy: number;
  status: TripStatus;
};
