import { Flex, Group, ModalPage } from "@vkontakte/vkui";
import { useState } from "react";
import "./ConfirmBookingModal.css";
import { Icon24CheckCircleOutline } from "@vkontakte/icons";
import { Bookings } from "../../types/interface";
import convertDate from "../../utils/converDate";

interface ConfirmBookingModalProps {
  visible: boolean;
  setVisibleBookingModal: React.Dispatch<React.SetStateAction<boolean>>;
  confirmBooking: Bookings | null;
}

export default function ConfirmBookingModal({
  visible,
  setVisibleBookingModal,
  confirmBooking,
}: ConfirmBookingModalProps) {
  const [visibleModal, setVisible] = useState(visible);
  if (!visibleModal && !confirmBooking) return null;

  const getModalTitle = (type: string | null) => {
    switch (type) {
      case "conference":
        return "Переговорка забронирована";
      case "event":
        return "Мероприятие забронировано и ждет согласования";
      case "open-space":
        return "Open-space забронирован";
      default:
        return "Бронирование завершено";
    }
  };
  return (
    <>
      {" "}
      {visibleModal && (
        <ModalPage
          id='confirm-booking-modal'
          open
          onClose={() => {
            setVisible(false);
            setVisibleBookingModal(false);
          }}
        >
          <Group className='confirm-booking-modal'>
            <Icon24CheckCircleOutline color='green' />
            <Flex direction='column' gap={8}>
              <h4>{getModalTitle(confirmBooking!.type)}</h4>
              <Flex direction='column' gap={8}>
                {confirmBooking?.type !== "event" && (
                  <Flex.Item>
                    <p className='type'>Тип</p>
                    <p className='booking-modal__type'>
                      {confirmBooking!.type}
                    </p>
                  </Flex.Item>
                )}

                {confirmBooking?.type === "event" && (
                  <Flex.Item>
                    <p className='type'>Название мероприятия</p>
                    <p className='booking-modal__type'>
                      {confirmBooking!.information}
                    </p>
                  </Flex.Item>
                )}

                {confirmBooking?.type === "conference" && (
                  <Flex.Item>
                    <p className='type'>Номер комнаты</p>
                    <p className='booking-modal__type'>
                      {confirmBooking!.numberOfConference}
                    </p>
                  </Flex.Item>
                )}

                <Flex.Item>
                  <p className='type'>Дата</p>
                  <p className='booking-modal__type'>
                    {
                      convertDate(
                        confirmBooking!.startTime,
                        confirmBooking!.endTime
                      ).split(" ")[0]
                    }
                  </p>
                </Flex.Item>
                <Flex.Item>
                  <p className='type'>Время</p>
                  <p className='booking-modal__type'>
                    {convertDate(
                      confirmBooking!.startTime,
                      confirmBooking!.endTime
                    ).slice(11)}
                  </p>
                </Flex.Item>
                {confirmBooking?.type !== "event" && (
                  <Flex.Item>
                    <p className='type'>Кол-во человек</p>
                    <p className='booking-modal__type'>
                      {confirmBooking!.information}
                    </p>
                  </Flex.Item>
                )}
              </Flex>
            </Flex>
          </Group>
        </ModalPage>
      )}
    </>
  );
}
