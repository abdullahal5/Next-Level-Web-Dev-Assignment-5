/* eslint-disable @typescript-eslint/prefer-as-const */
import { Table, Tag } from "antd";
import Titlebar from "../../components/ui/Titlebar";
import { useMyBookingQuery } from "../../redux/features/booking/bookingApi";

export interface Root {
  success: boolean;
  statusCode: number;
  message: string;
  data: Daum[];
}

export interface Daum {
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

const MyBookings = () => {
  const { data, isFetching } = useMyBookingQuery(undefined);
  const mybooking: Root | undefined = data;

  const tableData = mybooking?.data.flatMap((booking: Daum) =>
    booking.slots.map((slot: Slot) => ({
      key: `${booking._id}-${slot._id}`,
      roomName: booking?.room?.name,
      date: slot?.date,
      startTime: slot?.startTime,
      endTime: slot?.endTime,
      status: booking?.isConfirmed,
    }))
  );

  const columns = [
    {
      title: "Room Name",
      dataIndex: "roomName",
      align: "center" as "center",
    },
    {
      title: "Date",
      dataIndex: "date",
      align: "center" as "center",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      align: "center" as "center",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      align: "center" as "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center" as "center",
      render: (status: "confirmed" | "pending") => (
        <Tag color={status === "confirmed" ? "blue" : "orange"}>{status}</Tag>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <Titlebar title="My bookings" />
      <Table
        columns={columns}
        dataSource={tableData}
        loading={isFetching}
        size="large"
        pagination={false}
        rowKey={"key"}
      />
    </div>
  );
};

export default MyBookings;
