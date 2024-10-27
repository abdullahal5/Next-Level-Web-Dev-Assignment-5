/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button } from "antd";
import RAForm from "../../../components/form/RAForm";
import Titlebar from "../../../components/ui/Titlebar";
import { FieldValues } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import RADatePicker from "../../../components/form/RADatePicker";
import RATimePicker from "../../../components/form/RATimePicker";
import RASelect from "../../../components/form/RASelect";
import {
  useGetSingleSlotQuery,
  useUpdateSlotMutation,
} from "../../../redux/features/admin/slotManagement/slotApi";
import { useParams } from "react-router-dom";
import { useGetAllRoomsQuery } from "../../../redux/features/rooms/roomApi";
import moment from "moment";
import { TResponse } from "../../../global/global";
import { toast } from "sonner";

interface Slot {
  _id: string;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  room: string;
}

interface RoomOption {
  value: string;
  label: string;
}

export interface Root {
  success: boolean;
  statusCode: number;
  message: string;
  data: Data;
}

export interface Data {
  _id: string;
  room: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  __v: number;
}

const UpdateSlot: React.FC = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const { data: slotData, isFetching } = useGetSingleSlotQuery(id);

  const slotSingleData = slotData as unknown as Root;

  const [updateSlot] = useUpdateSlotMutation();
  const { data: roomsData } = useGetAllRoomsQuery({});

  const roomsOption: RoomOption[] =
    roomsData?.data?.map((item: Slot) => ({
      value: item._id,
      label: item.name,
    })) || [];

  const defaultRoom = roomsOption.find(
    (option) => option.value === slotSingleData?.data?.room
  );

  const handleUpdateSlot = async (data: FieldValues) => {
    const toastId = toast.loading("Updating...");

    const updatedSlotData = {
      ...data,
      date: moment(data.date).format("YYYY-MM-DD"),
      startTime: moment(new Date(data.startTime)).format("HH:mm"),
      endTime: moment(new Date(data.endTime)).format("HH:mm"),
    };

    try {
      const res = (await updateSlot({
        id,
        body: updatedSlotData,
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

  return (
    <div className="py-5">
      {isFetching ? (
        <div className="flex items-center justify-center h-[80vh]">
          <FaSpinner fontSize={"3rem"} className="animate-spin" />
        </div>
      ) : (
        <div className="lg:w-[500px] md:w-[500px] w-full text-center lg:mx-auto md:mx-auto">
          <Titlebar title="Update Slot" />
          <RAForm onSubmit={handleUpdateSlot}>
            <div className="flex lg:flex-row md:flex-row flex-col items-center gap-4">
              <div className="flex-1 w-full">
                <RASelect
                  name="room"
                  options={roomsOption}
                  label="Room"
                  defaultValue={defaultRoom?.value}
                />
              </div>
              <div className="flex-1 w-full">
                <RADatePicker
                  defaultValue={slotSingleData?.data?.date}
                  name="date"
                  label="Date"
                />
              </div>
            </div>
            <div className="flex lg:flex-row md:flex-row flex-col items-center gap-4">
              <div className="flex-1 w-full">
                <RATimePicker
                  defaultValue={slotSingleData?.data?.startTime}
                  name="startTime"
                  label="Start Time"
                />
              </div>
              <div className="flex-1 w-full">
                <RATimePicker
                  defaultValue={slotSingleData?.data?.endTime}
                  name="endTime"
                  label="End Time"
                />
              </div>
            </div>
            <Button
              htmlType="submit"
              className="w-56 mx-auto h-9 mt-4"
              type="primary"
              disabled={isFetching}
            >
              Update Slot
            </Button>
          </RAForm>
        </div>
      )}
    </div>
  );
};

export default UpdateSlot;
