import { Button, ButtonGroup } from "@vkontakte/vkui";
import "./LoginPage.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: "admin" | "user" | null) => {
    login(role);
    navigate(`/${role}`);
  };
  return (
    <div className='login-container'>
      <ButtonGroup mode='vertical' align='center'>
        <Button
          style={{ width: "200px", height: "50px" }}
          onClick={() => handleLogin("user")}
        >
          Войти как пользователь
        </Button>
        <Button
          style={{ width: "200px", height: "50px" }}
          onClick={() => handleLogin("admin")}
        >
          Войти как админ
        </Button>
      </ButtonGroup>
    </div>
  );
}
