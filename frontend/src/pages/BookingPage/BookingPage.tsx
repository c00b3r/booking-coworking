import "./BookingPage.css";
import { useEffect, useState } from "react";
import BookingButtons from "../../component/BookingButtons/BookingButtons";
import CurrentBooking from "../../component/CurrentBooking/CurrentBooking";
import { Bookings } from "../../types/interface";

export default function BookingPage() {
  const [booking, setBooking] = useState<Bookings[]>([]);

  useEffect(() => {
    async function getBookings() {
      try {
        const response = await fetch("http://localhost:5000/bookings");
        const data = await response.json();
        if (response.ok) {
          setBooking(data);
        }
      } catch (error: Error | unknown) {
        console.error("Error fetching bookings:", error);
      }
    }

    getBookings();
  }, []);

  return (
    <main className='booking-main'>
      <BookingButtons />
      <CurrentBooking booking={booking} />
    </main>
  );
}
