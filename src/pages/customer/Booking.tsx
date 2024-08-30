/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleRoomQuery } from "../../redux/features/rooms/roomApi";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useGetAllSlotQuery } from "../../redux/features/admin/slotManagement/slotApi";
import { SlotData } from "../../types/slot.types";
import { format, parseISO } from "date-fns";
import { FaSpinner } from "react-icons/fa";
import RAForm from "../../components/form/RAForm";
import RAInput from "../../components/form/RAInput";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";
import { useCreateBookingMutation } from "../../redux/features/admin/bookingMangement/bookingApi";
// import { TResponse } from "../../global/global";
import { setBooking } from "../../redux/features/booking/bookingSlice";

interface BookingImage {
  url: string;
}

interface BookingData {
  data: any;
  id: string;
  images: BookingImage[];
}

interface BookingResponse {
  data: BookingData;
  isFetching: boolean;
}

type SelectedDate = Date | null;
type SelectedSlots = string[];

export interface Root {
  success: boolean;
  statusCode: number;
  message: string;
  data: Daum[];
}

export interface Daum {
  _id: string;
  room: Room;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
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

const Booking = () => {
  const [createBooking] = useCreateBookingMutation();
  const { id } = useParams<string>();
  const { data: booking, isFetching } = useGetSingleRoomQuery(
    id
  ) as BookingResponse;
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(null);
  const [selectedSlots, setSelectedSlots] = useState<SelectedSlots>([]);
  const [slotIds, setSlotIds] = useState<string[]>([]);
  const [slotDates, setSlotDates] = useState<string[]>([]);
  const [formatedDate, setFormatedDate] = useState<string | undefined | null>(
    undefined
  );
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const bookingData = booking as unknown as SlotData;
  const { data: getSlots, isFetching: slotFetch } = useGetAllSlotQuery(
    formatedDate
  ) as { data: Root };
  const roomId = booking?.data?._id;

  const match1 = getSlots?.data?.filter((item) => item?.room?._id === roomId);
  const match = formatedDate
    ? getSlots?.data?.filter((item) => item?.room === roomId)
    : match1;
  const matchDates = match?.map((slot) => parseISO(slot?.date)) || [];

  const formatDate = (date: Date): string => format(date, "yyyy-MM-dd");

  const getDayClassName = (date: Date): string => {
    const dateStr = formatDate(date);
    const matchDatesStr = matchDates.map((d) => formatDate(d));
    const isMatchedDate = matchDatesStr.includes(dateStr);
    const isSelectedDate = selectedDate && formatDate(selectedDate) === dateStr;

    let className = "";

    if (isMatchedDate) {
      className += " bg-red-500 text-white rounded-full";
    }

    if (isSelectedDate) {
      className += " selected-date-class";
    }

    return className;
  };

  const handleSlotClick = (slot: string) => {
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  const handleDeselectSlot = (slot: string) => {
    setSelectedSlots((prev) => prev.filter((s) => s !== slot));
  };

  const formatSlotTime = (startTime: string, endTime: string) =>
    `${startTime} - ${endTime}`;

  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = formatDate(date);
      setFormatedDate(formattedDate);
    } else {
      setFormatedDate("");
    }
  };

  const onSubmit = () => {};
  const handlePayment = async () => {
    if (selectedSlots.length === 0) {
      return toast.error("Please select at least one slot");
    }
    // const toastId = toast.loading("Booking");

    const userInfo = {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      address: user?.address,
      date: slotDates,
      user: user?._id,
      room: booking.data?._id,
      slots: slotIds,
      pricePerSlot: booking?.data?.pricePerSlot
    };

    dispatch(setBooking(userInfo));
    navigate("/checkout")
    // try {
    //   const res = (await createBooking(userInfo)) as unknown as TResponse<any>;
    //   if (res.error) {
    //     toast.error(res?.error?.data?.message, { id: toastId, duration: 2000 });
    //     setSelectedSlots([])
    //   } else {
    //     toast.success(res.data.message, {
    //       id: toastId,
    //       duration: 2000,
    //     });
    //   }
    // } catch (error: any) {
    //   setSelectedSlots([]);
    //   toast.success(error.message, {
    //     id: toastId,
    //     duration: 2000,
    //   });
    // }
  };

  return (
    <>
      {isFetching || slotFetch ? (
        <div className="flex items-center justify-center h-[80vh]">
          <FaSpinner fontSize={"3rem"} className="animate-spin" />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto mb-10">
          <div className="lg:w-[900px] mx-auto border mt-5 rounded-md">
            <img
              className="w-full h-[300px] object-cover rounded-md"
              src={bookingData?.data?.images[0]}
              alt=""
            />
            <div className="flex lg:flex-row md:flex-row flex-col-reverse justify-center items-start lg:gap-20 md:gap-20 gap-10 mt-4 text-center px-10 pb-3">
              <div className="lg:w-[50%] md:w-[50%]">
                {selectedSlots.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedSlots.map((slot) => (
                      <div
                        key={slot}
                        className="bg-gray-200 border text-sm py-1 rounded-full flex items-center px-2 gap-1"
                      >
                        <span>{slot}</span>
                        <CloseOutlined
                          onClick={() => handleDeselectSlot(slot)}
                          className="text-red-500 cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                )}
                {match && match.length > 0 ? (
                  <>
                    <h2 className="text-xl font-semibold mb-4">
                      Available Slots{" "}
                      {formatedDate ? (
                        <small>({formatedDate})</small>
                      ) : (
                        <small>(All slots of this room)</small>
                      )}
                    </h2>
                    <div className="flex flex-col gap-4 mx-auto w-full">
                      <div className="flex py-2 rounded-md border-blue-500 border justify-between text-lg font-semibold mb-2 px-8 text-white bg-blue-600">
                        <span>Date</span>
                        <span>Duration</span>
                      </div>

                      {match.map((slot) => (
                        <div
                          key={slot._id}
                          onClick={() => {
                            setSlotDates([...slotDates, slot?.date]);
                            setSlotIds([...slotIds, slot._id]);
                            handleSlotClick(
                              formatSlotTime(slot.startTime, slot.endTime)
                            );
                          }}
                          className={`text-lg border px-8 py-2 rounded-md border-blue-500 text-blue-600 duration-300 hover:bg-blue-600 hover:text-white flex items-center justify-between cursor-pointer text-center font-semibold ${
                            selectedSlots.includes(
                              formatSlotTime(slot.startTime, slot.endTime)
                            )
                              ? "bg-blue-600 text-white"
                              : ""
                          }`}
                        >
                          <span>
                            {format(parseISO(slot.date), "yyyy-MM-dd")}
                          </span>
                          <span>
                            {formatSlotTime(slot.startTime, slot.endTime)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="text-3xl font-semibold h-[60vh] flex items-center justify-center text-center">
                    No slots available
                  </p>
                )}
              </div>
              <div className="lg:flex-1 w-full">
                <div className="p-3 rounded-md mx-auto flex items-center justify-center">
                  <div className="p-5 border rounded-md">
                    <p className="text-left text-2xl pb-3 font-semibold">
                      ${booking?.data?.pricePerSlot}/h
                    </p>
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleChange}
                      inline
                      dateFormat="MM/dd/yyyy"
                      dayClassName={getDayClassName}
                    />
                  </div>
                </div>
                <Button
                  htmlType="submit"
                  onClick={handlePayment}
                  type="primary"
                  className="h-11 w-full text-lg mt-4"
                >
                  Checkout
                </Button>
              </div>
            </div>
            <hr className="mx-5 my-3" />
            <div className="p-3">
              <h1 className="text-3xl font-semibold text-center py-3">
                User Information
              </h1>
              <div className="border rounded-md w-full p-5 lg:h-[250px]">
                <RAForm onSubmit={onSubmit}>
                  <div className="flex lg:flex-row md:flex-row flex-col items-center justify-center gap-5 mx-5">
                    <div className="lg:flex-1 md:flex-1 w-full">
                      <RAInput
                        type="text"
                        disabled
                        name="name"
                        label="Name"
                        defaultValue={user?.name}
                      />
                    </div>
                    <div className="lg:flex-1 md:flex-1 w-full">
                      <RAInput
                        type="text"
                        disabled
                        name="email"
                        label="Email"
                        defaultValue={user?.email}
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
                        defaultValue={user?.address}
                      />
                    </div>
                    <div className="lg:flex-1 md:flex-1 w-full">
                      <RAInput
                        type="text"
                        disabled
                        name="phone"
                        label="Phone"
                        defaultValue={user?.phone}
                      />
                    </div>
                  </div>
                </RAForm>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Booking;
