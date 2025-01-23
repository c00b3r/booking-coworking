import { Flex } from "@vkontakte/vkui";
import "./BookingPage.css";

export default function BookingPage() {
  return (
    <main className='booking-main'>
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
    </main>
  );
}
