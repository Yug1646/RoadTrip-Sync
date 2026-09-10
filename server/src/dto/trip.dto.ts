export const toTripResponse = (trip: {
  id: number;
  name: string;
  joinCode: string;
  startLocation: string;
  endLocation: string;
  createdBy: number;
  status: string;
}) => ({
  id: trip.id,
  name: trip.name,
  joinCode: trip.joinCode,
  startLocation: trip.startLocation,
  endLocation: trip.endLocation,
  createdBy: trip.createdBy,
  status: trip.status,
});
