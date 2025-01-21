async function getData() {
  try {
    const responsr = await fetch("http://localhost:5000/users");
    const data = await responsr.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

async function addUser() {
  try {
    const response = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: "2",
        name: "Хован Газонюх",
        email: "makar@example.com",
        keycloakId: "123",
      }),
    });
    const responseData = await response.json();
    console.log(responseData);
  } catch (error) {}
}

addUser();

getData();
