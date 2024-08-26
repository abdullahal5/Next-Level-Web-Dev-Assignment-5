import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/customer/Home";
import MeetingRoom from "../pages/customer/MeetingRoom";
import AboutUs from "../pages/customer/AboutUs";
import ContactUs from "../pages/customer/ContactUs";
import Auth from "../pages/customer/Auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/meeting-rooms",
    element: <MeetingRoom />,
  },
  {
    path: "/about",
    element: <AboutUs />,
  },
  {
    path: "/contact",
    element: <ContactUs />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
]);

export default router;
