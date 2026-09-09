export const toTripResponse = (trip: {
  id: number;
  name: string;
  createdBy: number; 
  status: string;
}) => ({
  id: trip.id,
  name: trip.name,
  createdBy: trip.createdBy,
  status: trip.status,
});
