import { Button } from "@vkontakte/vkui";
import getInformationForBooking from "../../utils/getInformationForBooking";
import convertDate from "../../utils/converDate";
import { Bookings } from "../../types/interface";
import { bookingType } from "../../types/type";

interface CurrentBookingProps {
  booking: Bookings[];
}

export default function CurrentBooking({ booking }: CurrentBookingProps) {
  return (
    <div className='booking-main__current-booking'>
      <h3>Текущие бронирования</h3>
      <div className='booking-main__current-booking_container'>
        {booking.map((bookingItem) => {
          return (
            <div
              className='booking-main__current-booking-item'
              key={bookingItem.id}
            >
              <h4 className='booking-main__current-booking-item_type'>
                {bookingType[bookingItem.type]}
              </h4>
              <div className='booking-main__current-booking-item_information'>
                {bookingItem.confirmStatus === "pending" ? (
                  <div className='booking-item__pending'></div>
                ) : null}
                {getInformationForBooking(
                  bookingItem.type,
                  bookingItem.information,
                  bookingItem.numberOfConference
                )}
              </div>
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
                  {bookingItem.type === "event"
                    ? "Связаться с админом"
                    : "Подтвердить"}
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
  );
}
