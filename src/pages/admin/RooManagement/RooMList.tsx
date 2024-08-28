/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, TableColumnsType, Button, Space } from "antd";
import Titlebar from "../../../components/ui/Titlebar";
import { useGetAllRoomsQuery } from "../../../redux/features/rooms/roomApi";
import { Link } from "react-router-dom";
import DeleteModal from "../../../components/ui/DeleteModal";
import { useDeleteRoomMutation } from "../../../redux/features/admin/roomManagement/roomApi";
import { TResponse } from "../../../global/global";
import { toast } from "sonner";

interface RoomDataType {
  _id: React.Key;
  name: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
}

const RooMList = () => {
  const { data: rooms, isFetching } = useGetAllRoomsQuery({});
  const [deleteRoom] = useDeleteRoomMutation<{ id: string | undefined }>();

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
      title: "Floor No.",
      dataIndex: "floorNo",
      align: "center",
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      align: "center",
    },
    {
      title: "Price Per Slot",
      dataIndex: "pricePerSlot",
      align: "center",
      render: (price: number) => `$${price}`,
    },
    {
      title: "Actions",
      align: "center",
      render: (_, record) => (
        <div className="flex justify-center gap-2">
          <Space>
            <Link to={`/admin/dashboard/update-room/${record._id}`}>
              <Button>Update</Button>
            </Link>
            <DeleteModal onConfirm={() => handleDelete(record._id as string)} />
          </Space>
        </div>
      ),
    },
  ];

  const data: RoomDataType[] =
    rooms?.data.map((room: RoomDataType) => ({
      key: room._id,
      _id: room._id,
      name: room.name,
      roomNo: room.roomNo,
      floorNo: room.floorNo,
      capacity: room.capacity,
      pricePerSlot: room.pricePerSlot,
    })) || [];

  return (
    <>
      <Titlebar title="All Rooms" />
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

export default RooMList;
