import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./UserPage.css";

interface User {
  userid: string;
  name: string;
  email: string;
  keycloakId: string;
  id: string;
}

export default function UserPage() {
  const { state } = useAuth();
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    async function getUser() {
      try {
        const response = await fetch("http://localhost:5000/users");
        const data = await response.json();
        if (response.ok) {
          const user = state.role === "user" ? data[0] : data[1];
          setUserInfo(user);
        }
      } catch (error: Error | unknown) {
        console.error("Error fetching user:", error);
      }
    }

    getUser();
  }, [state.role]);
  return (
    <div className='profile'>
      <div className='profile__container'>
        <h4>Профиль</h4>
        <div className='profile__container-info'>
          <div>
            <div className='profile__container-info_title'>
              Фамилия, имя и отчество
            </div>
            <div className='profile__container-info_text'>{userInfo?.name}</div>
          </div>
          <div>
            <div className='profile__container-info_title'>
              Электронная почта
            </div>
            <div className='profile__container-info_text'>
              {userInfo?.email}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
