/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, TableColumnsType, Button, Space } from "antd";
import Titlebar from "../../../components/ui/Titlebar";
import { Link } from "react-router-dom";
import DeleteModal from "../../../components/ui/DeleteModal";
import { TResponse } from "../../../global/global";
import { toast } from "sonner";
import {
  useDeleteSlotMutation,
  useGetAllSlotQuery,
} from "../../../redux/features/admin/slotManagement/slotApi";

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

export interface Root {
  _id: string;
  room: Room;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  __v: number;
}

export interface SlotData {
  success: boolean;
  statusCode: number;
  message: string;
  data: Root[];
}

const SlotList = () => {
  const { data: slotsResponse, isFetching } = useGetAllSlotQuery(undefined) as {
    data: SlotData;
    isFetching: boolean;
  };
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

  const columns: TableColumnsType<Root> = [
    {
      title: "Room Name",
      dataIndex: ["room", "name"],
      align: "center",
    },
    {
      title: "Room No.",
      dataIndex: ["room", "roomNo"],
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
            <DeleteModal onConfirm={() => handleDelete(record._id)} />
          </Space>
        </div>
      ),
    },
  ];

  const data: Root[] = slotsResponse?.data || [];

  return (
    <>
      <Titlebar title="All Slots" />
      <Table
        columns={columns}
        dataSource={data}
        loading={isFetching}
        size="large"
        pagination={false}
        rowKey={"_id"}
        scroll={{ x: "max-content" }}
      />
    </>
  );
};

export default SlotList;
