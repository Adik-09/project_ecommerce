import { createBrowserRouter } from "react-router-dom";

import Base from "./components/base";
import HeroSection from "./pages/home";
import Profile from "./pages/profile";
import LoginPage from "./pages/login";
import CartPage from "./pages/myCart";
import OrdersPage from "./pages/orders";

const router = createBrowserRouter([
  {
    path: "/snapMart",
    element: <Base />,
    children: [
      { path: "home/", element: <HeroSection /> },
      { path: "profile/", element: <Profile /> },
      { path: "myCart/", element: <CartPage /> },
      { path: "orders/", element: <OrdersPage /> },
    ],
  },
  {
    path: "/snapMart/login/",
    element: <LoginPage />,
  },
]);

export default router;