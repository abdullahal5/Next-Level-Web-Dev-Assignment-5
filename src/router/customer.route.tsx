import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/customer/Home";
import MeetingRoom from "../pages/customer/meeting/MeetingRoom";
import AboutUs from "../pages/customer/AboutUs";
import ContactUs from "../pages/customer/ContactUs";
import Auth from "../pages/customer/Auth";
import Root from "../components/layout/Root";
import RoomDetails from "../pages/customer/meeting/RoomDetails";
import Protected from "./Protected";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
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
      {
        path: "/meeting-rooms/:id",
        element: (
          <Protected>
            <RoomDetails />
          </Protected>
        ),
      },
    ],
  },
]);

export default router;
