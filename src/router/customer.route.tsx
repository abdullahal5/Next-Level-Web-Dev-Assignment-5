import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/customer/Home";
import MeetingRoom from "../pages/customer/meeting/MeetingRoom";
import AboutUs from "../pages/customer/AboutUs";
import ContactUs from "../pages/customer/ContactUs";
import Auth from "../pages/customer/Auth";
import Root from "../components/layout/Root";
import RoomDetails from "../pages/customer/meeting/RoomDetails";
import Protected from "./Protected";
import Booking from "../pages/customer/Booking";
import CreateRoom from "../pages/admin/RooManagement/CreateRoom";
import Layout from "../pages/admin/dashboard/Layout";
import RooMList from "../pages/admin/RooManagement/RooMList";
import RoomUpdate from "../pages/admin/RooManagement/RoomUpdate";

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
      {
        path: "/meeting-rooms/:id/booking",
        element: (
          <Protected>
            <Booking />
          </Protected>
        ),
      },
      {
        path: "/:role/dashboard",
        element: (
          <Protected>
            <Layout />
          </Protected>
        ),
        children: [
          {
            path: "create-room",
            element: (
              <Protected>
                <CreateRoom />
              </Protected>
            ),
          },
          {
            path: "get-room",
            element: (
              <Protected>
                <RooMList />
              </Protected>
            ),
          },
          {
            path: "update-room/:id",
            element: (
              <Protected>
                <RoomUpdate />
              </Protected>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
