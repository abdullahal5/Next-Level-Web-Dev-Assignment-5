/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Button } from "antd";
import RAForm from "../../components/form/RAForm";
import RAInput from "../../components/form/RAInput";
import Titlebar from "../../components/ui/Titlebar";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useGetMultipleSlotQuery } from "../../redux/features/admin/slotManagement/slotApi";
import { ColumnsType } from "antd/es/table";
import { useCreateBookingMutation } from "../../redux/features/admin/bookingMangement/bookingApi";
import { clearBooking } from "../../redux/features/booking/bookingSlice";
import { useState } from "react";

export interface Checkout {
  name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  date: string[] | null;
  user: string | null;
  room: string | null;
  slots: string[] | null;
  price: number | null;
  roomName: string | null;
  totalPrice: number | null;
}

export interface SlotsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Slot[];
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

interface DataItem {
  key: number;
  room: string | null;
  date: string;
  startTime: string;
  endTime: string;
  cost: number | null;
}

const Checkout = () => {
  const data: Checkout = useAppSelector((state) => state.booking);
  const { data: slot } = useGetMultipleSlotQuery(data.slots);
  const [createBooking] = useCreateBookingMutation();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const slotsData: SlotsResponse = slot;

  const onSubmit = () => {};

  const columns: ColumnsType<DataItem> = [
    {
      title: "Room Name",
      dataIndex: "room",
      key: "room",
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      align: "center",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      align: "center",
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
      align: "center",
      render: (text: string) => `$${text}`,
    },
  ];

  const dataSource = slotsData?.data?.map((slot, index) => ({
    key: index,
    room: data.roomName,
    date: slot.date,
    startTime: slot.startTime,
    endTime: slot.endTime,
    cost: data.price,
  }));

  const handleBookingSubmit = async () => {
    setLoading(true);
    const BookingDetails = {
      date: slotsData.data.map((item) => item.date),
      slots: slotsData.data.map((item) => item._id),
      room: data.room,
      user: data.user,
    };
    const res = await createBooking(BookingDetails);
    console.log(res.data?.data.url);
    window.location.href = res.data?.data.url;
    if (res?.data) {
      setLoading(false);
      dispatch(clearBooking());
    }
  };
  return (
    <div className="max-w-7xl mx-auto">
      <Titlebar title="Confirmation and Payment" />
      <div className="lg:w-[1000px] py-10 mx-auto ">
        <div className="border rounded-md">
          <h1 className="text-center text-2xl font-semibold py-1">
            User Information
          </h1>
          <RAForm onSubmit={onSubmit}>
            <div className="flex lg:flex-row md:flex-row flex-col items-center justify-center gap-5 mx-5">
              <div className="lg:flex-1 md:flex-1 w-full">
                <RAInput
                  type="text"
                  disabled
                  name="name"
                  label="Name"
                  defaultValue={data?.name}
                />
              </div>
              <div className="lg:flex-1 md:flex-1 w-full">
                <RAInput
                  type="text"
                  disabled
                  name="email"
                  label="Email"
                  defaultValue={data?.email}
                />
              </div>
            </div>
            <div className="flex lg:flex-row md:flex-row flex-col items-center justify-center gap-5 mx-5">
              <div className="lg:flex-1 md:flex-1 w-full">
                <RAInput
                  type="text"
                  disabled
                  name="address"
                  label="Address"
                  defaultValue={data?.address}
                />
              </div>
              <div className="lg:flex-1 md:flex-1 w-full">
                <RAInput
                  type="text"
                  disabled
                  name="phone"
                  label="Phone"
                  defaultValue={data?.phone}
                />
              </div>
            </div>
          </RAForm>
        </div>
        <div className="flex gap-5 items-start mt-5 lg:flex-row md:flex-row flex-col">
          <div className="border mx-auto flex-1 rounded-md  p-4">
            <h1 className="text-center pb-5 text-2xl font-semibold py-1">
              Order Summary
            </h1>
            <Table
              columns={columns}
              dataSource={dataSource}
              pagination={false}
              rowKey="key"
            />
          </div>
          <div className="border w-full lg:w-80  rounded-lg p-5">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold">Pricing Details</p>
              <p className="text-lg px-2 rounded-full border">
                {slotsData?.data?.length}
              </p>
            </div>
            <hr className="my-3" />
            <div>
              {slotsData?.data?.map((item) => {
                return (
                  <div key={item._id}>
                    <div className="flex items-center  justify-between text-md space-y-1 text-gray-700">
                      <p>{item.date}</p>
                      <p>${data.price}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <hr className="my-3" />
            <p className="flex items-center justify-between font-semibold pb-2">
              <span>Total Price:</span> <span>${data?.totalPrice}</span>
            </p>
            <Button
              onClick={handleBookingSubmit}
              type="primary"
              loading={loading}
              className="w-full font-medium h-[45px]"
            >
              Pay ${data?.totalPrice}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
