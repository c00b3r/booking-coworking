import { Flex } from "@vkontakte/vkui";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className='footer'>
      <Flex justify='space-between'>
        <Flex.Item>
          <Flex style={{ gap: "40px" }}>
            <div className='footer-logo'></div>
            <div className='footer-logo__name'>
              ©ФГАОУ ВО «УрФУ имени первого Президента России Б.Н. Ельцина»
            </div>
          </Flex>
        </Flex.Item>
        <Flex.Item>
          <div className='footer-contact'>
            <p>
              Институт радиоэлектроники
              <br /> и информационных технологий - РТФ
            </p>
            <p>Россия, г. Екатеринбург, ул. Мира 32, Р-044</p>
            <p>
              Для связи с администратором коворкинга: <br />
              <a href='tel:+7 999 123 23 33'>+7 999 123 23 33</a>
            </p>
          </div>
        </Flex.Item>
      </Flex>
    </footer>
  );
}
