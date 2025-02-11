export interface Bookings {
  bookingId: string;
  userId: string;
  seatId: string;
  confirmStatus: boolean | "pending";
  startTime: string;
  endTime: string;
  eventId: string;
  id?: string;
  type: string;
  information: number | null;
  numberOfConference: number | null;
}
