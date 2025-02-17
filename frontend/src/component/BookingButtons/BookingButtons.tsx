import { Icon20User } from "@vkontakte/icons";
import {
  Button,
  ButtonGroup,
  DateInput,
  Flex,
  FormItem,
  Group,
  Input,
  ModalPage,
} from "@vkontakte/vkui";
import { useEffect, useState } from "react";
import { DatePicker } from "antd";
import "./BookingButtons.css";
import { Bookings } from "../../types/interface";
import { createBooking } from "../../service/bookingService";
import ConfirmBookingModal from "../ConfirmBookingModal/ConfirmBookingModal";

import { getTypeOfBooking } from "../../utils/getTypeOfBooking";

const { RangePicker } = DatePicker;

interface BookingButtonsProps {
  setBooking: React.Dispatch<React.SetStateAction<Bookings[]>>;
}

export default function BookingButtons({ setBooking }: BookingButtonsProps) {
  const [canOpenModal, setOpenModal] = useState(false);
  const [visibleBookingModal, setVisibleBookingModal] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<null | Bookings>(
    null
  );
  const [datePicker, setDatePicker] = useState<Date | undefined>(
    () => new Date()
  );
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [selectedRange, setSelectedRange] = useState<[string, string]>([
    "",
    "",
  ]);
  const [isConferenceOpen, setIsConferenceOpen] = useState(false);
  const [isEventOpen, setIsEventOpen] = useState(false);
  const [header, setHeader] = useState("");
  const [telephone, setTelephone] = useState("");

  const handleDateChange = (_: unknown, dateStrings: [string, string]) => {
    setSelectedRange(dateStrings);
  };

  const handleBooking = async () => {
    setVisibleBookingModal(true);
    const selectedDate = datePicker || new Date();
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");

    const startTime = `${year}-${month}-${day} ${selectedRange[0]}`;
    const endTime = `${year}-${month}-${day} ${selectedRange[1]}`;

    const bookingData = {
      bookingId: "12",
      userId: "1",
      seatId: "228",
      confirmStatus: true,
      startTime,
      endTime,
      eventId: "1212",
      type: getTypeOfBooking(isConferenceOpen, isEventOpen),
      information: Number(numberOfPeople),
      numberOfConference: isConferenceOpen ? 1 : null,
    };

    setConfirmedBooking(bookingData);

    const updatedBookings = await createBooking(bookingData);
    setBooking(updatedBookings);
    setOpenModal(false);
  };

  const getModalTitle = () => {
    if (isConferenceOpen) {
      return "Бронирование переговорки";
    }
    if (isEventOpen) {
      return "Забронировать мероприятие";
    }
    return "Бронирование в open-space";
  };

  useEffect(() => {
    if (canOpenModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [canOpenModal]);

  return (
    <div className='booking-main__buttons'>
      <h3>Бронирование</h3>
      {canOpenModal && (
        <ModalPage
          id='booking-modal'
          open
          onClose={() => {
            setOpenModal(false);
            setIsConferenceOpen(false);
            setIsEventOpen(false);
          }}
          size={580}
        >
          <Group
            style={{
              padding: "40px 60px",
              width: "580px",
              display: "flex",
              flexDirection: "column",
              gap: "40px",
            }}
          >
            <h3 className='booking-modal__title'>{getModalTitle()}</h3>
            <Group
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {isEventOpen && (
                <>
                  <FormItem top='Название' noPadding htmlFor='name'>
                    <Input
                      id='name'
                      value={header}
                      onChange={(event) => setHeader(event.target.value)}
                      placeholder='Конференция в IT'
                    />
                  </FormItem>
                  <FormItem top='Телефон' noPadding htmlFor='tel'>
                    <Input
                      id='tel'
                      value={telephone}
                      onChange={(event) => setTelephone(event.target.value)}
                      placeholder='+7 999 999 99 99'
                    />
                  </FormItem>
                </>
              )}
              <FormItem top='Дата' noPadding htmlFor='date'>
                <DateInput
                  id='date'
                  value={datePicker}
                  onChange={(newDate) => setDatePicker(newDate)}
                  disablePast
                />
              </FormItem>
              <FormItem top='Время' noPadding>
                <RangePicker
                  picker='time'
                  format='HH:mm'
                  placeholder={["Начало", "Конец"]}
                  onChange={handleDateChange}
                  style={{
                    width: "100%",
                    height: "36px",
                    backgroundColor: "rgba(242, 243, 245, 1)",
                    borderRadius: "8px",
                  }}
                  inputReadOnly={true}
                  allowClear={false}
                />
              </FormItem>
              {!isEventOpen && (
                <FormItem
                  top='Количество человек'
                  bottom='Занято: 20/600 чел.'
                  noPadding
                >
                  <Input
                    placeholder='2'
                    value={numberOfPeople}
                    onChange={(e) => setNumberOfPeople(e.target.value)}
                    maxLength={2}
                    after={<Icon20User />}
                  />
                </FormItem>
              )}
              {isConferenceOpen && (
                <FormItem top='Выбор переговорки' noPadding>
                  <div className='booking-modal__select'>
                    <div className='booking-modal__select-item'>
                      <div className='booking-modal__select-item-number'>
                        №1
                      </div>
                      <div className='booking-modal__select-item-description'>
                        макс. 7 чел.
                      </div>
                    </div>
                    <div className='booking-modal__select-item'>
                      <div className='booking-modal__select-item-number'>
                        №2
                      </div>
                      <div className='booking-modal__select-item-description'>
                        макс. 5 чел.
                      </div>
                    </div>
                    <div className='booking-modal__select-item'>
                      <div className='booking-modal__select-item-number'>
                        №3
                      </div>
                      <div className='booking-modal__select-item-description'>
                        макс. 8 чел
                      </div>
                    </div>
                  </div>
                </FormItem>
              )}

              <ButtonGroup style={{ marginTop: "32px" }}>
                <Button
                  mode='secondary'
                  size='l'
                  appearance='accent'
                  style={{ width: "222px", height: "44px" }}
                  onClick={() => {
                    setOpenModal(false);
                    setIsConferenceOpen(false);
                    setIsEventOpen(false);
                  }}
                >
                  Отменить
                </Button>
                <Button
                  size='l'
                  mode='primary'
                  appearance='accent'
                  style={{ width: "222px", height: "44px" }}
                  onClick={handleBooking}
                >
                  Забронировать
                </Button>
              </ButtonGroup>
            </Group>
          </Group>
        </ModalPage>
      )}

      {visibleBookingModal && (
        <ConfirmBookingModal
          visible={visibleBookingModal}
          confirmBooking={confirmedBooking}
        />
      )}

      <Flex style={{ flexDirection: "column" }}>
        <Flex style={{ gap: "20px" }}>
          <Flex.Item style={{ flex: 1 }}>
            <div
              className='booking-main__openspace'
              onClick={() => {
                setOpenModal(true);
              }}
            >
              <div className='booking-main__openspace-icon'></div>
              <h1 className='booking-main__openspace-title'>Open-space</h1>
              <p className='booking-main__openspace-description'>
                Для шумных компаний и отдыха
              </p>
            </div>
          </Flex.Item>
          <Flex.Item style={{ flex: 1 }}>
            <div
              className='booking-main__conference'
              onClick={() => {
                setOpenModal(true);
                setIsConferenceOpen(true);
              }}
            >
              <div className='booking-main__conference-icon'></div>
              <h1 className='booking-main__conference-title'>Переговорка</h1>
              <p className='booking-main__conference-description'>
                Если нужно обсудить в тишине в узком кругу
              </p>
            </div>
          </Flex.Item>
        </Flex>
        <Flex.Item>
          <div
            className='booking-main__event'
            onClick={() => {
              setOpenModal(true);
              setIsEventOpen(true);
            }}
          >
            <div className='booking-main__event-icon'></div>
            <h1 className='booking-main__event-title title'>Мероприятие</h1>
            <p className='booking-main__event-description description'>
              Если хотите закрыть коворкинг на ваше мероприятие
            </p>
          </div>
        </Flex.Item>
      </Flex>
    </div>
  );
}
