/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button, Space, Table, TableColumnsType, Tag } from "antd";
import Titlebar from "../../../components/ui/Titlebar";
import {
  useDeleteBookingMutation,
  useGetAllBookingsQuery,
  useUpdateBookingMutation,
} from "../../../redux/features/admin/bookingMangement/bookingApi";
import {
} from "../../../types/bookings.types";
import moment from "moment";
import { TResponse } from "../../../global/global";
import { toast } from "sonner";
import DeleteModal from "../../../components/ui/DeleteModal";

interface BookingDataType {
  key: React.Key;
  roomName: string;
  userName: string;
  date: string;
  time: string;
  endTime: string;
  status: "Confirmed" | "Unconfirmed";
}

export interface TBooking {
  _id: string;
  room: {
    name: string;
  };
  user: {
    name: string;
  };
  date: string;
  createdAt: string;
  slots: {
    endTime?: string;
  };
  isConfirmed: "confirmed" | "unconfirmed";
}

export interface GetAllBookingsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: TBooking[];
}

const AllBookings = () => {
  const { data: bookingsData, isFetching } = useGetAllBookingsQuery(undefined) as {
    data: GetAllBookingsResponse;
    isFetching: boolean;
  };
  const [updateBooking] = useUpdateBookingMutation();
  const [deleteBooking] = useDeleteBookingMutation();

  const handleApprove = async (id: string) => {
    const toastId = toast.loading("Approving...");

    try {
      const res = (await updateBooking({
        id,
        body: "confirmed",
      })) as unknown as TResponse<any>;
      if (res.error) {
        toast.error(res?.error?.data?.message, { id: toastId, duration: 2000 });
      } else {
        toast.success(res.data.message, {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error: any) {
      toast.error(error.message, {
        id: toastId,
        duration: 2000,
      });
    }
  };

  const handleReject = async (id: string) => {
    const toastId = toast.loading("Rejecting...");

    try {
      const res = (await updateBooking({
        id,
        body: "unconfirmed",
      })) as unknown as TResponse<any>;
      if (res.error) {
        toast.error(res?.error?.data?.message, { id: toastId, duration: 2000 });
      } else {
        toast.success(res.data.message, {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error: any) {
      toast.error(error.message, {
        id: toastId,
        duration: 2000,
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = (await deleteBooking({ id })) as unknown as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message);
      } else {
        toast.success(res.data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const columns: TableColumnsType<BookingDataType> = [
    {
      title: "Room Name",
      dataIndex: "roomName",
      align: "center",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "date",
      align: "center",
      render: (date: string) => moment(date).format("YYYY-MM-DD"),
    },
    {
      title: "Time",
      dataIndex: "time",
      align: "center",
      render: (time: string) => {
        return time ? moment(time, "HH:mm").format("HH:mm") : "N/A";
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      render: (status: "Confirmed" | "Unconfirmed") => (
        <Tag color={status === "Confirmed" ? "blue" : "orange"}>{status}</Tag>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      align: "center",
      render: (_, record: BookingDataType) => (
        <Space>
          <Button
            onClick={() => handleApprove(record.key as string)}
            type="primary"
          >
            Approve
          </Button>
          <Button danger onClick={() => handleReject(record.key as string)}>
            Reject
          </Button>
          <DeleteModal onConfirm={() => handleDelete(record.key as string)} />
        </Space>
      ),
    },
  ];

  const data: BookingDataType[] =
    bookingsData?.data?.map((booking: TBooking) => {
      return {
        key: booking._id,
        roomName: booking.room.name,
        userName: booking.user.name,
        date: booking.date[0],
        time: booking.createdAt,
        endTime: booking.slots.endTime || "N/A",
        status:
          booking.isConfirmed === "confirmed" ? "Confirmed" : "Unconfirmed",
      };
    }) || [];

  return (
    <>
      <Titlebar title="All Bookings" />
      <Table
        columns={columns}
        dataSource={data}
        loading={isFetching}
        size="large"
        pagination={false}
      />
    </>
  );
};

export default AllBookings;
