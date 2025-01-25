import { Outlet } from "react-router-dom";
import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";

export default function UserDashboard() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
