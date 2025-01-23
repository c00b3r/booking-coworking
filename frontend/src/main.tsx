import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@vkontakte/vkui/dist/vkui.css";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import PrivateRoute from "./utils/PrivateRoute.tsx";
import UserDashboard from "./pages/UserDashboard/UserDashboard.tsx";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard.tsx";
import BookingPage from "./pages/BookingPage/BookingPage.tsx";
import HistoryPage from "./pages/HistoryPage/HistoryPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/user",
    element: <PrivateRoute />,
    children: [
      {
        path: "",
        element: <UserDashboard />,
        children: [
          { path: "booking", element: <BookingPage /> },
          { path: "history", element: <HistoryPage /> },
        ],
      },
    ],
  },
  {
    path: "/admin",
    element: <PrivateRoute />,
    children: [{ path: "", element: <AdminDashboard /> }],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
