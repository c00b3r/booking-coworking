import "./BookingPage.css";
import { useEffect, useState } from "react";
import BookingButtons from "../../component/BookingButtons/BookingButtons";
import CurrentBooking from "../../component/CurrentBooking/CurrentBooking";
import { Bookings } from "../../types/interface";
import { getBookings } from "../../service/bookingService";

export default function BookingPage() {
  const [booking, setBooking] = useState<Bookings[]>([]);

  useEffect(() => {
    getBookings().then(setBooking);
  }, []);

  return (
    <main className='booking-main'>
      <BookingButtons setBooking={setBooking} />
      <CurrentBooking booking={booking} />
    </main>
  );
}
