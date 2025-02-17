import { Flex, Group, ModalPage } from "@vkontakte/vkui";
import { useState } from "react";
import "./ConfirmBookingModal.css";
import { Icon24CheckCircleOutline } from "@vkontakte/icons";
import { Bookings } from "../../types/interface";

interface ConfirmBookingModalProps {
  visible: boolean;
  confirmBooking: Bookings | null;
}

export default function ConfirmBookingModal({
  visible,
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
          onClose={() => setVisible(false)}
        >
          <Group className='confirm-booking-modal'>
            <Icon24CheckCircleOutline color='green' />
            <Flex direction='column' gap={8}>
              <h4>{getModalTitle(confirmBooking!.type)}</h4>
              <Flex direction='column' gap={8}>
                <Flex.Item>
                  <p className='type'>Тип</p>
                </Flex.Item>
                <Flex.Item>
                  <p className='type'>Номер комнаты</p>
                </Flex.Item>
                <Flex.Item>
                  <p className='type'>Дата</p>
                </Flex.Item>
                <Flex.Item>
                  <p className='type'>Время</p>
                </Flex.Item>
                <Flex.Item>
                  <p className='type'>Кол-во человек</p>
                </Flex.Item>
              </Flex>
            </Flex>
          </Group>
        </ModalPage>
      )}
    </>
  );
}
