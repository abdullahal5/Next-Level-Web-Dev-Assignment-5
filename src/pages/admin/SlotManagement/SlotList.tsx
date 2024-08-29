/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, TableColumnsType, Button, Space } from "antd";
import Titlebar from "../../../components/ui/Titlebar";
import { Link } from "react-router-dom";
import DeleteModal from "../../../components/ui/DeleteModal";
import { TResponse } from "../../../global/global";
import { toast } from "sonner";
import { useDeleteSlotMutation, useGetAllSlotQuery } from "../../../redux/features/admin/slotManagement/slotApi";

export type TRoom = {
  _id: string;
  name: string;
  roomNo: number;
  floorNo: number;
  pricePerSlot: number;
  amenities: [string];
  isDeleted: boolean;
  capacity: number;
  images: [string];
};

interface RoomDataType {
  _id: string;
  room: TRoom;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

const SlotList = () => {
  const { data: slots, isFetching } = useGetAllSlotQuery(undefined);
  const [deleteRoom] = useDeleteSlotMutation<{ id: string | undefined }>();

  const handleDelete = async (id: string) => {
    try {
      const res = (await deleteRoom({ id })) as unknown as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message);
      } else {
        toast.success(res.data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const columns: TableColumnsType<RoomDataType> = [
    {
      title: "Room Name",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "Room No.",
      dataIndex: "roomNo",
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "date",
      align: "center",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      align: "center",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      align: "center",
    },
    {
      title: "Actions",
      align: "center",
      render: (_, record) => (
        <div className="flex justify-center gap-2">
          <Space>
            <Link to={`/admin/dashboard/update-slot/${record._id}`}>
              <Button>Update</Button>
            </Link>
            <DeleteModal onConfirm={() => handleDelete(record._id as string)} />
          </Space>
        </div>
      ),
    },
  ];

  const data: RoomDataType[] =
    slots?.data?.map((slot: RoomDataType) => ({
      key: slot._id,
      _id: slot._id,
      date: slot.date,
      name: slot.room.name,
      roomNo: slot.room.roomNo,
      startTime: slot.startTime,
      endTime: slot.endTime,
    })) || [];

  return (
    <>
      <Titlebar title="All Slots" />
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

export default SlotList;
