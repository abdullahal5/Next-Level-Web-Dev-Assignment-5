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
import CreateSlot from "../pages/admin/SlotManagement/CreateSlot";
import SlotList from "../pages/admin/SlotManagement/SlotList";
import UpdateSlot from "../pages/admin/SlotManagement/UpdateSlot";
import AllBooking from "../pages/admin/BookingManagement/AllBooking";
import Checkout from "../pages/customer/Checkout";
import Success from "../pages/customer/Success";
import MyBookings from "../pages/customer/MyBookings";

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
        path: "/success",
        element: <Success />,
      },

      {
        path: "checkout",
        element: (
          <Protected>
            <Checkout />
          </Protected>
        ),
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
          {
            path: "create-slot",
            element: (
              <Protected>
                <CreateSlot />
              </Protected>
            ),
          },
          {
            path: "get-slot",
            element: (
              <Protected>
                <SlotList />
              </Protected>
            ),
          },
          {
            path: "update-slot/:id",
            element: (
              <Protected>
                <UpdateSlot />
              </Protected>
            ),
          },
          {
            path: "bookings",
            element: (
              <Protected>
                <AllBooking />
              </Protected>
            ),
          },
        ],
      },
      {
        path: "/:role/my-bookings",
        element: (
          <Protected>
            <MyBookings />
          </Protected>
        ),
      },
    ],
  },
]);

export default router;
