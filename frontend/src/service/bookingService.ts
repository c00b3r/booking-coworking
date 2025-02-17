import { Bookings } from "../types/interface";

const API_URL = "http://localhost:5000/bookings";

export async function getBookings() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Ошибка при загрузке бронирований");
    return await response.json();
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }
}

export async function createBooking(bookingData: Bookings) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) throw new Error("Ошибка при создании бронирования");

    return await getBookings();
  } catch (error) {
    console.error("Ошибка при отправке данных:", error);
    return [];
  }
}
