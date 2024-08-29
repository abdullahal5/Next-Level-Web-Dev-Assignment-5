/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd";
import RADatePicker from "../../../components/form/RADatePicker";
import RAForm from "../../../components/form/RAForm";
import RASelect from "../../../components/form/RASelect";
import RATimePicker from "../../../components/form/RATimePicker";
import Titlebar from "../../../components/ui/Titlebar";
import { useGetAllRoomsQuery } from "../../../redux/features/rooms/roomApi";
import { FaSpinner } from "react-icons/fa";
import { FieldValues } from "react-hook-form";
import moment from "moment";
import { useCreateSlotMutation } from "../../../redux/features/admin/slotManagement/slotApi";
import { TResponse } from "../../../global/global";
import { toast } from "sonner";

interface Room {
  _id: string;
  name: string;
}

const CreateSlot = () => {
  const [creatSlot] = useCreateSlotMutation();
  const { data: rooms, isFetching } = useGetAllRoomsQuery({});

  const roomsOption = rooms?.data?.map((item: Room) => ({
    value: item._id,
    label: item.name,
  }));

  const handleCreateSlot = async (data: FieldValues) => {
    const toastId = toast.loading("Creating...");

    const slotData = {
      ...data,
      date: moment(data.date).format("YYYY-MM-DD"),
      startTime: moment(new Date(data.startTime)).format("HH:mm"),
      endTime: moment(new Date(data.endTime)).format("HH:mm"),
    };
    try {
      const res = (await creatSlot(slotData)) as unknown as TResponse<any>;
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
    <div className="w-[500px] text-center mx-auto">
      <Titlebar title="Create Slot" />
      {isFetching ? (
        <div className="flex items-center justify-center h-[80vh]">
          <FaSpinner fontSize={"3rem"} className="animate-spin" />
        </div>
      ) : (
        <RAForm onSubmit={handleCreateSlot}>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <RASelect name="room" options={roomsOption} label="Room" />
            </div>
            <div className="flex-1">
              <RADatePicker name="date" label="Date" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <RATimePicker name="startTime" label="Start Time" />
            </div>
            <div className="flex-1">
              <RATimePicker name="endTime" label="End Time" />
            </div>
          </div>
          <Button
            htmlType="submit"
            className="w-56 mx-auto h-9 mt-4"
            type="primary"
            disabled={isFetching}
          >
            Create Slot
          </Button>
        </RAForm>
      )}
    </div>
  );
};

export default CreateSlot;
