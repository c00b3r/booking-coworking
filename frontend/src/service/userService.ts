const API_URL = "http://localhost:5000/users";

async function getUser() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Ошибка при загрузке пользователя");
    return await response.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    return [];
  }
}

export default getUser;
