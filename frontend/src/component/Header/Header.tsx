import { Icon16UserCircleAltOutline } from "@vkontakte/icons";
import { Button, Flex } from "@vkontakte/vkui";
import "./Header.css";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Flex className='header' justify='space-between'>
        <Flex.Item>
          <div className='header__navigate'>
            <div className='logo'></div>
            <div className='header__navigate-button'>
              <NavLink
                to={"./booking"}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Бронирование
              </NavLink>
              <NavLink
                to={"./history"}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                История{" "}
              </NavLink>
            </div>
          </div>
        </Flex.Item>
        <Flex.Item>
          <Flex align='center' style={{ gap: "32px" }}>
            <Icon16UserCircleAltOutline
              cursor={"pointer"}
              width={24}
              height={24}
            />
            <Button
              style={{
                width: "90px",
                height: "40px",
                borderRadius: "8px",
              }}
            >
              <span
                style={{
                  fontWeight: 500,
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "16px",
                }}
              >
                Выйти
              </span>
            </Button>
          </Flex>
        </Flex.Item>
      </Flex>
    </header>
  );
}
