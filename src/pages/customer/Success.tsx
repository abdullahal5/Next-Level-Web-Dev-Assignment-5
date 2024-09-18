import { useLocation, useNavigate } from "react-router-dom";
import { useGetSingleBookingsQuery } from "../../redux/features/booking/bookingApi";

export interface Root {
  success: boolean;
  statusCode: number;
  message: string;
  data: Data;
}

export interface Data {
  _id: string;
  room: Room;
  slots: Slot[];
  user: User;
  date: string[];
  totalAmount: number;
  isConfirmed: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Room {
  _id: string;
  name: string;
  images: string[];
  roomNo: number;
  capacity: number;
  floorNo: number;
  pricePerSlot: number;
  amenities: string[];
  isDeleted: boolean;
  updatedAt: string;
}

export interface Slot {
  _id: string;
  room: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  __v: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  profileImage: string;
  phone: string;
  address: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}



const Success = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("bookingId");
  const navigate = useNavigate()

  const { data } = useGetSingleBookingsQuery(id);
  const singleBooking: Root = data;

   const handleGoHome = () => {
     navigate("/");
   };

   if (!singleBooking) {
     return <div>Loading...</div>;
   }

  return (
    <div className="p-4 max-w-lg mx-auto bg-white rounded shadow-lg mt-10">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Booking Details
      </h1>
      <div className="space-y-2">
        <div>
          <strong>Booking ID:</strong> {singleBooking.data._id}
        </div>
        <div>
          <strong>Room:</strong> {singleBooking.data.room.name}
        </div>
        <div>
          <strong>Room Number:</strong> {singleBooking.data.room.roomNo}
        </div>
        <div>
          <strong>Capacity:</strong> {singleBooking.data.room.capacity} people
        </div>
        <div>
          <strong>Floor Number:</strong> {singleBooking.data.room.floorNo}
        </div>
        <div>
          <strong>Amenities:</strong>{" "}
          {singleBooking.data.room.amenities.join(", ")}
        </div>
        <div>
          <strong>Date:</strong> {singleBooking.data.date.join(", ")}
        </div>
        <div>
          <strong>Slots:</strong>
          {singleBooking.data.slots.map((slot) => (
            <div key={slot._id}>
              {slot.date} from {slot.startTime} to {slot.endTime}
            </div>
          ))}
        </div>
        <div>
          <strong>Total Amount:</strong> ${singleBooking.data.totalAmount}
        </div>
        <div>
          <strong>Confirmed:</strong>{" "}
          {singleBooking.data.isConfirmed ? "Yes" : "No"}
        </div>
        <div>
          <strong>Deleted:</strong>{" "}
          {singleBooking.data.isDeleted ? "Yes" : "No"}
        </div>
        <div>
          <strong>Created At:</strong>{" "}
          {new Date(singleBooking.data.createdAt).toLocaleString()}
        </div>
        <div>
          <strong>Updated At:</strong>{" "}
          {new Date(singleBooking.data.updatedAt).toLocaleString()}
        </div>
        <div>
          <strong>User Name:</strong> {singleBooking.data.user.name}
        </div>
        <div>
          <strong>User Email:</strong> {singleBooking.data.user.email}
        </div>
        <div>
          <strong>User Phone:</strong> {singleBooking.data.user.phone}
        </div>
      </div>

      <button
        onClick={handleGoHome}
        className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
      >
        Go Home
      </button>
    </div>
  );
};

export default Success;