export interface Bookings {
  bookingId: string;
  userId: string;
  seatId: string;
  confirmStatus: boolean | "pending";
  startTime: string;
  endTime: string;
  eventId: string;
  id: string;
  type: "open-space" | "conference" | "event";
  information: number | null;
  numberOfConference: number | null;
}
