import { Button, Flex } from "@vkontakte/vkui";
import "./BookingPage.css";
import { useEffect, useState } from "react";
import getInformationForBooking from "../../utils/getInformationForBooking";
import convertDate from "../../utils/converDate";

interface Bookings {
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

const bookingType = {
  "open-space": "Open-space",
  conference: "Переговорка",
  event: "Мероприятие",
};

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

  console.log(booking);
  return (
    <main className='booking-main'>
      <div className='booking-main__buttons'>
        <h3>Бронирование</h3>
        <Flex style={{ flexDirection: "column" }}>
          <Flex style={{ gap: "20px" }}>
            <Flex.Item style={{ flex: 1 }}>
              <div className='booking-main__openspace'>
                <div className='booking-main__openspace-icon'></div>
                <h1 className='booking-main__openspace-title'>Open-space</h1>
                <p className='booking-main__openspace-description'>
                  Для шумных компаний и отдыха
                </p>
              </div>
            </Flex.Item>
            <Flex.Item style={{ flex: 1 }}>
              <div className='booking-main__conference'>
                <div className='booking-main__conference-icon'></div>
                <h1 className='booking-main__conference-title'>Переговорка</h1>
                <p className='booking-main__conference-description'>
                  Если нужно обсудить в тишине в узком кругу
                </p>
              </div>
            </Flex.Item>
          </Flex>
          <Flex.Item>
            <div className='booking-main__event'>
              <div className='booking-main__event-icon'></div>
              <h1 className='booking-main__event-title title'>Мероприятие</h1>
              <p className='booking-main__event-description description'>
                Если хотите закрыть коворкинг на ваше мероприятие
              </p>
            </div>
          </Flex.Item>
        </Flex>
      </div>
      <div className='booking-main__current-booking'>
        <h3>Текущие бронирования</h3>
        <div className='booking-main__current-booking_container'>
          {booking.map((bookingItem) => {
            return (
              <div className='booking-main__current-booking-item'>
                <h4 className='booking-main__current-booking-item_type'>
                  {bookingType[bookingItem.type]}
                </h4>
                <p className='booking-main__current-booking-item_information'>
                  {bookingItem.confirmStatus === "pending" ? (
                    <div className='booking-item__pending'></div>
                  ) : null}
                  {getInformationForBooking(
                    bookingItem.type,
                    bookingItem.information,
                    bookingItem.numberOfConference
                  )}
                </p>
                <p className='booking-main__current-booking-item_date'>
                  {convertDate(bookingItem.startTime, bookingItem.endTime)}
                </p>
                <div className='booking-main__current-booking-item_buttons'>
                  <Button
                    size='l'
                    mode='primary'
                    appearance='positive'
                    style={{
                      width: "100%",
                      height: "44px",
                    }}
                  >
                    Подтвердить
                  </Button>
                  <Button
                    size='l'
                    mode='outline'
                    appearance='negative'
                    style={{
                      width: "100%",
                      height: "44px",
                    }}
                  >
                    Отменить
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
