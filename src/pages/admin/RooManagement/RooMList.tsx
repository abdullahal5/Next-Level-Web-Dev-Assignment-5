import { Table, TableColumnsType, Button, Space } from "antd";
import Titlebar from "../../../components/ui/Titlebar";
import { useGetAllRoomsQuery } from "../../../redux/features/rooms/roomApi";
import { Link } from "react-router-dom";

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
      render: () => (
        <div className="flex justify-center gap-2">
          <Space>
            <Link to={`/admin/user-data-update`}>
              <Button>Update</Button>
            </Link>
            <Button>Details</Button>
          </Space>
        </div>
      ),
    },
  ];

  const data: RoomDataType[] =
    rooms?.data.map((room: RoomDataType) => ({
      key: room._id,
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
