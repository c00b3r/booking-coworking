import { Bookings } from "../../types/interface";
import { bookingType } from "../../types/type";
import convertDate from "../../utils/converDate";
import "./Table.css";

interface TableProps {
  bookings: Bookings[];
}

export default function Table({ bookings }: TableProps) {
  return (
    <div className='table'>
      <div className='table__container'>
        <div className='table__header'>
          <div className='table__header-item'>Тип</div>
          <div className='table__header-item'>Номер комнаты</div>
          <div className='table__header-item'>Дата</div>
          <div className='table__header-item'>Время</div>
          <div className='table__header-item'>Кол-во человек</div>
        </div>
        {bookings.map((booking, index) => {
          return (
            <div
              className='table__item'
              key={booking.id}
              style={{
                backgroundColor:
                  (index + 1) % 2 === 0 ? "rgba(255, 255, 255, 1)" : " ",
              }}
            >
              <div className='table__item-text'>
                {bookingType[booking.type as keyof typeof bookingType]}
              </div>
              <div className='table__item-text'>
                {booking.numberOfConference === null
                  ? "-"
                  : booking.numberOfConference}
              </div>
              <div className='table__item-text'>
                {booking.startTime.split(" ")[0].split("-").reverse().join(".")}
              </div>
              <div className='table__item-text'>
                {convertDate(booking.startTime, booking.endTime)
                  .split(" ")
                  .slice(-3)
                  .join(" ")}
              </div>
              <div className='table__item-text'>
                {booking.information === null ? "-" : booking.information}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
